import type { AccentColor, ProjectDiscipline } from "./projects";

type CalendarMonth =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12";

export type YearMonth = `${number}-${CalendarMonth}`;
export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type CefrRange = CefrLevel | `${CefrLevel}/${CefrLevel}`;
export type LanguageProficiency = "native" | "business fluent" | "intermediate";
export type TimelineEntryKind = "work" | "training";
export type TimelineMilestoneKind = "certification" | "project";
export type TimelineKind = TimelineEntryKind | TimelineMilestoneKind;
export type ProfileLinkKind = "linkedin" | "github";
export type PublicationKind = "master-thesis";

export interface ProfileLink {
  readonly kind: ProfileLinkKind;
  readonly handle: string;
  readonly href: string;
}

export interface ProfileWebsite {
  readonly label: string;
  readonly href: string;
}

export interface Profile {
  readonly name: string;
  readonly title: string;
  readonly about: string;
  readonly location: string;
  readonly website: ProfileWebsite;
  readonly links: readonly ProfileLink[];
}

export interface TimelineEntry {
  readonly id: string;
  readonly kind: TimelineEntryKind;
  readonly title: string;
  readonly organisation: string;
  readonly location: string;
  readonly start: YearMonth;
  readonly end: YearMonth | "present";
  readonly highlights: readonly string[];
}

export interface TimelineMilestoneLink {
  readonly href: string;
  readonly external: boolean;
}

export interface TimelineMilestone {
  readonly id: string;
  readonly kind: TimelineMilestoneKind;
  readonly title: string;
  readonly subtitle: string;
  readonly start: YearMonth;
  readonly end?: YearMonth | "present";
  readonly link?: TimelineMilestoneLink;
}

export type TimelineItem = TimelineEntry | TimelineMilestone;

export interface EducationAward {
  readonly name: string;
  readonly year: number;
}

export interface EducationEntry {
  readonly id: string;
  readonly degree: string;
  readonly institution: string;
  readonly startYear: number;
  readonly endYear: number;
  readonly award?: EducationAward;
}

export interface FreelanceEntry {
  readonly id: string;
  readonly client: string;
  readonly role: string;
  readonly start: YearMonth;
  readonly end: YearMonth;
  readonly summary: string;
}

export interface EarlyWorkEntry {
  readonly id: string;
  readonly client: string;
  readonly role: string;
  readonly year: number;
  readonly summary: string;
}

export interface Publication {
  readonly id: string;
  readonly title: string;
  readonly kind: PublicationKind;
  readonly year: number;
  readonly href: string;
}

export interface Language {
  readonly name: string;
  readonly proficiency: LanguageProficiency;
  readonly cefr: CefrRange;
}

export interface SkillGroup {
  readonly id: string;
  readonly title: string;
  readonly discipline: ProjectDiscipline | null;
  readonly skills: readonly string[];
}

export const profileLinkLabels = {
  linkedin: "LinkedIn",
  github: "GitHub",
} as const satisfies Record<ProfileLinkKind, string>;

export const profile = {
  name: "Greg Telakis",
  title: "Creative UI Engineer | Motion & 3D Web Specialist",
  about:
    "Senior Visual Creator turned Creative UI Engineer with 10+ years of experience bridging high-end UI/UX design, interactive motion, and modern frontend architecture. Specialized in building performant 3D web experiences, dynamic design systems, and motion-rich web applications using React, Next.js, TypeScript, Three.js, and GSAP.",
  location: "Berlin",
  website: {
    label: "gtelakis.com",
    href: "https://gtelakis.com",
  },
  links: [
    {
      kind: "linkedin",
      handle: "gregtel",
      href: "https://www.linkedin.com/in/gregtel",
    },
    {
      kind: "github",
      handle: "greg-motion-dev",
      href: "https://github.com/greg-motion-dev",
    },
  ],
} as const satisfies Profile;

