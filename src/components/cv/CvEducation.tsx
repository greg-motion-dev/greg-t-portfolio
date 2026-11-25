import { education, timeline, type TimelineMilestone } from "@/constants";
import { getUi } from "@/i18n/getUi";
import { abbreviate } from "@/lib/abbreviate";
import { formatYearMonth, formatYearSpan } from "@/lib/formatDates";
import { getLocale } from "@/i18n/getLocale";

const metaClasses = "text-paper-muted";
const dateClasses = "font-mono text-cv-xs tracking-wide whitespace-nowrap uppercase";

const certifications = timeline.filter(
  (item): item is Extract<(typeof timeline)[number], TimelineMilestone> =>
    item.kind === "certification",
);

export default async function CvEducation() {
  const ui = await getUi();
  const locale = await getLocale();
  return (
    <ul className="space-y-1.5 text-cv-sm">
      {education.map((entry) => (
        <li key={entry.id} className="break-inside-avoid">
          <p className="font-bold text-paper-ink">{abbreviate(entry.degree)}</p>
          <p className={metaClasses}>
            {entry.institution} ·{" "}
            <span className={dateClasses}>{formatYearSpan(entry.startYear, entry.endYear)}</span>
          </p>
          {"award" in entry ? <p className="text-paper-ink">{entry.award.name}</p> : null}
        </li>
      ))}
      {certifications.map((entry) => (
        <li key={entry.id} className="break-inside-avoid">
          <p className="font-bold text-paper-ink">{entry.title}</p>
          <p className={metaClasses}>
            {ui.cvPage.certificationTitle} ·{" "}
            <span className={dateClasses}>{formatYearMonth(entry.start, locale)}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
