export interface SectionHeadingProps {
  readonly id: string;
  readonly title: string;
  readonly count?: number;
}

export default function SectionHeading({ id, title, count }: SectionHeadingProps) {
  return (
    <div className="flex items-baseline gap-4">
      <h2
        id={id}
        className="text-hero font-black tracking-tight [word-spacing:0.15em] text-ink uppercase md:text-hero-lg"
      >
        {title}
      </h2>
      {count === undefined ? null : (
        <span className="font-mono text-sm text-ink-muted">({count})</span>
      )}
    </div>
  );
}
