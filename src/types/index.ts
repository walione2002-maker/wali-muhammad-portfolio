export type ProjectCategory = string;

export interface ProjectData {
  /** Unique slug identifier (kebab-case) */
  id: string;
  /** Display order index (0–5) */
  index: number;
  /** Project title */
  title: string;
  /** Short editorial tagline */
  tagline: string;
  /** Full description paragraph */
  description: string;
  /** Context / commercial rationale */
  context?: string;
  /** Specific client/user challenge */
  challenge?: string;
  /** Notable implementation / solution */
  solution?: string;
  /** Key engineering or architectural decision */
  decision?: string;
  /** Key client outcome / impact metric */
  impactMetric: string;
  /** Role played in development */
  role: string;
  /** Completion / launch year */
  year: string;
  /** Whether highlighted as primary case study */
  featured: boolean;
  /** Featured layout variant for visual variety */
  layoutVariant?: 'showcase' | 'split-reversed' | 'editorial' | 'compact';
  /** Technology stack badges */
  stack: string[];
  /** Category / vertical label */
  category: ProjectCategory;
  /** Live production URL */
  liveUrl: string;
  /** Clean live display domain */
  displayUrl?: string;
  /** Screenshot / front picture image path in /public */
  image?: string;
  /** GitHub repository URL (source code) */
  githubUrl: string;
  /** Accent color hex */
  accentColor: string;
  /** Angular position (radians) for 3D lab */
  orbitalAngle: number;
  /** Orbital ring radius for 3D lab */
  orbitalRadius: number;
}

export type LabExperimentId =
  | '01-gyroscopic'
  | '02-spatial-system'
  | '03-kinetic-type'
  | '04-signal-architecture'
  | '05-layout-engine'
  | '06-topographic-shader';

export interface LabExperimentMeta {
  id: LabExperimentId;
  number: string;
  title: string;
  tagline: string;
  description: string;
  interactionHint: string;
  technology: string[];
  modes: string[];
}
