export interface NotFoundContent {
  readonly code: string;
  readonly title: string;
  readonly body: string;
  readonly homeLabel: string;
  readonly homeHref: string;
}

export const notFoundContent = {
  code: "404",
  title: "Page not found",
  body: "This page drifted out of orbit.",
  homeLabel: "Back to home",
  homeHref: "/",
} as const satisfies NotFoundContent;
