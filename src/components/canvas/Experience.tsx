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
  const isMobileStore = usePortfolioStore((s) => s.isMobile);

  const isMobile =
    isMobileStore ||
    (typeof window !== 'undefined' &&
      (window.innerWidth < 768 ||
        (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 w-full h-full overflow-hidden">
      <Canvas
        key={`canvas-${contextLossCount}-${isMobile ? 'mobile' : 'desktop'}`}
        gl={{
          antialias: !isMobile,
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: true,
        }}
        dpr={isMobile ? [0.85, 1.15] : [1, 1.75]}
        camera={{
          fov: 46,
          near: 0.1,
          far: 100,
          position: [0, 0.2, 13],
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <CameraRig />
        <Lighting />
        <Centerpiece />
        {qualityTier === 'high' && !isMobile && <Effects />}
      </Canvas>
    </div>
  );
}

export default Experience;
