import type { YearMonth } from "@/constants";
import type { Locale } from "@/i18n/config";

type MonthLabels = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

interface DurationUnits {
  readonly year: readonly [singular: string, plural: string];
  readonly month: readonly [singular: string, plural: string];
}

const monthLabels = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  de: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
} as const satisfies Record<Locale, MonthLabels>;

const durationUnits = {
  en: { year: ["yr", "yrs"], month: ["mo", "mos"] },
  de: { year: ["J.", "J."], month: ["Mon.", "Mon."] },
} as const satisfies Record<Locale, DurationUnits>;

interface ParsedYearMonth {
  readonly year: number;
  readonly month: number;
}

function parseYearMonth(value: YearMonth): ParsedYearMonth {
  const separator = value.lastIndexOf("-");
  return {
    year: Number(value.slice(0, separator)),
    month: Number(value.slice(separator + 1)),
  };
}

function pluralise(count: number, [singular, plural]: readonly [string, string]): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function formatYearMonth(value: YearMonth, locale: Locale): string {
  const { year, month } = parseYearMonth(value);
  return `${monthLabels[locale][month - 1] ?? ""} ${year}`;
}

export function formatDateRange(
  start: YearMonth,
  end: YearMonth | "present",
  presentLabel: string,
  locale: Locale,
): string {
  const endLabel = end === "present" ? presentLabel : formatYearMonth(end, locale);
  return `${formatYearMonth(start, locale)} — ${endLabel}`;
}

export function formatDuration(
  start: YearMonth,
  end: YearMonth | "present",
  locale: Locale,
): string | null {
  if (end === "present") {
    return null;
  }

  const from = parseYearMonth(start);
  const to = parseYearMonth(end);
  const totalMonths = (to.year - from.year) * 12 + (to.month - from.month) + 1;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts = [
    years > 0 ? pluralise(years, durationUnits[locale].year) : null,
    months > 0 ? pluralise(months, durationUnits[locale].month) : null,
  ].filter((part): part is string => part !== null);

  return parts.join(" ");
}

export function formatYearSpan(startYear: number, endYear: number): string {
  return startYear === endYear ? String(startYear) : `${startYear}—${endYear}`;
}
