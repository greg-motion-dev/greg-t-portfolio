"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferAttribute,
  BufferGeometry,
  Vector3,
  type Camera,
  type Points,
  type ShaderMaterial,
} from "three";
import { createSeededRandom, randomBetween, type RandomSource } from "@/lib/seededRandom";
import { createStarGlintMaterial } from "@/shaders/starGlint";
import { starGlint } from "./orbitConfig";

export interface StarGlintProps {
  readonly candidates: readonly Vector3[];
  readonly animate: boolean;
  readonly tintColor: string;
}

interface GlintSchedule {
  star: Vector3 | null;
  startedAt: number;
  nextAt: number;
}

function nextGlintDelay(random: RandomSource): number {
  return randomBetween(random, starGlint.interval.min, starGlint.interval.max);
}

function isInScreenBand(star: Vector3, camera: Camera, scratch: Vector3): boolean {
  scratch.copy(star).applyMatrix4(camera.matrixWorldInverse);
  if (scratch.z >= 0) {
    return false;
  }
  scratch.applyMatrix4(camera.projectionMatrix);
  const distanceFromCenter = Math.hypot(scratch.x, scratch.y);
  const inBand =
    distanceFromCenter >= starGlint.screenBand.min &&
    distanceFromCenter <= starGlint.screenBand.max;
  const overText =
    Math.abs(scratch.x) < starGlint.textClearance.halfWidth &&
    scratch.y < starGlint.textClearance.top;
  return inBand && !overText;
}

export default function StarGlint({ candidates, animate, tintColor }: StarGlintProps) {
  const pointsRef = useRef<Points<BufferGeometry, ShaderMaterial>>(null);
  const random = useMemo(() => createSeededRandom(starGlint.seed), []);
  const scratch = useMemo(() => new Vector3(), []);
  const schedule = useRef<GlintSchedule>({
    star: null,
    startedAt: 0,
    nextAt: starGlint.interval.min,
  });

  const resources = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(new Float32Array(3), 3));
    const material = createStarGlintMaterial({
      size: starGlint.size,
      turn: starGlint.turn,
      rayWidth: starGlint.rayWidth,
      tint: starGlint.tint,
      tintColor,
    });
    return { geometry, material };
  }, [tintColor]);

  useEffect(
    () => () => {
      resources.geometry.dispose();
      resources.material.dispose();
    },
    [resources],
  );

  const pickStar = (camera: Camera): Vector3 | null => {
    for (let attempt = 0; attempt < starGlint.pickAttempts; attempt++) {
      const star = candidates[Math.floor(random() * candidates.length)];
      if (star !== undefined && isInScreenBand(star, camera, scratch)) {
        return star;
      }
    }
    return null;
  };

  useFrame((state) => {
    const uniforms = pointsRef.current?.material.uniforms;
    const progressUniform = uniforms?.uProgress;
    const positionUniform = uniforms?.uStarPosition;
    const pixelRatioUniform = uniforms?.uPixelRatio;
    if (progressUniform === undefined || positionUniform === undefined) {
      return;
    }
    if (pixelRatioUniform !== undefined) {
      pixelRatioUniform.value = state.viewport.dpr;
    }

    const current = schedule.current;
    const time = state.clock.elapsedTime;

    if (!animate || candidates.length === 0) {
      current.star = null;
      progressUniform.value = 0;
      return;
    }

    if (current.star === null && time >= current.nextAt) {
      current.star = pickStar(state.camera);
      current.startedAt = time;
      if (current.star === null) {
        current.nextAt = time + nextGlintDelay(random);
      }
    }

    if (current.star === null) {
      progressUniform.value = 0;
      return;
    }

    const progress = (time - current.startedAt) / starGlint.duration;
    if (progress >= 1) {
      current.star = null;
      current.nextAt = time + nextGlintDelay(random);
      progressUniform.value = 0;
      return;
    }

    positionUniform.value = current.star;
    progressUniform.value = progress;
  });

  return (
    <points
      ref={pointsRef}
      geometry={resources.geometry}
      material={resources.material}
      frustumCulled={false}
    />
  );
}
