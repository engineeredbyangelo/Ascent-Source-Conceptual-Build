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
  const arcRefs = useRef<THREE.Mesh[]>([]);

  const shellColor = "#8a8fa0";
  const shellDarkColor = "#5a5e6e";
  const innerColor = "#3a3d4a";
  const solenoidColor = "#6b6f7f";
  const coilColor = "#7a7e8e";
  const copperColor = "#b87333";
  const diagnosticColor = "#2a3a2a";

  // Shell segments with panel seam detail
  const shellSegments = useMemo(() => {
    const segments: Array<{
      pos: [number, number, number];
      rot: [number, number, number];
      scale: [number, number, number];
      angle: number;
    }> = [];
    const numSegments = 20;
    const radius = 2.2;
    for (let i = 0; i < numSegments; i++) {
      const angle = (i / numSegments) * Math.PI * 2;
      segments.push({
        pos: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
        rot: [0, -angle + Math.PI / 2, 0],
        scale: [0.68, 1.6, 0.55],
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
    const numSegments = 28;
    const radius = 2.0;
    for (const yOffset of [1.0, -1.0]) {
      for (let i = 0; i < numSegments; i++) {
        const angle = (i / numSegments) * Math.PI * 2;
        segments.push({
          pos: [Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius],
          rot: [0, -angle + Math.PI / 2, 0],
          scale: [0.42, 0.35, 0.45],
        });
      }
    }
    return segments;
  }, []);

  // Toroidal field coils (more of them)
  const toroidalCoils = useMemo(() => {
    const coils: Array<{ angle: number }> = [];
    for (let i = 0; i < 12; i++) {
      coils.push({ angle: (i / 12) * Math.PI * 2 });
    }
    return coils;
  }, []);

  // Plasma flow particles (more, varied sizes)
  const plasmaParticles = useMemo(() => {
    const particles: Array<{ speed: number; offset: number; wobbleSpeed: number; wobbleAmp: number; size: number }> = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        speed: 0.8 + Math.random() * 2.2,
        offset: (i / 40) * Math.PI * 2,
        wobbleSpeed: 1.5 + Math.random() * 2,
        wobbleAmp: 0.02 + Math.random() * 0.06,
        size: 0.03 + Math.random() * 0.05,
      });
    }
    return particles;
  }, []);

  // Lightning arcs (plasma instabilities)
  const plasmaArcs = useMemo(() => {
    const arcs: Array<{ baseAngle: number; speed: number; length: number }> = [];
    for (let i = 0; i < 6; i++) {
      arcs.push({
        baseAngle: (i / 6) * Math.PI * 2,
        speed: 2 + Math.random() * 3,
        length: 0.3 + Math.random() * 0.4,
      });
    }
    return arcs;
  }, []);

  // Coolant pipes
  const coolantPipes = useMemo(() => {
    const pipes: Array<{ angle: number; yOffset: number }> = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + Math.PI / 12;
      pipes.push({ angle, yOffset: 0.25 });
      pipes.push({ angle, yOffset: -0.25 });
    }
    return pipes;
  }, []);

  // Diagnostic ports on the shell
  const diagnosticPorts = useMemo(() => {
    const ports: Array<{ angle: number; y: number }> = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      ports.push({ angle, y: 0.4 });
      ports.push({ angle, y: -0.4 });
    }
    return ports;
  }, []);

  // Wiring harnesses between coils
  const wiringHarnesses = useMemo(() => {
    const wires: Array<{ startAngle: number; yOffset: number }> = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      wires.push({ startAngle: angle, yOffset: 0.6 + (i % 3) * 0.15 });
    }
    return wires;
  }, []);

  // Bolts/fasteners on shell segments
  const bolts = useMemo(() => {
    const b: Array<{ angle: number; y: number; r: number }> = [];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      b.push({ angle, y: 0.65, r: 2.28 });
      b.push({ angle, y: -0.65, r: 2.28 });
    }
    return b;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const plasmaIntensity = 1.5 + explodeProgress * 2.5;

    if (plasmaRef.current) {
      const mat = plasmaRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = plasmaIntensity + Math.sin(t * 2) * 0.5 + Math.sin(t * 7) * 0.2;
    }
    if (plasmaLightRef.current) {
      plasmaLightRef.current.intensity = 3 + explodeProgress * 3 + Math.sin(t * 2) * 1 + Math.sin(t * 5) * 0.5;
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
      mat.opacity = visibility * (0.5 + Math.sin(t * 4 + i) * 0.4);
      mesh.visible = explodeProgress > 0.05;
    });

    // Animate lightning arcs
    arcRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const arc = plasmaArcs[i];
      const theta = arc.baseAngle + Math.sin(t * arc.speed) * 0.5;
      const torusR = 1.5;

      mesh.position.x = Math.cos(theta) * torusR;
      mesh.position.z = Math.sin(theta) * torusR;
      mesh.position.y = Math.sin(t * arc.speed * 1.5) * 0.3;
      mesh.rotation.z = t * arc.speed;
      mesh.rotation.y = theta;

      const mat = mesh.material as THREE.MeshStandardMaterial;
      const flash = Math.pow(Math.sin(t * arc.speed * 2), 8);
      const visibility = Math.max(0, Math.min(1, (explodeProgress - 0.15) * 4));
      mat.opacity = visibility * flash * 0.8;
      mat.emissiveIntensity = 4 + flash * 8;
      mesh.visible = explodeProgress > 0.1;
    });
  });

  const explodeScale = explodeProgress * 2.5;

  return (
    <group ref={groupRef}>
      {/* === CENTRAL SOLENOID === */}
      <group position={[0, explodeProgress * 3, 0]}>
        {/* Main cylinder */}
        <mesh>
          <cylinderGeometry args={[0.45, 0.45, 2.8, 32]} />
          <meshStandardMaterial color={solenoidColor} metalness={0.95} roughness={0.15} envMapIntensity={1.5} />
        </mesh>
        {/* Solenoid winding ribs */}
        {Array.from({ length: 16 }).map((_, i) => (
          <mesh key={`rib-${i}`} position={[0, -1.3 + i * 0.17, 0]}>
            <cylinderGeometry args={[0.52, 0.52, 0.04, 32]} />
            <meshStandardMaterial color={copperColor} metalness={0.92} roughness={0.2} />
          </mesh>
        ))}
        {/* Solenoid end caps */}
        {[1.42, -1.42].map((y, idx) => (
          <mesh key={`sol-cap-${idx}`} position={[0, y, 0]}>
            <cylinderGeometry args={[0.5, 0.48, 0.08, 32]} />
            <meshStandardMaterial color={shellDarkColor} metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
        {/* Central bore */}
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 3.0, 16]} />
          <meshStandardMaterial color={innerColor} metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* === PLASMA TORUS === */}
      <mesh ref={plasmaRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.55, 48, 96]} />
        <meshStandardMaterial
          color="#ffaa66"
          emissive="#ff8844"
          emissiveIntensity={1.5}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Plasma inner glow - hotter core */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.3, 24, 96]} />
        <meshStandardMaterial
          color="#ffe8cc"
          emissive="#ffcc99"
          emissiveIntensity={3.5 + explodeProgress * 3}
          transparent
          opacity={0.35 + explodeProgress * 0.35}
        />
      </mesh>

      {/* Plasma outer halo */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.7, 16, 64]} />
        <meshStandardMaterial
          color="#ff6633"
          emissive="#ff4400"
          emissiveIntensity={0.8 + explodeProgress * 1.5}
          transparent
          opacity={0.12 + explodeProgress * 0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Plasma light source */}
      <pointLight ref={plasmaLightRef} position={[0, 0, 0]} color="#ff9966" intensity={3} distance={10} />
      {/* Secondary plasma lights for volumetric feel */}
      <pointLight position={[1.5, 0, 0]} color="#ff6633" intensity={1 + explodeProgress * 2} distance={4} />
      <pointLight position={[-1.5, 0, 0]} color="#ff6633" intensity={1 + explodeProgress * 2} distance={4} />
      <pointLight position={[0, 0, 1.5]} color="#ffaa44" intensity={0.8 + explodeProgress * 1.5} distance={4} />

      {/* === PLASMA FLOW PARTICLES === */}
      {plasmaParticles.map((p, i) => (
        <mesh
          key={`plasma-p-${i}`}
          ref={(el) => { if (el) particleRefs.current[i] = el; }}
          visible={false}
        >
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshStandardMaterial
            color="#ffdd88"
            emissive="#ff8844"
            emissiveIntensity={5}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* === LIGHTNING ARCS (plasma instabilities) === */}
      {plasmaArcs.map((_, i) => (
        <mesh
          key={`arc-${i}`}
          ref={(el) => { if (el) arcRefs.current[i] = el; }}
          visible={false}
        >
          <cylinderGeometry args={[0.008, 0.025, 0.5, 4]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffaa44"
            emissiveIntensity={6}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* === TOROIDAL FIELD COILS (more detailed) === */}
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
            {/* Main coil */}
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[1.7, 0.1, 12, 48]} />
              <meshStandardMaterial
                color={coilColor}
                metalness={0.95}
                roughness={0.1}
                emissive="#00F0FF"
                emissiveIntensity={0.05 + explodeProgress * 0.2}
                envMapIntensity={2}
              />
            </mesh>
            {/* Inner winding */}
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[1.7, 0.055, 8, 48]} />
              <meshStandardMaterial color={copperColor} metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Coil casing */}
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[1.7, 0.12, 6, 48]} />
              <meshStandardMaterial
                color={shellDarkColor}
                metalness={0.88}
                roughness={0.25}
                transparent
                opacity={0.4}
                side={THREE.BackSide}
              />
            </mesh>
          </group>
        );
      })}

      {/* === COOLANT PIPES (visible during explode) === */}
      {explodeProgress > 0.2 && coolantPipes.map((pipe, i) => (
        <mesh
          key={`pipe-${i}`}
          position={[
            Math.cos(pipe.angle) * 1.5,
            pipe.yOffset,
            Math.sin(pipe.angle) * 1.5,
          ]}
          rotation={[0, -pipe.angle + Math.PI / 2, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.025, 0.025, 0.7, 8]} />
          <meshStandardMaterial
            color="#4a7a8a"
            metalness={0.9}
            roughness={0.15}
            emissive="#00F0FF"
            emissiveIntensity={0.15}
            transparent
            opacity={Math.min(1, (explodeProgress - 0.2) * 3)}
          />
        </mesh>
      ))}

      {/* === DIAGNOSTIC PORTS === */}
      {diagnosticPorts.map((port, i) => {
        const explodeX = Math.cos(port.angle) * explodeScale * 0.95;
        const explodeZ = Math.sin(port.angle) * explodeScale * 0.95;
        return (
          <group key={`diag-${i}`} position={[
            Math.cos(port.angle) * 2.25 + explodeX,
            port.y,
            Math.sin(port.angle) * 2.25 + explodeZ,
          ]} rotation={[0, -port.angle, 0]}>
            {/* Port housing */}
            <mesh>
              <cylinderGeometry args={[0.08, 0.1, 0.15, 8]} />
              <meshStandardMaterial color={diagnosticColor} metalness={0.8} roughness={0.3}
                emissive="#00ff44" emissiveIntensity={0.15 + explodeProgress * 0.3} />
            </mesh>
            {/* Port lens */}
            <mesh position={[0, 0.08, 0]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color="#00ff66" emissive="#00ff44"
                emissiveIntensity={0.5 + explodeProgress * 1} transparent opacity={0.8}
                blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          </group>
        );
      })}

      {/* === WIRING HARNESSES === */}
      {explodeProgress > 0.15 && wiringHarnesses.map((wire, i) => {
        const r = 1.85;
        return (
          <mesh
            key={`wire-${i}`}
            position={[
              Math.cos(wire.startAngle) * r,
              wire.yOffset,
              Math.sin(wire.startAngle) * r,
            ]}
            rotation={[Math.PI / 2, 0, wire.startAngle]}
          >
            <cylinderGeometry args={[0.012, 0.012, 0.6, 4]} />
            <meshStandardMaterial
              color={copperColor}
              metalness={0.85}
              roughness={0.3}
              transparent
              opacity={Math.min(1, (explodeProgress - 0.15) * 4)}
            />
          </mesh>
        );
      })}

      {/* === BOLTS/FASTENERS === */}
      {bolts.map((bolt, i) => {
        const explodeX = Math.cos(bolt.angle) * explodeScale;
        const explodeZ = Math.sin(bolt.angle) * explodeScale;
        return (
          <mesh
            key={`bolt-${i}`}
            position={[
              Math.cos(bolt.angle) * bolt.r + explodeX,
              bolt.y,
              Math.sin(bolt.angle) * bolt.r + explodeZ,
            ]}
            rotation={[Math.PI / 2, 0, bolt.angle]}
          >
            <cylinderGeometry args={[0.03, 0.03, 0.06, 6]} />
            <meshStandardMaterial color="#9a9eae" metalness={0.95} roughness={0.15} />
          </mesh>
        );
      })}

      {/* === OUTER SHELL SEGMENTS (with panel seams) === */}
      {shellSegments.map((seg, i) => {
        const explodeX = Math.cos(seg.angle) * explodeScale;
        const explodeZ = Math.sin(seg.angle) * explodeScale;
        const isCutaway = i >= 3 && i <= 8;
        return (
          <group key={`shell-${i}`}>
            {/* Main panel */}
            <mesh
              position={[seg.pos[0] + explodeX, seg.pos[1], seg.pos[2] + explodeZ]}
              rotation={seg.rot}
              scale={seg.scale}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color={isCutaway ? innerColor : shellColor}
                metalness={0.88}
                roughness={0.2}
                transparent={isCutaway}
                opacity={isCutaway ? 0.25 : 0.88}
                side={THREE.DoubleSide}
                envMapIntensity={1.5}
              />
            </mesh>
            {/* Panel seam lines (thin strips on edges) */}
            <mesh
              position={[
                seg.pos[0] + explodeX,
                seg.pos[1] + 0.78,
                seg.pos[2] + explodeZ,
              ]}
              rotation={seg.rot}
              scale={[seg.scale[0], 0.02, seg.scale[2]]}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#2a2d3a" metalness={0.9} roughness={0.4} />
            </mesh>
            <mesh
              position={[
                seg.pos[0] + explodeX,
                seg.pos[1] - 0.78,
                seg.pos[2] + explodeZ,
              ]}
              rotation={seg.rot}
              scale={[seg.scale[0], 0.02, seg.scale[2]]}
            >
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#2a2d3a" metalness={0.9} roughness={0.4} />
            </mesh>
          </group>
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
          <meshStandardMaterial color={shellDarkColor} metalness={0.9} roughness={0.2} envMapIntensity={1.2} />
        </mesh>
      ))}

      {/* === TOP & BOTTOM CAPS (with detail rings) === */}
      {[1.5, -1.5].map((y, idx) => (
        <group key={`cap-group-${idx}`}>
          <mesh
            position={[0, y + (y > 0 ? explodeProgress * 2.5 : -explodeProgress * 2.5), 0]}
          >
            <cylinderGeometry args={[1.8, 2.0, 0.3, 32]} />
            <meshStandardMaterial color={shellDarkColor} metalness={0.92} roughness={0.18} envMapIntensity={1.5} />
          </mesh>
          {/* Cap detail ring */}
          <mesh
            position={[0, y + (y > 0 ? explodeProgress * 2.5 + 0.17 : -explodeProgress * 2.5 - 0.17), 0]}
          >
            <cylinderGeometry args={[1.4, 1.6, 0.06, 32]} />
            <meshStandardMaterial color={copperColor} metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Cap port */}
          <mesh
            position={[0, y + (y > 0 ? explodeProgress * 2.5 + 0.2 : -explodeProgress * 2.5 - 0.2), 0]}
          >
            <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
            <meshStandardMaterial color={innerColor} metalness={0.85} roughness={0.25}
              emissive="#00F0FF" emissiveIntensity={0.05 + explodeProgress * 0.15} />
          </mesh>
        </group>
      ))}

      {/* === BASE SUPPORT (more detailed) === */}
      <group position={[0, -2.0 - explodeProgress * 3, 0]}>
        <mesh>
          <boxGeometry args={[3.5, 0.15, 3.5]} />
          <meshStandardMaterial color={shellDarkColor} metalness={0.92} roughness={0.2} />
        </mesh>
        {/* Cross braces */}
        <mesh position={[0, 0.2, 0]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[4.5, 0.06, 0.12]} />
          <meshStandardMaterial color={innerColor} metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.2, 0]} rotation={[0, -Math.PI / 4, 0]}>
          <boxGeometry args={[4.5, 0.06, 0.12]} />
          <meshStandardMaterial color={innerColor} metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Legs */}
        {[[-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2], [1.2, 1.2]].map(([x, z], i) => (
          <group key={`leg-${i}`}>
            <mesh position={[x, 0.35, z]}>
              <boxGeometry args={[0.18, 0.55, 0.18]} />
              <meshStandardMaterial color={innerColor} metalness={0.88} roughness={0.25} />
            </mesh>
            {/* Leg bolts */}
            <mesh position={[x, 0.1, z]}>
              <cylinderGeometry args={[0.12, 0.12, 0.04, 8]} />
              <meshStandardMaterial color="#9a9eae" metalness={0.95} roughness={0.15} />
            </mesh>
          </group>
        ))}
      </group>

      {/* === DETAIL BOXES (instrumentation) === */}
      {[0, Math.PI / 3, Math.PI * 2 / 3, Math.PI, Math.PI * 4 / 3, Math.PI * 5 / 3].map((angle, i) => (
        <group key={`detail-${i}`}>
          <mesh
            position={[
              Math.cos(angle) * 2.5 + Math.cos(angle) * explodeScale * 0.5,
              -0.3 + (i % 3) * 0.3,
              Math.sin(angle) * 2.5 + Math.sin(angle) * explodeScale * 0.5,
            ]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.25, 0.2, 0.15]} />
            <meshStandardMaterial
              color={diagnosticColor}
              metalness={0.75}
              roughness={0.35}
              emissive="#00ff44"
              emissiveIntensity={0.12}
            />
          </mesh>
          {/* Status LED */}
          <mesh
            position={[
              Math.cos(angle) * 2.5 + Math.cos(angle) * explodeScale * 0.5,
              -0.18 + (i % 3) * 0.3,
              Math.sin(angle) * 2.5 + Math.sin(angle) * explodeScale * 0.5,
            ]}
          >
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#00ff44" : "#ff4444"}
              emissive={i % 2 === 0 ? "#00ff44" : "#ff4444"}
              emissiveIntensity={2}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default ReactorCore;
