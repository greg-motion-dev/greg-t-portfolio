import { cvOmittedSkills, disciplineAccent, disciplineShape } from "@/constants";
import { getSkillGroups } from "@/i18n/content";
import CvInlineList from "@/components/cv/CvInlineList";
import ShapeMarker from "@/components/ui/ShapeMarker";
import { accentTextClasses } from "@/components/ui/accentClasses";

const omittedSkills: ReadonlySet<string> = new Set(cvOmittedSkills);

export default async function CvSkills() {
  const skillGroups = await getSkillGroups();
  return (
    <div className="space-y-2">
      {skillGroups.map((group) => (
        <div key={group.id} className="break-inside-avoid">
          <h3 className="flex items-center gap-1.5 text-cv-sm font-bold text-paper-ink">
            {group.discipline === null ? (
              <ShapeMarker shape="square" className="size-2 text-paper-ink" />
            ) : (
              <ShapeMarker
                shape={disciplineShape[group.discipline]}
                className={`size-2 ${accentTextClasses[disciplineAccent[group.discipline]]}`}
              />
            )}
            {group.title}
          </h3>
          <p className="mt-0.5 text-cv-sm text-paper-muted">
            <CvInlineList items={group.skills.filter((skill) => !omittedSkills.has(skill))} />
          </p>
        </div>
      ))}
    </div>
  );
}
