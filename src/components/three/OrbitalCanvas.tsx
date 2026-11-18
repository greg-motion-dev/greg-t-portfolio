"use client";

import { Suspense, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { useBrandColors } from "@/hooks/useBrandColors";
import OrbitInteraction from "./OrbitInteraction";
import OrbitRing from "./OrbitRing";
import PortraitOccluder from "./PortraitOccluder";
import PortraitShadow from "./PortraitShadow";
import Starfield from "./Starfield";
import { orbitRings, orbitScene } from "./orbitConfig";

export interface OrbitalCanvasProps {
  readonly animate: boolean;
  readonly interactive: boolean;
  readonly active: boolean;
  readonly onReady: () => void;
  readonly onFirstInteraction: () => void;
}

interface IntroGroupProps {
  readonly animate: boolean;
  readonly children: ReactNode;
}

const nudgeAmplitude = (orbitScene.nudgeAngleDeg * Math.PI) / 180;

function nudgeAngle(elapsed: number): number {
  const progress = (elapsed - orbitScene.nudgeDelay) / orbitScene.nudgeDuration;
  if (progress <= 0 || progress >= 1) {
    return 0;
  }
  const eased = 0.5 - 0.5 * Math.cos(Math.PI * progress);
  return nudgeAmplitude * Math.sin(Math.PI * eased);
}

function IntroGroup({ animate, children }: IntroGroupProps) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    const group = groupRef.current;
    if (group === null) {
      return;
    }
    const progress = animate
      ? Math.min(state.clock.elapsedTime / orbitScene.introDuration, 1)
      : 1;
    const eased = 1 - (1 - progress) ** 3;
    group.scale.setScalar(
      orbitScene.introStartScale + (1 - orbitScene.introStartScale) * eased,
    );
    group.rotation.y = animate ? nudgeAngle(state.clock.elapsedTime) : 0;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function OrbitalCanvas({
  animate,
  interactive,
  active,
  onReady,
  onFirstInteraction,
}: OrbitalCanvasProps) {
  const colors = useBrandColors();

  if (colors === null) {
    return null;
  }

  const frameloop = !active ? "never" : animate ? "always" : "demand";

  return (
    <Canvas
      flat
      dpr={[1, 2]}
      frameloop={frameloop}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, orbitScene.cameraDistance], fov: orbitScene.fov }}
      onCreated={onReady}
    >
      <Suspense fallback={null}>
        <Starfield animate={animate} />
        <PortraitOccluder />
        <PortraitShadow colors={colors} animate={animate} />
        <IntroGroup animate={animate}>
          {orbitRings.map((ring) => (
            <OrbitRing key={ring.discipline} ring={ring} colors={colors} animate={animate} />
          ))}
        </IntroGroup>
        {interactive ? <OrbitInteraction returnToRest={animate} onFirstInteraction={onFirstInteraction} /> : null}
      </Suspense>
    </Canvas>
  );
}
