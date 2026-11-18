export interface NavLink {
  readonly name: string;
  readonly link: string;
}

export const navLinks = [
  { name: "about", link: "/#about" },
  { name: "work", link: "/#work" },
  { name: "techstack", link: "/#techstack" },
  { name: "experience", link: "/#experience" },
] as const satisfies readonly NavLink[];

export const navContact = {
  name: "contact",
  link: "/#contact",
} as const satisfies NavLink;

export interface FooterContent {
  readonly copyright: string;
  readonly backToTopLabel: string;
  readonly privacyLink: NavLink;
}

export const footerContent = {
  copyright: "© Greg Telakis",
  backToTopLabel: "Back to top",
  privacyLink: { name: "Privacy Policy", link: "/privacy" },
} as const satisfies FooterContent;
