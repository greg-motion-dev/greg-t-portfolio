import { disciplineAccent, type Project } from "@/constants";
import { getUi } from "@/i18n/getUi";
import DisciplinePill from "@/components/projects/DisciplinePill";
import ProjectLinkArrow from "@/components/projects/ProjectLinkArrow";
import ProjectMediaSlot from "@/components/projects/ProjectMediaSlot";
import { accentBgClasses, accentTextClasses } from "@/components/ui/accentClasses";
import { displayDomain } from "@/lib/displayDomain";

export interface ProjectCardProps {
  readonly project: Project;
  readonly position: number;
}

function formatIndex(position: number): string {
  return String(position).padStart(2, "0");
}

export default async function ProjectCard({ project, position }: ProjectCardProps) {
  const ui = await getUi();
  const accent = disciplineAccent[project.discipline];
  const titleId = `project-${project.id}`;
  const liveLink = project.links.find((link) => link.kind === "live");
  const liveDomain = liveLink ? displayDomain(liveLink.href) : undefined;

  return (
    <li
      id={`work-${project.id}`}
      className="group/card relative flex scroll-mt-nav bg-canvas transition-colors duration-300 hover:bg-surface motion-reduce:transition-none"
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover/card:scale-x-100 motion-reduce:transition-none ${accentBgClasses[accent]}`}
      />
      <article aria-labelledby={titleId} className="flex w-full flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5">
          <span
            className={`px-2.5 py-1 font-mono text-sm font-bold text-canvas tabular-nums ${accentBgClasses[accent]}`}
          >
            {formatIndex(position)}
          </span>
          <DisciplinePill discipline={project.discipline} />
        </header>

        <div className="border-b border-white/10">
          <ProjectMediaSlot
            media={project.media}
            discipline={project.discipline}
            title={project.title}
            note={project.note}
            domain={liveDomain}
          />
        </div>

        <div className="flex flex-1 flex-col px-6 pt-6 pb-8">
          <p className="font-mono text-xs tracking-wider text-ink-muted uppercase">
            {ui.eraLabels[project.era]} · {project.year}
          </p>

          <h3
            id={titleId}
            className="mt-3 text-2xl font-bold tracking-tight text-ink md:text-3xl"
          >
            {project.title}
          </h3>

          <p className="mt-4 text-base text-ink-muted">{project.summary}</p>

          <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs tracking-wider uppercase">
            <li className={`border border-current px-2.5 py-1 ${accentTextClasses[accent]}`}>
              {ui.roleLabels[project.role]}
            </li>
            {project.stack.map((technology) => (
              <li key={technology} className="border border-white/10 px-2.5 py-1 text-ink-muted">
                {technology}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10">
            {project.links.length > 0 ? (
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link focus-ring inline-flex items-center gap-3 font-mono text-sm tracking-widest text-ink uppercase"
                    >
                      {link.label}
                      <ProjectLinkArrow trigger="card" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-mono text-sm tracking-widest text-ink-muted/60 uppercase">
                {ui.lineup.linkPendingLabel}
              </p>
            )}
          </div>
        </div>
      </article>
    </li>
  );
}
