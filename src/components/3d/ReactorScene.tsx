import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PlasmaRing from "./PlasmaRing";
import MagneticCoil from "./MagneticCoil";
import EnergyParticles from "./EnergyParticles";
import ReactorCore from "./ReactorCore";

interface ReactorSceneProps {
  scrollProgress: number;
}

const ReactorScene = ({ scrollProgress }: ReactorSceneProps) => {
  const groupRef = useRef<THREE.Group>(null);

  // Scroll phases
  const heroPhase = Math.min(scrollProgress / 0.15, 1);
  const explodePhase = Math.max(0, Math.min((scrollProgress - 0.15) / 0.15, 1));
  const dimPhase = Math.max(0, Math.min((scrollProgress - 0.3) / 0.1, 1));
  const closePhase = Math.max(0, Math.min((scrollProgress - 0.45) / 0.1, 1));
  

  // Reactor closes back up as user enters Security section
  const effectiveExplode = explodePhase * (1 - closePhase);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Slow rotation
    groupRef.current.rotation.y = t * 0.08 + heroPhase * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.03;

    // Scale: shrink slightly after close
    const baseScale = 0.85 - closePhase * 0.15;
    groupRef.current.scale.setScalar(baseScale);

    // Position
    groupRef.current.position.y = -heroPhase * 0.3 + closePhase * 0.2;
    
  });

  // Camera
  useFrame((state) => {
    const cam = state.camera;
    const targetZ = 9 - heroPhase * 2.5;
    const targetY = 1.5 + heroPhase * 0.3 - closePhase * 0.3;
    const targetX = Math.sin(heroPhase * 0.3) * 0.5;
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, targetZ, 0.05);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, targetY, 0.05);
    cam.position.x = THREE.MathUtils.lerp(cam.position.x, targetX, 0.05);
    cam.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.12} />
      <pointLight position={[5, 5, 5]} intensity={0.7} color="#ffffff" />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#aabbcc" />
      <pointLight position={[0, 4, 0]} intensity={0.5} color="#ffffff" />
      <pointLight position={[3, -2, 4]} intensity={0.2} color="#ff9966" />
      
      {/* Rim lights for metallic highlights */}
      <directionalLight position={[-4, 2, -3]} intensity={0.3} color="#aaccff" />
      <directionalLight position={[4, -1, 3]} intensity={0.2} color="#ffddaa" />

      {/* Subtle ground reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.95}
          roughness={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>

      <group ref={groupRef}>
        <ReactorCore explodeProgress={effectiveExplode} />
        <PlasmaRing explodeProgress={effectiveExplode} />
        <MagneticCoil index={0} explodeProgress={effectiveExplode} />
        <MagneticCoil index={1} explodeProgress={effectiveExplode} />
        <MagneticCoil index={2} explodeProgress={effectiveExplode} />
        <EnergyParticles intensity={1 - dimPhase * 0.5 + closePhase * 0.3} />
      </group>
    </>
  );
};

export default ReactorScene;
