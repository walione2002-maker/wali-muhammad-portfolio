'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { useSectionObserver } from '@/hooks/useSectionDetection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

declare global {
  interface Window {
    __lenis?: Lenis;
    __scrollToDoorsLineup?: (instant?: boolean) => void;
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useSectionObserver();
  const lenisRef = useRef<Lenis | null>(null);
  const activeDoorId = usePortfolioStore((s) => s.activeDoorId);
  const prevDoorIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Initialize Lenis with smooth physics
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Bridge Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', (e: { scroll: number; limit: number; progress: number }) => {
      ScrollTrigger.update();
      usePortfolioStore.setState({ scrollProgress: e.progress });

      const progressBar = document.getElementById('global-scroll-progress-bar');
      if (progressBar) {
        progressBar.style.transform = `scaleX(${e.progress})`;
      }
    });

    // Synchronize animation ticker with Lenis requestAnimationFrame
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Global helper: smoothly glide to the 4-Door Lineup (#doors-lineup)
    window.__scrollToDoorsLineup = (instant = false) => {
      // Check if pinned horizontal ScrollTrigger exists
      const allST = ScrollTrigger.getAll();
      const pinST = allST.find((st) => st.pin && st.vars.trigger);

      if (pinST && pinST.start !== undefined && pinST.end !== undefined) {
        // Target the finale 4-Door lineup at the end of the pinned scroll
        const targetScroll = pinST.start + (pinST.end - pinST.start) * 0.98;
        if (instant) {
          lenis.scrollTo(targetScroll, { immediate: true });
        } else {
          lenis.scrollTo(targetScroll, {
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
        return;
      }

      const target = document.getElementById('doors-lineup') || document.getElementById('doors-section');
      if (target) {
        if (instant) {
          lenis.scrollTo(target, { immediate: true });
        } else {
          lenis.scrollTo(target, {
            offset: -10,
            duration: 1.3,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      delete window.__lenis;
      delete window.__scrollToDoorsLineup;
    };
  }, []);

  // Watch activeDoorId:
  // 1. Entering a door room (null -> id at 00:14): immediate scroll to top 0
  // 2. Exiting a door room (id -> null at 00:15 - 00:18): restore scroll directly to #doors-lineup
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (prevDoorIdRef.current === null && activeDoorId !== null) {
      // Entered spatial door room: jump to top immediately
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    } else if (prevDoorIdRef.current !== null && activeDoorId === null) {
      // Returned from door room: glide back directly to 4-Door Lineup (#doors-lineup)
      setTimeout(() => {
        ScrollTrigger.refresh();
        window.__scrollToDoorsLineup?.(false);
      }, 80);
    }

    prevDoorIdRef.current = activeDoorId;
  }, [activeDoorId]);

  return <>{children}</>;
}

export default SmoothScroll;
