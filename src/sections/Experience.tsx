import { type TimelineItem as TimelineItemData, type TimelineMilestone } from "@/constants";
import { getTimeline } from "@/i18n/content";
import { getUi } from "@/i18n/getUi";
import AlsoList from "@/components/experience/AlsoList";
import EducationList from "@/components/experience/EducationList";
import LanguageList from "@/components/experience/LanguageList";
import TimelineItem from "@/components/experience/TimelineItem";
import TimelineMilestoneItem from "@/components/experience/TimelineMilestoneItem";
import TimelineScroll from "@/components/experience/TimelineScroll";
import HairlineGrid from "@/components/ui/HairlineGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import { timelineAccentAt } from "@/components/experience/timelineRail";

const columnTitleClasses = "font-mono text-xs tracking-widest text-ink uppercase";
const columnClasses = "flex flex-col bg-canvas px-6 py-10 md:px-10";
const columnBodyClasses = "mt-8 flex flex-1 flex-col *:flex-1";

function isMilestone(item: TimelineItemData): item is TimelineMilestone {
  return item.kind === "certification" || item.kind === "project";
}

export default async function Experience() {
  const ui = await getUi();
  const items: readonly TimelineItemData[] = await getTimeline();
  const roleCount = items.filter((item) => !isMilestone(item)).length;

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-frame px-5 md:px-10">
        <SectionHeading id="experience-title" title={ui.experience.title} count={roleCount} />
      </div>

      <div className="mx-auto mt-16 max-w-frame px-5 md:mt-24 md:px-10">
        <TimelineScroll>
          <ol className="flex flex-col gap-16 md:gap-20">
            {items.map((item, index) =>
              isMilestone(item) ? (
                <TimelineMilestoneItem
                  key={item.id}
                  milestone={item}
                  accent={timelineAccentAt(index, items.length)}
                />
              ) : (
                <TimelineItem
                  key={item.id}
                  entry={item}
                  accent={timelineAccentAt(index, items.length)}
                />
              ),
            )}
          </ol>
        </TimelineScroll>
      </div>

      <HairlineGrid className="mt-24 md:mt-32" gridClassName="md:grid-cols-3">
        <li className={columnClasses}>
          <h3 className={columnTitleClasses}>{ui.experience.educationTitle}</h3>
          <div className={columnBodyClasses}>
            <EducationList />
          </div>
        </li>
        <li className={columnClasses}>
          <h3 className={columnTitleClasses}>{ui.experience.languagesTitle}</h3>
          <div className={columnBodyClasses}>
            <LanguageList />
          </div>
        </li>
        <li className={columnClasses}>
          <h3 className={columnTitleClasses}>{ui.experience.alsoTitle}</h3>
          <div className={columnBodyClasses}>
            <AlsoList />
          </div>
        </li>
      </HairlineGrid>
    </section>
  );
}
