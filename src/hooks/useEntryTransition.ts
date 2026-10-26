'use client';

import { useCallback } from 'react';
import gsap from 'gsap';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function useEntryTransition() {
  const setIsTransitioning = usePortfolioStore((s) => s.setIsTransitioning);
  const setHasEntered = usePortfolioStore((s) => s.setHasEntered);
  const setEntryProgress = usePortfolioStore((s) => s.setEntryProgress);

  const startEntry = useCallback(
    (
      titleEl: HTMLElement | null,
      subtitleEl: HTMLElement | null,
      ctaEl: HTMLElement | null,
      gateContainerEl: HTMLElement | null
    ) => {
      // Guard against double clicks
      const state = usePortfolioStore.getState();
      if (state.hasEntered || state.isTransitioning) return;

      setIsTransitioning(true);

      const animObj = { progress: 0 };

      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onUpdate: () => {
          setEntryProgress(animObj.progress);
        },
        onComplete: () => {
          setIsTransitioning(false);
          setHasEntered(true);
          setEntryProgress(1);
        },
      });

      // Animate optical progress 0 -> 1 for camera rig
      tl.to(
        animObj,
        {
          progress: 1,
          duration: 1.1,
          ease: 'power2.inOut',
        },
        0
      );

      // Title scales outward past camera with motion blur
      if (titleEl) {
        tl.to(
          titleEl,
          {
            scale: 3.5,
            opacity: 0,
            filter: 'blur(16px)',
            duration: 0.9,
            ease: 'power3.in',
          },
          0
        );
      }

      // Subtitle slides down and fades
      if (subtitleEl) {
        tl.to(
          subtitleEl,
          {
            y: 30,
            opacity: 0,
            filter: 'blur(6px)',
            duration: 0.6,
          },
          0.05
        );
      }

      // CTA shrinks and fades
      if (ctaEl) {
        tl.to(
          ctaEl,
          {
            scale: 0.85,
            opacity: 0,
            duration: 0.45,
          },
          0.1
        );
      }

      // Fade out gate background overlay
      if (gateContainerEl) {
        tl.to(
          gateContainerEl,
          {
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.5,
          },
          0.6
        );
      }

      return tl;
    },
    [setIsTransitioning, setHasEntered, setEntryProgress]
  );

  return { startEntry };
}

export default useEntryTransition;
