export type HeroCtaVariant = "solid" | "outline";

interface HeroCtaBase {
  readonly id: string;
  readonly label: string;
  readonly variant: HeroCtaVariant;
}

export interface HeroLinkCta extends HeroCtaBase {
  readonly status: "available";
  readonly href: string;
}

export interface HeroPendingCta extends HeroCtaBase {
  readonly status: "pending";
  readonly pendingLabel: string;
}

export type HeroCta = HeroLinkCta | HeroPendingCta;

export const heroIntro =
  "Senior Visual Creator turned Creative UI Engineer with 10+ years of experience bridging high-end UI/UX design, interactive motion, and modern frontend architecture.";

export const heroCtas = [
  {
    id: "see-my-work",
    label: "see my work",
    variant: "solid",
    status: "available",
    href: "#work",
  },
  {
    id: "resume",
    label: "resume",
    variant: "outline",
    status: "pending",
    pendingLabel: "soon",
  },
] as const satisfies readonly HeroCta[];
