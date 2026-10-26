'use client';

import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

export function Effects() {
  const isMobile =
    typeof window !== 'undefined' &&
    (window.innerWidth < 768 || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0));

  if (isMobile) {
    return null; // Skip postprocessing overhead on mobile
  }

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.5}
        luminanceSmoothing={0.7}
        intensity={0.65}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.2} darkness={0.7} />
    </EffectComposer>
  );
}

export default Effects;
