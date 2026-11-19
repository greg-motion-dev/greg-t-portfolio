export type ProjectEra = "professional" | "engineering";
export type ProjectDiscipline = "frontend" | "design" | "motion";
export type ProjectRole = "built" | "designed-and-built" | "designed" | "led";
export type ProjectTag =
  | "ux-ui"
  | "branding"
  | "wordpress"
  | "headless-cms"
  | "3d"
  | "motion"
  | "tool";
export type AccentColor = "yellow" | "pink" | "teal";
export type BrandShape = "circle" | "square" | "diamond" | "triangle";
export type DisciplineShape = Exclude<BrandShape, "circle">;
export type ProjectLinkKind = "live" | "repo" | "case-study";
export type ProjectMediaKind = "image" | "video";

export interface ProjectLink {
  readonly kind: ProjectLinkKind;
  readonly label: string;
  readonly href: string;
}

export interface ProjectMedia {
  readonly kind: ProjectMediaKind;
  readonly src: string;
  readonly alt: string;
}

export interface Project {
  readonly id: string;
  readonly era: ProjectEra;
  readonly discipline: ProjectDiscipline;
  readonly title: string;
  readonly role: ProjectRole;
  readonly year: string;
  readonly summary: string;
  readonly stack: readonly string[];
  readonly tags: readonly ProjectTag[];
  readonly links: readonly ProjectLink[];
  readonly media: readonly ProjectMedia[];
  readonly featured: boolean;
}

export const TO_BE_PROVIDED = "TO BE PROVIDED";

export const disciplineAccent = {
  frontend: "yellow",
  design: "teal",
  motion: "pink",
} as const satisfies Record<ProjectDiscipline, AccentColor>;

export const disciplineShape = {
  frontend: "square",
  design: "diamond",
  motion: "triangle",
} as const satisfies Record<ProjectDiscipline, DisciplineShape>;

export const disciplineOrder = [
  "frontend",
  "design",
  "motion",
] as const satisfies readonly ProjectDiscipline[];

export const disciplineLabels = {
  frontend: "Front-end",
  design: "UX/UI & Brand",
  motion: "Motion & 3D",
} as const satisfies Record<ProjectDiscipline, string>;

export interface LineupContent {
  readonly title: string;
  readonly linkPendingLabel: string;
  readonly githubCtaLabel: string;
}

export const lineupContent = {
  title: "Selected work",
  linkPendingLabel: "Link soon",
  githubCtaLabel: "More on GitHub",
} as const satisfies LineupContent;

export const eraLabels = {
  professional: "Climate & UI/UX",
  engineering: "SPICED & Interactive",
} as const satisfies Record<ProjectEra, string>;

export const roleLabels = {
  built: "Built",
  "designed-and-built": "Designed & built",
  designed: "Designed",
  led: "Led",
} as const satisfies Record<ProjectRole, string>;

