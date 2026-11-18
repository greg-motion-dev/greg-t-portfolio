import type { ReactNode } from "react";

export interface CvSectionProps {
  readonly title: string;
  readonly children: ReactNode;
}

export default function CvSection({ title, children }: CvSectionProps) {
  return (
    <section className="w-auto">
      <h2 className="break-after-avoid border-b border-paper-line pb-1.5 font-mono text-cv-sm font-bold tracking-widest text-paper-ink uppercase">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
