'use client';

import { usePortfolioStore, type SectionName } from '@/store/usePortfolioStore';

/**
 * Pure helper to resolve human section name & index from normalized scroll progress.
 * Used internally in the scroll handler without triggering React 60Hz re-renders.
 */
export function resolveSectionFromProgress(progress: number): {
  section: SectionName;
  index: number;
} {
  if (progress >= 0.80) {
    return { section: 'contact', index: 3 };
  } else if (progress >= 0.62) {
    return { section: 'services', index: 2 };
  } else if (progress >= 0.12) {
    return { section: 'websites', index: 1 };
  }
  return { section: 'hero', index: 0 };
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
