import {
  type ProjectData,
  type DoorConfig,
  type TimelineMilestone,
  type FlipRoleItem,
  type LabExperimentMeta,
} from '@/types';

const ORBITAL_RADIUS = 4.5;
const toAngle = (i: number) => i * ((2 * Math.PI) / 6);

export const PROJECTS: ProjectData[] = [
  {
    id: 'corpassion-events',
    index: 0,
    title: 'Corpassion Events',
    tagline: 'High-End Corporate Event Architecture & Client Inquiry Experience',
    impactMetric: 'Sub-second edge loading & unified direct inquiry funnel',
    description:
      'A luxury corporate showcase and inquiry platform engineered for a premier brand experience and corporate event architecture studio.',
    context:
      'Corpassion required a digital flagship that conveyed high visual prestige for corporate clients (multinationals, luxury brands) without the performance penalties typical of media-heavy agency portfolios.',
    challenge:
      'High-resolution event imagery and dynamic galleries frequently degrade mobile PageSpeed and cause layout shift, resulting in lost client inquiry conversions.',
    solution:
      'Architected a modular Next.js platform with responsive media caching, fluid visual storytelling, and a structured consultation inquiry funnel.',
    decision:
      'Implemented CSS subgrid layouts and zero-overhead image delivery pipelines, achieving 98+ mobile Core Web Vitals while presenting high-density event photography.',
    role: 'Lead Frontend Engineer & UI Architect',
    year: '2025',
    featured: true,
    layoutVariant: 'showcase',
    stack: ['Next.js 14', 'Tailwind CSS', 'TypeScript', 'Edge CDN', 'Vercel'],
    category: 'Event Architecture',
    liveUrl: 'https://corpassion-events.vercel.app',
    displayUrl: 'corpassion-events.vercel.app',
    image: '/projects/corpassion-events.png',
    githubUrl: 'https://github.com/walione2002-maker/corpassion-events',
    accentColor: '#F59E0B',
    orbitalAngle: toAngle(0),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: '3d-resume-builder',
    index: 1,
    title: '3D Interactive Resume Builder',
    tagline: 'Spatial 3D & WebGL Document Customization Application',
    impactMetric: 'Real-time 3D spatial viewport customization & vector PDF export',
    description:
      'An interactive WebGL application enabling candidates to design, inspect, and export technical resumes in a real-time 3D spatial document environment.',
    context:
      'Traditional online resume tools constrain users to flat 2D previews that feel rigid and uninspired. This project proves that spatial 3D interactions can make mundane document configuration tactile and engaging.',
    challenge:
      'Synchronizing live DOM typography edits with a 3D WebGL mesh material in real time without triggering continuous garbage collection or frame-rate drops.',
    solution:
      'Engineered a dynamic Three.js canvas that projects canvas-rendered document textures onto responsive physical paper geometry, paired with client-side vector PDF generation.',
    decision:
      'Utilized decoupled offscreen texture rendering with dirty-flag checking, keeping frame rates pinned at 60 FPS while enabling full spatial document inspection.',
    role: 'Creative Technologist & Developer',
    year: '2025',
    featured: true,
    layoutVariant: 'split-reversed',
    stack: ['Three.js', 'WebGL', 'JavaScript', 'HTML5 Canvas', 'Vector PDF'],
    category: 'Spatial 3D Application',
    liveUrl: 'https://3d-resume-builder-self.vercel.app',
    displayUrl: '3d-resume-builder-self.vercel.app',
    image: '/projects/3d-resume-builder.png',
    githubUrl: 'https://github.com/walione2002-maker/resume-australia',
    accentColor: '#8B5CF6',
    orbitalAngle: toAngle(1),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'amirs-kalonji-oil',
    index: 2,
    title: 'Amirs Kalonji Oil',
    tagline: 'Direct-to-Consumer Wellness E-Commerce Storefront',
    impactMetric: 'Streamlined single-screen checkout & direct WhatsApp purchasing',
    description:
      'A focused e-commerce product storefront built for a natural herbal wellness brand, prioritizing trust, mobile speed, and friction-free purchasing.',
    context:
      'In emerging digital markets, lengthy multi-step checkout processes with forced account creation lead to high shopping cart abandonment.',
    challenge:
      'Converting first-time visitors into paying customers on 3G/4G mobile networks with minimal clicks and immediate order verification.',
    solution:
      'Developed a streamlined Next.js storefront featuring real-time quantity calculations, trust badges, and automated WhatsApp order routing.',
    decision:
      'Eliminated multi-page redirect funnels in favor of an instant modal checkout and direct WhatsApp API payload, maximizing mobile checkout completion.',
    role: 'Full-Stack Web Developer',
    year: '2025',
    featured: true,
    layoutVariant: 'editorial',
    stack: ['Next.js 14', 'Tailwind CSS', 'Mobile First', 'WhatsApp API', 'Vercel'],
    category: 'D2C E-Commerce',
    liveUrl: 'https://amirs-kalonji-oil.vercel.app',
    displayUrl: 'amirs-kalonji-oil.vercel.app',
    image: '/projects/amirs-kalonji-oil.png',
    githubUrl: 'https://github.com/walione2002-maker/amirs-kalonji-oil-website',
    accentColor: '#10B981',
    orbitalAngle: toAngle(2),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'nexus-bay',
    index: 3,
    title: 'Nexus Bay',
    tagline: 'Digital Agency & Commercial Services Platform',
    impactMetric: 'Sub-second edge routing & 95+ Core Web Vitals audit',
    description:
      'A corporate web platform designed for a modern digital studio to showcase technical capabilities, case studies, and corporate offerings.',
    context:
      'Creative agencies require digital presence that signals design maturity, technical precision, and absolute reliability to international prospective clients.',
    challenge:
      'Balancing sophisticated editorial typography with fast time-to-interactive on global edge distribution networks.',
    solution:
      'Built a clean Next.js architecture with semantic HTML5 typography, subtle micro-interactions, and pre-rendered static routes.',
    decision:
      'Enforced strict TypeScript interfaces across all component boundaries and edge-deployed assets to Vercel, ensuring consistent sub-second global response times.',
    role: 'Frontend Architect',
    year: '2025',
    featured: true,
    layoutVariant: 'compact',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Responsive UI', 'Vercel'],
    category: 'Commercial Agency Platform',
    liveUrl: 'https://nexus-bay.vercel.app',
    displayUrl: 'nexus-bay.vercel.app',
    image: '/projects/nexus-bay.png',
    githubUrl: 'https://github.com/walione2002-maker/nexusbay-digital',
    accentColor: '#06B6D4',
    orbitalAngle: toAngle(3),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'federal-sanitary-hub',
    index: 4,
    title: 'Federal Sanitary & Hardware Hub',
    tagline: 'Commercial Product Catalog & B2B Quotation Engine',
    impactMetric: 'Faceted category navigation & instant quotation inquiries',
    description:
      'A digital product catalog and inquiry platform built for a commercial sanitary ware and hardware wholesale business.',
    challenge:
      'Managing hundreds of physical SKUs via manual price lists caused order friction and lost wholesale customer inquiries.',
    solution:
      'Created a searchable, categorized digital product hub with instant quote submission forms and structured technical specifications.',
    role: 'Full-Stack Developer',
    year: '2025',
    featured: false,
    stack: ['Next.js', 'Faceted Search', 'SEO Architecture', 'Vercel'],
    category: 'B2B Product Catalog',
    liveUrl: 'https://federal-sanitary.vercel.app',
    displayUrl: 'federal-sanitary.vercel.app',
    image: '/projects/commercial-sanitary-hub.png',
    githubUrl: 'https://github.com/walione2002-maker/federal-sanitary',
    accentColor: '#3B82F6',
    orbitalAngle: toAngle(4),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'digital-wedding-suite',
    index: 5,
    title: 'Fatima & Ali Digital Wedding Suite',
    tagline: 'Interactive Event Invitation & Guest RSVP Platform',
    impactMetric: 'Mobile-first event schedules & real-time online attendance confirmation',
    description:
      'A custom interactive digital invitation website featuring smooth scroll animations, venue directions, and online guest RSVP verification.',
    challenge:
      'Traditional paper invitations lacked real-time attendance tracking or ability to update schedule information dynamically.',
    solution:
      'Built an accessible, motion-enhanced invitation suite with live event timelines and instant mobile RSVP confirmation.',
    role: 'Frontend & Motion Engineer',
    year: '2025',
    featured: false,
    stack: ['Next.js', 'Motion Design', 'Mobile First', 'Vercel'],
    category: 'Interactive Event Suite',
    liveUrl: 'https://fatima-ali-wedding.vercel.app',
    displayUrl: 'fatima-ali-wedding.vercel.app',
    image: '/projects/digital-wedding-suite.png',
    githubUrl: 'https://github.com/walione2002-maker/fatima-ali-wedding',
    accentColor: '#EC4899',
    orbitalAngle: toAngle(5),
    orbitalRadius: ORBITAL_RADIUS,
  },
];

