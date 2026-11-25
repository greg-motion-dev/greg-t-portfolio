import { skillGroups } from "@/constants";
import { getUi } from "@/i18n/getUi";
import SkillColumn from "@/components/techstack/SkillColumn";
import SectionHeading from "@/components/ui/SectionHeading";

export default async function TechStack() {
  const ui = await getUi();
  return (
    <section id="techstack" aria-labelledby="techstack-title" className="pt-24 md:pt-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading id="techstack-title" title={ui.techStack.title} />
      </div>

      <ul className="mt-12 grid gap-px border-y border-white/10 bg-white/10 md:mt-16 md:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group) => (
          <SkillColumn key={group.id} group={group} />
        ))}
      </ul>
    </section>
  );
}
