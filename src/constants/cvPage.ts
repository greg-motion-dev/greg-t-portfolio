import type { AccentColor } from "./projects";

export interface CvPageContent {
  readonly documentTitle: string;
  readonly profileSummary: string;
  readonly experienceTitle: string;
  readonly skillsTitle: string;
  readonly languagesTitle: string;
  readonly educationTitle: string;
  readonly freelanceTitle: string;
  readonly earlyWorkTitle: string;
  readonly publicationTitle: string;
  readonly alsoTitle: string;
  readonly workedWithTitle: string;
  readonly presentLabel: string;
  readonly certificationTitle: string;
}

export const cvPageContent = {
  documentTitle: "CV | Greg Telakis",
  profileSummary:
    "Senior Visual Creator turned Creative UI Engineer with 10+ years of experience bridging high-end UI/UX design, interactive motion, and modern frontend architecture.",
  experienceTitle: "Experience",
  skillsTitle: "Skills",
  languagesTitle: "Languages",
  educationTitle: "Education",
  freelanceTitle: "Freelance",
  earlyWorkTitle: "Projection mapping",
  publicationTitle: "Master thesis",
  alsoTitle: "Also",
  workedWithTitle: "Worked with",
  presentLabel: "Present",
  certificationTitle: "Certification",
} as const satisfies CvPageContent;

export const cvHighlightIndexes: Readonly<Record<string, readonly number[]>> = {
  "spiced-academy": [0, 1, 2],
  "meliore-foundation": [0, 1, 3],
  "european-climate-foundation": [0, 2, 3],
  skyscanner: [0, 2, 3],
  bigpoint: [0, 1, 3],
};

export const cvAbbreviations = [
  ["International", "Int'l"],
] as const satisfies readonly (readonly [string, string])[];

export const cvWorkedWith = [
  "Adobe Express",
  "Skyscanner",
  "Canva",
  "Bigpoint",
  "Edinburgh International Film Festival",
  "Lancet Countdown",
  "European Climate Foundation",
  "Government of Alberta",
  "Zero Carbon Analytics",
] as const satisfies readonly string[];

export const cvSectionAccents = {
  experience: "yellow",
  skills: "teal",
  languages: "pink",
  education: "yellow",
  also: "teal",
} as const satisfies Record<string, AccentColor>;
