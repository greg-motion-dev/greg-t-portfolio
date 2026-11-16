import type { ReactElement } from "react";
import type { BrandShape } from "@/constants";

export interface ShapeMarkerProps {
  readonly shape: BrandShape;
  readonly className?: string;
}

function shapeGeometry(shape: BrandShape): ReactElement {
  switch (shape) {
    case "circle":
      return <circle cx="12" cy="12" r="10" />;
    case "square":
      return <rect x="3" y="3" width="18" height="18" />;
    case "diamond":
      return <polygon points="12,1 23,12 12,23 1,12" />;
    case "triangle":
      return <polygon points="12,2 23,22 1,22" />;
  }
}

export default function ShapeMarker({ shape, className }: ShapeMarkerProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {shapeGeometry(shape)}
    </svg>
  );
}
