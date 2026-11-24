import type { AccentColor, DisciplineShape } from "@/constants";

interface CvOrbitRing {
  readonly rx: number;
  readonly ry: number;
  readonly rotate: number;
  readonly accent: AccentColor;
  readonly shape: DisciplineShape;
  readonly angle: number;
}

const orbits = [
  { rx: 20, ry: 6.5, rotate: -16, accent: "pink", shape: "triangle", angle: 158 },
  { rx: 22.5, ry: 8, rotate: 12, accent: "teal", shape: "diamond", angle: 195 },
  { rx: 27, ry: 10.5, rotate: -7, accent: "yellow", shape: "square", angle: 335 },
] as const satisfies readonly CvOrbitRing[];

const strokeClasses = {
  yellow: "stroke-brand-yellow",
  pink: "stroke-brand-pink",
  teal: "stroke-brand-teal",
} as const satisfies Record<AccentColor, string>;

const fillClasses = {
  yellow: "fill-brand-yellow",
  pink: "fill-brand-pink",
  teal: "fill-brand-teal",
} as const satisfies Record<AccentColor, string>;

const markerPaths = {
  triangle: "M0,-0.95 L0.9,0.7 L-0.9,0.7 Z",
  diamond: "M0,-1 L1,0 L0,1 L-1,0 Z",
  square: "M-0.8,-0.8 L0.8,-0.8 L0.8,0.8 L-0.8,0.8 Z",
} as const satisfies Record<DisciplineShape, string>;

export default function CvOrbit() {
  return (
    <svg
      viewBox="-26.9 -15 53.8 30"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute top-1/2 left-1/2 h-[31.8mm] w-[57mm] -translate-x-1/2 -translate-y-1/2"
    >
      {orbits.map((orbit) => {
        const radians = (orbit.angle * Math.PI) / 180;
        const x = orbit.rx * Math.cos(radians);
        const y = orbit.ry * Math.sin(radians);
        return (
          <g key={orbit.shape} transform={`rotate(${orbit.rotate})`}>
            <ellipse
              rx={orbit.rx}
              ry={orbit.ry}
              fill="none"
              strokeOpacity={0.45}
              strokeWidth={0.15}
              className={strokeClasses[orbit.accent]}
            />
            <path
              d={markerPaths[orbit.shape]}
              transform={`translate(${x.toFixed(2)} ${y.toFixed(2)})`}
              className={fillClasses[orbit.accent]}
            />
          </g>
        );
      })}
    </svg>
  );
}
