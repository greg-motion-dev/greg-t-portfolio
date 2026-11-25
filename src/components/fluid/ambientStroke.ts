import { fluidAmbientSettings } from "./fluidConfig";

export interface StrokePoint {
  readonly x: number;
  readonly y: number;
}

export interface AmbientStroke {
  readonly durationMs: number;
  readonly pointAt: (progress: number) => StrokePoint;
}

const randomBetween = (min: number, max: number): number => min + Math.random() * (max - min);

const easeInOut = (progress: number): number => 0.5 - 0.5 * Math.cos(Math.PI * progress);

function randomEndpoints(): readonly [StrokePoint, StrokePoint] {
  const { strokeInset, minStrokeLength } = fluidAmbientSettings;
  const randomPoint = (): StrokePoint => ({
    x: randomBetween(strokeInset, 1 - strokeInset),
    y: randomBetween(strokeInset, 1 - strokeInset),
  });
  const start = randomPoint();
  let end = randomPoint();
  while (Math.hypot(end.x - start.x, end.y - start.y) < minStrokeLength) {
    end = randomPoint();
  }
  return [start, end];
}

export function createAmbientStroke(): AmbientStroke {
  const { minStrokeSeconds, maxStrokeSeconds, strokeCurve } = fluidAmbientSettings;
  const [start, end] = randomEndpoints();
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const length = Math.hypot(deltaX, deltaY);
  const normalX = -deltaY / length;
  const normalY = deltaX / length;
  const bend = randomBetween(-strokeCurve, strokeCurve);

  return {
    durationMs: randomBetween(minStrokeSeconds, maxStrokeSeconds) * 1000,
    pointAt: (progress) => {
      const eased = easeInOut(progress);
      const offset = Math.sin(Math.PI * eased) * bend;
      return {
        x: start.x + deltaX * eased + normalX * offset,
        y: start.y + deltaY * eased + normalY * offset,
      };
    },
  };
}
