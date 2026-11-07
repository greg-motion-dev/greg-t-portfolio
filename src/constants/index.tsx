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
  { imgPath: "/images/logos/company-logo-1.png" },
  { imgPath: "/images/logos/company-logo-2.png" },
  { imgPath: "/images/logos/company-logo-3.png" },
  { imgPath: "/images/logos/company-logo-4.png" },
  { imgPath: "/images/logos/company-logo-5.png" },
  { imgPath: "/images/logos/company-logo-6.png" },
  { imgPath: "/images/logos/company-logo-7.png" },
  { imgPath: "/images/logos/company-logo-8.png" },
  { imgPath: "/images/logos/company-logo-9.png" },
  { imgPath: "/images/logos/company-logo-10.png" },
  { imgPath: "/images/logos/company-logo-11.png" },
] as const;