export const timeline = [
  {
    id: "spiced-academy",
    kind: "training",
    title: "Modern Frontend Development Bootcamp",
    organisation: "SPICED Academy",
    location: "Berlin (DE) · Remote",
    start: "2026-06",
    end: "2026-09",
    highlights: [
      "16-week full-time remote program: 720 hours (960 lessons) of programming practice covering JavaScript, React, Next.js, Node.js, REST APIs and unit testing.",
      "Built projects in pair programming and agile teams, including AI-assisted development with Claude Code.",
      "Deepened GSAP and Motion alongside the program through dedicated courses and projects.",
    ],
  },
  {
    id: "sanity-certified-content-operator",
    kind: "certification",
    title: "Sanity Certified Content Operator",
    subtitle: "Sanity",
    start: "2026-05",
    link: {
      href: "https://www.sanity.io/learn/certification/sanity-certified-content-operator/share/g2bqtK6YZ",
      external: true,
    },
  },
  {
    id: "orryana",
    kind: "project",
    title: "Orryana",
    subtitle: "Financial platform",
    start: "2026-03",
    end: "present",
    link: {
      href: "#work-orryana",
      external: false,
    },
  },
  {
    id: "meliore-foundation",
    kind: "work",
    title: "Team Lead Media Design & Web Development",
    organisation: "Meliore Foundation",
    location: "Berlin (DE) · Remote",
    start: "2023-06",
    end: "2025-12",
    highlights: [
      "Spearheaded UI/UX strategy, design system architecture, and high-fidelity prototyping using Figma and Adobe XD for complex digital initiatives.",
      "Developed WordPress themes from scratch, translating designs into functional websites for European Climate Foundation and Meliore Foundation.",
      "Implemented responsive, pixel-perfect web interfaces using semantic HTML5, modern CSS, and component-driven structures to ensure cross-browser compatibility.",
      "Led cross-functional workflows between visual designers and engineering teams, establishing design system guidelines and component handoff protocols.",
    ],
  },
  {
    id: "european-climate-foundation",
    kind: "work",
    title: "Team Lead Media Design & Web Development",
    organisation: "European Climate Foundation",
    location: "Berlin (DE) · Remote",
    start: "2020-01",
    end: "2023-06",
    highlights: [
      "Directed end-to-end digital identity, web layouts, and interactive motion assets using Adobe Creative Suite (Photoshop, Illustrator, After Effects) and web technologies.",
      "Developed WordPress themes from scratch, translating designs into functional websites.",
      "Managed complex digital campaigns and web properties, maintaining rigid brand consistency and design-to-development production pipelines.",
      "Collaborated closely with technical stakeholders to translate brand requirements into functional visual systems.",
    ],
  },
  {
    id: "skyscanner",
    kind: "work",
    title: "Web & Content Lead, WordPress Blogs",
    organisation: "Skyscanner / Capital GES",
    location: "Berlin (DE) · Remote",
    start: "2016-07",
    end: "2020-01",
    highlights: [
      "Managed the WordPress blogs for Germany, Austria, Switzerland, Greece, and Cyprus, defining layout and user-facing functionality, building new components, and fixing bugs.",
      "Oversaw visual direction and content strategy across articles, videos, and images, creating part of the visual assets personally.",
      "Applied SQL-driven data analysis to uncover traveler trends, translating insights into targeted visual communication and UI component tests.",
      "Managed an international team of 10+ freelancers across global market expansion initiatives.",
    ],
  },
  {
    id: "bigpoint",
    kind: "work",
    title: "Associate Community Manager / Digital Media Creative",
    organisation: "Bigpoint GmbH",
    location: "Berlin (DE)",
    start: "2013-04",
    end: "2016-07",
    highlights: [
      "Created video and media assets for marketing campaigns.",
      "Designed UX/UI prototypes for in-game interfaces.",
      "Created guidelines, walkthroughs, infographics, and podcasts for the player community.",
      "Coordinated a team of 150 external volunteers across 22 language teams.",
    ],
  },
] as const satisfies readonly TimelineItem[];

export const education = [
  {
    id: "university-of-edinburgh",
    degree: "MSc Design & Digital Media",
    institution: "University of Edinburgh (UK)",
    startYear: 2011,
    endYear: 2012,
    award: {
      name: "Andrew Grant Bequest Award for Excellence",
      year: 2012,
    },
  },
  {
    id: "edinburgh-napier-university",
    degree: "BA (Honours) Design & Digital Media",
    institution: "Edinburgh Napier University (UK)",
    startYear: 2009,
    endYear: 2011,
  },
  {
    id: "hanze-university-groningen",
    degree: "BA International Communication & Digital Media",
    institution: "Hanze University Groningen (NL)",
    startYear: 2007,
    endYear: 2009,
  },
] as const satisfies readonly EducationEntry[];

export const freelance = [
  {
    id: "adobe",
    client: "Adobe",
    role: "German Language UI Tester",
    start: "2022-02",
    end: "2025-02",
    summary:
      "Tested new UI and its functionality for German-speaking users, mostly in Adobe Express and its features.",
  },
  {
    id: "canva",
    client: "Canva",
    role: "Content Writer (Design)",
    start: "2019-12",
    end: "2022-07",
    summary:
      "Crafted educational content (in German) on design principles, color theory, and typography for Canva's digital media platform.",
  },
] as const satisfies readonly FreelanceEntry[];

