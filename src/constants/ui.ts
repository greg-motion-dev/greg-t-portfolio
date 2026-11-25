import type { Locale } from "@/i18n/config";
import { clientsContent, type ClientsContent } from "./clients";
import { contactContent, type ContactContent } from "./contact";
import {
  experienceContent,
  publicationKindLabels,
  techStackContent,
  timelineKindLabels,
  type ExperienceContent,
  type PublicationKind,
  type TechStackContent,
  type TimelineKind,
} from "./cv";
import { cvPageContent, type CvPageContent } from "./cvPage";
import {
  heroCtas,
  heroGreeting,
  heroIntro,
  heroOrbitHint,
  heroPortrait,
  type HeroCta,
} from "./hero";
import { privacyContent, type PrivacyContent } from "./legal";
import {
  footerContent,
  mobileNavLabels,
  navContact,
  navLinks,
  type FooterContent,
  type MobileNavLabels,
  type NavLink,
} from "./navigation";
import { notFoundContent, type NotFoundContent } from "./notFound";
import {
  eraLabels,
  lineupContent,
  roleLabels,
  type LineupContent,
  type ProjectEra,
  type ProjectRole,
} from "./projects";

export interface NavContent {
  readonly links: readonly NavLink[];
  readonly contact: NavLink;
  readonly ariaLabel: string;
  readonly languageSwitchLabel: string;
  readonly profileLinkAriaTemplate: string;
}

export interface HeroContent {
  readonly greeting: string;
  readonly intro: string;
  readonly ctas: readonly HeroCta[];
  readonly orbitHint: string;
  readonly portraitAlt: string;
}

export interface PreviewImage {
  readonly url: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface MetaContent {
  readonly title: string;
  readonly description: string;
  readonly openGraphLocale: string;
  readonly previewImage: PreviewImage;
}

export const previewImageSize = { width: 1200, height: 630 } as const;

export interface UiContent {
  readonly meta: MetaContent;
  readonly nav: NavContent;
  readonly mobileNav: MobileNavLabels;
  readonly footer: FooterContent;
  readonly notFound: NotFoundContent;
  readonly hero: HeroContent;
  readonly contact: ContactContent;
  readonly clients: ClientsContent;
  readonly techStack: TechStackContent;
  readonly experience: ExperienceContent;
  readonly timelineKindLabels: Readonly<Record<TimelineKind, string>>;
  readonly publicationKindLabels: Readonly<Record<PublicationKind, string>>;
  readonly lineup: LineupContent;
  readonly disciplinesAriaLabel: string;
  readonly eraLabels: Readonly<Record<ProjectEra, string>>;
  readonly roleLabels: Readonly<Record<ProjectRole, string>>;
  readonly cvPage: CvPageContent;
  readonly privacy: PrivacyContent;
}

export const uiContentEn = {
  meta: {
    title: "Greg | Creative Engineer",
    description: heroIntro,
    openGraphLocale: "en_GB",
    previewImage: {
      url: "/og/greg-telakis-en.png",
      alt: "Greg Telakis, Creative UI Engineer and Motion & 3D Web Specialist, with his portrait inside three orbits",
      ...previewImageSize,
    },
  },
  nav: {
    links: navLinks,
    contact: navContact,
    ariaLabel: "Primary",
    languageSwitchLabel: "Language",
    profileLinkAriaTemplate: "{name} profile",
  },
  mobileNav: mobileNavLabels,
  footer: footerContent,
  notFound: notFoundContent,
  hero: {
    greeting: heroGreeting,
    intro: heroIntro,
    ctas: heroCtas,
    orbitHint: heroOrbitHint,
    portraitAlt: heroPortrait.alt,
  },
  contact: contactContent,
  clients: clientsContent,
  techStack: techStackContent,
  experience: experienceContent,
  timelineKindLabels,
  publicationKindLabels,
  lineup: lineupContent,
  disciplinesAriaLabel: "Disciplines",
  eraLabels,
  roleLabels,
  cvPage: cvPageContent,
  privacy: privacyContent,
} as const satisfies UiContent;

export function fillTemplate(template: string, values: Readonly<Record<string, string>>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

export type LocalizedUiContent = Readonly<Record<Locale, UiContent>>;
