"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { useFinePointer, useReducedMotion } from "@/hooks/useMediaQuery";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import OrbitFallback from "./OrbitFallback";
import { useOrbitState } from "./OrbitStateProvider";

const OrbitalCanvas = dynamic(() => import("@/components/three/OrbitalCanvas"), {
  ssr: false,
});

const pointerClasses = {
  interactive: "cursor-grab active:cursor-grabbing",
  passive: "pointer-events-none",
} as const;

const canvasVisibilityClasses = {
  visible: "opacity-100",
  hidden: "opacity-0",
} as const;

export default function HeroOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);
  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const webGLSupported = useWebGLSupport();
  const { ready, markReady, markInteracted } = useOrbitState();
  const interactive = webGLSupported && finePointer;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute top-1/2 left-1/2 -z-10 size-[70rem] -translate-x-1/2 -translate-y-1/2 md:size-[91rem] ${pointerClasses[interactive ? "interactive" : "passive"]}`}
    >
      <OrbitFallback visible={!ready} />
      {webGLSupported ? (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${canvasVisibilityClasses[ready ? "visible" : "hidden"]}`}
        >
          <OrbitalCanvas
            animate={!reducedMotion}
            interactive={interactive}
            active={inView}
            onReady={markReady}
            onFirstInteraction={markInteracted}
          />
        </div>
      ) : null}
    </div>
  );
}
