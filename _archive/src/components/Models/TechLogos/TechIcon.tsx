"use client";

import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { TechStackIcon } from "@/constants";

export interface TechIconProps {
  model: TechStackIcon;
}

const TechModel: React.FC<TechIconProps> = ({ model }) => {
  const scene = useGLTF(model.modelPath);

  useEffect(() => {
    if (model.name === "Interactive Developer") {
      scene.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh && child.name === "Object_5") {
          (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
            color: "white",
          });
        }
      });
    }
  }, [scene, model.name]);

  return (
    <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
      <group
        scale={model.scale}
        rotation={model.rotation as unknown as [number, number, number]}
      >
        <primitive object={scene.scene} />
      </group>
    </Float>
  );
};

const TechIcon: React.FC<TechIconProps> = ({ model }) => {
  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} />
      <Suspense fallback={null}>
        <TechModel model={model} />
      </Suspense>
    </Canvas>
  );
};

export default TechIcon;
