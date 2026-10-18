'use client';

import { useCallback } from 'react';
import gsap from 'gsap';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function useEntryTransition() {
  const setIsTransitioning = usePortfolioStore((s) => s.setIsTransitioning);
  const setHasEntered = usePortfolioStore((s) => s.setHasEntered);

  const startEntry = useCallback(
    (
      titleEl: HTMLElement | null,
      subtitleEl: HTMLElement | null,
      ctaEl: HTMLElement | null,
      gateContainerEl: HTMLElement | null
    ) => {
      setIsTransitioning(true);

      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => {
          setIsTransitioning(false);
          setHasEntered(true);
        },
      });

      // Animate typography scaling outward past camera with optical motion blur
      if (titleEl) {
        tl.to(
          titleEl,
          {
            scale: 4.8,
            opacity: 0,
            filter: 'blur(12px)',
            duration: 0.95,
          },
          0
        );
      }

      if (subtitleEl) {
        tl.to(
          subtitleEl,
          {
            scale: 2.2,
            opacity: 0,
            y: 40,
            filter: 'blur(8px)',
            duration: 0.75,
          },
          0.1
        );
      }

      if (ctaEl) {
        tl.to(
          ctaEl,
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
          },
          0.1
        );
      }

      // Fade out and guarantee no pointer-event obstruction
      if (gateContainerEl) {
        tl.to(
          gateContainerEl,
          {
            opacity: 0,
            pointerEvents: 'none',
            visibility: 'hidden',
            duration: 0.45,
          },
          0.55
        );
      }

      return tl;
    },
    [setIsTransitioning, setHasEntered]
  );

  return { startEntry };
}

export default useEntryTransition;
