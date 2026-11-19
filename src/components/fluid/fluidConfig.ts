import type { AccentColor } from "@/constants";
import type { FluidSettings } from "./fluidSimulation";

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