export const earlyWork = [
  {
    id: "edinburgh-international-film-festival",
    client: "Edinburgh International Film Festival",
    role: "Project Coordinator / Visual Artist / Projection Mapping",
    year: 2012,
    summary:
      "Designed visual special effects in projection mapping format for the re-screening of Hellboy (2004), with 3D and 2D environments enhancing the audience's movie experience.",
  },
  {
    id: "city-of-edinburgh-council",
    client: "City of Edinburgh Council",
    role: "Project Coordinator / Designer - Projection Mapping",
    year: 2012,
    summary:
      "Planned and designed an audiovisual projection mapping event at the Robert Burns Monument ahead of the Edinburgh Fringe Festival, with 3D animated landscapes.",
  },
  {
    id: "edinburgh-anatomical-museum",
    client: "Edinburgh Anatomical Museum",
    role: "Project Coordinator / Visual Artist - Projection Mapping",
    year: 2012,
    summary:
      "Planned and organized an audiovisual installation event with projection mapping elements.",
  },
] as const satisfies readonly EarlyWorkEntry[];

export const publications = [
  {
    id: "the-rise-of-projection-mapping",
    title: "The Rise of Projection Mapping",
    kind: "master-thesis",
    year: 2012,
    href: "https://drive.google.com/file/d/0B-xQlVkklvCwZ2JQS1QzT3lzcTA/view?usp=sharing&resourcekey=0-TU_98FWqdkHiVyyNlUoxlw",
  },
] as const satisfies readonly Publication[];

export const languageProficiencyAccent = {
  native: "yellow",
  "business fluent": "teal",
  intermediate: "pink",
} as const satisfies Record<LanguageProficiency, AccentColor>;

export const languages = [
  { name: "German", proficiency: "native", cefr: "C2" },
  { name: "Greek", proficiency: "native", cefr: "C2" },
  { name: "English", proficiency: "business fluent", cefr: "C1/C2" },
  { name: "Dutch", proficiency: "business fluent", cefr: "C1/C2" },
  { name: "Spanish", proficiency: "intermediate", cefr: "B1" },
  { name: "Portuguese", proficiency: "intermediate", cefr: "B1" },
] as const satisfies readonly Language[];

export const skillGroups = [
  {
    id: "frontend",
    title: "Front-end",
    discipline: "frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "Tailwind CSS v4",
      "Vite",
    ],
  },
  {
    id: "ux-ui-brand",
    title: "UX/UI & Brand",
    discipline: "design",
    skills: [
      "Figma",
      "Design Systems",
      "UI/UX Strategy",
      "Prototyping",
      "Adobe XD",
      "Photoshop",
      "Illustrator",
    ],
  },
  {
    id: "motion-3d",
    title: "Motion & 3D",
    discipline: "motion",
    skills: [
      "Three.js",
      "React Three Fiber (R3F)",
      "WebGL",
      "GSAP (ScrollTrigger)",
      "Motion (formerly Framer Motion)",
      "After Effects",
      "Lottie",
      "Blender (3D Modeling)",
    ],
  },
  {
    id: "cms-tooling",
    title: "CMS & Tooling",
    discipline: null,
    skills: [
      "Sanity",
      "WordPress",
      "Contentful",
      "Git",
      "GitHub",
      "Vercel",
      "Netlify",
      "VS Code",
      "Cursor",
      "Claude Code",
      "Chrome DevTools",
      "SQL",
      "Cloudflare",
      "Cloudways",
      "GoDaddy",
      "Jira",
      "Monday.com",
      "Miro",
      "Slack",
    ],
  },
] as const satisfies readonly SkillGroup[];

export type SkillName = (typeof skillGroups)[number]["skills"][number];

export interface TechStackContent {
  readonly title: string;
}

export const techStackContent = {
  title: "Tech Stack",
} as const satisfies TechStackContent;

export interface ExperienceContent {
  readonly title: string;
  readonly presentLabel: string;
  readonly educationTitle: string;
  readonly languagesTitle: string;
  readonly alsoTitle: string;
  readonly freelanceLabel: string;
  readonly earlyWorkLabel: string;
}

export const experienceContent = {
  title: "Experience",
  presentLabel: "Present",
  educationTitle: "Education",
  languagesTitle: "Languages",
  alsoTitle: "Also",
  freelanceLabel: "Freelance",
  earlyWorkLabel: "Projection mapping",
} as const satisfies ExperienceContent;

export const timelineKindLabels = {
  work: "Work",
  training: "Training",
  certification: "Certification",
  project: "Project",
} as const satisfies Record<TimelineKind, string>;

export const publicationKindLabels = {
  "master-thesis": "Master thesis",
} as const satisfies Record<PublicationKind, string>;
