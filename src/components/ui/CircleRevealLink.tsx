import ArrowDownIcon from "@/components/icons/ArrowDownIcon";

export interface CircleRevealLinkProps {
  readonly href: string;
  readonly label: string;
}

const easing = "duration-500 ease-out motion-reduce:transition-none";

const linkClasses = [
  "group focus-ring relative inline-flex min-w-56 items-center overflow-hidden",
  "border border-transparent bg-black py-4 pr-16 pl-8",
  "font-mono text-sm tracking-widest text-canvas uppercase",
  "transition-colors",
  easing,
  "hover:border-ink hover:text-ink",
  "focus-visible:border-ink focus-visible:text-ink",
  "pointer-coarse:border-ink pointer-coarse:text-ink",
].join(" ");

const circleClasses = [
  "absolute top-1/2 right-4 size-8 -translate-y-1/2 rounded-full",
  "scale-[14] bg-ink",
  "transition-[scale,background-color]",
  easing,
  "group-hover:scale-100 group-hover:bg-brand-yellow",
  "group-focus-visible:scale-100 group-focus-visible:bg-brand-yellow",
  "pointer-coarse:scale-100 pointer-coarse:bg-brand-yellow",
].join(" ");

const labelClasses = [
  "relative transition-transform",
  easing,
  "group-hover:-translate-x-2 group-focus-visible:-translate-x-2 pointer-coarse:-translate-x-2",
].join(" ");

const arrowClasses = [
  "size-4 -translate-y-8 opacity-0 transition-all",
  easing,
  "group-hover:translate-y-0 group-hover:opacity-100 group-hover:motion-safe:animate-bounce",
  "group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
  "pointer-coarse:translate-y-0 pointer-coarse:opacity-100",
].join(" ");

export default function CircleRevealLink({ href, label }: CircleRevealLinkProps) {
  return (
    <a href={href} className={linkClasses}>
      <span aria-hidden="true" className={circleClasses} />
      <span className={labelClasses}>{label}</span>
      <span
        aria-hidden="true"
        className="absolute top-1/2 right-4 flex size-8 -translate-y-1/2 items-center justify-center overflow-hidden text-canvas"
      >
        <ArrowDownIcon className={arrowClasses} />
      </span>
    </a>
  );
}
