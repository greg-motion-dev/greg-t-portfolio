import type { AccentColor } from "@/constants";

export const timelineRailClasses = {
  item: "relative pl-10 md:grid md:grid-cols-[12rem_1fr] md:gap-x-16 md:pl-0",
  track: "absolute top-2 bottom-0 left-[5.5px] w-px bg-white/10 md:left-[calc(14rem-0.5px)]",
  node: "absolute top-1.5 left-0 size-3 rounded-full border border-white/30 bg-canvas md:left-[calc(14rem-6px)]",
  milestoneNode:
    "absolute top-2 left-[2px] size-2 rounded-full border border-white/30 bg-canvas md:left-[calc(14rem-4px)]",
  date: "flex flex-col gap-1 font-mono text-xs tracking-wider text-ink-muted uppercase md:pt-1 md:text-right",
} as const;

const timelineAccentSteps = ["yellow", "teal", "pink"] as const satisfies readonly AccentColor[];

export function timelineAccentAt(index: number, total: number): AccentColor {
  const progress = total > 1 ? index / (total - 1) : 0;
  const step = Math.round(progress * (timelineAccentSteps.length - 1));
  return timelineAccentSteps[step] ?? "yellow";
}
