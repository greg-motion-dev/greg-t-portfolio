import {
  experienceContent,
  timelineKindLabels,
  type AccentColor,
  type TimelineEntry,
} from "@/constants";
import { accentBgClasses } from "@/components/ui/accentClasses";
import { timelineRailClasses } from "@/components/experience/timelineRail";
import { formatDateRange, formatDuration } from "@/lib/formatDates";

export interface TimelineItemProps {
  readonly entry: TimelineEntry;
  readonly accent: AccentColor;
}

export default function TimelineItem({ entry, accent }: TimelineItemProps) {
  const titleId = `timeline-${entry.id}`;
  const duration = formatDuration(entry.start, entry.end);

  return (
    <li className={timelineRailClasses.item}>
      <span aria-hidden="true" className={timelineRailClasses.node}>
        <span
          data-timeline-node
          className={`absolute inset-0.5 rounded-full ${accentBgClasses[accent]}`}
        />
      </span>

      <p
        data-timeline-entry
        className={timelineRailClasses.date}
      >
        <span className="text-ink">
          {formatDateRange(
            entry.start,
            entry.end,
            experienceContent.presentLabel,
          )}
        </span>
        {duration ? <span>{duration}</span> : null}
      </p>

      <article
        data-timeline-entry
        aria-labelledby={titleId}
        className="mt-4 md:mt-0"
      >
        <div className="flex flex-wrap items-center gap-3">
          <h3
            id={titleId}
            className="text-2xl font-bold tracking-tight text-ink md:text-3xl"
          >
            {entry.title}
          </h3>
          {entry.kind === "training" ? (
            <span className="border border-brand-yellow px-2.5 py-1 font-mono text-xs tracking-wider text-brand-yellow uppercase">
              {timelineKindLabels[entry.kind]}
            </span>
          ) : null}
        </div>

        <p className="mt-2 text-base text-ink-muted">
          <span className="text-ink">{entry.organisation}</span> ·{" "}
          {entry.location}
        </p>

        <ul className="mt-6 flex max-w-3xl flex-col gap-3 text-base text-ink-muted">
          {entry.highlights.map((highlight) => (
            <li key={highlight} className="relative pl-6">
              <span
                aria-hidden="true"
                className="absolute left-0 text-white/30"
              >
                –
              </span>
              {highlight}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}