export const projects = [
  {
    id: "zero-carbon-analytics-original",
    era: "professional",
    discipline: "frontend",
    title: "Zero Carbon Analytics (Original)",
    role: "designed-and-built",
    year: "2021",
    summary:
      "An independent climate-research platform spun off from the European Climate Foundation. I designed the brand and UI from scratch and built a custom WordPress theme for its briefings and explainers.",
    stack: ["WordPress", "PHP", "ACF", "Gutenberg", "JavaScript"],
    tags: [],
    links: [
      {
        kind: "live",
        label: "Archived site",
        href: "https://web.archive.org/web/20250701182944/https://zerocarbon-analytics.org/",
      },
    ],
    media: [
      {
        kind: "image",
        src: "/images/projects/zero-carbon-analytics-original/cover.jpg",
        alt: "Climate Science & Impact topic page of Zero Carbon Analytics with a yellow banner and briefing cards",
      },
      {
        kind: "image",
        src: "/images/projects/zero-carbon-analytics-original/01.jpg",
        alt: "Climate Science & Impact topic page with briefing cards",
      },
      {
        kind: "image",
        src: "/images/projects/zero-carbon-analytics-original/02.jpg",
        alt: "Briefing page for the IPCC Sixth Assessment Report",
      },
      {
        kind: "image",
        src: "/images/projects/zero-carbon-analytics-original/03.jpg",
        alt: "Food, Nature & Land topic page with briefing cards",
      },
    ],
    featured: true,
  },
  {
    id: "zero-carbon-analytics-rebrand",
    era: "professional",
    discipline: "frontend",
    title: "Zero Carbon Analytics (2025 Rebrand)",
    role: "led",
    year: "2025",
    summary:
      "The 2025 redesign of the same climate-research platform. Having co-created the original, I led the new UI design, managed the developers who built it and supported the technical implementation.",
    stack: ["WordPress", "PHP", "ACF", "Gutenberg", "JavaScript"],
    tags: [],
    links: [
      {
        kind: "live",
        label: "Live site",
        href: "https://zerocarbon-analytics.org/",
      },
    ],
    media: [
      {
        kind: "image",
        src: "/images/projects/zero-carbon-analytics-rebrand/cover.jpg",
        alt: "Nature topic page of the redesigned Zero Carbon Analytics with a lavender hero and research cards",
      },
      {
        kind: "image",
        src: "/images/projects/zero-carbon-analytics-rebrand/01.jpg",
        alt: "Briefing on Congo Basin deforestation with charts and data tables",
      },
      {
        kind: "image",
        src: "/images/projects/zero-carbon-analytics-rebrand/02.jpg",
        alt: "Nature topic page with latest research and filterable article grid",
      },
    ],
    featured: true,
  },
  {
    id: "steelwatch",
    era: "professional",
    discipline: "design",
    title: "SteelWatch",
    role: "designed",
    year: "2023",
    summary:
      "An independent organisation tracking the steel industry’s climate impact, published in English, Japanese and Korean. I developed the brand identity and designed the UI, then led the external developer who built it.",
    stack: ["WordPress", "PHP", "Custom theme", "JavaScript"],
    tags: [],
    links: [
      { kind: "live", label: "Live site", href: "https://steelwatch.org/" },
    ],
    media: [
      {
        kind: "image",
        src: "/images/projects/steelwatch/cover.jpg",
        alt: "SteelWatch homepage with a featured article on steel decarbonisation in 2025",
      },
      {
        kind: "image",
        src: "/images/projects/steelwatch/japanese-home.jpg",
        alt: "Japanese version of the SteelWatch homepage with a red steel sculpture hero",
      },
      {
        kind: "image",
        src: "/images/projects/steelwatch/02.jpg",
        alt: "Japanese reports archive with report covers and tags",
      },
      {
        kind: "image",
        src: "/images/projects/steelwatch/03.jpg",
        alt: "Press release page with article, notes and related publications",
      },
    ],
    featured: true,
  },
  {
    id: "gasoutlook",
    era: "professional",
    discipline: "design",
    title: "Gas Outlook",
    role: "led",
    year: "2025",
    summary:
      "An independent editorial platform covering global gas markets. I supervised the UI designer and developer during the original build, and later designed a language switcher, interactive UI elements and graphics.",
    stack: ["WordPress", "PHP", "Custom theme", "JavaScript"],
    tags: [],
    links: [
      { kind: "live", label: "Live site", href: "https://gasoutlook.com/" },
    ],
    media: [
      {
        kind: "image",
        src: "/images/projects/gasoutlook/cover.jpg",
        alt: "Gas Outlook long read with the EN and ES language switcher and an aerial photo of an LNG terminal",
      },
      {
        kind: "image",
        src: "/images/projects/gasoutlook/01.jpg",
        alt: "Long read on Mexico LNG with a photo of a whale in the sea",
      },
      {
        kind: "image",
        src: "/images/projects/gasoutlook/02.jpg",
        alt: "Mobile view of a marine species infographic in a Gas Outlook article",
      },
    ],
    featured: true,
  },
  {
    id: "core",
    era: "professional",
    discipline: "frontend",
    title: "CORE (Climate Opinion Research Exchange)",
    role: "built",
    year: "2025",
    summary:
      "An interactive platform sharing opinion research on climate change and the energy transition. I designed and coded the first prototype, then built the current WordPress theme from a UX/UI designer’s design.",
    stack: ["WordPress", "PHP", "Custom theme", "JavaScript"],
    tags: [],
    links: [
      { kind: "live", label: "Live site", href: "https://climateopinion.org/" },
    ],
    media: [
      {
        kind: "image",
        src: "/images/projects/core/cover.jpg",
        alt: "CORE homepage with intro text and the latest publications",
      },
      {
        kind: "image",
        src: "/images/projects/core/01.jpg",
        alt: "About CORE page with the research team and FAQs",
      },
      {
        kind: "image",
        src: "/images/projects/core/02.jpg",
        alt: "Data Explorer with country filters, a bar chart and a data table",
      },
      {
        kind: "image",
        src: "/images/projects/core/03.jpg",
        alt: "CORE homepage with tracking-study and investor-survey publications",
      },
    ],
    featured: true,
  },
  {
    id: "apple-3d-showcase",
    era: "engineering",
    discipline: "motion",
    title: "Apple 3D Showcase",
    role: "built",
    year: TO_BE_PROVIDED,
    summary: TO_BE_PROVIDED,
    stack: [TO_BE_PROVIDED],
    tags: ["3d", "motion"],
    links: [],
    media: [],
    featured: true,
  },
  {
    id: "gsap-cocktail-website",
    era: "engineering",
    discipline: "motion",
    title: "GSAP Cocktail Website",
    role: "built",
    year: TO_BE_PROVIDED,
    summary: TO_BE_PROVIDED,
    stack: [TO_BE_PROVIDED],
    tags: ["motion"],
    links: [],
    media: [],
    featured: true,
  },
  {
    id: "orryana",
    era: "engineering",
    discipline: "motion",
    title: "Orryana",
    role: "designed-and-built",
    year: "2026",
    summary: TO_BE_PROVIDED,
    stack: [TO_BE_PROVIDED],
    tags: [],
    links: [],
    media: [],
    featured: true,
  },
  {
    id: "interactive-calculator",
    era: "engineering",
    discipline: "frontend",
    title: "Interactive Calculator",
    role: "designed-and-built",
    year: TO_BE_PROVIDED,
    summary:
      "Engineered a custom interactive financial calculator enabling users to simulate real-time compound interest, investment returns, and personalized financial planning.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    tags: ["tool"],
    links: [],
    media: [],
    featured: true,
  },
  {
    id: "plant-pal",
    era: "engineering",
    discipline: "frontend",
    title: "Plant-Pal",
    role: "designed-and-built",
    year: TO_BE_PROVIDED,
    summary:
      "Developed a full-featured plant tracking web application featuring custom SVG status indicators, multi-tier filtering controls, and responsive UI components.",
    stack: ["React", "Next.js", "TypeScript", "REST API", "Tailwind CSS"],
    tags: ["tool"],
    links: [],
    media: [],
    featured: true,
  },
] as const satisfies readonly Project[];
