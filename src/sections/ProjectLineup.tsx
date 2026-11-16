import { lineupContent, profile, projects, type Project } from "@/constants";
import DisciplineLegend from "@/components/projects/DisciplineLegend";
import GitHubCtaCard from "@/components/projects/GitHubCtaCard";
import ProjectCard from "@/components/projects/ProjectCard";

const twoColumnFillSpan = ["md:col-span-2", "md:col-span-1"] as const;
const threeColumnFillSpan = ["xl:col-span-3", "xl:col-span-2", "xl:col-span-1"] as const;

function fillSpanClasses(itemCount: number): string {
  return `${twoColumnFillSpan[itemCount % 2]} ${threeColumnFillSpan[itemCount % 3]}`;
}

export default function ProjectLineup() {
  const featured: readonly Project[] = projects.filter((project) => project.featured);
  const githubLink = profile.links.find((link) => link.kind === "github");

  return (
    <section id="work" aria-labelledby="work-title" className="py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-5 md:px-10">
        <div className="flex items-baseline gap-4">
          <h2
            id="work-title"
            className="text-4xl font-black tracking-tight text-ink uppercase md:text-6xl"
          >
            {lineupContent.title}
          </h2>
          <span className="font-mono text-sm text-ink-muted">({featured.length})</span>
        </div>
        <DisciplineLegend />
      </div>

      <ul className="mt-12 grid gap-px border-y border-white/10 bg-white/10 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((project, index) => (
          <ProjectCard key={project.id} project={project} position={index + 1} />
        ))}
        {githubLink ? (
          <GitHubCtaCard href={githubLink.href} spanClassName={fillSpanClasses(featured.length)} />
        ) : null}
      </ul>
    </section>
  );
}
