'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function SakuraModel() {
  const { scene } = useGLTF('/fantasy_sakura.glb');
  const modelRef = useRef<THREE.Group>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      const scrollProgress = scrollY / 1000; // Normalize scroll value
      
      // Multi-axis rotation with varying speeds
      modelRef.current.rotation.y = scrollProgress * 2;
      modelRef.current.rotation.x = Math.sin(scrollProgress) * 0.3;
      modelRef.current.rotation.z = Math.cos(scrollProgress * 0.5) * 0.1;
      
      // Zoom effect via scale
      const scaleValue = 2 + Math.sin(scrollProgress) * 0.5;
      modelRef.current.scale.set(scaleValue, scaleValue, scaleValue);
      
      // Dynamic positioning
      modelRef.current.position.y = -1 + Math.sin(scrollProgress * 1.5) * 0.5;
      modelRef.current.position.x = Math.cos(scrollProgress * 0.8) * 0.3;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={2} position={[0, -1, 0]} />;
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
