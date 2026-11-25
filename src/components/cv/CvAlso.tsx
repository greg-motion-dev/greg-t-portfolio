import { earlyWork, freelance, publications } from "@/constants";
import { getUi } from "@/i18n/getUi";
import CvInlineList from "@/components/cv/CvInlineList";
import { abbreviate } from "@/lib/abbreviate";
import { formatDateRange } from "@/lib/formatDates";
import { getLocale } from "@/i18n/getLocale";

const groupTitleClasses = "font-mono text-cv-xs tracking-wide text-paper-muted uppercase";

export default async function CvAlso() {
  const ui = await getUi();
  const locale = await getLocale();
  const [thesis] = publications;
  const earlyYear = earlyWork[0]?.year;

  return (
    <div className="space-y-2 text-cv-sm">
      <div className="break-inside-avoid">
        <h3 className={groupTitleClasses}>{ui.cvPage.freelanceTitle}</h3>
        {freelance.map((entry) => (
          <p key={entry.id} className="mt-0.5 text-paper-ink">
            <span className="font-bold">{entry.client}</span> · {entry.role}
            <span className="block font-mono text-cv-xs tracking-wide text-paper-muted uppercase">
              {formatDateRange(entry.start, entry.end, ui.cvPage.presentLabel, locale)}
            </span>
          </p>
        ))}
      </div>
      <div className="break-inside-avoid">
        <h3 className={groupTitleClasses}>
          {ui.cvPage.earlyWorkTitle}
          {earlyYear === undefined ? null : ` · ${earlyYear}`}
        </h3>
        <p className="mt-0.5 text-paper-ink">
          <CvInlineList items={earlyWork.map((entry) => abbreviate(entry.client))} />
        </p>
        {thesis ? (
          <p className="mt-0.5 text-paper-ink">
            {ui.cvPage.publicationTitle}:{" "}
            <a
              href={thesis.href}
              className="font-bold underline decoration-paper-line underline-offset-2"
            >
              {thesis.title}
            </a>
          </p>
        ) : null}
      </div>
    </div>
  );
}
