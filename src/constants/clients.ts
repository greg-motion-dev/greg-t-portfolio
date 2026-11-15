export interface LogoIcon {
  readonly imgPath: string;
  readonly alt?: string;
}

export const logoIconsList = [
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
] as const satisfies readonly LogoIcon[];
