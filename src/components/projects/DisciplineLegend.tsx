import { disciplineOrder } from "@/constants";
import DisciplinePill from "@/components/projects/DisciplinePill";

export default function DisciplineLegend() {
  return (
    <ul aria-label="Disciplines" className="flex flex-wrap gap-x-6 gap-y-2">
      {disciplineOrder.map((discipline) => (
        <li key={discipline}>
          <DisciplinePill discipline={discipline} />
        </li>
      ))}
    </ul>
  );
}
