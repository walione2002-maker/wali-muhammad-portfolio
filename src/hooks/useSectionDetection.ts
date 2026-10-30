'use client';

import { useEffect } from 'react';
import { usePortfolioStore, type SectionName } from '@/store/usePortfolioStore';

const SECTIONS: SectionName[] = [
  'hero',
  'work',
  'capabilities',
  'lab',
  'process',
  'about',
  'contact',
];

/**
 * Initializes IntersectionObserver to track currently visible section cleanly.
 */
export function useSectionObserver() {
  const setActiveSection = usePortfolioStore((s) => s.setActiveSection);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible section with highest intersection ratio
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry && visibleEntry.target.id) {
          const id = visibleEntry.target.id as SectionName;
          if (SECTIONS.includes(id)) {
            setActiveSection(id);
          }
        }
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    SECTIONS.forEach((secId) => {
      const el = document.getElementById(secId);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [setActiveSection]);
}

export default useSectionObserver;
