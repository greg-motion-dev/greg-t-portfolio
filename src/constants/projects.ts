export type ProjectEra =
  "professional" | "product" | "installation" | "engineering";
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

export type ProjectFrame = "browser" | "phone" | "none";

export interface ProjectMediaLink {
  readonly label: string;
  readonly href: string;
}

export interface ProjectImageMedia {
  readonly kind: "image";
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly frame: ProjectFrame;
  readonly link?: ProjectMediaLink;
}

export interface ProjectPageMedia {
  readonly kind: "page";
  readonly src: string;
  readonly preview: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface ProjectVideoMedia {
  readonly kind: "video";
  readonly src: string;
  readonly poster: string;
  readonly alt: string;
}

export type ProjectGalleryMedia = ProjectImageMedia | ProjectPageMedia;

export type ProjectMedia =
  ProjectImageMedia | ProjectPageMedia | ProjectVideoMedia;

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
  readonly note?: string;
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
  readonly githubAlsoLabel: string;
  readonly galleryImagesLabel: string;
  readonly galleryOpenLabel: string;
  readonly galleryCloseLabel: string;
  readonly galleryPreviousLabel: string;
  readonly galleryNextLabel: string;
  readonly galleryScrollHint: string;
}

export const lineupContent = {
  title: "Selected work",
  linkPendingLabel: "Link soon",
  githubCtaLabel: "More on GitHub",
  githubAlsoLabel: "Also on GitHub",
  galleryImagesLabel: "images",
  galleryOpenLabel: "Open gallery",
  galleryCloseLabel: "Close gallery",
  galleryPreviousLabel: "Previous image",
  galleryNextLabel: "Next image",
  galleryScrollHint: "Scroll to explore the full page",
} as const satisfies LineupContent;

