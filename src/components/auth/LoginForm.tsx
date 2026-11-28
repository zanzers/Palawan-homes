"use client";

import { useState, useRouter, Link, AlertCircle, Loader2, Button, Checkbox, Label, loginSchema, fieldErrors, FormField, type FormEvent, } from "./imports";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) return setErrors(fieldErrors(parsed.error.issues));
    setErrors({});
    setLoading(true);

    // TODO: replace with your real sign-in call, e.g.
    // const res = await signIn(parsed.data.email, parsed.data.password, remember);
    // if (!res.ok) { setLoading(false); return setFormError(res.error); }
    void remember;

    setLoading(false);
    router.push("/dashboard");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {formError && (
        <div role="alert" className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}
      <FormField label="Email" type="email" autoComplete="email" placeholder="you@agency.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors["email"]} />
      <div className="space-y-1.5">
        <FormField label="Password" type="password" autoComplete="current-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} error={errors["password"]} />
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Checkbox id="remember" checked={remember} onCheckedChange={(v: boolean) => setRemember(v === true)} />
          <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">Remember this device</Label>
        </div>
        <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">Forgot password?</Link>
      </div>
      <Button type="submit" disabled={loading} className="h-11 w-full text-base">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Sign In to Dashboard
      </Button>
    </form>
  );
}