import { education } from "@/constants";
import { formatYearSpan } from "@/lib/formatDates";

export default function CvEducation() {
  return (
    <ul className="space-y-2.5">
      {education.map((entry) => (
        <li key={entry.id} className="break-inside-avoid text-cv-sm">
          <p className="font-bold text-paper-ink">{entry.degree}</p>
          <p className="text-paper-muted">{entry.institution}</p>
          <p className="font-mono text-paper-muted">{formatYearSpan(entry.startYear, entry.endYear)}</p>
          {"award" in entry ? (
            <p className="mt-0.5 text-paper-ink">
              {entry.award.name} ({entry.award.year})
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
