import { getSkillGroups } from "@/i18n/content";
import { getUi } from "@/i18n/getUi";
import SkillColumn from "@/components/techstack/SkillColumn";
import HairlineGrid from "@/components/ui/HairlineGrid";
import SectionHeading from "@/components/ui/SectionHeading";

export default async function TechStack() {
  const ui = await getUi();
  const skillGroups = await getSkillGroups();
  return (
    <section id="techstack" aria-labelledby="techstack-title" className="pt-24 md:pt-32">
      <div className="mx-auto max-w-frame px-5 md:px-10">
        <SectionHeading id="techstack-title" title={ui.techStack.title} />
      </div>

      <HairlineGrid className="mt-12 md:mt-16" gridClassName="md:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group) => (
          <SkillColumn key={group.id} group={group} />
        ))}
      </HairlineGrid>
    </section>
  );
}
