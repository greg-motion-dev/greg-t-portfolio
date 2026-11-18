"use client";

import { heroOrbitHint } from "@/constants";
import RotateIcon from "@/components/icons/RotateIcon";
import { useFinePointer } from "@/hooks/useMediaQuery";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { useOrbitState } from "./OrbitStateProvider";

const hintVisibilityClasses = {
  visible: "opacity-100",
  hidden: "opacity-0",
} as const;

export default function OrbitHint() {
  const { ready, hasInteracted } = useOrbitState();
  const finePointer = useFinePointer();
  const webGLSupported = useWebGLSupport();
  const visible = webGLSupported && finePointer && ready && !hasInteracted;

  return (
    <p
      aria-hidden="true"
      className={`pointer-events-none absolute right-5 bottom-6 z-10 flex items-center gap-2 font-mono text-xs whitespace-nowrap text-ink-muted transition-opacity duration-700 motion-reduce:transition-none md:right-10 md:bottom-8 ${hintVisibilityClasses[visible ? "visible" : "hidden"]}`}
    >
      <RotateIcon className="size-3.5" />
      {heroOrbitHint}
    </p>
  );
}
