"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PlaneGeometry, type Mesh, type ShaderMaterial } from "three";
import type { BrandColors } from "@/hooks/useBrandColors";
import { createPortraitShadowMaterial } from "@/shaders/portraitShadow";
import { orbitScene, portraitEdgeRadius, portraitRadius } from "./orbitConfig";

const shadowRenderOrder = 10;
const restingPulseTime = orbitScene.glowPulsePeriod / 2;

export interface PortraitShadowProps {
  readonly colors: BrandColors;
  readonly animate: boolean;
}

export default function PortraitShadow({ colors, animate }: PortraitShadowProps) {
  const meshRef = useRef<Mesh<PlaneGeometry, ShaderMaterial>>(null);

  const resources = useMemo(() => {
    const innerRadius = portraitEdgeRadius();
    const outerRadius = portraitRadius() * orbitScene.shadowSpread;
    return {
      geometry: new PlaneGeometry(outerRadius * 2, outerRadius * 2),
      material: createPortraitShadowMaterial({
        innerRadius,
        outerRadius,
        strength: orbitScene.shadowStrength,
        glowColor: colors.yellow,
        glowWidth: portraitRadius() * orbitScene.glowWidth,
        glowStrength: orbitScene.glowStrength,
        glowPulseMin: orbitScene.glowPulseMin,
        glowPulsePeriod: orbitScene.glowPulsePeriod,
      }),
    };
  }, [colors.yellow]);

  useEffect(
    () => () => {
      resources.geometry.dispose();
      resources.material.dispose();
    },
    [resources],
  );

  useFrame((state) => {
    const mesh = meshRef.current;
    if (mesh === null) {
      return;
    }
    mesh.quaternion.copy(state.camera.quaternion);
    const timeUniform = mesh.material.uniforms.uTime;
    if (timeUniform !== undefined) {
      timeUniform.value = animate ? state.clock.elapsedTime : restingPulseTime;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={resources.geometry}
      material={resources.material}
      renderOrder={shadowRenderOrder}
    />
  );
}
