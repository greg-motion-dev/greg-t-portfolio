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
    year: TO_BE_PROVIDED,
    summary: TO_BE_PROVIDED,
    stack: [TO_BE_PROVIDED],
    tags: [],
    links: [],
    media: [],
    featured: true,
  },
  {
    id: "zero-carbon-analytics-rebrand",
    era: "professional",
    discipline: "frontend",
    title: "Zero Carbon Analytics (2025 Rebrand)",
    role: "led",
    year: "2025",
    summary: TO_BE_PROVIDED,
    stack: [TO_BE_PROVIDED],
    tags: [],
    links: [],
    media: [],
    featured: true,
  },
  {
    id: "steelwatch",
    era: "professional",
    discipline: "design",
    title: "SteelWatch",
    role: "designed",
    year: TO_BE_PROVIDED,
    summary: TO_BE_PROVIDED,
    stack: [TO_BE_PROVIDED],
    tags: [],
    links: [],
    media: [],
    featured: true,
  },
  {
    id: "gasoutlook",
    era: "professional",
    discipline: "design",
    title: "GasOutlook",
    role: "led",
    year: TO_BE_PROVIDED,
    summary: TO_BE_PROVIDED,
    stack: [TO_BE_PROVIDED],
    tags: [],
    links: [],
    media: [],
    featured: true,
  },
  {
    id: "core",
    era: "professional",
    discipline: "frontend",
    title: "CORE (Climate Opinion Research Exchange)",
    role: "built",
    year: TO_BE_PROVIDED,
    summary: TO_BE_PROVIDED,
    stack: [TO_BE_PROVIDED],
    tags: [],
    links: [],
    media: [],
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
    year: TO_BE_PROVIDED,
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
