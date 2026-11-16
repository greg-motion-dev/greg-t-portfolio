import {
  disciplineAccent,
  disciplineLabels,
  disciplineShape,
  type ProjectDiscipline,
} from "@/constants";
import ShapeMarker from "@/components/ui/ShapeMarker";
import { accentTextClasses } from "@/components/ui/accentClasses";

export interface DisciplinePillProps {
  readonly discipline: ProjectDiscipline;
}

export default function DisciplinePill({ discipline }: DisciplinePillProps) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-ink-muted uppercase">
      <ShapeMarker
        shape={disciplineShape[discipline]}
        className={`size-2.5 ${accentTextClasses[disciplineAccent[discipline]]}`}
      />
      {disciplineLabels[discipline]}
    </span>
  );
}
