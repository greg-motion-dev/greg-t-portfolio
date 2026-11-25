"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMediaQuery, useReducedMotion } from "@/hooks/useMediaQuery";

export interface ClientMarqueeProps {
  readonly copies: number;
  readonly children: ReactNode;
}

const fallbackDurationSeconds = 120;
const resumeDelayMs = 1500;

const viewportModeClasses = {
  swipe:
    "overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
  marquee: "overflow-hidden",
} as const;

const trackModeClasses = {
  swipe: "",
  marquee: "animate-marquee hover:[animation-play-state:paused]",
} as const;

function readMarqueeDurationSeconds(): number {
  const animation = getComputedStyle(document.documentElement).getPropertyValue(
    "--animate-marquee",
  );
  const seconds = Number.parseFloat(/([\d.]+)s/.exec(animation)?.[1] ?? "");
  return Number.isFinite(seconds) && seconds > 0 ? seconds : fallbackDurationSeconds;
}

export default function ClientMarquee({ copies, children }: ClientMarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const reducedMotion = useReducedMotion();
  const mode = coarsePointer && !reducedMotion ? "swipe" : "marquee";

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (mode !== "swipe" || viewport === null || track === null) {
      return;
    }

    const durationSeconds = readMarqueeDurationSeconds();
    const copyWidth = (): number => track.scrollWidth / copies;
    let position = copyWidth();
    let touching = false;
    let lastUserScrollAt = -Infinity;
    let autoScrolling = true;
    let previousTime: number | null = null;
    let frame = 0;

    viewport.scrollLeft = position;

    const wrapIntoMiddleCopy = (): void => {
      const width = copyWidth();
      if (position < width) {
        position += width;
      } else if (position >= width * 2) {
        position -= width;
      }
    };

    const handleTouchStart = (): void => {
      touching = true;
      autoScrolling = false;
    };

    const handleTouchEnd = (): void => {
      touching = false;
      lastUserScrollAt = performance.now();
    };

    const handleScroll = (): void => {
      if (!autoScrolling) {
        lastUserScrollAt = performance.now();
      }
    };

    const step = (time: number): void => {
      const elapsedSeconds = previousTime === null ? 0 : (time - previousTime) / 1000;
      previousTime = time;

      if (!autoScrolling && !touching && time - lastUserScrollAt > resumeDelayMs) {
        position = viewport.scrollLeft;
        autoScrolling = true;
      }

      if (autoScrolling) {
        const speed = (copyWidth() * (copies / 2)) / durationSeconds;
        position += speed * elapsedSeconds;
        wrapIntoMiddleCopy();
        viewport.scrollLeft = position;
      }

      frame = requestAnimationFrame(step);
    };

    viewport.addEventListener("touchstart", handleTouchStart, { passive: true });
    viewport.addEventListener("touchend", handleTouchEnd, { passive: true });
    viewport.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    viewport.addEventListener("scroll", handleScroll, { passive: true });
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener("touchstart", handleTouchStart);
      viewport.removeEventListener("touchend", handleTouchEnd);
      viewport.removeEventListener("touchcancel", handleTouchEnd);
      viewport.removeEventListener("scroll", handleScroll);
    };
  }, [mode, copies]);

  return (
    <div
      ref={viewportRef}
      className={`mt-8 border-y border-white/10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none] ${viewportModeClasses[mode]}`}
    >
      <div
        ref={trackRef}
        className={`flex w-max motion-reduce:w-full motion-reduce:animate-none ${trackModeClasses[mode]}`}
      >
        {children}
      </div>
    </div>
  );
}
