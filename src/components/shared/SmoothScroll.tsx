'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const setScrollProgress = usePortfolioStore((s) => s.setScrollProgress);
  const hasEntered = usePortfolioStore((s) => s.hasEntered);

  useEffect(() => {
    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0));

    const lenis = new Lenis({
      duration: isMobile ? 0.95 : 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.08,
      touchMultiplier: 1.0,
    });
    lenisRef.current = lenis;

    // If user hasn't entered, block scrolling
    if (!hasEntered) {
      lenis.stop();
    }

    lenis.on('scroll', (e: { progress?: number; scroll: number; limit: number }) => {
      // e.progress is between 0 and 1
      const progress = e.progress !== undefined
        ? e.progress
        : e.limit > 0
          ? Math.max(0, Math.min(1, e.scroll / e.limit))
          : 0;

      setScrollProgress(progress);
    });

    const handleResize = () => {
      lenis.resize();
    };
    window.addEventListener('resize', handleResize);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [setScrollProgress, hasEntered]);

  // Handle enter / lock state changes
  useEffect(() => {
    if (!lenisRef.current) return;
    if (hasEntered) {
      lenisRef.current.start();
    } else {
      lenisRef.current.stop();
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [hasEntered]);

  return <>{children}</>;
}

export default SmoothScroll;
