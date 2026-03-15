import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ReactorCoreProps {
  explodeProgress: number;
}

const ReactorCore = ({ explodeProgress }: ReactorCoreProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Pulse
    const pulse = 1 + Math.sin(t * 2) * 0.05;
    meshRef.current.scale.setScalar(pulse);

    // Glow pulse
    if (glowRef.current) {
      const glowPulse = 1.2 + Math.sin(t * 1.5) * 0.1;
      glowRef.current.scale.setScalar(glowPulse);
    }
  });

  return (
    <group>
      {/* Inner core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.5, 3]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={2}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <icosahedronGeometry args={[0.7, 2]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={0.5}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer containment shell */}
      <mesh position={[0, explodeProgress * 2.5, 0]}>
        <sphereGeometry args={[1.8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.3}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, -explodeProgress * 2.5, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[1.8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.3}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export default ReactorCore;
