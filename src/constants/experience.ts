export interface ExpCard {
  readonly review: string;
  readonly imgPath: string;
  readonly logoPath: string;
  readonly title: string;
  readonly date: string;
  readonly responsibilities: readonly string[];
}

export interface ExpLogo {
  readonly name: string;
  readonly imgPath: string;
}

export const expCards = [
  {
    review:
      "Greg brings a rare mix of high-level UI/UX strategy and modern frontend craft. He elevated our WebGL interactive components and design systems with incredible speed and rhythm.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/logo1.png",
    title: "Creative Engineer & Frontend Developer",
    date: "2024 - Present",
    responsibilities: [
      "Architecting high-performance Next.js, React Three Fiber (R3F), and GSAP interactive web applications.",
      "Building production-ready design systems using TypeScript, Tailwind CSS, and custom 3D web shaders.",
      "Translating complex visual identity systems into performant, accessible web components.",
    ],
  },
  {
    review:
      "Greg’s strategic leadership across our international web infrastructure transformed how we launched campaign platforms. He bridges technical architecture and UI/UX effortlessly.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Senior UI/UX Strategist & Web Lead",
    date: "2018 - 2024",
    responsibilities: [
      "Led digital platform strategy and UX architecture for major climate initiatives, research hubs, and partner foundations.",
      "Directed global cross-functional teams in launching responsive web applications and custom editorial platforms.",
      "Optimized web infrastructure and content delivery workflows for maximum reach and accessibility.",
    ],
  },
  {
    review:
      "Greg managed and developed high-traffic digital web assets with precision. His eye for detail and reliable execution made him an essential collaborator on complex web projects.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "Web Developer & Digital Strategist",
    date: "2012 - 2018",
    responsibilities: [
      "Managed and customized WordPress blog platforms and web assets for global brands like Skyscanner.",
      "Designed and engineered responsive web interfaces for media networks and enterprise clients.",
      "Collaborated with backend engineers and content creators to deliver fast, SEO-optimized web experiences.",
    ],
  },
] as const satisfies readonly ExpCard[];

export const expLogos = [
  {
    name: "Meliore & ECF",
    imgPath: "/images/logo1.png",
  },
  {
    name: "Skyscanner",
    imgPath: "/images/logo2.png",
  },
  {
    name: "Creative Engineering",
    imgPath: "/images/logo3.png",
  },
] as const satisfies readonly ExpLogo[];
