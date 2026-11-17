import { education } from "@/constants";
import { formatYearSpan } from "@/lib/formatDates";

export default function EducationList() {
  return (
    <ul className="flex flex-col gap-6">
      {education.map((entry) => (
        <li key={entry.id}>
          <p className="font-bold text-ink">{entry.degree}</p>
          <p className="mt-1 text-sm text-ink-muted">{entry.institution}</p>
          <p className="mt-1 font-mono text-xs tracking-wider text-ink-muted">
            {formatYearSpan(entry.startYear, entry.endYear)}
          </p>
          {"award" in entry ? (
            <p className="mt-2 font-mono text-xs tracking-wider text-brand-yellow">
              {entry.award.name} · {entry.award.year}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
