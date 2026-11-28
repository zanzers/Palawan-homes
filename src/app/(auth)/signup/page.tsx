import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";

const description = "Create your Palawan Homes agent account and start organising your listings.";

export const metadata: Metadata = {
  title: "Create account — Palawan Homes",
  description,
  openGraph: { title: "Create account — Palawan Homes", description, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function SignupPage() {
  return (

      <AuthLayout
        title="Create your agent account"
        subtitle="Set up your private workspace in under a minute."
        footer={<>Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Sign in</Link></>}
      >
        <SignupForm />
      </AuthLayout>

  );
}