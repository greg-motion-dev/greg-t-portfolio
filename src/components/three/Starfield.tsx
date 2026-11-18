"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferAttribute, BufferGeometry, type Points, type ShaderMaterial } from "three";
import { createSeededRandom, randomBetween } from "@/lib/seededRandom";
import { createStarfieldMaterial } from "@/shaders/starfield";
import { starfield } from "./orbitConfig";

export interface StarfieldProps {
  readonly animate: boolean;
}

function createStarGeometry(): BufferGeometry {
  const random = createSeededRandom(starfield.seed);
  const positions = new Float32Array(starfield.count * 3);
  const brightness = new Float32Array(starfield.count);
  const sizes = new Float32Array(starfield.count);
  const twinkles = new Float32Array(starfield.count);
  const phases = new Float32Array(starfield.count);
  const periods = new Float32Array(starfield.count);

  for (let index = 0; index < starfield.count; index++) {
    const cosPolar = randomBetween(random, -1, 1);
    const sinPolar = Math.sqrt(1 - cosPolar ** 2);
    const azimuth = randomBetween(random, 0, Math.PI * 2);
    const radius = randomBetween(random, starfield.radius.min, starfield.radius.max);

    positions[index * 3] = radius * sinPolar * Math.cos(azimuth);
    positions[index * 3 + 1] = radius * sinPolar * Math.sin(azimuth);
    positions[index * 3 + 2] = radius * cosPolar;
    brightness[index] = randomBetween(random, starfield.brightness.min, starfield.brightness.max);
    sizes[index] = randomBetween(random, starfield.size.min, starfield.size.max);
    twinkles[index] = random() < starfield.twinkleShare ? 1 : 0;
    phases[index] = random();
    periods[index] = randomBetween(random, starfield.twinklePeriod.min, starfield.twinklePeriod.max);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("aBrightness", new BufferAttribute(brightness, 1));
  geometry.setAttribute("aSize", new BufferAttribute(sizes, 1));
  geometry.setAttribute("aTwinkle", new BufferAttribute(twinkles, 1));
  geometry.setAttribute("aPhase", new BufferAttribute(phases, 1));
  geometry.setAttribute("aPeriod", new BufferAttribute(periods, 1));
  return geometry;
}

export default function Starfield({ animate }: StarfieldProps) {
  const pointsRef = useRef<Points<BufferGeometry, ShaderMaterial>>(null);

  const resources = useMemo(
    () => ({
      geometry: createStarGeometry(),
      material: createStarfieldMaterial({
        twinklePeak: starfield.twinklePeak,
        edgeFadeStart: starfield.edgeFadeStart,
      }),
    }),
    [],
  );

  useEffect(
    () => () => {
      resources.geometry.dispose();
      resources.material.dispose();
    },
    [resources],
  );

  useFrame((state) => {
    const uniforms = pointsRef.current?.material.uniforms;
    if (uniforms === undefined) {
      return;
    }
    const timeUniform = uniforms.uTime;
    const pixelRatioUniform = uniforms.uPixelRatio;
    if (timeUniform !== undefined) {
      timeUniform.value = animate ? state.clock.elapsedTime : 0;
    }
    if (pixelRatioUniform !== undefined) {
      pixelRatioUniform.value = state.viewport.dpr;
    }
  });

  return <points ref={pointsRef} geometry={resources.geometry} material={resources.material} />;
}
