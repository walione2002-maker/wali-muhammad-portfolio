import { type ProjectData } from '@/types';

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
