export interface ContactContent {
  readonly title: string;
  readonly introLines: readonly string[];
  readonly availability: readonly string[];
  readonly email: string;
  readonly copyLabel: string;
  readonly copiedLabel: string;
  readonly copyFailedLabel: string;
}

export const contactContent = {
  title: "Contact",
  introLines: [
    "I'm always happy to talk about new roles and projects.",
    "The best way to reach me is by email.",
  ],
  availability: [
    "Open to full-time roles",
    "Based in Germany",
    "Remote worldwide",
  ],
  email: "gtelakis@duck.com",
  copyLabel: "Copy email",
  copiedLabel: "Copied",
  copyFailedLabel: "Copy failed",
} as const satisfies ContactContent;
