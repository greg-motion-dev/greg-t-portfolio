import type { AccentColor } from "@/constants";
import type { FluidSettings } from "./fluidSimulation";

export type FluidMode = "interactive" | "ambient";

export interface FluidAmbientSettings {
  readonly minIntervalSeconds: number;
  readonly maxIntervalSeconds: number;
  readonly minStrokeSeconds: number;
  readonly maxStrokeSeconds: number;
  readonly strokeCurve: number;
  readonly strokeInset: number;
  readonly minStrokeLength: number;
  readonly fadeSeconds: number;
}

export const fluidSettings = {
  simResolution: 64,
  dyeResolution: 512,
  densityDissipation: 3.5,
  velocityDissipation: 2,
  pressure: 0.1,
  pressureIterations: 20,
  curl: 3,
  splatRadius: 0.25,
  splatForce: 6000,
  colorIntensity: 0.12,
  colorCycleSeconds: 0.9,
  opacity: 0.85,
  maxPixelRatio: 1.5,
  introSplatForce: 600,
  burstColorMultiplier: 10,
} as const satisfies FluidSettings;

export const fluidColorBoost = {
  yellow: 1.4,
  teal: 1,
  pink: 1,
} as const satisfies Record<AccentColor, number>;

export const fluidAmbientSimulationSettings = {
  ...fluidSettings,
  dyeResolution: 256,
  maxPixelRatio: 1,
  densityDissipation: 1.2,
  velocityDissipation: 0.8,
  colorIntensity: 0.04,
} as const satisfies FluidSettings;

export const fluidAmbientSettings = {
  minIntervalSeconds: 5,
  maxIntervalSeconds: 9,
  minStrokeSeconds: 2,
  maxStrokeSeconds: 3.2,
  strokeCurve: 0.2,
  strokeInset: 0.12,
  minStrokeLength: 0.45,
  fadeSeconds: 3,
} as const satisfies FluidAmbientSettings;
