import { lineupContent } from "@/constants";
import ShapeMarker from "@/components/ui/ShapeMarker";
import ProjectLinkArrow from "@/components/projects/ProjectLinkArrow";

export interface GitHubExtraProject {
  readonly title: string;
  readonly href: string;
}

export interface GitHubCtaCardProps {
  readonly href: string;
  readonly spanClassName: string;
  readonly extras: readonly GitHubExtraProject[];
}

export default function GitHubCtaCard({ href, spanClassName, extras }: GitHubCtaCardProps) {
  return (
    <li className={`flex flex-col bg-canvas ${spanClassName}`}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link focus-ring flex w-full flex-1 items-center justify-between gap-6 px-6 py-12 transition-colors duration-300 hover:bg-surface motion-reduce:transition-none"
      >
        <span className="inline-flex items-center gap-4 text-2xl font-bold tracking-tight text-ink md:text-3xl">
          <ShapeMarker shape="circle" className="size-4 text-brand-yellow" />
          {lineupContent.githubCtaLabel}
        </span>
        <span className="text-ink">
          <ProjectLinkArrow trigger="self" />
        </span>
      </a>
      {extras.length > 0 ? (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 px-6 py-5 font-mono text-xs tracking-wider uppercase">
          <span className="text-ink-muted">{lineupContent.githubAlsoLabel}</span>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {extras.map((extra) => (
              <li key={extra.href}>
                <a
                  href={extra.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link focus-ring inline-flex items-center gap-2 text-ink transition-colors hover:text-brand-yellow motion-reduce:transition-none"
                >
                  {extra.title}
                  <ProjectLinkArrow trigger="self" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}
