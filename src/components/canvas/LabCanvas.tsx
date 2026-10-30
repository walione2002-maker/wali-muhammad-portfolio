'use client';

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { graphicsManager, type GraphicsSettings } from '@/lib/graphics/quality';

import { Exp01Gyroscopic } from './experiments/Exp01Gyroscopic';
import { Exp02SpatialSystem } from './experiments/Exp02SpatialSystem';
import { Exp03KineticType } from './experiments/Exp03KineticType';
import { Exp04SignalArchitecture } from './experiments/Exp04SignalArchitecture';
import { Exp05LayoutEngine } from './experiments/Exp05LayoutEngine';
import { Exp06TopographicShader } from './experiments/Exp06TopographicShader';

export function LabCanvas() {
  const activeExperiment = usePortfolioStore((s) => s.activeExperiment);
  const [settings, setSettings] = useState<GraphicsSettings>(graphicsManager.getSettings());
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const unsub = graphicsManager.subscribe((newSettings) => setSettings(newSettings));
    return () => {
      window.removeEventListener('resize', checkMobile);
      unsub();
    };
  }, []);

  // Responsive camera framing: pull camera back on mobile portrait screens so wide objects never clip
  const cameraZ = isMobileScreen ? 9.2 : 7.8;
  const cameraY = isMobileScreen ? 0.9 : 1.2;
  const cameraFov = isMobileScreen ? 48 : 45;

  return (
    <Canvas
      gl={{
        antialias: settings.antialiasing,
        powerPreference: settings.powerPreference,
        alpha: true,
      }}
      dpr={settings.dpr}
      camera={{ fov: cameraFov, position: [0, cameraY, cameraZ] }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* High-Fidelity Architectural Studio Lighting Rig */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[9, 14, 8]} intensity={1.8} />
      <directionalLight position={[-8, -5, -7]} intensity={0.75} color="#FF4D00" />
      <directionalLight position={[6, -4, 4]} intensity={0.4} color="#38BDF8" />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#FF4D00" />

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
        rotateSpeed={0.75}
        dampingFactor={0.05}
      />
    </Canvas>
  );
}

export default LabCanvas;