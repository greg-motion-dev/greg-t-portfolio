import type { CSSProperties, ReactNode } from "react";

export interface BrowserFrameProps {
  readonly domain: string | undefined;
  readonly style?: CSSProperties;
  readonly className?: string;
  readonly barClassName?: string;
  readonly children: ReactNode;
}

export default function BrowserFrame({
  domain,
  style,
  className,
  barClassName,
  children,
}: BrowserFrameProps) {
  return (
    <div
      style={style}
      className={`flex flex-col overflow-hidden rounded-lg border border-white/15 bg-surface shadow-2xl shadow-black/60 ${className ?? ""}`}
    >
      <div
        aria-hidden="true"
        className={`flex h-9 shrink-0 items-center gap-3 border-b border-white/10 px-3 ${barClassName ?? ""}`}
      >
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
        </span>
        <span className="flex h-5 min-w-0 flex-1 items-center justify-center truncate rounded-full border border-white/10 px-3 font-mono text-[0.625rem] tracking-wider text-ink-muted">
          {domain ?? ""}
        </span>
        <span className="w-[2.625rem]" />
      </div>
      {children}
    </div>
  );
}
