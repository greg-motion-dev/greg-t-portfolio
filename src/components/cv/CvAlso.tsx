import { cvPageContent, earlyWork, freelance, publicationKindLabels, publications } from "@/constants";
import { formatDateRange } from "@/lib/formatDates";

const groupTitleClasses = "font-mono text-cv-sm text-paper-muted";

export default function CvAlso() {
  return (
    <div className="space-y-3 text-cv-sm">
      <div className="break-inside-avoid">
        <h3 className={groupTitleClasses}>{cvPageContent.freelanceTitle}</h3>
        <ul className="mt-1 space-y-1.5">
          {freelance.map((entry) => (
            <li key={entry.id}>
              <p className="font-bold text-paper-ink">
                {entry.client} · {entry.role}
              </p>
              <p className="font-mono text-paper-muted">
                {formatDateRange(entry.start, entry.end, cvPageContent.presentLabel)}
              </p>
              <p className="text-paper-ink">{entry.summary}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="break-inside-avoid">
        <h3 className={groupTitleClasses}>{cvPageContent.earlyWorkTitle}</h3>
        <ul className="mt-1 space-y-1">
          {earlyWork.map((entry) => (
            <li key={entry.id} className="text-paper-ink">
              <span className="font-bold">{entry.client}</span> · {entry.year}
            </li>
          ))}
        </ul>
      </div>
      <div className="break-inside-avoid">
        <h3 className={groupTitleClasses}>{cvPageContent.publicationTitle}</h3>
        <ul className="mt-1 space-y-1">
          {publications.map((publication) => (
            <li key={publication.id} className="text-paper-ink">
              <a
                href={publication.href}
                className="font-bold underline decoration-paper-line underline-offset-2"
              >
                {publication.title}
              </a>{" "}
              · {publicationKindLabels[publication.kind]}, {publication.year}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
