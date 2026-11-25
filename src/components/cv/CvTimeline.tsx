import { cvHighlightIndexes, cvPageContent, timeline, type TimelineEntry } from "@/constants";
import { formatDateRange } from "@/lib/formatDates";
import { getLocale } from "@/i18n/getLocale";

const entries = timeline.filter(
  (item): item is Extract<(typeof timeline)[number], TimelineEntry> =>
    item.kind === "work" || item.kind === "training",
);

function selectedHighlights(id: string, highlights: readonly string[]): readonly string[] {
  const indexes = cvHighlightIndexes[id];
  if (indexes === undefined) {
    return highlights;
  }
  return indexes.flatMap((index) => {
    const highlight = highlights[index];
    return highlight === undefined ? [] : [highlight];
  });
}

export default async function CvTimeline() {
  const locale = await getLocale();
  return (
    <ol className="flex flex-1 flex-col justify-between gap-3">
      {entries.map((item) => (
        <li key={item.id} className="break-inside-avoid">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-cv-lg font-bold text-paper-ink">{item.title}</h3>
            <p className="shrink-0 font-mono text-cv-xs tracking-wide text-paper-muted uppercase">
              {formatDateRange(item.start, item.end, cvPageContent.presentLabel, locale)}
            </p>
          </div>
          <p className="font-mono text-cv-xs text-paper-muted">
            {item.organisation} · {item.location}
          </p>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-cv-sm text-paper-ink marker:text-paper-muted">
            {selectedHighlights(item.id, item.highlights).map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
