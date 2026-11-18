import { useSyncExternalStore } from "react";
import type { AccentColor } from "@/constants";

export type BrandColors = Readonly<Record<AccentColor, string>>;

const brandColorVariables = {
  yellow: "--color-brand-yellow",
  pink: "--color-brand-pink",
  teal: "--color-brand-teal",
} as const satisfies Record<AccentColor, string>;

let cachedColors: BrandColors | null = null;

function readBrandColors(): BrandColors | null {
  if (cachedColors !== null) {
    return cachedColors;
  }
  const styles = getComputedStyle(document.documentElement);
  const read = (accent: AccentColor): string =>
    styles.getPropertyValue(brandColorVariables[accent]).trim();
  const colors = { yellow: read("yellow"), pink: read("pink"), teal: read("teal") };
  if (Object.values(colors).some((value) => value === "")) {
    return null;
  }
  cachedColors = colors;
  return cachedColors;
}

const subscribe = (): (() => void) => () => {};
const getServerSnapshot = (): BrandColors | null => null;

export function useBrandColors(): BrandColors | null {
  return useSyncExternalStore(subscribe, readBrandColors, getServerSnapshot);
}
