import { lineupContent } from "@/constants";
import ShapeMarker from "@/components/ui/ShapeMarker";
import ProjectLinkArrow from "@/components/projects/ProjectLinkArrow";

export interface GitHubCtaCardProps {
  readonly href: string;
  readonly spanClassName: string;
}

export default function GitHubCtaCard({ href, spanClassName }: GitHubCtaCardProps) {
  return (
    <li className={`flex bg-canvas ${spanClassName}`}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link focus-ring flex w-full items-center justify-between gap-6 px-6 py-12 transition-colors duration-300 hover:bg-surface motion-reduce:transition-none"
      >
        <span className="inline-flex items-center gap-4 text-2xl font-bold tracking-tight text-ink md:text-3xl">
          <ShapeMarker shape="circle" className="size-4 text-brand-yellow" />
          {lineupContent.githubCtaLabel}
        </span>
        <span className="text-ink">
          <ProjectLinkArrow trigger="self" />
        </span>
      </a>
    </li>
  );
}
