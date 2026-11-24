import {
  earlyWork,
  experienceContent,
  freelance,
  publicationKindLabels,
  publications,
} from "@/constants";
import ProjectLinkArrow from "@/components/projects/ProjectLinkArrow";
import { formatDateRange } from "@/lib/formatDates";

const labelClasses = "font-mono text-xs tracking-widest text-ink-muted uppercase";

export default function AlsoList() {
  const earlyWorkYears = [...new Set(earlyWork.map((entry) => entry.year))].join(", ");

  return (
    <div className="flex flex-col justify-between gap-6">
      <div>
        <h4 className={labelClasses}>{experienceContent.freelanceLabel}</h4>
        <ul className="mt-3 flex flex-col gap-3">
          {freelance.map((entry) => (
            <li key={entry.id}>
              <p className="text-ink">
                <span className="font-bold">{entry.client}</span> ·{" "}
                <span className="text-ink-muted">{entry.role}</span>
              </p>
              <p className="mt-1 font-mono text-xs tracking-wider text-ink-muted">
                {formatDateRange(entry.start, entry.end, experienceContent.presentLabel)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className={labelClasses}>
          {experienceContent.earlyWorkLabel} · {earlyWorkYears}
        </h4>
        <ul className="mt-3 flex flex-col gap-1 text-sm text-ink">
          {earlyWork.map((entry) => (
            <li key={entry.id}>{entry.client}</li>
          ))}
        </ul>
      </div>

      <ul className="flex flex-col gap-3">
        {publications.map((publication) => (
          <li key={publication.id}>
            <h4 className={labelClasses}>
              {publicationKindLabels[publication.kind]} · {publication.year}
            </h4>
            <a
              href={publication.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link focus-ring mt-3 inline-flex items-center gap-3 text-ink underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-ink"
            >
              {publication.title}
              <ProjectLinkArrow trigger="self" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
