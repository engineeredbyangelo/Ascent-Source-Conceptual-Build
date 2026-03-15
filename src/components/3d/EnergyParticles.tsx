import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface EnergyParticlesProps {
  intensity: number;
}

/**
 * Particles orbiting the tokamak in the plasma plane
 */
const EnergyParticles = ({ intensity }: EnergyParticlesProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 300;

  const { positions, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const off = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      // Concentrate particles around the plasma torus region
      const r = 1.2 + Math.random() * 1.2;
      const ySpread = (Math.random() - 0.5) * 0.8;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = ySpread;
      pos[i * 3 + 2] = Math.sin(theta) * r;
      off[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, offsets: off };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;

    // Rotate particles around the reactor
    pointsRef.current.rotation.y = t * 0.1;

    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = intensity * (0.3 + Math.sin(t * 0.5) * 0.1);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffaa66"
        size={0.025}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default EnergyParticles;
