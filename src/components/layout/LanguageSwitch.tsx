"use client";

import { usePathname } from "next/navigation";
import { localeLabels, locales, localizeHref, stripLocale, type Locale } from "@/i18n/config";

export interface LanguageSwitchProps {
  readonly locale: Locale;
}

const linkClasses = {
  current: "text-ink",
  other: "text-ink-muted transition-colors hover:text-ink",
} as const;

export default function LanguageSwitch({ locale }: LanguageSwitchProps) {
  const basePath = stripLocale(usePathname());

  return (
    <ul className="flex items-center gap-1.5 font-mono text-sm">
      {locales.map((target, index) => (
        <li key={target} className="flex items-center gap-1.5">
          {index > 0 ? (
            <span aria-hidden="true" className="text-white/20">
              /
            </span>
          ) : null}
          <a
            href={localizeHref(target, basePath)}
            hrefLang={target}
            lang={target}
            aria-label={localeLabels[target].name}
            aria-current={target === locale ? "true" : undefined}
            className={`focus-ring ${linkClasses[target === locale ? "current" : "other"]}`}
          >
            {localeLabels[target].short}
          </a>
        </li>
      ))}
    </ul>
  );
}
