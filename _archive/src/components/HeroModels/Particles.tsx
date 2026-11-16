import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleData {
  position: [number, number, number];
  speed: number;
}

interface ParticlesProps {
  count?: number;
}

const Particles: React.FC<ParticlesProps> = ({ count = 200 }) => {
  const mesh = useRef<THREE.Points>(null);

  const particles = useMemo<ParticleData[]>(() => {
    const temp: ParticleData[] = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          Math.random() * 10 + 5, // higher starting point
          (Math.random() - 0.5) * 10,
        ],
        speed: 0.005 + Math.random() * 0.001,
      });
    }
    return temp;
  }, [count]);

  const positions = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      posArray[i * 3] = p.position[0];
      posArray[i * 3 + 1] = p.position[1];
      posArray[i * 3 + 2] = p.position[2];
    });
    return posArray;
  }, [particles, count]);

  useFrame(() => {
    if (!mesh.current) return;

    const positionAttribute = mesh.current.geometry.attributes.position;
    const array = positionAttribute.array as Float32Array;

    for (let i = 0; i < count; i++) {
      let y = array[i * 3 + 1];
      y -= particles[i].speed;
      if (y < -2) y = Math.random() * 10 + 5;
      array[i * 3 + 1] = y;
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#35fff8"
        size={0.07}
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
};

export default Particles;
