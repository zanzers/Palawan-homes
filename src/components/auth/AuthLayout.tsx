import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

type Props = { title: string; subtitle: string; children: ReactNode; footer?: ReactNode };

export function AuthLayout({ title, subtitle, children, footer }: Props) {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      <aside className="relative hidden overflow-hidden lg:block">
        <Image
          src="/assets/image/palawan-auth.jpg"
          alt="Modern villa above a turquoise lagoon in Palawan"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-lagoon)" }} />
        <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
          <Link href="/login" aria-label="Palawan Homes home">
            <Logo tone="light" showTagline />
          </Link>
          <div className="max-w-md text-primary-foreground">
            <p className="font-display text-3xl leading-tight xl:text-4xl">
              Every listing, from shoreline villas to city condos, in one calm workspace.
            </p>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Rentals, resale and new developments — organised, polished and ready to share.
            </p>
          </div>
        </div>
      </aside>

      <main className="flex min-h-screen flex-col px-5 py-8 sm:px-10">
        <div className="lg:hidden">
          <Link href="/login" aria-label="Palawan Homes home">
            <Logo showTagline />
          </Link>
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-8 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
        <p className="text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Palawan Homes · Agent Portal</p>
      </main>
    </div>
  );
}