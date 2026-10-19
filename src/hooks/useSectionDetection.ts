'use client';

import { usePortfolioStore, type SectionName } from '@/store/usePortfolioStore';

/**
 * Pure helper to resolve section name & index from normalized scroll progress.
 * Used internally in the scroll handler without triggering React 60Hz re-renders.
 */
export function resolveSectionFromProgress(progress: number): {
  section: SectionName;
  index: number;
} {
  if (progress >= 0.85) {
    return { section: 'contact-portal', index: 4 };
  } else if (progress >= 0.66) {
    return { section: 'tech-stack', index: 3 };
  } else if (progress >= 0.22) {
    return { section: 'project-showroom', index: 2 };
  } else if (progress >= 0.04) {
    return { section: 'executive-overview', index: 1 };
  }
  return { section: 'entry-gate', index: 0 };
}

/**
 * Section detection hook: returns discrete active section values without subscribing to continuous scrollProgress.
 */
export function useSectionDetection() {
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);

  return { activeSection, activeSectionIndex };
}

export default useSectionDetection;
