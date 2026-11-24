import { cvPageContent, education, timeline, type TimelineMilestone } from "@/constants";
import { abbreviate } from "@/lib/abbreviate";
import { formatYearMonth, formatYearSpan } from "@/lib/formatDates";

const metaClasses = "text-paper-muted";
const dateClasses = "font-mono text-cv-xs tracking-wide whitespace-nowrap uppercase";

const certifications = timeline.filter(
  (item): item is Extract<(typeof timeline)[number], TimelineMilestone> =>
    item.kind === "certification",
);

export default function CvEducation() {
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
            {cvPageContent.certificationTitle} ·{" "}
            <span className={dateClasses}>{formatYearMonth(entry.start)}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
