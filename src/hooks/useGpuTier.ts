'use client';

import { useEffect } from 'react';
import { usePortfolioStore, type QualityTier } from '@/store/usePortfolioStore';

export function useGpuTier() {
  const setQualityTier = usePortfolioStore((s) => s.setQualityTier);
  const setIsMobile = usePortfolioStore((s) => s.setIsMobile);

  useEffect(() => {
    // Detect mobile / touch devices
    const isMobileDevice =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches));
    setIsMobile(Boolean(isMobileDevice));

    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

      if (!gl) {
        setQualityTier('low');
        return;
      }

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase()
        : '';

      // Check for mobile or low-end integrated chips
      const isLowTier =
        isMobileDevice ||
        /mali|adreno\s*(3|4|5)|intel\s*hd|intel\s*uhd\s*6|powervr/i.test(renderer) ||
        window.navigator.hardwareConcurrency <= 4;

      const isHighTier =
        !isMobileDevice &&
        (/nvidia|geforce|rtx|gtx|radeon|apple\s*m[1-4]|apple\s*gpu/i.test(renderer) ||
          window.navigator.hardwareConcurrency >= 8);

      let detectedTier: QualityTier = 'high';
      if (isLowTier && !isHighTier) {
        detectedTier = 'low';
      } else if (!isHighTier) {
        detectedTier = 'medium';
      }

      setQualityTier(detectedTier);
    } catch {
      setQualityTier('medium');
    }
  }, [setQualityTier, setIsMobile]);
}

export default useGpuTier;
