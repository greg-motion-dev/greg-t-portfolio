import type { ReactNode } from "react";

export interface HairlineGridProps {
  readonly className?: string;
  readonly gridClassName: string;
  readonly children: ReactNode;
}

export default function HairlineGrid({
  className = "",
  gridClassName,
  children,
}: HairlineGridProps) {
  return (
    <div className={`border-y border-white/10 ${className}`}>
      <ul className={`mx-auto grid max-w-wide gap-px bg-white/10 ${gridClassName}`}>{children}</ul>
    </div>
  );
}
