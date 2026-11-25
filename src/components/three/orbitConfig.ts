import type { ProjectDiscipline } from "@/constants";

export interface OrbitRingConfig {
  readonly discipline: ProjectDiscipline;
  readonly radius: number;
  readonly compactRadiusScale: number;
  readonly narrowRadiusScale: number;
  readonly tiltDeg: number;
  readonly rollDeg: number;
  readonly speed: number;
  readonly phase: number;
  readonly bodyCount: number;
  readonly bodySize: number;
}

export interface OrbitSceneConfig {
  readonly cameraDistance: number;
  readonly fov: number;
  readonly canvasToPortraitRatio: number;
  readonly compactRingScale: number;
  readonly portraitEdgeInset: number;
  readonly shadowSpread: number;
  readonly shadowStrength: number;
  readonly glowWidth: number;
  readonly glowStrength: number;
  readonly glowPulseMin: number;
  readonly glowPulsePeriod: number;
  readonly ringTube: number;
  readonly ringOpacity: number;
  readonly pathOpacity: number;
  readonly pathDepthFade: number;
  readonly trailHold: number;
  readonly trailFade: number;
  readonly bodySpin: number;
  readonly introDuration: number;
  readonly introStartScale: number;
  readonly nudgeDelay: number;
  readonly nudgeDuration: number;
  readonly nudgeAngleDeg: number;
  readonly returnDelay: number;
  readonly returnSpeed: number;
  readonly rotateSpeed: number;
  readonly dampingFactor: number;
}

export const orbitScene = {
  cameraDistance: 10,
  fov: 35,
  canvasToPortraitRatio: 7 / 0.95,
  compactRingScale: 0.7,
  portraitEdgeInset: 0.985,
  shadowSpread: 1.7,
  shadowStrength: 0.9,
  glowWidth: 0.05,
  glowStrength: 0.55,
  glowPulseMin: 0.35,
  glowPulsePeriod: 6,
  ringTube: 0.0024,
  ringOpacity: 0.7,
  pathOpacity: 0.1,
  pathDepthFade: 0.4,
  trailHold: 3,
  trailFade: 2,
  bodySpin: 0.6,
  introDuration: 1.2,
  introStartScale: 0.7,
  nudgeDelay: 1.5,
  nudgeDuration: 2.4,
  nudgeAngleDeg: 12,
  returnDelay: 1.5,
  returnSpeed: 2,
  rotateSpeed: 0.6,
  dampingFactor: 0.08,
} as const satisfies OrbitSceneConfig;

export const orbitRings = [
  {
    discipline: "motion",
    radius: 1.05,
    compactRadiusScale: 1,
    narrowRadiusScale: 1,
    tiltDeg: 72,
    rollDeg: 14,
    speed: 0.14,
    phase: 0.4,
    bodyCount: 2,
    bodySize: 0.15,
  },
  {
    discipline: "design",
    radius: 1.5,
    compactRadiusScale: 1,
    narrowRadiusScale: 1,
    tiltDeg: 68,
    rollDeg: -18,
    speed: -0.1,
    phase: 1.7,
    bodyCount: 3,
    bodySize: 0.15,
  },
  {
    discipline: "frontend",
    radius: 2.0,
    compactRadiusScale: 0.9,
    narrowRadiusScale: 0.86,
    tiltDeg: 76,
    rollDeg: 16,
    speed: 0.07,
    phase: 2.9,
    bodyCount: 3,
    bodySize: 0.13,
  },
] as const satisfies readonly OrbitRingConfig[];

export type OrbitLayout = "wide" | "compact" | "narrow";

export function layoutRingScale(layout: OrbitLayout): number {
  return layout === "wide" ? 1 : orbitScene.compactRingScale;
}

export function ringRadiusScale(
  ring: OrbitRingConfig,
  layout: OrbitLayout,
): number {
  const scales = {
    wide: 1,
    compact: ring.compactRadiusScale,
    narrow: ring.narrowRadiusScale,
  } as const satisfies Record<OrbitLayout, number>;
  return scales[layout];
}

export function viewHalfExtent(): number {
  return orbitScene.cameraDistance * Math.tan((orbitScene.fov * Math.PI) / 360);
}

export function portraitRadius(): number {
  return viewHalfExtent() / orbitScene.canvasToPortraitRatio;
}

export function portraitEdgeRadius(): number {
  return portraitRadius() * orbitScene.portraitEdgeInset;
}

export function portraitOccluderRadius(): number {
  const radius = portraitEdgeRadius();
  const distance = orbitScene.cameraDistance;
  const silhouetteRadius =
    (radius * distance) / Math.sqrt(distance ** 2 + radius ** 2);
  return silhouetteRadius;
}

export interface Range {
  readonly min: number;
  readonly max: number;
}

export interface StarfieldConfig {
  readonly seed: number;
  readonly count: number;
  readonly radius: Range;
  readonly brightness: Range;
  readonly size: Range;
  readonly twinkleShare: number;
  readonly twinklePeriod: Range;
  readonly twinklePeak: number;
  readonly edgeFadeStart: number;
}

export const starfield = {
  seed: 1987,
  count: 2400,
  radius: { min: 18, max: 30 },
  brightness: { min: 0.1, max: 0.3 },
  size: { min: 1, max: 1.6 },
  twinkleShare: 0.2,
  twinklePeriod: { min: 6, max: 10 },
  twinklePeak: 1,
  edgeFadeStart: 0.55,
} as const satisfies StarfieldConfig;

export interface GlintClearance {
  readonly halfWidth: number;
  readonly top: number;
}

export interface StarGlintConfig {
  readonly seed: number;
  readonly interval: Range;
  readonly duration: number;
  readonly size: number;
  readonly turn: number;
  readonly rayWidth: number;
  readonly tint: number;
  readonly screenBand: Range;
  readonly textClearance: GlintClearance;
  readonly pickAttempts: number;
}

export const starGlint = {
  seed: 1987,
  interval: { min: 4, max: 8 },
  duration: 1.2,
  size: 26,
  turn: 0.5,
  rayWidth: 0.07,
  tint: 0,
  screenBand: { min: 0.35, max: 0.85 },
  textClearance: { halfWidth: 0.5, top: -0.18 },
  pickAttempts: 12,
} as const satisfies StarGlintConfig;