export const projects = PROJECTS;

// FLIP_ROLES (For the Hero 3D Mechanical Split-Flap Switcher)
export const FLIP_ROLES: FlipRoleItem[] = [
  {
    label: 'Full-Stack Engineer',
    badgeNote: 'Next.js 14 · TypeScript · Edge',
    accentClass: 'from-zinc-900 via-slate-800 to-blue-900',
  },
  {
    label: 'FinTech Architect',
    badgeNote: 'FAST-NUCES · Market Systems',
    accentClass: 'from-zinc-900 via-emerald-950 to-emerald-800',
  },
  {
    label: '3D WebGL Developer',
    badgeNote: 'Three.js · R3F · 60 FPS Shaders',
    accentClass: 'from-zinc-900 via-indigo-950 to-purple-900',
  },
  {
    label: 'Product Engineer',
    badgeNote: '98+ Core Web Vitals · D2C',
    accentClass: 'from-zinc-900 via-stone-800 to-amber-900',
  },
];

// DOORS_DATA (The 4 Architectural Doors from 00:04 – 00:14)
export const DOORS_DATA: DoorConfig[] = [
  {
    id: 'web-development',
    navLabel: 'Web Development',
    nameplate: 'WEB & E-COMMERCE',
    title: 'Web Development',
    subtitleBadge: 'END TO END, FROM DESIGN TO LIVE SITE',
    roomTitle: 'Web Development',
    roomDescription:
      'Commercial websites, luxury brand flagships, and high-converting D2C storefronts engineered end-to-end from layout and motion interaction to responsive front-end, technical SEO, and global edge launch.',
    colors: {
      primary: '#2B4C7E',
      panelDark: '#1B3154',
      trim: '#3D67A6',
      glow: 'rgba(59, 130, 246, 0.4)',
      accentHex: '#60A5FA',
    },
    checklist: [
      'Discovery, conversion funnel mapping & performance budgeting',
      'UI, editorial typography & mobile-first visual design',
      'Next.js 14 App Router front-end & instant WhatsApp/modal checkout',
      'Technical SEO, JSON-LD schema & 98+ Core Web Vitals',
      'Edge CDN launch, analytics & ongoing production support',
    ],
    projectSlugs: ['corpassion-events', 'amirs-kalonji-oil', 'nexus-bay'],
  },
  {
    id: 'fintech-apps',
    navLabel: 'FinTech & Apps',
    nameplate: 'FINTECH & WEB APPS',
    title: 'App Development',
    subtitleBadge: 'FROM THE FIRST IDEA TO THE LIVE SYSTEM',
    roomTitle: 'FinTech & Web Applications',
    roomDescription:
      'Bespoke web applications, corporate agency platforms, and quantitative FinTech interfaces built with strict TypeScript boundaries, real-time state management, and sub-second edge response.',
    colors: {
      primary: '#4D4161',
      panelDark: '#332A42',
      trim: '#685882',
      glow: 'rgba(168, 85, 247, 0.4)',
      accentHex: '#C084FC',
    },
    checklist: [
      'Product scoping, API specification & user flows',
      'Strict TypeScript component architecture (zero loose any)',
      'Cross-platform responsive dashboards & FinTech analytics',
      'Device testing, Zustand state pipelines & staging builds',
      'Global edge deployment, monitoring & updates',
    ],
    projectSlugs: ['nexus-bay', '3d-resume-builder', 'corpassion-events'],
  },
  {
    id: 'spatial-web',
    navLabel: '3D & Spatial Web',
    nameplate: '3D & SPATIAL WEB',
    title: '3D & Spatial Web',
    subtitleBadge: 'REAL-TIME WEBGL, THREE.JS & SHADER PHYSICS',
    roomTitle: '3D Spatial Web & Engineering Lab',
    roomDescription:
      'Hardware-accelerated Three.js applications, real-time spatial document environments, and our 6-part interactive WebGL shader & physics engineering lab pinned at 60 FPS.',
    colors: {
      primary: '#56785F',
      panelDark: '#395240',
      trim: '#70997B',
      glow: 'rgba(52, 211, 153, 0.4)',
      accentHex: '#34D399',
    },
    checklist: [
      'Three.js & React Three Fiber (R3F) spatial architecture',
      'Decoupled offscreen canvas textures & 60 FPS render loops',
      'Physically-based transmission optics, refraction & GLSL shaders',
      'Interactive 3D document inspection & vector PDF export',
      'Adaptive GPU quality tiers, DPR clamping & auto-pause lifecycles',
    ],
    projectSlugs: ['3d-resume-builder'],
    includeLab: true,
  },
  {
    id: 'systems-archive',
    navLabel: 'B2B & Digital Suites',
    nameplate: 'B2B & DIGITAL SUITES',
    title: 'B2B & Digital Suites',
    subtitleBadge: 'COMMERCIAL CATALOGS & BESPOKE INTERACTIVE PLATFORMS',
    roomTitle: 'Commercial Hubs & Digital Suites',
    roomDescription:
      'High-density B2B wholesale product catalogs, interactive digital event suites with live guest RSVP verification, and complete full-stack production handoffs.',
    colors: {
      primary: '#AD5736',
      panelDark: '#7C3C23',
      trim: '#CA6E4B',
      glow: 'rgba(251, 146, 60, 0.4)',
      accentHex: '#FB923C',
    },
    checklist: [
      'Brand, wholesale catalog & audience requirement analysis',
      'Zero-latency SKU filtering & B2B inquiry quote funnels',
      'Bespoke interactive event suites & smooth scroll choreography',
      'Online RSVP verification, venue routing & mobile optimization',
      'Complete repository documentation & Cloudflare/Vercel handoff',
    ],
    projectSlugs: ['federal-sanitary-hub', 'digital-wedding-suite', 'amirs-kalonji-oil'],
  },
];

