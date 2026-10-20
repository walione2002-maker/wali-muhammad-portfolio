'use client';

import React, { useEffect } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { resolveSectionFromProgress } from '@/hooks/useSectionDetection';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let rafId: number | null = null;
    let isScheduled = false;

    const updateScrollMetrics = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollLimit = docHeight - winHeight;
      const progress = scrollLimit > 0 ? Math.max(0, Math.min(1, scrollY / scrollLimit)) : 0;

      // 1. Update non-reactive store scrollProgress for 3D useFrame
      usePortfolioStore.setState({ scrollProgress: progress });

      // 2. Direct DOM transform update of top progress bar (zero React re-render)
      const progressBar = document.getElementById('global-scroll-progress-bar');
      if (progressBar) {
        progressBar.style.transform = `scaleX(${progress})`;
      }

      // 3. Discrete section detection: Only triggers React state update when index changes
      const { section, index } = resolveSectionFromProgress(progress);
      const state = usePortfolioStore.getState();
      if (index !== state.activeSectionIndex) {
        state.setActiveSection(section, index);
      }

      isScheduled = false;
    };

    const onScroll = () => {
      if (!isScheduled) {
        isScheduled = true;
        rafId = requestAnimationFrame(updateScrollMetrics);
      }
    };

    // Use passive event listener so browser compositor never waits for JavaScript
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial sync
    updateScrollMetrics();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return <>{children}</>;
}

export default SmoothScroll;
