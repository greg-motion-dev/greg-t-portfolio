export interface NavLink {
  readonly name: string;
  readonly link: string;
}

export interface WordItem {
  readonly text: string;
  readonly imgPath: string;
}

export interface CounterItem {
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
}

export interface LogoIcon {
  readonly imgPath: string;
  readonly alt?: string;
}

export interface Ability {
  readonly imgPath: string;
  readonly title: string;
  readonly desc: string;
}

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

export interface TechStackIcon {
  readonly name: string;
  readonly modelPath: string;
  readonly scale: number;
  readonly rotation: readonly [number, number, number];
}

export interface TechStackImg {
  readonly name: string;
  readonly imgPath: string;
}

export const navLinks: readonly NavLink[] = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
] as const;

export const words: readonly WordItem[] = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
] as const;

export const counterItems: readonly CounterItem[] = [
  { value: 12, suffix: "+", label: "Years Building Web Platforms" },
  { value: 50, suffix: "+", label: "Web Projects & Apps Delivered" },
  { value: 6, suffix: "+", label: "Years Leading Teams & Web Strategy" },
  { value: 100, suffix: "%", label: "TypeScript & Interactive Stack" },
] as const;

export const logoIconsList: readonly LogoIcon[] = [
  { imgPath: "/images/logos/company-logo-1.png", alt: "Skyscanner" },
  { imgPath: "/images/logos/company-logo-2.png", alt: "The Lancet" },
  { imgPath: "/images/logos/company-logo-3.png", alt: "BigPoint" },
  { imgPath: "/images/logos/company-logo-4.png", alt: "Meliore Foundation" },
  { imgPath: "/images/logos/company-logo-5.png", alt: "ECF" },
  { imgPath: "/images/logos/company-logo-6.png", alt: "Company 6" },
  { imgPath: "/images/logos/company-logo-7.png", alt: "Company 7" },
  { imgPath: "/images/logos/company-logo-8.png", alt: "Company 8" },
  { imgPath: "/images/logos/company-logo-9.png", alt: "Company 9" },
  { imgPath: "/images/logos/company-logo-10.png", alt: "Company 10" },
  { imgPath: "/images/logos/company-logo-11.png", alt: "Company 11" },
] as const;

export const abilities: readonly Ability[] = [
  {
    imgPath: "/images/seo.png",
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
] as const;

export const expCards: readonly ExpCard[] = [
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
] as const;

export const expLogos: readonly ExpLogo[] = [
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
] as const;

export const techStackIcons: readonly TechStackIcon[] = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
] as const;

export const techStackImgs: readonly TechStackImg[] = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
] as const;
