import { disciplineAccent, disciplineShape, type SkillGroup } from "@/constants";
import ShapeMarker from "@/components/ui/ShapeMarker";
import { accentBgClasses, accentTextClasses } from "@/components/ui/accentClasses";

export interface SkillColumnProps {
  readonly group: SkillGroup;
}

export default function SkillColumn({ group }: SkillColumnProps) {
  const { discipline } = group;
  const titleId = `skills-${group.id}`;

  return (
    <li className="relative bg-canvas px-6 pt-10 pb-12 md:px-8">
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-0.5 ${discipline ? accentBgClasses[disciplineAccent[discipline]] : "bg-ink"}`}
      />

      <h3
        id={titleId}
        className="flex items-center gap-2 font-mono text-xs tracking-widest text-ink uppercase"
      >
        {discipline ? (
          <ShapeMarker
            shape={disciplineShape[discipline]}
            className={`size-2.5 ${accentTextClasses[disciplineAccent[discipline]]}`}
          />
        ) : null}
        {group.title}
      </h3>

      {discipline ? (
        <ul aria-labelledby={titleId} className="mt-8 flex flex-col gap-3">
          {group.skills.map((skill) => (
            <li key={skill} className="text-ink">
              {skill}
            </li>
          ))}
        </ul>
      ) : (
        <ul aria-labelledby={titleId} className="mt-8 flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <li
              key={skill}
              className="border border-white/10 px-2.5 py-1 font-mono text-xs tracking-wider text-ink-muted uppercase"
            >
              {skill}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
