import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Enter your email").email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

export const signupSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name").max(80),
    title: z.string().trim().min(2, "Enter your professional title").max(80),
    agency: z.string().trim().min(2, "Enter your agency or brokerage").max(100),
    email: z.string().trim().min(1, "Enter your work email").email("Enter a valid email address"),
    password: z.string().min(8, "Use at least 8 characters").max(72),
    confirmPassword: z.string(),
    terms: z.literal(true, { error: "Please accept the terms to continue" }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export const forgotSchema = z.object({
  email: z.string().trim().min(1, "Enter your email").email("Enter a valid email address"),
});
