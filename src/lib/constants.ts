export const SECTION_THRESHOLDS = [
  { index: 0, name: 'entry-gate', min: 0.0, max: 0.15 },
  { index: 1, name: 'executive-overview', min: 0.15, max: 0.35 },
  { index: 2, name: 'project-showroom', min: 0.35, max: 0.65 },
  { index: 3, name: 'tech-stack', min: 0.65, max: 0.85 },
  { index: 4, name: 'contact-portal', min: 0.85, max: 1.0 },
] as const;

export const COLOR_PALETTE = {
  bgPrimary: '#0A0A0F',
  bgSecondary: '#12121A',
  bgGlass: 'rgba(18, 18, 26, 0.7)',
  textPrimary: '#F0F0F5',
  textSecondary: '#8888A0',
  textAccent: '#C9A96E',
  accentGold: '#C9A96E',
  accentBlue: '#3B82F6',
  accentCyan: '#06B6D4',
  borderSubtle: 'rgba(255, 255, 255, 0.06)',
  borderHover: 'rgba(255, 255, 255, 0.12)',
  titanium: '#B8C4D0',
};

export const MOTION_TIMINGS = {
  entryGateDuration: 1.0,
  hoverTransition: 0.3,
  sectionDuration: 0.8,
  splineTension: 0.35,
};
