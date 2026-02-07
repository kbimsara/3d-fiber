'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Suspense } from 'react';

function SakuraModel() {
  const { scene } = useGLTF('/fantasy_sakura.glb');
  return <primitive object={scene} scale={2} position={[0, -1, 0]} />;
}

function Loader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-zinc-600 dark:text-zinc-400">Loading 3D model...</div>
    </div>
  );
}

export default function SakuraViewer() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        shadows
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <SakuraModel />
          <Environment preset="sunset" />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
