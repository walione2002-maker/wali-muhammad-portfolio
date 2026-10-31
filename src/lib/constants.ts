import {
  DOORS_DATA,
  FLIP_ROLES,
  TIMELINE_DATA,
  PROJECTS,
  EXPERIMENTS,
} from '@/data/projects';

export const SECTION_THRESHOLDS = [
  { index: 0, name: 'hero', min: 0.0, max: 0.2 },
  { index: 1, name: 'websites', min: 0.2, max: 0.65 },
  { index: 2, name: 'services', min: 0.65, max: 0.82 },
  { index: 3, name: 'contact', min: 0.82, max: 1.0 },
] as const;

export const COLOR_PALETTE = {
  bgPrimary: '#050816',
  bgSecondary: '#0B1120',
  bgGlass: 'rgba(15, 23, 42, 0.72)',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  accentTeal: '#64FFDA',
  accentCyan: '#38BDF8',
  accentIndigo: '#6366F1',
  accentGold: '#F59E0B',
  borderSubtle: 'rgba(255, 255, 255, 0.08)',
  borderHover: 'rgba(255, 255, 255, 0.18)',
  titanium: '#CBD5E1',
};

export const MOTION_TIMINGS = {
  entryGateDuration: 1.1,
  hoverTransition: 0.3,
  sectionDuration: 0.8,
  splineTension: 0.35,
};

export const SITE_CONFIG = {
  name: 'Wali Muhammad',
  title: 'Wali Muhammad | Full-Stack Engineer, FinTech Systems Architect & Creative Developer',
  tagline: 'Engineering high-performance web applications, FinTech systems, and 3D spatial experiences.',
  description:
    'Official portfolio of Wali Muhammad — Full-Stack Engineer, FinTech Systems Architect at FAST-NUCES Karachi & 3D WebGL Developer.',
  url: 'https://devwalimuhammad.pages.dev',
  github: 'https://github.com/walione2002-maker',
  linkedin: 'https://www.linkedin.com/in/wali-muhammad-2002/',
  email: 'walimuhammad123@gmail.com',
  location: 'Karachi, Pakistan',
  availability: 'Available for Select Contracts & High-Impact Roles',
  timezone: 'PKT (UTC+5)',
};

export { DOORS_DATA, FLIP_ROLES, TIMELINE_DATA, PROJECTS, EXPERIMENTS };
