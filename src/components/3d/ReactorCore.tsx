import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ReactorCoreProps {
  explodeProgress: number;
}

/**
 * ARC-style Tokamak Reactor
 * - Outer segmented shell (blocky armor panels)
 * - Central solenoid (ribbed cylinder)
 * - Plasma torus (warm glow inside)
 * - Toroidal field coils (D-shaped)
 * - Support base
 */
const ReactorCore = ({ explodeProgress }: ReactorCoreProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const plasmaRef = useRef<THREE.Mesh>(null);
  const plasmaLightRef = useRef<THREE.PointLight>(null);

  // Shell segment materials
  const shellColor = "#8a8fa0";
  const shellDarkColor = "#5a5e6e";
  const innerColor = "#3a3d4a";
  const solenoidColor = "#6b6f7f";
  const coilColor = "#7a7e8e";

  // Generate outer shell segments (blocky panels around the torus)
  const shellSegments = useMemo(() => {
    const segments: Array<{
      pos: [number, number, number];
      rot: [number, number, number];
      scale: [number, number, number];
      angle: number;
    }> = [];
    const numSegments = 16;
    const radius = 2.2;

    for (let i = 0; i < numSegments; i++) {
      const angle = (i / numSegments) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      segments.push({
        pos: [x, 0, z],
        rot: [0, -angle + Math.PI / 2, 0],
        scale: [0.85, 1.6, 0.55],
        angle,
      });
    }
    return segments;
  }, []);

  // Upper/lower shell ring segments
  const ringSegments = useMemo(() => {
    const segments: Array<{
      pos: [number, number, number];
      rot: [number, number, number];
      scale: [number, number, number];
    }> = [];
    const numSegments = 24;
    const radius = 2.0;

    for (const yOffset of [1.0, -1.0]) {
      for (let i = 0; i < numSegments; i++) {
        const angle = (i / numSegments) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        segments.push({
          pos: [x, yOffset, z],
          rot: [0, -angle + Math.PI / 2, 0],
          scale: [0.5, 0.35, 0.45],
        });
      }
    }
    return segments;
  }, []);

  // D-shaped toroidal field coils
  const toroidalCoils = useMemo(() => {
    const coils: Array<{ angle: number }> = [];
    const numCoils = 8;
    for (let i = 0; i < numCoils; i++) {
      coils.push({ angle: (i / numCoils) * Math.PI * 2 });
    }
    return coils;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Plasma pulsing
    if (plasmaRef.current) {
      const mat = plasmaRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.5 + Math.sin(t * 2) * 0.5;
    }
    if (plasmaLightRef.current) {
      plasmaLightRef.current.intensity = 3 + Math.sin(t * 2) * 1;
    }
  });

  const explodeScale = explodeProgress * 2.5;

  return (
    <group ref={groupRef}>
      {/* === CENTRAL SOLENOID === */}
      <group position={[0, explodeProgress * 3, 0]}>
        {/* Main cylinder */}
        <mesh>
          <cylinderGeometry args={[0.45, 0.45, 2.8, 24]} />
          <meshStandardMaterial
            color={solenoidColor}
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>
        {/* Ribs on solenoid */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={`rib-${i}`} position={[0, -1.2 + i * 0.22, 0]}>
            <cylinderGeometry args={[0.52, 0.52, 0.06, 24]} />
            <meshStandardMaterial
              color={shellDarkColor}
              metalness={0.9}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* === PLASMA TORUS === */}
      <mesh ref={plasmaRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.55, 32, 64]} />
        <meshStandardMaterial
          color="#ffaa66"
          emissive="#ff8844"
          emissiveIntensity={1.5}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Plasma inner glow */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.35, 16, 64]} />
        <meshStandardMaterial
          color="#ffddbb"
          emissive="#ffcc99"
          emissiveIntensity={3}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Plasma light source */}
      <pointLight
        ref={plasmaLightRef}
        position={[0, 0, 0]}
        color="#ff9966"
        intensity={3}
        distance={8}
      />

      {/* === TOROIDAL FIELD COILS (D-shaped) === */}
      {toroidalCoils.map((coil, i) => {
        const explodeDir = explodeProgress * 1.5;
        return (
          <group
            key={`tfc-${i}`}
            rotation={[0, coil.angle, 0]}
            position={[
              Math.cos(coil.angle) * explodeDir,
              0,
              Math.sin(coil.angle) * explodeDir,
            ]}
          >
            {/* Outer D-coil */}
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[1.7, 0.12, 8, 32]} />
              <meshStandardMaterial
                color={coilColor}
                metalness={0.95}
                roughness={0.15}
                emissive="#00F0FF"
                emissiveIntensity={0.05 + explodeProgress * 0.15}
              />
            </mesh>
            {/* Inner support ring */}
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[1.7, 0.06, 6, 32]} />
              <meshStandardMaterial
                color={shellDarkColor}
                metalness={0.9}
                roughness={0.25}
              />
            </mesh>
          </group>
        );
      })}

      {/* === OUTER SHELL SEGMENTS (main body armor) === */}
      {shellSegments.map((seg, i) => {
        const explodeX = Math.cos(seg.angle) * explodeScale;
        const explodeZ = Math.sin(seg.angle) * explodeScale;
        // Cutaway: remove front-facing segments to show interior
        const isCutaway = i >= 2 && i <= 6;

        return (
          <mesh
            key={`shell-${i}`}
            position={[
              seg.pos[0] + explodeX,
              seg.pos[1],
              seg.pos[2] + explodeZ,
            ]}
            rotation={seg.rot}
            scale={seg.scale}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={isCutaway ? innerColor : shellColor}
              metalness={0.85}
              roughness={0.3}
              transparent={isCutaway}
              opacity={isCutaway ? 0.3 : 0.85}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}

      {/* === UPPER/LOWER RING SEGMENTS === */}
      {ringSegments.map((seg, i) => (
        <mesh
          key={`ring-seg-${i}`}
          position={[
            seg.pos[0],
            seg.pos[1] + (seg.pos[1] > 0 ? explodeProgress * 1.5 : -explodeProgress * 1.5),
            seg.pos[2],
          ]}
          rotation={seg.rot}
          scale={seg.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={shellDarkColor}
            metalness={0.88}
            roughness={0.25}
          />
        </mesh>
      ))}

      {/* === TOP & BOTTOM CAPS === */}
      {[1.5, -1.5].map((y, idx) => (
        <mesh
          key={`cap-${idx}`}
          position={[0, y + (y > 0 ? explodeProgress * 2.5 : -explodeProgress * 2.5), 0]}
        >
          <cylinderGeometry args={[1.8, 2.0, 0.3, 24]} />
          <meshStandardMaterial
            color={shellDarkColor}
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
      ))}

      {/* === BASE SUPPORT === */}
      <group position={[0, -2.0 - explodeProgress * 3, 0]}>
        {/* Base plate */}
        <mesh>
          <boxGeometry args={[3.5, 0.15, 3.5]} />
          <meshStandardMaterial
            color={shellDarkColor}
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>
        {/* Support legs */}
        {[[-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2], [1.2, 1.2]].map(([x, z], i) => (
          <mesh key={`leg-${i}`} position={[x, 0.3, z]}>
            <boxGeometry args={[0.2, 0.5, 0.2]} />
            <meshStandardMaterial
              color={innerColor}
              metalness={0.85}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* === SMALL DETAIL BOXES (equipment/ports) === */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
        <mesh
          key={`detail-${i}`}
          position={[
            Math.cos(angle) * 2.5 + Math.cos(angle) * explodeScale * 0.5,
            -0.5 + i * 0.3,
            Math.sin(angle) * 2.5 + Math.sin(angle) * explodeScale * 0.5,
          ]}
          rotation={[0, -angle, 0]}
        >
          <boxGeometry args={[0.3, 0.25, 0.2]} />
          <meshStandardMaterial
            color="#2a4a3a"
            metalness={0.7}
            roughness={0.4}
            emissive="#00ff44"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

export default ReactorCore;
