import type { CSSProperties } from "react";
import {
  orbitRings,
  orbitScene,
  viewHalfExtent,
  type OrbitRingConfig,
} from "@/components/three/orbitConfig";

export interface OrbitFallbackProps {
  readonly visible: boolean;
}

const visibilityClasses = {
  visible: "opacity-100",
  hidden: "opacity-0",
} as const;

function ringStyle(ring: OrbitRingConfig): CSSProperties {
  const diameterPercent = (ring.radius / viewHalfExtent()) * 100;
  const heightPercent = diameterPercent * Math.cos((ring.tiltDeg * Math.PI) / 180);
  return {
    width: `${diameterPercent}%`,
    height: `${heightPercent}%`,
    transform: `translate(-50%, -50%) rotate(${-ring.rollDeg}deg)`,
  };
}

const portraitPercent = 100 / orbitScene.canvasToPortraitRatio;
const shadowPercent = portraitPercent * orbitScene.shadowSpread;
const portraitMask = `radial-gradient(circle closest-side, transparent ${portraitPercent}%, black ${shadowPercent}%)`;
const maskStyle: CSSProperties = { maskImage: portraitMask, WebkitMaskImage: portraitMask };

export default function OrbitFallback({ visible }: OrbitFallbackProps) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${visibilityClasses[visible ? "visible" : "hidden"]}`}
      style={maskStyle}
    >
      {orbitRings.map((ring) => (
        <div
          key={ring.discipline}
          className="absolute top-1/2 left-1/2 rounded-[50%] border border-white/10"
          style={ringStyle(ring)}
        />
      ))}
    </div>
  );
}