// TIMELINE_DATA (For the "Let's go back in time" Radial Time-Machine Section)
export const TIMELINE_DATA: TimelineMilestone[] = [
  {
    id: 'milestone-2026-now',
    stepIndex: '01 / 06',
    year: '2026',
    dateRange: 'JAN 2026 — NOW',
    badgeText: '01 / JAN 2026 - NOW',
    title: 'Independent Full-Stack & Spatial Web Engineer',
    subtitle: 'Working for myself, remote-first · Karachi, PK',
    bullets: [
      'Websites, full-stack web apps, D2C storefronts and 3D WebGL systems built end-to-end.',
      'Working directly with international founders, agencies and commercial brands across 6+ live deployments.',
    ],
  },
  {
    id: 'milestone-2026-mid',
    stepIndex: '02 / 06',
    year: '2026',
    dateRange: 'JUN 2026 — OCT 2026',
    badgeText: '02 / JUN 2026 - OCT 2026',
    title: 'Lead Frontend & UI Architect',
    subtitle: 'Corpassion Events · Zynnco Chauffeurs · Amir Internationals',
    bullets: [
      'Engineered luxury corporate platforms, chauffeur booking architectures and D2C e-commerce funnels achieving 98+ mobile Core Web Vitals.',
      'Built instant WhatsApp API checkout payloads and B2B wholesale commodity portals for pure cold-pressed almond and kalonji oil lines.',
    ],
  },
  {
    id: 'milestone-2025-fintech',
    stepIndex: '03 / 06',
    year: '2025',
    dateRange: 'AUG 2025 — NOW',
    badgeText: '03 / AUG 2025 - NOW',
    title: 'B.S. Financial Technology (FinTech)',
    subtitle: 'FAST National University of Computer & Emerging Sciences (FAST-NUCES), Karachi',
    bullets: [
      'Undergraduate degree in Financial Technology combining software systems architecture, quantitative finance and full-stack engineering.',
      'Executing community service initiatives teaching foundational English and interactive learning systems to Grade 1–3 students in Karachi.',
    ],
  },
  {
    id: 'milestone-2025-creative',
    stepIndex: '04 / 06',
    year: '2025',
    dateRange: 'JAN 2025 — AUG 2025',
    badgeText: '04 / JAN 2025 - AUG 2025',
    title: 'Creative Technologist & 3D WebGL Developer',
    subtitle: 'Spatial Web Lab & Commercial Platforms',
    bullets: [
      'Architected the 3D Interactive Resume Builder with decoupled offscreen canvas texture rendering pinned at 60 FPS.',
      'Delivered Nexus Bay, Federal Sanitary & Hardware Hub and bespoke interactive digital event suites on Vercel and Cloudflare Pages.',
    ],
  },
  {
    id: 'milestone-2024',
    stepIndex: '05 / 06',
    year: '2024',
    dateRange: 'JAN 2024 — DEC 2024',
    badgeText: '05 / JAN 2024 - DEC 2024',
    title: 'Financial Markets Analyst & Web Developer',
    subtitle: 'Commodities, Crypto & E-Commerce Systems',
    bullets: [
      'Applied market structure, risk management and position sizing models across Gold (XAUUSD), Silver, Crude Oil and major digital assets.',
      'Designed and deployed custom WordPress, Shopify and modern React web storefronts for international client inquiries.',
    ],
  },
  {
    id: 'milestone-2022',
    stepIndex: '06 / 06',
    year: '2022',
    dateRange: '2022 — 2025',
    badgeText: '06 / 2022 - 2025',
    title: 'Foundational Engineering, GED & Cambridge O-Levels',
    subtitle: 'Next Step & The Academy · Karachi, Pakistan',
    bullets: [
      'Completed Cambridge O-Levels at The Academy and General Education Development (GED) credential at Next Step in Karachi.',
      'Built deep hands-on hardware and software foundations across Python, JavaScript, custom Android ROM/ADB debugging and automotive systems.',
    ],
  },
];

