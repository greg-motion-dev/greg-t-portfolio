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

export interface HeroPortrait {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export const heroPortrait = {
  src: "/images/profile.jpg",
  alt: "Portrait of Greg Telakis",
  width: 832,
  height: 832,
} as const satisfies HeroPortrait;

export const heroGreeting = "Ahoi! My name is Greg.";

export const heroOrbitHint = "drag to orbit";
