'use client';

import { usePortfolioStore, type SectionName } from '@/store/usePortfolioStore';

/**
 * Resolves section name and index from normalized scroll progress.
 */
export function resolveSectionFromProgress(progress: number): {
  section: SectionName;
  index: number;
} {
  if (progress >= 0.82) {
    return { section: 'contact', index: 3 };
  } else if (progress >= 0.65) {
    return { section: 'services', index: 2 };
  } else if (progress >= 0.20) {
    return { section: 'websites', index: 1 };
  }
  return { section: 'hero', index: 0 };
}

/**
 * Hook to read current section state without continuous 60Hz re-renders.
 */
export function useSectionDetection() {
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);

  return { activeSection, activeSectionIndex };
}

export default useSectionDetection;
