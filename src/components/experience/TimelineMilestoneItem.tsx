import {
  experienceContent,
  timelineKindLabels,
  type AccentColor,
  type TimelineMilestone,
} from "@/constants";
import { accentBgClasses } from "@/components/ui/accentClasses";
import ProjectLinkArrow from "@/components/projects/ProjectLinkArrow";
import { timelineRailClasses } from "@/components/experience/timelineRail";
import { formatDateRange, formatYearMonth } from "@/lib/formatDates";
import { getLocale } from "@/i18n/getLocale";
import type { Locale } from "@/i18n/config";

export interface TimelineMilestoneItemProps {
  readonly milestone: TimelineMilestone;
  readonly accent: AccentColor;
}

function formatMilestoneDate(milestone: TimelineMilestone, locale: Locale): string {
  return milestone.end
    ? formatDateRange(milestone.start, milestone.end, experienceContent.presentLabel, locale)
    : formatYearMonth(milestone.start, locale);
}

export default async function TimelineMilestoneItem({
  milestone,
  accent,
}: TimelineMilestoneItemProps) {
  const locale = await getLocale();
  const titleId = `timeline-${milestone.id}`;
  const { link } = milestone;

  return (
    <li className={timelineRailClasses.item}>
      <span aria-hidden="true" className={timelineRailClasses.milestoneNode}>
        <span
          data-timeline-node
          className={`absolute inset-px rounded-full ${accentBgClasses[accent]}`}
        />
      </span>

      <p data-timeline-entry className={timelineRailClasses.date}>
        <span className="text-ink">{formatMilestoneDate(milestone, locale)}</span>
      </p>

      <article
        data-timeline-entry
        aria-labelledby={titleId}
        className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 md:mt-0"
      >
        <h3 id={titleId} className="text-lg font-bold tracking-tight text-ink">
          {link ? (
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group/link focus-ring inline-flex items-center gap-3 underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-ink"
            >
              {milestone.title}
              <ProjectLinkArrow trigger="self" />
            </a>
          ) : (
            milestone.title
          )}
        </h3>
        <span className="text-base text-ink-muted">{milestone.subtitle}</span>
        <span className="border border-white/10 px-2.5 py-1 font-mono text-xs tracking-wider text-ink-muted uppercase">
          {timelineKindLabels[milestone.kind]}
        </span>
      </article>
    </li>
  );
}
