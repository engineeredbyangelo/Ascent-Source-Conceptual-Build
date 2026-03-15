import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import ReactorScene from "./ReactorScene";

interface ReactorCanvasProps {
  scrollProgress: number;
}

const ReactorCanvas = ({ scrollProgress }: ReactorCanvasProps) => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ReactorScene scrollProgress={scrollProgress} />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ReactorCanvas;
