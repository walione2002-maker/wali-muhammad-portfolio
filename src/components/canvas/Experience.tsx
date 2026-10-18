'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Lighting } from './Lighting';
import { Centerpiece } from './Centerpiece';
import { CameraRig } from './CameraRig';
import { Effects } from './Effects';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function Experience() {
  const qualityTier = usePortfolioStore((s) => s.qualityTier);
  const contextLossCount = usePortfolioStore((s) => s.contextLossCount);

  const isMobile =
    typeof window !== 'undefined' &&
    (window.innerWidth < 768 || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0));

  const dprConfig: [number, number] | number = isMobile
    ? [1, 1.5]
    : qualityTier === 'low'
      ? 1
      : qualityTier === 'medium'
        ? [1, 1.5]
        : [1, 2];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 h-[100dvh] w-screen">
      <Canvas
        key={`canvas-${contextLossCount}`}
        gl={{
          antialias: qualityTier !== 'low',
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={dprConfig}
        camera={{
          fov: 50,
          near: 0.1,
          far: 100,
          position: [0, 0, 12],
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100dvh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <CameraRig />
        <Lighting />
        <Centerpiece />
        {qualityTier === 'high' && <Effects />}
      </Canvas>
    </div>
  );
}

export default Experience;
