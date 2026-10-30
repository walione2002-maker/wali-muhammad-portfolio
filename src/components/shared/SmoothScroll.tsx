'use client';

import React, { useEffect } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { useSectionObserver } from '@/hooks/useSectionDetection';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useSectionObserver();

  useEffect(() => {
    let rafId: number | null = null;
    let isScheduled = false;

    const updateScrollMetrics = () => {
      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollLimit = docHeight - winHeight;
      const progress =
        scrollLimit > 0 ? Math.max(0, Math.min(1, scrollY / scrollLimit)) : 0;

      // Update store scrollProgress
      usePortfolioStore.setState({ scrollProgress: progress });

      // Direct DOM transform of top progress bar
      const progressBar = document.getElementById('global-scroll-progress-bar');
      if (progressBar) {
        progressBar.style.transform = `scaleX(${progress})`;
      }

      isScheduled = false;
    };

    const onScroll = () => {
      if (!isScheduled) {
        isScheduled = true;
        rafId = requestAnimationFrame(updateScrollMetrics);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

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
