import { create } from 'zustand';
import { type LabExperimentId } from '@/types';

export type QualityTier = 'high' | 'medium' | 'low';
export type SectionName =
  | 'hero'
  | 'work'
  | 'capabilities'
  | 'lab'
  | 'process'
  | 'about'
  | 'contact';

const SECTION_INDEX_MAP: Record<SectionName, number> = {
  hero: 0,
  work: 1,
  capabilities: 2,
  lab: 3,
  process: 4,
  about: 5,
  contact: 6,
};

export interface PortfolioState {
  // Scroll & Active Section
  scrollProgress: number;
  activeSection: SectionName;
  activeSectionIndex: number;

  // Project Interaction State
  activeProjectId: string | null;

  // 3D Spatial Lab Controls
  activeExperiment: LabExperimentId;
  experimentModes: Record<LabExperimentId, string>;
  isLabInView: boolean;

  // Performance & Device State
  qualityTier: QualityTier;
  isMobile: boolean;
  contextLossCount: number;

  // Actions
  setScrollProgress: (val: number) => void;
  setActiveSection: (section: SectionName) => void;
  setActiveProjectId: (id: string | null) => void;
  setActiveExperiment: (id: LabExperimentId) => void;
  setExperimentMode: (expId: LabExperimentId, mode: string) => void;
  setIsLabInView: (inView: boolean) => void;
  setQualityTier: (tier: QualityTier) => void;
  setIsMobile: (val: boolean) => void;
  incrementContextLoss: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  scrollProgress: 0,
  activeSection: 'hero',
  activeSectionIndex: 0,

  activeProjectId: null,

  activeExperiment: '01-gyroscopic',
  experimentModes: {
    '01-gyroscopic': 'refraction',
    '02-spatial-system': 'assembled',
    '03-kinetic-type': 'harmonic',
    '04-signal-architecture': 'continuous',
    '05-layout-engine': 'balanced',
    '06-topographic-shader': 'frequencies',
  },
  isLabInView: false,

  qualityTier: 'high',
  isMobile: false,
  contextLossCount: 0,

  setScrollProgress: (val) => set({ scrollProgress: val }),
  setActiveSection: (section) =>
    set({
      activeSection: section,
      activeSectionIndex: SECTION_INDEX_MAP[section] ?? 0,
    }),
  setActiveProjectId: (id) => set({ activeProjectId: id }),
  setActiveExperiment: (id) => set({ activeExperiment: id }),
  setExperimentMode: (expId, mode) =>
    set((s) => ({
      experimentModes: {
        ...s.experimentModes,
        [expId]: mode,
      },
    })),
  setIsLabInView: (inView) => set({ isLabInView: inView }),
  setQualityTier: (tier) => set({ qualityTier: tier }),
  setIsMobile: (val) => set({ isMobile: val }),
  incrementContextLoss: () =>
    set((s) => ({ contextLossCount: s.contextLossCount + 1 })),
}));
