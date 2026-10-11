"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import CapAssembly, { type CapAssemblyProps } from "./parts/CapAssembly";
import { DEFAULT_CAP_COLORS } from "./materials/capMaterials";

export type CapViewerProps = CapAssemblyProps & {
  className?: string;
  heightClassName?: string;
};

export default function CapViewer({
  colors = DEFAULT_CAP_COLORS,
  artworkUrl,
  showDesignBody = false,
  className = "",
  heightClassName = "h-[440px] sm:h-[560px]",
}: CapViewerProps) {
  return (
    <div className={`w-full overflow-hidden rounded-xl bg-neutral-100 ${className}`}>
      <div className={`w-full ${heightClassName}`}>
        <Canvas
          camera={{ position: [2.1, 1.25, 2.35], fov: 36, near: 0.01, far: 100 }}
          shadows
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#f4f3f0"]} />
          <ambientLight intensity={1.05} />
          <directionalLight position={[3, 5, 4]} intensity={2.1} castShadow />
          <directionalLight position={[-3, 2, -4]} intensity={0.8} />
          <Suspense fallback={null}>
            <CapAssembly
              colors={colors}
              artworkUrl={artworkUrl}
              showDesignBody={showDesignBody}
            />
            <Environment preset="studio" />
          </Suspense>
          <OrbitControls
            makeDefault
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            minDistance={1.5}
            maxDistance={5}
            minPolarAngle={0.15}
            maxPolarAngle={Math.PI * 0.92}
            target={[0, 0, 0]}
          />
        </Canvas>
      </div>
    </div>
  );
}