// 6 Interactive WebGL Lab Experiments Metadata
export const EXPERIMENTS: LabExperimentMeta[] = [
  {
    id: '01-gyroscopic',
    number: '01',
    title: 'Gyroscopic Material Study',
    tagline: 'Physical Transmission & Gyroscopic Mechanics',
    description:
      'A study in real-time transmission optics, refraction index dispersion, and nested gimbal harmonic rotation.',
    interactionHint: 'Drag to Orbit 3D Gimbal · Switch Shader Modes Below',
    technology: ['Three.js', 'MeshPhysicalMaterial', 'Gimbal Physics'],
    modes: ['refraction', 'wireframe', 'kinetic'],
  },
  {
    id: '02-spatial-system',
    number: '02',
    title: 'Spatial Interface Architecture',
    tagline: 'Modular Planar Systems in 3D Space',
    description:
      'An exploration of interface layers (client presentation, state, services, database) assembling into a coherent digital product structure.',
    interactionHint: 'Drag to Inspect Layer Depth · Toggle Exploded View',
    technology: ['Spatial UI', 'Layered Geometry', 'Isometric Matrix'],
    modes: ['assembled', 'deconstructed', 'planar'],
  },
  {
    id: '03-kinetic-type',
    number: '03',
    title: 'Kinetic Typographic Field',
    tagline: 'Dynamic Velocity Displacement Sculpture',
    description:
      'Beveled 3D letterforms forming "BUILD WITH INTENT". Pointer velocity generates elastic displacement waves with damped return.',
    interactionHint: 'Move Cursor Across Letters to Generate Force Wave',
    technology: ['3D Extruded Glyphs', 'Elastic Springs', 'Velocity Physics'],
    modes: ['harmonic', 'velocity', 'grid'],
  },
  {
    id: '04-signal-architecture',
    number: '04',
    title: 'Responsive Signal Architecture',
    tagline: 'Edge Routing & Packet Flow Simulation',
    description:
      'Real-time graph visualization representing global network packets traveling between client devices, edge nodes, and database clusters.',
    interactionHint: 'Drag to Rotate Topology · Toggle Surge Velocity',
    technology: ['InstancedMesh', 'Graph Networks', 'Edge Simulation'],
    modes: ['continuous', 'burst', 'route'],
  },
  {
    id: '05-layout-engine',
    number: '05',
    title: 'Generative Layout Engine',
    tagline: 'Dynamic Grid & Constraint Adaptation',
    description:
      'Spatial grid modules that dynamically recalculate aspect ratios, column rhythms, and component scales in real time.',
    interactionHint: 'Toggle Layout Density Modes · Drag to Inspect',
    technology: ['Parametric Layouts', 'Dynamic Constraints', 'Interpolation'],
    modes: ['balanced', 'dense', 'minimal'],
  },
  {
    id: '06-topographic-shader',
    number: '06',
    title: 'Topographic Shader Study',
    tagline: 'Real-time GLSL Surface Displacement',
    description:
      'Custom GLSL vertex deformation and contour line shaders generating elevation ridges, ripple interference, and shockwaves.',
    interactionHint: 'Move Cursor to Generate Elevation Ripples',
    technology: ['GLSL Shaders', 'Vertex Displacement', 'Contour Mapping'],
    modes: ['frequencies', 'topography', 'pulse'],
  },
];

export const experiments = EXPERIMENTS;
