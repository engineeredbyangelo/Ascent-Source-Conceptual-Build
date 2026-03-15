import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlasmaRingProps {
  explodeProgress: number;
}

const PlasmaRing = ({ explodeProgress }: PlasmaRingProps) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.3;
      ringRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
      ringRef.current.position.y = explodeProgress * 1.5;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.3 + Math.PI / 2;
      ring2Ref.current.rotation.y = t * 0.15;
      ring2Ref.current.position.x = explodeProgress * 1.8;
    }
  });

  return (
    <group>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.2, 0.08, 16, 64]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={1.5}
          transparent
          opacity={0.8}
          metalness={0.5}
          roughness={0.1}
        />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.0, 0.05, 16, 64]} />
        <meshStandardMaterial
          color="#3DDCFF"
          emissive="#3DDCFF"
          emissiveIntensity={1}
          transparent
          opacity={0.6}
          metalness={0.5}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

export default PlasmaRing;
