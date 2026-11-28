import { cn } from "@/lib/utils";

/** Palawan Homes mark: a roofline over a lagoon wave with a setting sun. */
export function LogoMark({ className, title = "Palawan Homes" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label={title} className={cn("h-10 w-10 shrink-0", className)}>
      <rect width="48" height="48" rx="12" className="fill-primary" />
      <path d="M10 24 24 12l14 12" fill="none" className="stroke-primary-foreground" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 22v12h18V22" fill="none" className="stroke-primary-foreground" strokeWidth="3.2" strokeLinejoin="round" />
      <path d="M8 37c3.3-2.4 6.7-2.4 10 0s6.7 2.4 10 0 6.7-2.4 12 0" fill="none" className="stroke-coral" strokeWidth="3" strokeLinecap="round" />
      <circle cx="31" cy="15" r="2.6" className="fill-coral" />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** "light" for use on photos or dark surfaces. */
  tone?: "default" | "light";
  showTagline?: boolean;
};

export function Logo({ className, tone = "default", showTagline = false }: LogoProps) {
  const light = tone === "light";
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoMark />
      <div className="min-w-0 leading-none">
        <span className={cn("block font-display text-xl font-semibold tracking-tight", light ? "text-primary-foreground" : "text-foreground")}>
          Palawan <span className={light ? "text-sand" : "text-primary"}>Homes</span>
        </span>
        {showTagline && (
          <span className={cn("mt-1 block text-[11px] font-medium uppercase tracking-[0.18em]", light ? "text-primary-foreground/80" : "text-muted-foreground")}>
            Agent Portal
          </span>
        )}
      </div>
    </div>
  );
}
