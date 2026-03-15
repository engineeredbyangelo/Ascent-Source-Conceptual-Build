import { useRef, useMemo } from "react";
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
  const heroPhase = Math.min(scrollProgress / 0.15, 1); // 0-15%
  const explodePhase = Math.max(0, Math.min((scrollProgress - 0.15) / 0.15, 1)); // 15-30%
  const dimPhase = Math.max(0, Math.min((scrollProgress - 0.3) / 0.1, 1)); // 30-40%
  const compressPhase = Math.max(0, Math.min((scrollProgress - 0.5) / 0.1, 1)); // 50-60%
  const zoomOutPhase = Math.max(0, Math.min((scrollProgress - 0.65) / 0.1, 1)); // 65-75%

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;

    // Base rotation
    groupRef.current.rotation.y = t * 0.15 + heroPhase * 0.5;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;

    // Scale based on scroll
    const baseScale = 1 - compressPhase * 0.6 - zoomOutPhase * 0.3;
    groupRef.current.scale.setScalar(baseScale);

    // Position shift
    groupRef.current.position.y = -heroPhase * 0.5 + compressPhase * 1;
    groupRef.current.position.z = -zoomOutPhase * 5;

    // Opacity/visibility via dimming
    const dimFactor = 1 - dimPhase * 0.4 + compressPhase * 0.2;
    groupRef.current.children.forEach((child) => {
      if ((child as THREE.Mesh).material) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat.opacity !== undefined) {
          mat.opacity = dimFactor;
        }
      }
    });
  });

  // Camera animation based on scroll
  useFrame((state) => {
    const cam = state.camera;
    const targetZ = 8 - heroPhase * 3 + zoomOutPhase * 15;
    const targetY = heroPhase * 0.5 - compressPhase * 1 + zoomOutPhase * 3;
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, targetZ, 0.05);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, targetY, 0.05);
    cam.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Ambient and point lights */}
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00F0FF" distance={20} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#00F0FF" />

      <group ref={groupRef}>
        <ReactorCore explodeProgress={explodePhase} />
        <PlasmaRing explodeProgress={explodePhase} />
        <MagneticCoil index={0} explodeProgress={explodePhase} />
        <MagneticCoil index={1} explodeProgress={explodePhase} />
        <MagneticCoil index={2} explodeProgress={explodePhase} />
        <EnergyParticles intensity={1 - dimPhase * 0.5} />
      </group>
    </>
  );
};

export default ReactorScene;
