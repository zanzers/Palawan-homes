"use client";

import { useState, useRouter, toast, AlertCircle, Loader2, Button, Checkbox, Label, signupSchema, fieldErrors, FormField,type ChangeEvent, type FormEvent,} from "./imports";




const empty = { fullName: "", title: "", agency: "", email: "", password: "", confirmPassword: "" };

export function SignupForm() {
  const router = useRouter();
  const [values, setValues] = useState(empty);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof empty) => (e: ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = signupSchema.safeParse({ ...values, terms });
    if (!parsed.success) return setErrors(fieldErrors(parsed.error.issues));
    setErrors({});
    setLoading(true);

    // TODO: replace with your real sign-up call using
    // const { fullName, title, agency, email, password } = parsed.data;
    // if it fails: setLoading(false); return setFormError("...");

    setLoading(false);
    toast.success(`Welcome to Palawan Homes, ${parsed.data.fullName.split(" ")[0]}!`);
    router.push("/dashboard");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {formError && (
        <div role="alert" className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Full name" autoComplete="name" placeholder="Maria Santos" value={values.fullName} onChange={set("fullName")} error={errors["fullName"]} />
        <FormField label="Professional title" placeholder="Licensed Broker" value={values.title} onChange={set("title")} error={errors["title"]} />
      </div>
      <FormField label="Agency / Brokerage name" autoComplete="organization" placeholder="Palawan Homes Realty" value={values.agency} onChange={set("agency")} error={errors["agency"]} />
      <FormField label="Work email" type="email" autoComplete="email" placeholder="you@agency.com" value={values.email} onChange={set("email")} error={errors["email"]} />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Password" type="password" autoComplete="new-password" placeholder="At least 8 characters" value={values.password} onChange={set("password")} error={errors["password"]} />
        <FormField label="Confirm password" type="password" autoComplete="new-password" placeholder="Repeat password" value={values.confirmPassword} onChange={set("confirmPassword")} error={errors["confirmPassword"]} />
      </div>
      <div className="space-y-1.5 pt-1">
        <div className="flex items-start gap-2">
          <Checkbox id="terms" checked={terms} onCheckedChange={(v: boolean) => setTerms(v === true)} className="mt-0.5" aria-invalid={!!errors["terms"]} />
          <Label htmlFor="terms" className="text-sm font-normal leading-snug text-muted-foreground">
            I agree to the Terms of Service and Privacy Policy
          </Label>
        </div>
        {errors["terms"] && <p className="text-xs font-medium text-destructive">{errors["terms"]}</p>}
      </div>
      <Button type="submit" disabled={loading} className="h-11 w-full text-base">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Create Agent Account
      </Button>
    </form>
  );
}