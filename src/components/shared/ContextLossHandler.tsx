'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function ContextLossHandler() {
  const incrementContextLoss = usePortfolioStore((s) => s.incrementContextLoss);

  useEffect(() => {
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('WebGL context lost! Triggering canvas remount & recovery...');
      incrementContextLoss();
    };

    const handleContextRestored = () => {
      console.info('WebGL context successfully restored.');
    };

    window.addEventListener('webglcontextlost', handleContextLost);
    window.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      window.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [incrementContextLoss]);

  return null;
}

export default ContextLossHandler;
