"use client";

import React, { useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Room } from "@/components/HeroModels/Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";

const HeroExperience: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevents SSR/Hydration mismatch before mounting on client
  }

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />
      <HeroLights />
      <Particles count={100} />
      <group
        scale={isMobile ? 0.7 : 1}
        position={[0, -3.5, 0]}
        rotation={[0, -Math.PI / 4, 0]}
      >
        <Room />
      </group>
    </Canvas>
  );
};

export default HeroExperience;
