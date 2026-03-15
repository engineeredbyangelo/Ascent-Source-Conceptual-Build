import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MagneticCoilProps {
  index: number;
  explodeProgress: number;
}

const MagneticCoil = ({ index, explodeProgress }: MagneticCoilProps) => {
  const coilRef = useRef<THREE.Mesh>(null);

  const angle = (index / 3) * Math.PI * 2;
  const baseX = Math.cos(angle) * 1.5;
  const baseZ = Math.sin(angle) * 1.5;

  useFrame((state) => {
    if (!coilRef.current) return;
    const t = state.clock.elapsedTime;

    coilRef.current.rotation.y = t * 0.2 + index * 0.5;

    // Explode outward
    const explodeDistance = explodeProgress * 2;
    coilRef.current.position.x = baseX + Math.cos(angle) * explodeDistance;
    coilRef.current.position.z = baseZ + Math.sin(angle) * explodeDistance;
    coilRef.current.position.y = Math.sin(angle + t * 0.3) * 0.1 + explodeProgress * (index - 1) * 1.2;
  });

  return (
    <mesh ref={coilRef} rotation={[Math.PI / 2, 0, angle]}>
      <torusGeometry args={[0.6, 0.12, 8, 32]} />
      <meshStandardMaterial
        color="#4a4a6a"
        metalness={0.95}
        roughness={0.15}
        emissive="#00F0FF"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
};

export default MagneticCoil;
