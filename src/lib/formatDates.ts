import type { YearMonth } from "@/constants";

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

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

function pluralise(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function formatYearMonth(value: YearMonth): string {
  const { year, month } = parseYearMonth(value);
  return `${monthLabels[month - 1] ?? ""} ${year}`;
}

export function formatDateRange(
  start: YearMonth,
  end: YearMonth | "present",
  presentLabel: string,
): string {
  const endLabel = end === "present" ? presentLabel : formatYearMonth(end);
  return `${formatYearMonth(start)} — ${endLabel}`;
}

export function formatDuration(start: YearMonth, end: YearMonth | "present"): string | null {
  if (end === "present") {
    return null;
  }

  const from = parseYearMonth(start);
  const to = parseYearMonth(end);
  const totalMonths = (to.year - from.year) * 12 + (to.month - from.month) + 1;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts = [
    years > 0 ? pluralise(years, "yr", "yrs") : null,
    months > 0 ? pluralise(months, "mo", "mos") : null,
  ].filter((part): part is string => part !== null);

  return parts.join(" ");
}

export function formatYearSpan(startYear: number, endYear: number): string {
  return startYear === endYear ? String(startYear) : `${startYear}—${endYear}`;
}
