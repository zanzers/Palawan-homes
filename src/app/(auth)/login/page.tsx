import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";


export default function LoginPage() {
  return (
      <AuthLayout
        title="Welcome back"
        subtitle="Sign in to manage your listings."
        footer={<>New here? <Link href="/signup" className="font-semibold text-primary hover:underline">Create an account</Link></>}
      >
        <LoginForm />
      </AuthLayout>
  );
}