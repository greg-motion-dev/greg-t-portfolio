"use client";

import { useEffect, useRef } from "react";
import { useBrandColors, type BrandColors } from "@/hooks/useBrandColors";
import { createAmbientStroke } from "./ambientStroke";
import { createFluidSimulation, type FluidColor, type FluidSimulation } from "./fluidSimulation";
import {
  fluidAmbientSettings,
  fluidAmbientSimulationSettings,
  fluidColorBoost,
  fluidSettings,
  type FluidMode,
} from "./fluidConfig";

export interface FluidCanvasProps {
  readonly active: boolean;
  readonly mode: FluidMode;
}

const paletteOrder = ["yellow", "teal", "pink"] as const;

function hexToFluidColor(hex: string, boost: number): FluidColor {
  const value = Number.parseInt(hex.replace("#", ""), 16);
  return {
    r: (((value >> 16) & 255) / 255) * boost,
    g: (((value >> 8) & 255) / 255) * boost,
    b: ((value & 255) / 255) * boost,
  };
}

function toPalette(colors: BrandColors): readonly FluidColor[] {
  return paletteOrder.map((accent) => hexToFluidColor(colors[accent], fluidColorBoost[accent]));
}

const simulationSettings = {
  interactive: fluidSettings,
  ambient: fluidAmbientSimulationSettings,
} as const;

const randomAmbientDelayMs = (): number => {
  const { minIntervalSeconds, maxIntervalSeconds } = fluidAmbientSettings;
  return (minIntervalSeconds + Math.random() * (maxIntervalSeconds - minIntervalSeconds)) * 1000;
};

const isHoverPointer = (event: PointerEvent): boolean =>
  event.pointerType === "mouse" || event.pointerType === "pen";

export default function FluidCanvas({ active, mode }: FluidCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simulationRef = useRef<FluidSimulation | null>(null);
  const colors = useBrandColors();

  useEffect(() => {
    const canvas = canvasRef.current;
    const interactionArea = canvas?.closest("section");
    if (
      canvas === null ||
      interactionArea === null ||
      interactionArea === undefined ||
      colors === null
    ) {
      return;
    }
    const simulation = createFluidSimulation(canvas, toPalette(colors), simulationSettings[mode]);
    if (simulation === null) {
      return;
    }
    simulationRef.current = simulation;
    simulation.introSplats();

    if (mode === "ambient") {
      return () => {
        simulation.dispose();
        simulationRef.current = null;
      };
    }

    const relativePosition = (event: PointerEvent): { x: number; y: number } => {
      const bounds = canvas.getBoundingClientRect();
      return {
        x: (event.clientX - bounds.left) / bounds.width,
        y: (event.clientY - bounds.top) / bounds.height,
      };
    };
    const handlePointerMove = (event: PointerEvent): void => {
      if (!isHoverPointer(event)) {
        return;
      }
      const { x, y } = relativePosition(event);
      simulation.movePointer(x, y);
    };
    const handlePointerDown = (event: PointerEvent): void => {
      if (!isHoverPointer(event)) {
        return;
      }
      const { x, y } = relativePosition(event);
      simulation.burst(x, y);
    };
    const handlePointerLeave = (): void => simulation.releasePointer();

    interactionArea.addEventListener("pointermove", handlePointerMove);
    interactionArea.addEventListener("pointerleave", handlePointerLeave);
    interactionArea.addEventListener("pointerdown", handlePointerDown);

    return () => {
      interactionArea.removeEventListener("pointermove", handlePointerMove);
      interactionArea.removeEventListener("pointerleave", handlePointerLeave);
      interactionArea.removeEventListener("pointerdown", handlePointerDown);
      simulation.dispose();
      simulationRef.current = null;
    };
  }, [colors, mode]);

  useEffect(() => {
    const simulation = simulationRef.current;
    if (simulation === null) {
      return;
    }
    if (!active) {
      simulation.stop();
      return;
    }
    if (mode === "interactive") {
      simulation.start();
      return () => simulation.stop();
    }

    let strokeTimer: number | null = null;
    let fadeTimer: number | null = null;
    let strokeFrame: number | null = null;

    const clearPending = (): void => {
      if (strokeTimer !== null) {
        window.clearTimeout(strokeTimer);
      }
      if (fadeTimer !== null) {
        window.clearTimeout(fadeTimer);
      }
      if (strokeFrame !== null) {
        cancelAnimationFrame(strokeFrame);
      }
    };

    const runStroke = (): void => {
      const stroke = createAmbientStroke();
      const startTime = performance.now();
      if (fadeTimer !== null) {
        window.clearTimeout(fadeTimer);
      }
      simulation.start();

      const tick = (now: number): void => {
        const progress = Math.min((now - startTime) / stroke.durationMs, 1);
        const { x, y } = stroke.pointAt(progress);
        simulation.movePointer(x, y);
        if (progress < 1) {
          strokeFrame = requestAnimationFrame(tick);
          return;
        }
        strokeFrame = null;
        simulation.releasePointer();
        fadeTimer = window.setTimeout(
          () => simulation.stop(),
          fluidAmbientSettings.fadeSeconds * 1000,
        );
        scheduleStroke();
      };
      strokeFrame = requestAnimationFrame(tick);
    };

    const scheduleStroke = (): void => {
      strokeTimer = window.setTimeout(runStroke, randomAmbientDelayMs());
    };

    runStroke();

    return () => {
      clearPending();
      simulation.releasePointer();
      simulation.stop();
    };
  }, [active, colors, mode]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 size-full" />;
}
