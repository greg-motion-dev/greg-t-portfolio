import { disciplineAccent, disciplineShape, skillGroups } from "@/constants";
import ShapeMarker from "@/components/ui/ShapeMarker";
import { accentTextClasses } from "@/components/ui/accentClasses";

export default function CvSkills() {
  return (
    <div className="space-y-3">
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
          <p className="mt-1 text-cv-sm text-paper-muted">{group.skills.join(" · ")}</p>
        </div>
      ))}
    </div>
  );
}
