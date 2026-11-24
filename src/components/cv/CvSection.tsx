import type { ReactNode } from "react";
import type { AccentColor } from "@/constants";
import { accentBgClasses } from "@/components/ui/accentClasses";

export interface CvSectionProps {
  readonly index: number;
  readonly title: string;
  readonly accent: AccentColor;
  readonly children: ReactNode;
  readonly fill?: boolean;
}

export default function CvSection({
  index,
  title,
  accent,
  children,
  fill = false,
}: CvSectionProps) {
  return (
    <section className={fill ? "flex w-auto flex-col" : "w-auto"}>
      <h2 className="flex items-center gap-2 border-b border-paper-line pb-1.5 font-mono text-cv-sm font-bold tracking-widest text-paper-ink uppercase">
        <span className={`px-1 text-paper-ink tabular-nums ${accentBgClasses[accent]}`}>
          {String(index).padStart(2, "0")}
        </span>
        {title}
      </h2>
      <div className={fill ? "mt-2 flex flex-1 flex-col" : "mt-2"}>{children}</div>
    </section>
  );
}
