"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { orbitScene } from "./orbitConfig";

export interface OrbitInteractionProps {
  readonly returnToRest: boolean;
  readonly onFirstInteraction: () => void;
}

interface InteractionState {
  active: boolean;
  releasedAt: number;
}

const restPosition = new Vector3(0, 0, orbitScene.cameraDistance);

export default function OrbitInteraction({
  returnToRest,
  onFirstInteraction,
}: OrbitInteractionProps) {
  const camera = useThree((state) => state.camera);
  const domElement = useThree((state) => state.gl.domElement);
  const invalidate = useThree((state) => state.invalidate);
  const controlsRef = useRef<OrbitControls | null>(null);
  const interactionRef = useRef<InteractionState>({ active: false, releasedAt: 0 });

  useEffect(() => {
    const controls = new OrbitControls(camera, domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = orbitScene.dampingFactor;
    controls.rotateSpeed = orbitScene.rotateSpeed;

    const handleStart = (): void => {
      interactionRef.current.active = true;
      onFirstInteraction();
    };
    const handleEnd = (): void => {
      interactionRef.current.active = false;
      interactionRef.current.releasedAt = performance.now();
    };
    const handleChange = (): void => invalidate();

    controls.addEventListener("start", handleStart);
    controls.addEventListener("end", handleEnd);
    controls.addEventListener("change", handleChange);
    controlsRef.current = controls;

    return () => {
      controls.removeEventListener("start", handleStart);
      controls.removeEventListener("end", handleEnd);
      controls.removeEventListener("change", handleChange);
      controls.dispose();
      controlsRef.current = null;
    };
  }, [camera, domElement, invalidate, onFirstInteraction]);

  useFrame((state, delta) => {
    const controls = controlsRef.current;
    if (controls === null) {
      return;
    }
    const interaction = interactionRef.current;
    const idleSeconds = (performance.now() - interaction.releasedAt) / 1000;
    if (returnToRest && !interaction.active && idleSeconds > orbitScene.returnDelay) {
      state.camera.position
        .lerp(restPosition, 1 - Math.exp(-delta * orbitScene.returnSpeed))
        .setLength(orbitScene.cameraDistance);
    }
    controls.update(delta);
  });

  return null;
}
