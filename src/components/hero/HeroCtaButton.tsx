import type { HeroCta } from "@/constants";
import CircleRevealLink from "@/components/ui/CircleRevealLink";

export interface HeroCtaButtonProps {
  readonly cta: HeroCta;
}

const baseClasses =
  "inline-flex min-w-48 items-center justify-center gap-2 px-8 py-4 font-mono text-sm tracking-widest uppercase";

export default function HeroCtaButton({ cta }: HeroCtaButtonProps) {
  if (cta.status === "pending") {
    return (
      <span
        aria-disabled="true"
        className={`${baseClasses} cursor-not-allowed border border-ink/20 text-ink-muted`}
      >
        {cta.label}
        <span className="text-xs normal-case">({cta.pendingLabel})</span>
      </span>
    );
  }

  if (cta.variant === "solid") {
    return <CircleRevealLink href={cta.href} label={cta.label} />;
  }

  return (
    <a
      href={cta.href}
      target={cta.opensInNewTab ? "_blank" : undefined}
      rel={cta.opensInNewTab ? "noopener" : undefined}
      className={`focus-ring ${baseClasses} border border-ink/40 text-ink transition-colors hover:border-ink`}
    >
      {cta.label}
    </a>
  );
}
