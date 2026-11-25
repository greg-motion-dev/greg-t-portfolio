import { disciplineOrder } from "@/constants";
import { getUi } from "@/i18n/getUi";
import DisciplinePill from "@/components/projects/DisciplinePill";

export default async function DisciplineLegend() {
  const ui = await getUi();
  return (
    <ul aria-label={ui.disciplinesAriaLabel} className="flex flex-wrap gap-x-6 gap-y-2">
      {disciplineOrder.map((discipline) => (
        <li key={discipline}>
          <DisciplinePill discipline={discipline} />
        </li>
      ))}
    </ul>
  );
}
