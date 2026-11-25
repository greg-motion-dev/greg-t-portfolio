import type { Metadata } from "next";
import { defaultLocale, localizeHref, locales, type Locale } from "./config";
import { getLocale } from "./getLocale";

type Alternates = NonNullable<Metadata["alternates"]>;

export function alternatesFor(locale: Locale, path: string): Alternates {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((alternateLocale) => [alternateLocale, localizeHref(alternateLocale, path)]),
  );
  return {
    canonical: localizeHref(locale, path),
    languages: { ...languages, "x-default": localizeHref(defaultLocale, path) },
  };
}

export async function getAlternates(path: string): Promise<Alternates> {
  return alternatesFor(await getLocale(), path);
}
