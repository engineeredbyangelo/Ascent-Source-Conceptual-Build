import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ReactorCoreProps {
  explodeProgress: number;
}

const ReactorCore = ({ explodeProgress }: ReactorCoreProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const plasmaRef = useRef<THREE.Mesh>(null);
  const plasmaLightRef = useRef<THREE.PointLight>(null);
  const particleRefs = useRef<THREE.Mesh[]>([]);

  const shellColor = "#8a8fa0";
  const shellDarkColor = "#5a5e6e";
  const innerColor = "#3a3d4a";
  const solenoidColor = "#6b6f7f";
  const coilColor = "#7a7e8e";

  // Shell segments
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
      segments.push({
        pos: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
        rot: [0, -angle + Math.PI / 2, 0],
        scale: [0.85, 1.6, 0.55],
        angle,
      });
    }
    return segments;
  }, []);

  // Ring segments
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
        segments.push({
          pos: [Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius],
          rot: [0, -angle + Math.PI / 2, 0],
          scale: [0.5, 0.35, 0.45],
        });
      }
    }
    return segments;
  }, []);

  // Toroidal field coils
  const toroidalCoils = useMemo(() => {
    const coils: Array<{ angle: number }> = [];
    for (let i = 0; i < 8; i++) {
      coils.push({ angle: (i / 8) * Math.PI * 2 });
    }
    return coils;
  }, []);

  // Plasma flow particles
  const plasmaParticles = useMemo(() => {
    const particles: Array<{ speed: number; offset: number; wobbleSpeed: number; wobbleAmp: number }> = [];
    for (let i = 0; i < 24; i++) {
      particles.push({
        speed: 1.2 + Math.random() * 1.8,
        offset: (i / 24) * Math.PI * 2,
        wobbleSpeed: 1.5 + Math.random() * 2,
        wobbleAmp: 0.03 + Math.random() * 0.05,
      });
    }
    return particles;
  }, []);

  // Coolant pipes between coils
  const coolantPipes = useMemo(() => {
    const pipes: Array<{ angle: number; yOffset: number }> = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
      pipes.push({ angle, yOffset: 0.3 });
      pipes.push({ angle, yOffset: -0.3 });
    }
    return pipes;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const plasmaIntensity = 1.5 + explodeProgress * 1.5;

    if (plasmaRef.current) {
      const mat = plasmaRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = plasmaIntensity + Math.sin(t * 2) * 0.5;
    }
    if (plasmaLightRef.current) {
      plasmaLightRef.current.intensity = 3 + explodeProgress * 2 + Math.sin(t * 2) * 1;
    }

    // Animate plasma particles along torus path
    particleRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const p = plasmaParticles[i];
      const theta = t * p.speed + p.offset;
      const torusR = 1.5;
      const tubeR = 0.35;
      const wobble = Math.sin(t * p.wobbleSpeed) * p.wobbleAmp;

      mesh.position.x = (torusR + tubeR * Math.cos(theta * 3) + wobble) * Math.cos(theta);
      mesh.position.z = (torusR + tubeR * Math.cos(theta * 3) + wobble) * Math.sin(theta);
      mesh.position.y = tubeR * Math.sin(theta * 3) + wobble;

      const mat = mesh.material as THREE.MeshStandardMaterial;
      const visibility = Math.max(0, Math.min(1, (explodeProgress - 0.1) * 3));
      mat.opacity = visibility * (0.6 + Math.sin(t * 4 + i) * 0.3);
      mesh.visible = explodeProgress > 0.05;
    });
  });

  const explodeScale = explodeProgress * 2.5;

  return (
    <group ref={groupRef}>
      {/* === CENTRAL SOLENOID === */}
      <group position={[0, explodeProgress * 3, 0]}>
        <mesh>
          <cylinderGeometry args={[0.45, 0.45, 2.8, 24]} />
          <meshStandardMaterial color={solenoidColor} metalness={0.95} roughness={0.2} />
        </mesh>
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={`rib-${i}`} position={[0, -1.2 + i * 0.22, 0]}>
            <cylinderGeometry args={[0.52, 0.52, 0.06, 24]} />
            <meshStandardMaterial color={shellDarkColor} metalness={0.9} roughness={0.3} />
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
          emissiveIntensity={3 + explodeProgress * 2}
          transparent
          opacity={0.4 + explodeProgress * 0.3}
        />
      </mesh>

      {/* Plasma light source */}
      <pointLight ref={plasmaLightRef} position={[0, 0, 0]} color="#ff9966" intensity={3} distance={8} />

      {/* === PLASMA FLOW PARTICLES === */}
      {plasmaParticles.map((_, i) => (
        <mesh
          key={`plasma-p-${i}`}
          ref={(el) => { if (el) particleRefs.current[i] = el; }}
          visible={false}
        >
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color="#ffcc66"
            emissive="#ff8844"
            emissiveIntensity={4}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* === TOROIDAL FIELD COILS === */}
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
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[1.7, 0.06, 6, 32]} />
              <meshStandardMaterial color={shellDarkColor} metalness={0.9} roughness={0.25} />
            </mesh>
          </group>
        );
      })}

      {/* === COOLANT PIPES (visible during explode) === */}
      {explodeProgress > 0.3 && coolantPipes.map((pipe, i) => (
        <mesh
          key={`pipe-${i}`}
          position={[
            Math.cos(pipe.angle) * 1.5,
            pipe.yOffset,
            Math.sin(pipe.angle) * 1.5,
          ]}
          rotation={[0, -pipe.angle + Math.PI / 2, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
          <meshStandardMaterial
            color="#4a6a7a"
            metalness={0.9}
            roughness={0.2}
            emissive="#00F0FF"
            emissiveIntensity={0.1}
            transparent
            opacity={Math.min(1, (explodeProgress - 0.3) * 3)}
          />
        </mesh>
      ))}

      {/* === OUTER SHELL SEGMENTS === */}
      {shellSegments.map((seg, i) => {
        const explodeX = Math.cos(seg.angle) * explodeScale;
        const explodeZ = Math.sin(seg.angle) * explodeScale;
        const isCutaway = i >= 2 && i <= 6;
        return (
          <mesh
            key={`shell-${i}`}
            position={[seg.pos[0] + explodeX, seg.pos[1], seg.pos[2] + explodeZ]}
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
          <meshStandardMaterial color={shellDarkColor} metalness={0.88} roughness={0.25} />
        </mesh>
      ))}

      {/* === TOP & BOTTOM CAPS === */}
      {[1.5, -1.5].map((y, idx) => (
        <mesh
          key={`cap-${idx}`}
          position={[0, y + (y > 0 ? explodeProgress * 2.5 : -explodeProgress * 2.5), 0]}
        >
          <cylinderGeometry args={[1.8, 2.0, 0.3, 24]} />
          <meshStandardMaterial color={shellDarkColor} metalness={0.9} roughness={0.25} />
        </mesh>
      ))}

      {/* === BASE SUPPORT === */}
      <group position={[0, -2.0 - explodeProgress * 3, 0]}>
        <mesh>
          <boxGeometry args={[3.5, 0.15, 3.5]} />
          <meshStandardMaterial color={shellDarkColor} metalness={0.9} roughness={0.3} />
        </mesh>
        {[[-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2], [1.2, 1.2]].map(([x, z], i) => (
          <mesh key={`leg-${i}`} position={[x, 0.3, z]}>
            <boxGeometry args={[0.2, 0.5, 0.2]} />
            <meshStandardMaterial color={innerColor} metalness={0.85} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* === DETAIL BOXES === */}
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