export const eraLabels = {
  professional: "Research & Policy",
  product: "Product & Brand",
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
        width: 2400,
        height: 1500,
        frame: "browser",
      },
      {
        kind: "page",
        src: "/images/projects/zero-carbon-analytics-original/page-02.jpg",
        preview:
          "/images/projects/zero-carbon-analytics-original/preview-page-02.jpg",
        alt: "Full 2024 homepage with a forest hero on climate finance, latest content and topic tiles",
        width: 1200,
        height: 3216,
      },
      {
        kind: "page",
        src: "/images/projects/zero-carbon-analytics-original/page-01.jpg",
        preview:
          "/images/projects/zero-carbon-analytics-original/preview-page-01.jpg",
        alt: "Full Climate Science & Impact topic page with briefing cards",
        width: 1200,
        height: 1738,
      },
      {
        kind: "page",
        src: "/images/projects/zero-carbon-analytics-original/page-03.jpg",
        preview:
          "/images/projects/zero-carbon-analytics-original/preview-page-03.jpg",
        alt: "Full Food, Nature & Land topic page with briefing cards",
        width: 1200,
        height: 1774,
      },
      {
        kind: "image",
        src: "/images/projects/zero-carbon-analytics-original/mobile-04.jpg",
        alt: "Mobile view of the Climate Change Glossary with its A–Z letter grid",
        width: 623,
        height: 1351,
        frame: "phone",
      },
      {
        kind: "page",
        src: "/images/projects/zero-carbon-analytics-original/page-05.jpg",
        preview:
          "/images/projects/zero-carbon-analytics-original/preview-page-05.jpg",
        alt: "Full El Niño briefing with a wildfire photo, key points and long-form text",
        width: 1200,
        height: 8485,
      },
      {
        kind: "page",
        src: "/images/projects/zero-carbon-analytics-original/page-06.jpg",
        preview:
          "/images/projects/zero-carbon-analytics-original/preview-page-06.jpg",
        alt: "Full Economics & Finance topic page with briefing cards",
        width: 1200,
        height: 1823,
      },
      {
        kind: "image",
        src: "/images/projects/zero-carbon-analytics-original/scrneen.jpg",
        alt: "Briefing page for the IPCC Sixth Assessment Report",
        width: 1600,
        height: 1206,
        frame: "browser",
      },
    ],
    note: "Designed in 2021. The site has since been redesigned; the archived link shows the original.",
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
        width: 2400,
        height: 1500,
        frame: "browser",
      },
      {
        kind: "page",
        src: "/images/projects/steelwatch/page-01.jpg",
        preview: "/images/projects/steelwatch/preview-page-01.jpg",
        alt: "Full Nippon Steel company profile with report cover and company biography",
        width: 1200,
        height: 3719,
      },
      {
        kind: "page",
        src: "/images/projects/steelwatch/page-02.jpg",
        preview: "/images/projects/steelwatch/preview-page-02.jpg",
        alt: "Full Japanese reports archive with report covers and tags",
        width: 1200,
        height: 2338,
      },
      {
        kind: "page",
        src: "/images/projects/steelwatch/page-03.jpg",
        preview: "/images/projects/steelwatch/preview-page-03.jpg",
        alt: "Full press release on Nippon Steel’s Gary Works with notes and related publications",
        width: 1200,
        height: 3535,
      },
      {
        kind: "image",
        src: "/images/projects/steelwatch/page-04.jpg",
        alt: "Japanese team profile page with portrait and biography",
        width: 1600,
        height: 1388,
        frame: "browser",
      },
      {
        kind: "page",
        src: "/images/projects/steelwatch/page-05.jpg",
        preview: "/images/projects/steelwatch/preview-page-05.jpg",
        alt: "Full Japanese homepage with a red steel sculpture hero",
        width: 1200,
        height: 4251,
      },
      {
        kind: "page",
        src: "/images/projects/steelwatch/page-06.jpg",
        preview: "/images/projects/steelwatch/preview-page-06.jpg",
        alt: "Full team page with portrait photos of the SteelWatch team",
        width: 1200,
        height: 2308,
      },
      {
        kind: "page",
        src: "/images/projects/steelwatch/screen.jpg",
        preview: "/images/projects/steelwatch/preview-screen.jpg",
        alt: "Contact page with a press contact card and a contact form",
        width: 1200,
        height: 1376,
      },
    ],
    note: "Designed in 2023. The client has since edited the live site, so it no longer fully reflects the original design.",
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
      {
        kind: "image",
        src: "/images/projects/can-big-tech-stop-flying/still-01.jpg",
        alt: "Phone showing that tech’s top seven companies added $3.4 trillion in value in 2020",
        width: 1600,
        height: 897,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/can-big-tech-stop-flying/still-02.jpg",
        alt: "Animated line chart of global flights dropping in 2020",
        width: 1600,
        height: 895,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/can-big-tech-stop-flying/still-03.jpg",
        alt: "Illustrated video call grid with smiling colleagues and the caption and their employees are happier",
        width: 1600,
        height: 895,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/can-big-tech-stop-flying/still-04.jpg",
        alt: "Pilot cap and sunglasses reading Captain Obvious with the caption it’s really a no-brainer",
        width: 1600,
        height: 897,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/can-big-tech-stop-flying/still-05.jpg",
        alt: "Real video call on a laptop with the caption Making video calls the norm for all business meetings",
        width: 1600,
        height: 895,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/can-big-tech-stop-flying/still-06.jpg",
        alt: "Biggest corporate travel spenders 2019 with the logos of five tech companies",
        width: 1600,
        height: 896,
        frame: "none",
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
        width: 2400,
        height: 1500,
        frame: "browser",
      },
      {
        kind: "page",
        src: "/images/projects/hydrogen-science-coalition/page-01-tracker.jpg",
        preview:
          "/images/projects/hydrogen-science-coalition/preview-page-01-tracker.jpg",
        alt: "Full Trackers page of the Hydrogen Science Coalition, from the offshore wind hero and hydrogen production figures to the project database tabs and tracker table",
        width: 1200,
        height: 2623,
      },
      {
        kind: "image",
        src: "/images/projects/hydrogen-science-coalition/mobile-02.jpg",
        alt: "Mobile design of the Hydrogen Science Coalition homepage",
        width: 393,
        height: 852,
        frame: "phone",
      },
    ],
    note: "Designed in 2025. The live site may have changed since launch.",
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
        width: 2400,
        height: 1500,
        frame: "browser",
      },
      {
        kind: "image",
        src: "/images/projects/interactive-calculator/page-01.jpg",
        alt: "Calculator with a saved 5-Year Wealth Builder scenario and growth chart",
        width: 1600,
        height: 1294,
        frame: "browser",
      },
      {
        kind: "image",
        src: "/images/projects/interactive-calculator/mobile-02.jpg",
        alt: "Mobile view of the savings goal calculator",
        width: 700,
        height: 1518,
        frame: "phone",
      },
    ],
    note: "Built in 2026. The live site may have changed since these screenshots.",
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
      {
        kind: "image",
        src: "/images/projects/atmosphere-hellboy/still-01.jpg",
        alt: "Edinburgh International Film Festival logo projected above the audience",
        width: 1230,
        height: 784,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/atmosphere-hellboy/still-02.jpg",
        alt: "Hellboy screening with projected light columns along the cinema walls",
        width: 1600,
        height: 1066,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/atmosphere-hellboy/still-03-scenes.jpg",
        alt: "Portfolio panel of three projection scenes, labelled film sets, subtle effects and weather effects",
        width: 1186,
        height: 1660,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/atmosphere-hellboy/still-04.jpg",
        alt: "X-ray film-set projections on the walls beside the screen",
        width: 1572,
        height: 1032,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/atmosphere-hellboy/still-05.jpg",
        alt: "Close-up of projected steampunk gears and chains on the wall",
        width: 652,
        height: 970,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/atmosphere-hellboy/still-06.jpg",
        alt: "Projected water effect spilling across the cinema floor",
        width: 1048,
        height: 567,
        frame: "none",
      },
    ],
    note: "Event photos by Jonathan Pang.",
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
        width: 2400,
        height: 1500,
        frame: "browser",
      },
      {
        kind: "page",
        src: "/images/projects/zero-carbon-analytics-rebrand/page-02.jpg",
        preview:
          "/images/projects/zero-carbon-analytics-rebrand/preview-page-02.jpg",
        alt: "Full homepage of the redesigned Zero Carbon Analytics with latest research, media logos and testimonials",
        width: 1200,
        height: 3364,
      },
      {
        kind: "page",
        src: "/images/projects/zero-carbon-analytics-rebrand/page-03.jpg",
        preview:
          "/images/projects/zero-carbon-analytics-rebrand/preview-page-03.jpg",
        alt: "Full About us page with the team in black-and-white portraits",
        width: 1200,
        height: 2714,
      },
      {
        kind: "page",
        src: "/images/projects/zero-carbon-analytics-rebrand/page-04.jpg",
        preview:
          "/images/projects/zero-carbon-analytics-rebrand/preview-page-04.jpg",
        alt: "Full Congo Basin briefing with key points, charts and data tables",
        width: 1200,
        height: 9000,
      },
      {
        kind: "page",
        src: "/images/projects/zero-carbon-analytics-rebrand/page-05.jpg",
        preview:
          "/images/projects/zero-carbon-analytics-rebrand/preview-page-05.jpg",
        alt: "Article footer with author card, share buttons, related reading and the contact form",
        width: 1200,
        height: 1315,
      },
    ],
    note: "Launched in 2025. The live site may have changed since launch.",
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
        width: 2400,
        height: 1500,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/gasoutlook/01.jpg",
        alt: "Long read on Mexico LNG with a photo of a whale in the sea",
        width: 1600,
        height: 845,
        frame: "browser",
      },
      {
        kind: "image",
        src: "/images/projects/gasoutlook/mobile-02.jpg",
        alt: "Mobile view of a marine species infographic in a Gas Outlook article",
        width: 700,
        height: 1516,
        frame: "phone",
      },
      {
        kind: "image",
        src: "/images/projects/gasoutlook/mobile-03.jpg",
        alt: "Mobile view of a Mexico gas supply chart",
        width: 662,
        height: 1436,
        frame: "phone",
      },
      {
        kind: "page",
        src: "/images/projects/gasoutlook/page-04.jpg",
        preview: "/images/projects/gasoutlook/preview-page-04.jpg",
        alt: "Full long read on organised crime and investor risk in Mexico’s LNG push, with maps and charts",
        width: 1200,
        height: 9000,
      },
      {
        kind: "image",
        src: "/images/projects/gasoutlook/screen.jpg",
        alt: "Desktop article view with the marine species infographic and share buttons",
        width: 1600,
        height: 845,
        frame: "browser",
      },
    ],
    note: "Designed in 2025. The live site may have changed since launch.",
    featured: true,
  },
  {
    id: "skyscanner-app",
    era: "product",
    discipline: "motion",
    title: "Skyscanner App Explainer",
    role: "designed-and-animated",
    year: "2017",
    summary:
      "An explainer for Skyscanner’s German-speaking market, animating the app’s key features, from the price-bar month view to price alerts. Concept, animation and sound design by me, as part of a series of feature videos.",
    stack: ["After Effects", "Illustrator", "Photoshop", "Audacity"],
    tags: ["motion"],
    links: [
      {
        kind: "film",
        label: "Watch film",
        href: "https://www.facebook.com/reel/10155712364119521",
      },
    ],
    media: [
      {
        kind: "video",
        src: "/videos/projects/skyscanner-app/loop.mp4",
        poster: "/images/projects/skyscanner-app/poster.jpg",
        alt: "Animated iPhone mockup of the Skyscanner app showing a price-bar month view next to the headline Flüge im günstigsten Monat finden",
      },
      {
        kind: "image",
        src: "/images/projects/skyscanner-app/still-01.jpg",
        alt: "Title card Die Skyscanner-App with an iPhone mockup on a tropical beach",
        width: 1600,
        height: 896,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/skyscanner-app/still-02.jpg",
        alt: "Alle Orte search screen with a globe icon and animated headline",
        width: 1280,
        height: 720,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/skyscanner-app/still-03.jpg",
        alt: "Top-deals screen with city tiles next to the headline Mit einem Klick Top-Deals finden",
        width: 1280,
        height: 720,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/skyscanner-app/still-04.jpg",
        alt: "Month view with price bars next to the headline Überblick behalten mit der Monatsansicht",
        width: 1600,
        height: 896,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/skyscanner-app/still-05.jpg",
        alt: "Share sheet on the iPhone next to the headline Per Screenshot mit Freunden teilen",
        width: 1600,
        height: 896,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/skyscanner-app/still-06.jpg",
        alt: "End card Die Reisesuchmaschine with App Store and Google Play badges",
        width: 1280,
        height: 720,
        frame: "none",
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
        width: 2400,
        height: 1500,
        frame: "browser",
      },
      {
        kind: "page",
        src: "/images/projects/core/page-01.jpg",
        preview: "/images/projects/core/preview-page-01.jpg",
        alt: "Full About CORE page with the research team and FAQs",
        width: 1200,
        height: 2244,
      },
      {
        kind: "page",
        src: "/images/projects/core/page-02.jpg",
        preview: "/images/projects/core/preview-page-02.jpg",
        alt: "Full Data Explorer with country filters, a bar chart and a data table",
        width: 1200,
        height: 1788,
      },
      {
        kind: "image",
        src: "/images/projects/core/page-03.jpg",
        alt: "CORE homepage with tracking-study and investor-survey publications",
        width: 1600,
        height: 845,
        frame: "browser",
      },
      {
        kind: "page",
        src: "/images/projects/core/page-04.jpg",
        preview: "/images/projects/core/preview-page-04.jpg",
        alt: "Full Our Research overview with publication cards",
        width: 1200,
        height: 1567,
      },
      {
        kind: "page",
        src: "/images/projects/core/page-05.jpg",
        preview: "/images/projects/core/preview-page-05.jpg",
        alt: "Full research article on a pilot study in Belgium and France",
        width: 1200,
        height: 1511,
      },
      {
        kind: "image",
        src: "/images/projects/core/mobile-06.jpg",
        alt: "Mobile view of a press release on public attitudes in Poland",
        width: 662,
        height: 1436,
        frame: "phone",
      },
    ],
    note: "Built in 2025. The live site may have changed since launch.",
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
      {
        kind: "image",
        src: "/images/projects/lancet-countdown/still-01.jpg",
        alt: "Dr Kim Loo in her practice with a teal lower-third name title",
        width: 1600,
        height: 897,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/lancet-countdown/still-02.jpg",
        alt: "Firefighter Zac Unger with his lower-third name title",
        width: 1600,
        height: 896,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/lancet-countdown/still-03.jpg",
        alt: "Closing card with the Lancet Countdown logo over the four healthcare voices",
        width: 1600,
        height: 896,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/lancet-countdown/still-04.jpg",
        alt: "Medical student Shashank Timalsina in Kathmandu with his lower-third name title",
        width: 1600,
        height: 895,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/lancet-countdown/still-05.jpg",
        alt: "Patient in bed with the subtitle Threats to human health are multiplying and intensifying due to climate change",
        width: 1600,
        height: 895,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/lancet-countdown/still-06.jpg",
        alt: "Firefighter silhouetted against a burning building with a subtitle about growing danger",
        width: 1600,
        height: 898,
        frame: "none",
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
      {
        kind: "film",
        label: "Watch trailer",
        href: "https://vimeo.com/55392607",
      },
      { kind: "film", label: "Venus film", href: "https://vimeo.com/56021020" },
    ],
    media: [
      {
        kind: "video",
        src: "/videos/projects/project-lifehouse/loop.mp4",
        poster: "/images/projects/project-lifehouse/poster.jpg",
        alt: "Glowing blue veins projected onto a Venus de Milo statue in the dark",
      },
      {
        kind: "image",
        src: "/images/projects/project-lifehouse/still-01.jpg",
        alt: "Project:Lifehouse poster I designed: a journey within, with a Venus de Milo torso",
        width: 600,
        height: 841,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/project-lifehouse/still-02.jpg",
        alt: "My photo of the Venus de Milo bust lit in magenta light inside the Anatomical Museum",
        width: 1100,
        height: 1650,
        frame: "none",
        link: {
          label: "Watch the Venus film",
          href: "https://vimeo.com/56021020",
        },
      },
      {
        kind: "image",
        src: "/images/projects/project-lifehouse/still-03.jpg",
        alt: "Glowing blue veins projected onto the Venus de Milo below museum paintings",
        width: 1600,
        height: 897,
        frame: "none",
        link: {
          label: "Watch the Venus film",
          href: "https://vimeo.com/56021020",
        },
      },
      {
        kind: "image",
        src: "/images/projects/project-lifehouse/still-04.jpg",
        alt: "Anatomical drawing of heart and vessels projected onto the statue",
        width: 734,
        height: 985,
        frame: "none",
        link: {
          label: "Watch the Venus film",
          href: "https://vimeo.com/56021020",
        },
      },
      {
        kind: "image",
        src: "/images/projects/project-lifehouse/still-07.jpg",
        alt: "Main Hall Part 2: rainbow outlines mapped around the museum entrance",
        width: 1600,
        height: 870,
        frame: "none",
        link: {
          label: "Watch Main Hall Part 2: The Welcoming",
          href: "https://vimeo.com/56252540",
        },
      },
      {
        kind: "image",
        src: "/images/projects/project-lifehouse/still-08.jpg",
        alt: "Main Hall Part 3: a firefly lights up the emblem above the entrance",
        width: 480,
        height: 590,
        frame: "none",
        link: {
          label: "Watch Main Hall Part 3: The Firefly",
          href: "https://vimeo.com/56021018",
        },
      },
      {
        kind: "image",
        src: "/images/projects/project-lifehouse/still-05.jpg",
        alt: "Main Hall Part 4: columns and vines projected around the museum entrance",
        width: 1600,
        height: 816,
        frame: "none",
        link: {
          label: "Watch Main Hall Part 4: The Secret Temple",
          href: "https://vimeo.com/56350196",
        },
      },
      {
        kind: "image",
        src: "/images/projects/project-lifehouse/still-06.jpg",
        alt: "3D render of the entrance with columns, vines and red and white roses",
        width: 750,
        height: 492,
        frame: "none",
        link: {
          label: "Watch Main Hall Part 4: The Secret Temple",
          href: "https://vimeo.com/56350196",
        },
      },
      {
        kind: "image",
        src: "/images/projects/project-lifehouse/still-09.jpg",
        alt: "Main Hall Part 5: a projected figure reaching through the round window above the door",
        width: 1600,
        height: 663,
        frame: "none",
        link: {
          label: "Watch Main Hall Part 5: The Senses",
          href: "https://vimeo.com/56021019",
        },
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
        width: 2400,
        height: 1500,
        frame: "browser",
      },
      {
        kind: "image",
        src: "/images/projects/action-fc/campaigns.jpg",
        alt: "Action FC campaigns page with three campaign cards on a navy background",
        width: 2400,
        height: 1500,
        frame: "browser",
      },
      {
        kind: "image",
        src: "/images/projects/action-fc/01.jpg",
        alt: "Action FC hero with the headline Women’s football fans can change the game",
        width: 1600,
        height: 845,
        frame: "browser",
      },
    ],
    note: "Designed in 2024. The live site may have changed since launch.",
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
      {
        kind: "image",
        src: "/images/projects/inspiration-burns/still-01.jpg",
        alt: "Inspiration:Burns poster I designed, with Robert Burns’ silhouette in flowing colour",
        width: 1100,
        height: 1555,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/inspiration-burns/still-02.jpg",
        alt: "3D tome open on the marble lectern inside the stone niche",
        width: 1280,
        height: 760,
        frame: "none",
        link: {
          label: "Watch Handsome Nell Part 1",
          href: "https://vimeo.com/56250303",
        },
      },
      {
        kind: "image",
        src: "/images/projects/inspiration-burns/still-06.jpg",
        alt: "3D render of the stone niche overgrown with vines above the marble pedestal",
        width: 1280,
        height: 800,
        frame: "none",
        link: {
          label: "Watch Handsome Nell Part 2",
          href: "https://vimeo.com/56281063",
        },
      },
      {
        kind: "image",
        src: "/images/projects/inspiration-burns/still-03.jpg",
        alt: "Giant all-seeing eye rendered for the monument’s torus-shaped ceiling",
        width: 1452,
        height: 1710,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/inspiration-burns/still-04.jpg",
        alt: "3D statues framed by oak leaves and trees for the monument’s niches",
        width: 1280,
        height: 766,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/inspiration-burns/still-05.jpg",
        alt: "Purple thorny lattice animated across the monument’s window frames",
        width: 1280,
        height: 512,
        frame: "none",
      },
      {
        kind: "image",
        src: "/images/projects/inspiration-burns/thesis-process.jpg",
        alt: "Process page from the master’s thesis: surface photos, wireframe 3D models and textured virtual furniture",
        width: 1400,
        height: 1980,
        frame: "none",
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
        width: 1440,
        height: 900,
        frame: "browser",
      },
      {
        kind: "page",
        src: "/images/projects/orryana/page-01.jpg",
        preview: "/images/projects/orryana/preview-page-01.jpg",
        alt: "Full article page explaining a savings challenge, with tips and a chart",
        width: 1200,
        height: 6171,
      },
      {
        kind: "page",
        src: "/images/projects/orryana/page-02.jpg",
        preview: "/images/projects/orryana/preview-page-02.jpg",
        alt: "Full finance guides overview with topic filters and article cards",
        width: 1200,
        height: 1792,
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
        width: 2400,
        height: 1500,
        frame: "browser",
      },
      {
        kind: "page",
        src: "/images/projects/apple-3d-showcase/page-full.jpg",
        preview: "/images/projects/apple-3d-showcase/preview-page-full.jpg",
        alt: "Full MacBook Pro showcase page with the 3D model, colour options and feature sections",
        width: 1200,
        height: 7488,
      },
      {
        kind: "image",
        src: "/images/projects/apple-3d-showcase/01.jpg",
        alt: "Take a closer look section with a 3D MacBook model and colour and size toggles",
        width: 1600,
        height: 1000,
        frame: "browser",
      },
      {
        kind: "image",
        src: "/images/projects/apple-3d-showcase/02.jpg",
        alt: "3D MacBook model shown at an angle next to feature copy",
        width: 1600,
        height: 1000,
        frame: "browser",
      },
    ],
    note: "Built in 2026. The live site may have changed since these screenshots.",
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
        width: 2400,
        height: 1500,
        frame: "browser",
      },
      {
        kind: "image",
        src: "/images/projects/gsap-cocktail-website/01.jpg",
        alt: "About section with a photo collage of bartenders and cocktails",
        width: 1600,
        height: 1000,
        frame: "browser",
      },
      {
        kind: "image",
        src: "/images/projects/gsap-cocktail-website/02.jpg",
        alt: "Cocktail slider featuring a Raspberry Mojito recipe",
        width: 1600,
        height: 1000,
        frame: "browser",
      },
    ],
    note: "Built in 2026. The live site may have changed since these screenshots.",
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
        width: 2400,
        height: 1500,
        frame: "browser",
      },
      {
        kind: "image",
        src: "/images/projects/plant-pal/01.jpg",
        alt: "Plant detail card for the Bird of Paradise",
        width: 1358,
        height: 1684,
        frame: "browser",
      },
      {
        kind: "image",
        src: "/images/projects/plant-pal/02.jpg",
        alt: "Edit a plant form with image upload",
        width: 1212,
        height: 3678,
        frame: "browser",
      },
    ],
    featured: false,
  },
] as const satisfies readonly Project[];
