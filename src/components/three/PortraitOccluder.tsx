"use client";

import { portraitOccluderRadius } from "./orbitConfig";

const occluderRadius = portraitOccluderRadius();

export default function PortraitOccluder() {
  return (
    <mesh renderOrder={-1}>
      <sphereGeometry args={[occluderRadius, 48, 24]} />
      <meshBasicMaterial colorWrite={false} />
    </mesh>
  );
}
