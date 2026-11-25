import { profile, projects, type Project } from "@/constants";
import { getUi } from "@/i18n/getUi";
import DisciplineLegend from "@/components/projects/DisciplineLegend";
import GitHubCtaCard from "@/components/projects/GitHubCtaCard";
import ProjectCard from "@/components/projects/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";

const twoColumnFillSpan = ["md:col-span-2", "md:col-span-1"] as const;
const threeColumnFillSpan = ["xl:col-span-3", "xl:col-span-2", "xl:col-span-1"] as const;

function fillSpanClasses(itemCount: number): string {
  return `${twoColumnFillSpan[itemCount % 2]} ${threeColumnFillSpan[itemCount % 3]}`;
}

export default async function ProjectLineup() {
  const ui = await getUi();
  const featured: readonly Project[] = projects.filter((project) => project.featured);
  const githubLink = profile.links.find((link) => link.kind === "github");
  const githubExtras = projects.flatMap((project) => {
    const repo = project.links.find((link) => link.kind === "repo");
    return !project.featured && repo ? [{ title: project.title, href: repo.href }] : [];
  });

  return (
    <section id="work" aria-labelledby="work-title" className="py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-5 md:px-10">
        <SectionHeading id="work-title" title={ui.lineup.title} count={featured.length} />
        <DisciplineLegend />
      </div>

      <ul className="mt-12 grid gap-px border-y border-white/10 bg-white/10 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((project, index) => (
          <ProjectCard key={project.id} project={project} position={index + 1} />
        ))}
        {githubLink ? (
          <GitHubCtaCard
            href={githubLink.href}
            spanClassName={fillSpanClasses(featured.length)}
            extras={githubExtras}
          />
        ) : null}
      </ul>
    </section>
  );
}
