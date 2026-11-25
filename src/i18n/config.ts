export const locales = ["en", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels = {
  en: { short: "EN", name: "English" },
  de: { short: "DE", name: "Deutsch" },
} as const satisfies Record<Locale, { readonly short: string; readonly name: string }>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const prefixedLocales = locales.filter((locale) => locale !== defaultLocale);

function isPagePath(href: string): boolean {
  if (!href.startsWith("/") || href.startsWith("//")) {
    return false;
  }
  const lastSegment = href.split(/[?#]/)[0]?.split("/").pop() ?? "";
  return !lastSegment.includes(".");
}

export function localizeHref(locale: Locale, href: string): string {
  if (locale === defaultLocale || !isPagePath(href)) {
    return href;
  }
  if (href === "/") {
    return `/${locale}`;
  }
  if (href.startsWith("/#") || href.startsWith("/?")) {
    return `/${locale}${href.slice(1)}`;
  }
  return `/${locale}${href}`;
}

export function stripLocale(pathname: string): string {
  for (const locale of prefixedLocales) {
    if (pathname === `/${locale}`) {
      return "/";
    }
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
  }
  return pathname;
}
