"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { timelineRailClasses } from "@/components/experience/timelineRail";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface TimelineScrollProps {
  readonly children: ReactNode;
}

export default function TimelineScroll({ children }: TimelineScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const select = gsap.utils.selector(container);
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          select("[data-timeline-progress]"),
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          },
        );

        select("[data-timeline-node]").forEach((node) => {
          gsap.fromTo(
            node,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.4,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: node,
                start: "top center",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

        select("[data-timeline-entry]").forEach((entry) => {
          gsap.from(entry, {
            opacity: 0,
            y: 24,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: entry,
              start: "top 85%",
            },
          });
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative">
      <div aria-hidden="true" className={timelineRailClasses.track}>
        <div
          data-timeline-progress
          className="size-full bg-linear-to-b from-brand-yellow via-brand-teal to-brand-pink"
        />
      </div>
      {children}
    </div>
  );
}
