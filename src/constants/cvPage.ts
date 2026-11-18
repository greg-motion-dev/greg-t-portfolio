export interface CvPageContent {
  readonly documentTitle: string;
  readonly profileTitle: string;
  readonly experienceTitle: string;
  readonly skillsTitle: string;
  readonly languagesTitle: string;
  readonly educationTitle: string;
  readonly freelanceTitle: string;
  readonly earlyWorkTitle: string;
  readonly publicationTitle: string;
  readonly alsoTitle: string;
  readonly presentLabel: string;
}

export const cvPageContent = {
  documentTitle: "CV | Greg Telakis",
  profileTitle: "Profile",
  experienceTitle: "Experience",
  skillsTitle: "Skills",
  languagesTitle: "Languages",
  educationTitle: "Education",
  freelanceTitle: "Freelance",
  earlyWorkTitle: "Projection mapping",
  publicationTitle: "Publication",
  alsoTitle: "Also",
  presentLabel: "Present",
} as const satisfies CvPageContent;
