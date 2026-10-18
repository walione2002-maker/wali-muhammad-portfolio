'use client';

import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

export function Effects() {
  const isMobile =
    typeof window !== 'undefined' &&
    (window.innerWidth < 768 || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0));

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.4}
        luminanceSmoothing={0.8}
        intensity={isMobile ? 0.45 : 0.7}
        mipmapBlur={!isMobile}
      />
      <Vignette eskil={false} offset={0.15} darkness={0.75} />
    </EffectComposer>
  );
}

export default Effects;
