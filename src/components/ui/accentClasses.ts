import type { AccentColor } from "@/constants";

export const accentTextClasses = {
  yellow: "text-brand-yellow",
  pink: "text-brand-pink",
  teal: "text-brand-teal",
} as const satisfies Record<AccentColor, string>;

export const accentBgClasses = {
  yellow: "bg-brand-yellow",
  pink: "bg-brand-pink",
  teal: "bg-brand-teal",
} as const satisfies Record<AccentColor, string>;
