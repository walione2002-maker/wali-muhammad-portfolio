'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { resolveSectionFromProgress } from '@/hooks/useSectionDetection';
import { PROJECTS } from '@/data/projects';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const hasEntered = usePortfolioStore((s) => s.hasEntered);

  useEffect(() => {
    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0));

    const lenis = new Lenis({
      duration: isMobile ? 0.85 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.1,
      touchMultiplier: 1.0,
    });
    lenisRef.current = lenis;

    // If user hasn't entered, block scrolling
    if (!hasEntered) {
      lenis.stop();
    }

    lenis.on('scroll', (e: { progress?: number; scroll: number; limit: number }) => {
      const progress =
        e.progress !== undefined
          ? e.progress
          : e.limit > 0
            ? Math.max(0, Math.min(1, e.scroll / e.limit))
            : 0;

      // 1. Update non-reactive store scrollProgress for CameraRig useFrame
      usePortfolioStore.setState({ scrollProgress: progress });

      // 2. Direct DOM update of top progress bar without React re-render
      const progressBar = document.getElementById('global-scroll-progress-bar');
      if (progressBar) {
        progressBar.style.transform = `scaleX(${progress})`;
      }

      // 3. Discrete section detection: Only trigger React update when integer index changes
      const { section, index } = resolveSectionFromProgress(progress);
      const state = usePortfolioStore.getState();

      if (index !== state.activeSectionIndex) {
        state.setActiveSection(section, index);
      }

      // 4. Discrete project detection in Section 02: Only trigger React update when integer index changes
      if (progress >= 0.22 && progress <= 0.70) {
        const showroomProgress = Math.max(0, Math.min(1, (progress - 0.26) / 0.38));
        const targetProjectIndex = Math.min(
          PROJECTS.length - 1,
          Math.max(0, Math.round(showroomProgress * (PROJECTS.length - 1)))
        );

        if (targetProjectIndex !== state.activeProjectIndex) {
          state.setActiveProjectIndex(targetProjectIndex);
          state.setActiveProjectId(PROJECTS[targetProjectIndex].id);
        }
      }
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
  }, [hasEntered]);

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
