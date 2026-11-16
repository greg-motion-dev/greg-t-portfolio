import ArrowDownIcon from "@/components/icons/ArrowDownIcon";

export interface ProjectLinkArrowProps {
  readonly trigger: "card" | "self";
}

const sharedClasses =
  "size-4 -rotate-135 transition-[translate,opacity] duration-500 ease-out motion-reduce:transition-none pointer-coarse:translate-0 pointer-coarse:opacity-100";

const triggerClasses = {
  card: "-translate-x-3 translate-y-3 opacity-0 group-hover/card:translate-0 group-hover/card:opacity-100 group-focus-visible/link:translate-0 group-focus-visible/link:opacity-100",
  self: "-translate-x-3 translate-y-3 opacity-0 group-hover/link:translate-0 group-hover/link:opacity-100 group-focus-visible/link:translate-0 group-focus-visible/link:opacity-100",
} as const satisfies Record<ProjectLinkArrowProps["trigger"], string>;

export default function ProjectLinkArrow({ trigger }: ProjectLinkArrowProps) {
  return (
    <span aria-hidden="true" className="inline-flex size-4 overflow-hidden">
      <ArrowDownIcon className={`${sharedClasses} ${triggerClasses[trigger]}`} />
    </span>
  );
}
