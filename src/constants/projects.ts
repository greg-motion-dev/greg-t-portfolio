export type ProjectEra = "professional" | "installation" | "engineering";
export type ProjectDiscipline = "frontend" | "design" | "motion";
export type ProjectRole =
  | "built"
  | "designed-and-built"
  | "designed"
  | "led"
  | "edited-and-animated"
  | "designed-and-animated";
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
export type ProjectLinkKind = "live" | "repo" | "film" | "case-study";

export interface ProjectLink {
  readonly kind: ProjectLinkKind;
  readonly label: string;
  readonly href: string;
}

export interface ProjectImageMedia {
  readonly kind: "image";
  readonly src: string;
  readonly alt: string;
}

export interface ProjectVideoMedia {
  readonly kind: "video";
  readonly src: string;
  readonly poster: string;
  readonly alt: string;
}

export type ProjectMedia = ProjectImageMedia | ProjectVideoMedia;

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
  professional: "Research & Policy",
  installation: "3D & Projection",
  engineering: "SPICED & Interactive",
} as const satisfies Record<ProjectEra, string>;

export const roleLabels = {
  built: "Built",
  "designed-and-built": "Designed & built",
  designed: "Designed",
  led: "Led",
  "edited-and-animated": "Edited & animated",
  "designed-and-animated": "Designed & animated",
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
      "Zero Carbon Analytics began as a European Climate Foundation spin-off publishing climate research. I created its brand and UI from scratch and built the custom WordPress theme behind its briefings and explainers.",
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
      "Four years after launch, Zero Carbon Analytics got a full redesign. As co-creator of the original, I led the project, coordinating the design and development agencies and supporting the technical implementation.",
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
      "Brand and UI for an independent organisation analysing the steel industry’s path to decarbonisation, published in English, Japanese and Korean. I designed both and led the external developer who built the site.",
    stack: ["WordPress", "PHP", "Custom theme", "JavaScript"],
    tags: [],
    links: [
      { kind: "live", label: "Live site", href: "https://steelwatch.org/" },
    ],
    media: [
      {
        kind: "image",
        src: "/images/projects/steelwatch/cover-en.jpg",
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
      "Long-form journalism on global gas markets. I supervised the UI designer and developer on the original build, then designed its language switcher, interactive UI elements and editorial graphics.",
    stack: ["WordPress", "PHP", "Custom theme", "JavaScript"],
    tags: [],
    links: [
      { kind: "live", label: "Live site", href: "https://gasoutlook.com/" },
    ],
    media: [
      {
        kind: "image",
        src: "/images/projects/gasoutlook/cover-map.jpg",
        alt: "Gas Outlook map of shipping traffic in the Gulf of California’s Blue Corridor",
      },
      {
        kind: "image",
        src: "/images/projects/gasoutlook/long-read.jpg",
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
      "Public-opinion research on climate and energy, made explorable. I designed and coded a fast first prototype, then built the current WordPress theme from a UX/UI designer’s design.",
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
    id: "hydrogen-science-coalition",
    era: "professional",
    discipline: "design",
    title: "Hydrogen Science Coalition",
    role: "designed",
    year: "2025",
    summary:
      "A database of hydrogen projects worldwide, cancelled ones included, showing hydrogen’s real role in the energy transition. I designed the UI for the whole tracker system, from search and filters to data tables.",
    stack: ["WordPress", "PHP", "Custom theme", "JavaScript"],
    tags: [],
    links: [
      {
        kind: "live",
        label: "Live site",
        href: "https://h2sciencecoalition.com/trackers/",
      },
    ],
    media: [
      {
        kind: "image",
        src: "/images/projects/hydrogen-science-coalition/cover.jpg",
        alt: "Hydrogen production tracker with search, filter chips and a sortable project table",
      },
      {
        kind: "image",
        src: "/images/projects/hydrogen-science-coalition/01.jpg",
        alt: "Tracker tabs for production projects and end uses with key findings on cancelled plans",
      },
      {
        kind: "image",
        src: "/images/projects/hydrogen-science-coalition/02.jpg",
        alt: "Desktop design for the Hydrogen Science Coalition homepage with a wind turbine hero",
      },
      {
        kind: "image",
        src: "/images/projects/hydrogen-science-coalition/03.jpg",
        alt: "Mobile design for the Hydrogen Science Coalition homepage",
      },
    ],
    featured: true,
  },
  {
    id: "action-fc",
    era: "professional",
    discipline: "frontend",
    title: "Action FC",
    role: "designed-and-built",
    year: "2024",
    summary:
      "A campaign rallying women’s football fans against greenwashing in their sport. I designed and coded the site, using Lottie and other animations to tell the story.",
    stack: ["WordPress", "PHP", "Custom theme", "JavaScript", "Lottie"],
    tags: [],
    links: [
      {
        kind: "live",
        label: "Archived site",
        href: "https://web.archive.org/web/20250321125955/https://actionfc.org/",
      },
    ],
    media: [
      {
        kind: "image",
        src: "/images/projects/action-fc/cover-problem.jpg",
        alt: "The Problem section of Action FC with an illustration of a woman holding a football",
      },
      {
        kind: "image",
        src: "/images/projects/action-fc/campaigns.jpg",
        alt: "Action FC campaigns page with three campaign cards on a navy background",
      },
      {
        kind: "image",
        src: "/images/projects/action-fc/01.jpg",
        alt: "Action FC hero with the headline Women’s football fans can change the game",
      },
    ],
    featured: true,
  },
  {
    id: "lancet-countdown",
    era: "professional",
    discipline: "motion",
    title: "Lancet Countdown",
    role: "edited-and-animated",
    year: "2021",
    summary:
      "A mini-series giving healthcare workers on the front line of extreme heat a space to share how it affects their patients and their jobs. I edited it, designed the sound and created the motion graphics.",
    stack: ["After Effects", "Premiere Pro", "Audacity"],
    tags: ["motion"],
    links: [
      {
        kind: "film",
        label: "Watch film",
        href: "https://vimeo.com/1248979550",
      },
    ],
    media: [
      {
        kind: "video",
        src: "/videos/projects/lancet-countdown/loop.mp4",
        poster: "/images/projects/lancet-countdown/poster.jpg",
        alt: "Patient on oxygen in a hospital bed with the subtitle Climate change is a health crisis",
      },
    ],
    featured: true,
  },
  {
    id: "can-big-tech-stop-flying",
    era: "professional",
    discipline: "motion",
    title: "Can Big Tech Stop Flying So Much?",
    role: "designed-and-animated",
    year: "2023",
    summary:
      "Why fly when you can log on? An animated call on big tech to cut unnecessary business flights. I created it from concept to final cut: script, direction, design, edit, motion graphics, voice casting and sound.",
    stack: [
      "After Effects",
      "Premiere Pro",
      "Illustrator",
      "Photoshop",
      "Audacity",
    ],
    tags: ["motion"],
    links: [
      {
        kind: "film",
        label: "Watch film",
        href: "https://vimeo.com/1248978903",
      },
    ],
    media: [
      {
        kind: "video",
        src: "/videos/projects/can-big-tech-stop-flying/loop.mp4",
        poster: "/images/projects/can-big-tech-stop-flying/poster.jpg",
        alt: "Animated title card asking Can Big Tech stop flying so much, with a plane crossing a map",
      },
    ],
    featured: true,
  },
  {
    id: "atmosphere-hellboy",
    era: "installation",
    discipline: "motion",
    title: "Atmosphere:Hellboy",
    role: "designed-and-built",
    year: "2012",
    summary:
      "Projection mapping for the Edinburgh International Film Festival’s Hellboy screenings: 21 effects and digital landscapes that changed with the film across 65 scenes. I created the 3D in Blender; Ami Bogin led the 2D.",
    stack: [
      "Blender",
      "MadMapper",
      "After Effects",
      "Illustrator",
      "Photoshop",
    ],
    tags: ["3d", "motion"],
    links: [
      { kind: "film", label: "Watch film", href: "https://vimeo.com/55405563" },
    ],
    media: [
      {
        kind: "video",
        src: "/videos/projects/atmosphere-hellboy/loop.mp4",
        poster: "/images/projects/atmosphere-hellboy/poster.jpg",
        alt: "Cyan fire effect projected across the cinema walls during a Hellboy screening, with a digital preview inset",
      },
    ],
    featured: true,
  },
  {
    id: "project-lifehouse",
    era: "installation",
    discipline: "motion",
    title: "Project:Lifehouse",
    role: "designed-and-built",
    year: "2012",
    summary:
      "Projection mapping at Edinburgh’s Anatomical Museum: anatomy projected onto statues, walls and skeletons, with Kinect zones triggering randomised clips and sound as visitors moved through. With Ami Bogin and Ana Roman, I created the 3D in Blender.",
    stack: [
      "Blender",
      "MadMapper",
      "After Effects",
      "Illustrator",
      "Ableton",
      "Kinect",
    ],
    tags: ["3d", "motion"],
    links: [
      { kind: "film", label: "Watch film", href: "https://vimeo.com/55392607" },
    ],
    media: [
      {
        kind: "video",
        src: "/videos/projects/project-lifehouse/loop.mp4",
        poster: "/images/projects/project-lifehouse/poster.jpg",
        alt: "Glowing blue veins projected onto a Venus de Milo statue in the dark",
      },
    ],
    featured: true,
  },
  {
    id: "inspiration-burns",
    era: "installation",
    discipline: "motion",
    title: "Inspiration:Burns",
    role: "designed-and-built",
    year: "2012",
    summary:
      "Projection mapping at Edinburgh’s Burns Monument: I rebuilt the interior in Blender as “virtual furniture” and animated a 3D tome on its marble lectern, the starting point of every sequence. Created with Ami Bogin and Ana Roman.",
    stack: ["Blender", "MadMapper", "After Effects", "Illustrator", "Ableton"],
    tags: ["3d", "motion"],
    links: [
      { kind: "film", label: "Watch film", href: "https://vimeo.com/56250302" },
    ],
    media: [
      {
        kind: "video",
        src: "/videos/projects/inspiration-burns/loop.mp4",
        poster: "/images/projects/inspiration-burns/poster.jpg",
        alt: "3D animation of a tome unfolding on the marble lectern inside a stone arch",
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
    year: "2026",
    summary:
      "An Apple-style MacBook Pro page where an interactive 3D model shows off its features and finishes. Built to explore GSAP, Three.js and React Three Fiber.",
    stack: [
      "Next.js",
      "TypeScript",
      "React Three Fiber",
      "GSAP",
      "Tailwind CSS",
    ],
    tags: ["3d", "motion"],
    links: [
      {
        kind: "live",
        label: "Live site",
        href: "https://apple-3d-showcase-website.vercel.app/",
      },
      {
        kind: "repo",
        label: "GitHub",
        href: "https://github.com/greg-motion-dev/apple-3d-showcase-website",
      },
    ],
    media: [
      {
        kind: "image",
        src: "/images/projects/apple-3d-showcase/cover.jpg",
        alt: "MacBook Pro hero with a glowing laptop and the headline Built for Apple Intelligence",
      },
      {
        kind: "image",
        src: "/images/projects/apple-3d-showcase/01.jpg",
        alt: "Take a closer look section with a 3D MacBook model and colour and size toggles",
      },
      {
        kind: "image",
        src: "/images/projects/apple-3d-showcase/02.jpg",
        alt: "3D MacBook model shown at an angle next to feature copy",
      },
    ],
    featured: true,
  },
  {
    id: "gsap-cocktail-website",
    era: "engineering",
    discipline: "motion",
    title: "Cosmo Cocktails",
    role: "built",
    year: "2026",
    summary:
      "A cocktail menu told as a story, with polished imagery, immersive layouts and animated transitions. I built it with GSAP driving the motion.",
    stack: ["Next.js", "TypeScript", "GSAP", "Tailwind CSS"],
    tags: ["motion"],
    links: [
      {
        kind: "live",
        label: "Live site",
        href: "https://cocktail-website-zeta.vercel.app/",
      },
      {
        kind: "repo",
        label: "GitHub",
        href: "https://github.com/greg-motion-dev/cocktail-website",
      },
    ],
    media: [
      {
        kind: "image",
        src: "/images/projects/gsap-cocktail-website/cover.jpg",
        alt: "Cocktail hero with a splashing green drink and two drinks menus",
      },
      {
        kind: "image",
        src: "/images/projects/gsap-cocktail-website/01.jpg",
        alt: "About section with a photo collage of bartenders and cocktails",
      },
      {
        kind: "image",
        src: "/images/projects/gsap-cocktail-website/02.jpg",
        alt: "Cocktail slider featuring a Raspberry Mojito recipe",
      },
    ],
    featured: true,
  },
  {
    id: "orryana",
    era: "engineering",
    discipline: "motion",
    title: "Orryana",
    role: "designed-and-built",
    year: "2026",
    summary:
      "Orryana, a finance creator with 30k+ followers, is moving from WordPress to a headless React platform. I’m designing and building it, from finance guides to calculators; launch is in progress.",
    stack: ["Next.js", "TypeScript", "GSAP", "Tailwind CSS"],
    tags: [],
    links: [
      {
        kind: "repo",
        label: "GitHub",
        href: "https://github.com/greg-motion-dev/orry-consulting",
      },
    ],
    media: [
      {
        kind: "image",
        src: "/images/projects/orryana/cover.jpg",
        alt: "Orryana homepage hero with a portrait and calculator shortcuts",
      },
      {
        kind: "image",
        src: "/images/projects/orryana/01.jpg",
        alt: "Article page explaining a savings challenge",
      },
      {
        kind: "image",
        src: "/images/projects/orryana/02.jpg",
        alt: "Finance guides overview with topic filters and article cards",
      },
    ],
    featured: true,
  },
  {
    id: "interactive-calculator",
    era: "engineering",
    discipline: "frontend",
    title: "Interest-ing",
    role: "designed-and-built",
    year: "2026",
    summary:
      "Compound interest you can play with: sliders, real-time charts and saved scenarios to compare. I designed and built Interest-ing to make savings goals and long-term growth tangible.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    tags: ["tool"],
    links: [
      {
        kind: "live",
        label: "Live site",
        href: "https://interest-ing-nine.vercel.app/",
      },
      {
        kind: "repo",
        label: "GitHub",
        href: "https://github.com/greg-motion-dev/interest-ing",
      },
    ],
    media: [
      {
        kind: "image",
        src: "/images/projects/interactive-calculator/cover.jpg",
        alt: "Compound interest calculator with sliders, result cards and a growth chart comparing two scenarios",
      },
      {
        kind: "image",
        src: "/images/projects/interactive-calculator/01.jpg",
        alt: "Calculator with a saved 5-Year Wealth Builder scenario and growth chart",
      },
      {
        kind: "image",
        src: "/images/projects/interactive-calculator/02.jpg",
        alt: "Mobile view of the savings goal calculator",
      },
    ],
    featured: true,
  },
  {
    id: "plant-pal",
    era: "engineering",
    discipline: "frontend",
    title: "Plant-Pal",
    role: "designed-and-built",
    year: "2026",
    summary:
      "Built as a team, Plant-Pal helps people track their plant collection with custom SVG status indicators, light and water filters and responsive components. I co-designed and co-developed the app.",
    stack: ["Next.js", "TypeScript", "Express", "MongoDB", "Groq AI"],
    tags: ["tool"],
    links: [
      {
        kind: "live",
        label: "Live site",
        href: "https://plant-pal-app.vercel.app/",
      },
      {
        kind: "repo",
        label: "GitHub",
        href: "https://github.com/Koodali-Sushma/Plant-pal-app",
      },
    ],
    media: [
      {
        kind: "image",
        src: "/images/projects/plant-pal/cover.jpg",
        alt: "Explore all plants grid with search and plant cards on a dark green background",
      },
      {
        kind: "image",
        src: "/images/projects/plant-pal/01.jpg",
        alt: "Plant detail card for the Bird of Paradise",
      },
      {
        kind: "image",
        src: "/images/projects/plant-pal/02.jpg",
        alt: "Edit a plant form with image upload",
      },
    ],
    featured: true,
  },
] as const satisfies readonly Project[];
