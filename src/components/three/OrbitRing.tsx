"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BoxGeometry,
  OctahedronGeometry,
  TetrahedronGeometry,
  TorusGeometry,
  type BufferGeometry,
  type Mesh,
  type ShaderMaterial,
} from "three";
import { disciplineAccent, disciplineShape, type DisciplineShape } from "@/constants";
import type { BrandColors } from "@/hooks/useBrandColors";
import { createFresnelMaterial } from "@/shaders/fresnel";
import { createOrbitTrail } from "@/shaders/orbitTrail";
import { orbitScene, type OrbitRingConfig } from "./orbitConfig";

export interface OrbitRingProps {
  readonly ring: OrbitRingConfig;
  readonly colors: BrandColors;
  readonly animate: boolean;
}

const bodyGeometryFactories = {
  square: (size: number) => new BoxGeometry(size, size, size),
  diamond: (size: number) => new OctahedronGeometry(size * 0.72),
  triangle: (size: number) => new TetrahedronGeometry(size * 0.8),
} as const satisfies Record<DisciplineShape, (size: number) => BufferGeometry>;

const fullTurn = Math.PI * 2;
const degreesToRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export default function OrbitRing({ ring, colors, animate }: OrbitRingProps) {
  const bodyRefs = useRef<(Mesh | null)[]>([]);
  const ringRef = useRef<Mesh<TorusGeometry, ShaderMaterial>>(null);
  const color = colors[disciplineAccent[ring.discipline]];

  const resources = useMemo(
    () => ({
      ringGeometry: new TorusGeometry(ring.radius, orbitScene.ringTube, 8, 256),
      ringTrail: createOrbitTrail({
        color,
        opacity: orbitScene.ringOpacity,
        pathOpacity: orbitScene.pathOpacity,
        phase: ring.phase,
        speed: ring.speed,
        bodyCount: ring.bodyCount,
        hold: orbitScene.trailHold,
        fade: orbitScene.trailFade,
        radius: ring.radius,
        depthFade: orbitScene.pathDepthFade,
      }),
      bodyGeometry: bodyGeometryFactories[disciplineShape[ring.discipline]](ring.bodySize),
      bodyMaterial: createFresnelMaterial(color),
    }),
    [color, ring.radius, ring.bodySize, ring.discipline, ring.phase, ring.speed, ring.bodyCount],
  );

  useEffect(
    () => () => {
      resources.ringGeometry.dispose();
      resources.ringTrail.material.dispose();
      resources.bodyGeometry.dispose();
      resources.bodyMaterial.dispose();
    },
    [resources],
  );

  useFrame((state) => {
    const time = animate ? state.clock.elapsedTime : 0;
    const timeUniform = ringRef.current?.material.uniforms.uTime;
    if (timeUniform !== undefined) {
      timeUniform.value = time;
    }
    bodyRefs.current.forEach((body, index) => {
      if (body === null) {
        return;
      }
      const angle = ring.phase + (index * fullTurn) / ring.bodyCount + time * ring.speed;
      body.position.set(Math.cos(angle) * ring.radius, Math.sin(angle) * ring.radius, 0);
      body.rotation.set(
        index + time * orbitScene.bodySpin,
        index * 0.5 + time * orbitScene.bodySpin * 0.7,
        0,
      );
    });
  });

  return (
    <group
      rotation={[degreesToRadians(ring.tiltDeg), 0, degreesToRadians(ring.rollDeg), "ZYX"]}
    >
      <mesh
        ref={ringRef}
        geometry={resources.ringGeometry} material={resources.ringTrail.material} />
      {Array.from({ length: ring.bodyCount }, (_, index) => (
        <mesh
          key={index}
          ref={(body) => {
            bodyRefs.current[index] = body;
          }}
          geometry={resources.bodyGeometry}
          material={resources.bodyMaterial}
        />
      ))}
    </group>
  );
}
