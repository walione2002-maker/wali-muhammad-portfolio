'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { usePortfolioStore } from '@/store/usePortfolioStore';

import { Exp01Gyroscopic } from './experiments/Exp01Gyroscopic';
import { Exp02SpatialSystem } from './experiments/Exp02SpatialSystem';
import { Exp03KineticType } from './experiments/Exp03KineticType';
import { Exp04SignalArchitecture } from './experiments/Exp04SignalArchitecture';
import { Exp05LayoutEngine } from './experiments/Exp05LayoutEngine';
import { Exp06TopographicShader } from './experiments/Exp06TopographicShader';

export function LabCanvas() {
  const activeExperiment = usePortfolioStore((s) => s.activeExperiment);

  return (
    <Canvas
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        alpha: true,
      }}
      dpr={[1, 1.5]}
      camera={{ fov: 45, position: [0, 1.2, 8] }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[10, 12, 8]} intensity={1.5} />
      <directionalLight position={[-10, -5, -8]} intensity={0.6} color="#FF4D00" />
      <pointLight position={[0, 0, 0]} intensity={0.9} color="#FF4D00" />

      {/* Render strictly the active experiment */}
      {activeExperiment === '01-gyroscopic' && <Exp01Gyroscopic />}
      {activeExperiment === '02-spatial-system' && <Exp02SpatialSystem />}
      {activeExperiment === '03-kinetic-type' && <Exp03KineticType />}
      {activeExperiment === '04-signal-architecture' && <Exp04SignalArchitecture />}
      {activeExperiment === '05-layout-engine' && <Exp05LayoutEngine />}
      {activeExperiment === '06-topographic-shader' && <Exp06TopographicShader />}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        rotateSpeed={0.8}
        dampingFactor={0.05}
      />
    </Canvas>
  );
}

export default LabCanvas;
