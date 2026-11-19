"use client";

import { useEffect, useRef } from "react";
import { useBrandColors, type BrandColors } from "@/hooks/useBrandColors";
import { createFluidSimulation, type FluidColor, type FluidSimulation } from "./fluidSimulation";
import { fluidColorBoost, fluidSettings } from "./fluidConfig";

export interface FluidCanvasProps {
  readonly active: boolean;
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

const isHoverPointer = (event: PointerEvent): boolean =>
  event.pointerType === "mouse" || event.pointerType === "pen";

export default function FluidCanvas({ active }: FluidCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simulationRef = useRef<FluidSimulation | null>(null);
  const colors = useBrandColors();

  useEffect(() => {
    const canvas = canvasRef.current;
    const interactionArea = canvas?.closest("section");
    if (canvas === null || interactionArea === null || interactionArea === undefined || colors === null) {
      return;
    }
    const simulation = createFluidSimulation(canvas, toPalette(colors), fluidSettings);
    if (simulation === null) {
      return;
    }
    simulationRef.current = simulation;
    simulation.introSplats();

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
  }, [colors]);

  useEffect(() => {
    const simulation = simulationRef.current;
    if (simulation === null) {
      return;
    }
    if (active) {
      simulation.start();
    } else {
      simulation.stop();
    }
  }, [active, colors]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 size-full" />;
}
