param(
    [Parameter(Mandatory=$true)]
    [string]$Message
)


function Invoke-Check {
    param(
        [string]$Name,
        [scriptblock]$Command
    )

    Write-Host "`nRunning $Name..." -ForegroundColor Cyan
    & $Command

    if($LASTEXITCODE -ne 0){
        Write-Host "`n$Name failed. Fix the issues above, then run ship again." -ForegroundColor Red
        Write-Host "Nothing was committed or pushed." -ForegroundColor Yellow
        exit 1
    }
    Write-Host "$Name passed." -ForegroundColor Green
}





$ErrorActionPreference = "Stop"

# --------------------------------------------------
# Step 1: Verify repository
# --------------------------------------------------

git rev-parse --is-inside-work-tree | Out-Null

$currentBranch = git branch --show-current

if ($currentBranch -ne "main") {
    Write-Host "You must start from main. Current branch: $currentBranch" -ForegroundColor Red
    exit 1
}

$status = git status --porcelain

if (-not $status) {
    Write-Host "No changes to ship." -ForegroundColor Yellow
    exit 1
}

if((npm pkg get scripts.lint) -eq "{}"){
    Write-Host "No lint script found in package.json. Add one before shipping." -ForegroundColor Red
    exit 1
}

Invoke-Check "Next.js type generation" { npx next typegen }
Invoke-Check "Type check"              { npx tsc --noEmit }
Invoke-Check "Lint (0 warnings allowed)" { npm run lint -- --max-warnings=0 }



# --------------------------------------------------
# Step 2: Update main
# --------------------------------------------------

Write-Host "`nUpdating main..." -ForegroundColor Cyan

git pull --ff-only origin main

# --------------------------------------------------
# Step 3: Generate branch name
# --------------------------------------------------

$branchName = $Message.ToLower() `
    -replace '[^a-z0-9\s-]', '' `
    -replace '\s+', '-' `
    -replace '-+', '-'

$branchName = $branchName.Trim('-')

if ($branchName.Length -gt 50) {
    $branchName = $branchName.Substring(0, 50).Trim('-')
}

$branchName = "work/$branchName"

Write-Host "Creating branch: $branchName" -ForegroundColor Cyan

git switch -c $branchName

# --------------------------------------------------
# Step 4: Commit changes
# --------------------------------------------------

Write-Host "`nStaging changes..." -ForegroundColor Cyan

git add .

Write-Host "`nChanges to commit:" -ForegroundColor Cyan

git status --short

Write-Host "`nCreating commit..." -ForegroundColor Cyan

git commit -m $Message

# --------------------------------------------------
# Step 5: Push branch
# --------------------------------------------------

Write-Host "`nPushing branch..." -ForegroundColor Cyan

git push -u origin $branchName

# --------------------------------------------------
# Step 6: Create Pull Request
# --------------------------------------------------

Write-Host "`nCreating Pull Request..." -ForegroundColor Cyan

$prUrl = gh pr create `
    --base main `
    --head $branchName `
    --title $Message `
    --body "Automated PR created by .scripts/ship.ps1."

Write-Host "`nPull Request created:" -ForegroundColor Green
Write-Host $prUrl

# --------------------------------------------------
# Step 7: Enable automatic PR merge
# --------------------------------------------------

Write-Host "`nEnabling automatic PR merge..." -ForegroundColor Cyan

gh pr merge $branchName `
    --auto `
    --squash `
    --delete-branch

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nCould not enable automatic merging." -ForegroundColor Red
    Write-Host "PR remains open: $prUrl" -ForegroundColor Yellow
    exit 1
}

Write-Host "`nAutomatic merge enabled." -ForegroundColor Green
Write-Host "GitHub will merge once all required checks pass." -ForegroundColor Green

# --------------------------------------------------
# Step 8: Wait for CI
# --------------------------------------------------

Write-Host "`nWaiting for CI..." -ForegroundColor Cyan

gh pr checks $prUrl --watch

if ($LASTEXITCODE -ne 0) {

    Write-Host "`nCI failed. Cleaning up..." -ForegroundColor Red
    git reset --soft main
    gh pr close $prUrl
    git push origin --delete $branchName

    git switch main


    git branch -D $branchName

    Write-Host "`nCleanup completed." -ForegroundColor Green
    Write-Host "Your changes are preserved and ready for correction." -ForegroundColor Yellow
    Write-Host "Fix the issues, then run ship again." -ForegroundColor Cyan

    exit 1
}

Write-Host "`nAll CI checks passed." -ForegroundColor Green
Write-Host "GitHub will complete the automatic merge." -ForegroundColor Green


# --------------------------------------------------
# Step 9: Wait for automatic merge completion
# --------------------------------------------------

Write-Host "`nWaiting for GitHub to complete the merge..." -ForegroundColor Cyan

$merged = $false

for ($i = 0; $i -lt 12; $i++) {

    $state = gh pr view $prUrl --json state --jq ".state"

    if ($state -eq "MERGED") {
        $merged = $true
        break
    }

    Start-Sleep -Seconds 5
}

if (-not $merged) {
    Write-Host "`nPR is still open or awaiting merge." -ForegroundColor Yellow
    Write-Host "Check GitHub before continuing: $prUrl" -ForegroundColor Yellow
    exit 0
}

Write-Host "`nPR successfully merged!" -ForegroundColor Green

# --------------------------------------------------
# Step 10: Return to main
# --------------------------------------------------

Write-Host "`nReturning to main..." -ForegroundColor Cyan

git switch main

git pull --ff-only origin main

Write-Host "`nDone." -ForegroundColor Green
Write-Host "Current branch: $(git branch --show-current)" -ForegroundColor Cyan