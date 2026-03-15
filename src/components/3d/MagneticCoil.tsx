import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MagneticCoilProps {
  index: number;
  explodeProgress: number;
}

/**
 * Poloidal field coils - horizontal rings that stack above/below the plasma
 */
const MagneticCoil = ({ index, explodeProgress }: MagneticCoilProps) => {
  const coilRef = useRef<THREE.Mesh>(null);

  // Stack coils at different heights
  const yPositions = [-0.8, 0, 0.8];
  const radii = [1.9, 2.1, 1.9];
  const baseY = yPositions[index] || 0;
  const radius = radii[index] || 2.0;

  useFrame((state) => {
    if (!coilRef.current) return;
    const t = state.clock.elapsedTime;

    // Subtle wobble
    coilRef.current.rotation.z = Math.sin(t * 0.3 + index) * 0.01;

    // Explode vertically
    coilRef.current.position.y = baseY + baseY * explodeProgress * 2;
  });

  return (
    <mesh ref={coilRef} rotation={[Math.PI / 2, 0, 0]} position={[0, baseY, 0]}>
      <torusGeometry args={[radius, 0.08, 12, 48]} />
      <meshStandardMaterial
        color="#6a6e7e"
        metalness={0.95}
        roughness={0.15}
        emissive="#00F0FF"
        emissiveIntensity={0.08 + explodeProgress * 0.2}
      />
    </mesh>
  );
};

export default MagneticCoil;
