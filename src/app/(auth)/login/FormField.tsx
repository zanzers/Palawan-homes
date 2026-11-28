"use client";

import { useId, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string | undefined };

export function FormField({ label, error, type, className, ...props }: Props) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={isPassword && show ? "text" : type}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={cn("h-11 bg-card", isPassword && "pr-11", error && "border-destructive focus-visible:ring-destructive", className)}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 grid w-11 place-items-center text-muted-foreground hover:text-foreground"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && <p id={`${id}-err`} className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

export function fieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const i of issues) {
    const k = String(i.path[0] ?? "");
    if (!out[k]) out[k] = i.message;
  }
  return out;
}
