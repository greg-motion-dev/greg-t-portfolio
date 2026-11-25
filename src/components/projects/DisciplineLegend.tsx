import { disciplineOrder } from "@/constants";
import { getUi } from "@/i18n/getUi";
import DisciplinePill from "@/components/projects/DisciplinePill";

export default async function DisciplineLegend() {
  const ui = await getUi();
  return (
    <ul
      aria-label={ui.disciplinesAriaLabel}
      className="flex flex-wrap gap-x-6 gap-y-2 max-sm:gap-x-4 max-sm:[&_span]:tracking-wider min-[383px]:max-sm:w-full min-[383px]:max-sm:justify-between"
    >
      {disciplineOrder.map((discipline) => (
        <li key={discipline}>
          <DisciplinePill discipline={discipline} />
        </li>
      ))}
    </ul>
  );
}
