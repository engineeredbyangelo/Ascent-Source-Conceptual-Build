import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlasmaRingProps {
  explodeProgress: number;
}

/**
 * Additional plasma effects - swirling energy around the tokamak
 */
const PlasmaRing = ({ explodeProgress }: PlasmaRingProps) => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 2;
      ring1Ref.current.rotation.z = t * 0.4;
      const mat = ring1Ref.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.3 * (1 - explodeProgress * 0.8);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.PI / 2;
      ring2Ref.current.rotation.z = -t * 0.25;
      const mat = ring2Ref.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.2 * (1 - explodeProgress * 0.8);
    }
  });

  return (
    <group>
      {/* Outer energy ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.8, 0.02, 8, 64]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={2}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Secondary ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.2, 0.015, 8, 64]} />
        <meshStandardMaterial
          color="#3DDCFF"
          emissive="#3DDCFF"
          emissiveIntensity={1.5}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default PlasmaRing;
