import {
  experienceContent,
  timeline,
  type TimelineItem as TimelineItemData,
  type TimelineMilestone,
} from "@/constants";
import AlsoList from "@/components/experience/AlsoList";
import EducationList from "@/components/experience/EducationList";
import LanguageList from "@/components/experience/LanguageList";
import TimelineItem from "@/components/experience/TimelineItem";
import TimelineMilestoneItem from "@/components/experience/TimelineMilestoneItem";
import TimelineScroll from "@/components/experience/TimelineScroll";

const columnTitleClasses = "font-mono text-xs tracking-widest text-ink uppercase";

function isMilestone(item: TimelineItemData): item is TimelineMilestone {
  return item.kind === "certification" || item.kind === "project";
}

export default function Experience() {
  const items: readonly TimelineItemData[] = timeline;
  const roleCount = items.filter((item) => !isMilestone(item)).length;

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl items-baseline gap-4 px-5 md:px-10">
        <h2
          id="experience-title"
          className="text-4xl font-black tracking-tight text-ink uppercase md:text-6xl"
        >
          {experienceContent.title}
        </h2>
        <span className="font-mono text-sm text-ink-muted">({roleCount})</span>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-5 md:mt-24 md:px-10">
        <TimelineScroll>
          <ol className="flex flex-col gap-16 md:gap-20">
            {items.map((item) =>
              isMilestone(item) ? (
                <TimelineMilestoneItem key={item.id} milestone={item} />
              ) : (
                <TimelineItem key={item.id} entry={item} />
              ),
            )}
          </ol>
        </TimelineScroll>
      </div>

      <ul className="mt-24 grid gap-px border-y border-white/10 bg-white/10 md:mt-32 md:grid-cols-3">
        <li className="bg-canvas px-6 py-10 md:px-10">
          <h3 className={columnTitleClasses}>{experienceContent.educationTitle}</h3>
          <div className="mt-8">
            <EducationList />
          </div>
        </li>
        <li className="bg-canvas px-6 py-10 md:px-10">
          <h3 className={columnTitleClasses}>{experienceContent.languagesTitle}</h3>
          <div className="mt-8">
            <LanguageList />
          </div>
        </li>
        <li className="bg-canvas px-6 py-10 md:px-10">
          <h3 className={columnTitleClasses}>{experienceContent.alsoTitle}</h3>
          <div className="mt-8">
            <AlsoList />
          </div>
        </li>
      </ul>
    </section>
  );
}
