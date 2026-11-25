"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useFinePointer, useReducedMotion } from "@/hooks/useMediaQuery";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";

const FluidCanvas = dynamic(() => import("@/components/fluid/FluidCanvas"), { ssr: false });

export default function ContactFluid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, false);
  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const webGLSupported = useWebGLSupport();
  const [hasEntered, setHasEntered] = useState(false);

  if (inView && !hasEntered) {
    setHasEntered(true);
  }

  const enabled = webGLSupported && !reducedMotion;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_4rem,black_80%,transparent)]"
    >
      {enabled && hasEntered ? (
        <FluidCanvas active={inView} mode={finePointer ? "interactive" : "ambient"} />
      ) : null}
    </div>
  );
}
