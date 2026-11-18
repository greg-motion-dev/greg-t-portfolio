import { TO_BE_PROVIDED } from "./projects";

export interface PrivacyContent {
  readonly title: string;
  readonly body: string;
}

export const privacyContent = {
  title: "Privacy Policy",
  body: TO_BE_PROVIDED,
} as const satisfies PrivacyContent;
