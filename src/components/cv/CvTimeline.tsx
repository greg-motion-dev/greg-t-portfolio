import { cvPageContent, timeline, timelineKindLabels, type TimelineItem } from "@/constants";
import { formatDateRange, formatYearMonth } from "@/lib/formatDates";

const isEntry = (item: TimelineItem): item is Extract<TimelineItem, { highlights: readonly string[] }> =>
  item.kind === "work" || item.kind === "training";

function milestoneDate(item: Extract<TimelineItem, { subtitle: string }>): string {
  return item.end === undefined
    ? formatYearMonth(item.start)
    : formatDateRange(item.start, item.end, cvPageContent.presentLabel);
}

export default function CvTimeline() {
  return (
    <ol className="space-y-4">
      {timeline.map((item) =>
        isEntry(item) ? (
          <li key={item.id} className="break-inside-avoid">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-cv font-bold text-paper-ink">{item.title}</h3>
              <p className="shrink-0 font-mono text-cv-sm text-paper-muted">
                {formatDateRange(item.start, item.end, cvPageContent.presentLabel)}
              </p>
            </div>
            <p className="font-mono text-cv-sm text-paper-muted">
              {item.organisation} · {item.location}
            </p>
            <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-cv-sm text-paper-ink marker:text-paper-muted">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </li>
        ) : (
          <li key={item.id} className="flex items-baseline justify-between gap-4 break-inside-avoid">
            <p className="text-cv-sm text-paper-ink">
              <span className="font-mono text-paper-muted">{timelineKindLabels[item.kind]}:</span>{" "}
              <span className="font-bold">{item.title}</span> · {item.subtitle}
            </p>
            <p className="shrink-0 font-mono text-cv-sm text-paper-muted">{milestoneDate(item)}</p>
          </li>
        ),
      )}
    </ol>
  );
}
