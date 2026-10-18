# ARCHITECTURE.md — Wali Muhammad · 3D Portfolio

> **Document revision:** 2026-10-18 · **Author:** Principal Creative Technologist (Awwwards Jury)  
> **Status:** PLANNING — no application code ships until Phases 1–4 are executed.

---

## Table of Contents

1. [High-Level System Overview](#1-high-level-system-overview)
2. [Directory & File Structure](#2-directory--file-structure)
3. [Dependency Manifest (`package.json`)](#3-dependency-manifest-packagejson)
4. [Camera Spline — Mathematical Specification](#4-camera-spline--mathematical-specification)
5. [Zustand Global State Store Schema](#5-zustand-global-state-store-schema)
6. [TypeScript Interfaces & Data Layer (`src/data/projects.ts`)](#6-typescript-interfaces--data-layer-srcdataprojectsts)
7. [Component Architecture & Rendering Pipeline](#7-component-architecture--rendering-pipeline)
8. [Animation Choreography Contract](#8-animation-choreography-contract)
9. [Security, Technical SEO & WebGL Performance Budget](#9-security-technical-seo--webgl-performance-budget)
10. [Cloudflare Zero-Downtime Deployment](#10-cloudflare-zero-downtime-deployment)
11. [Phase Execution Plan (for Gemini 3.8 Flash High)](#11-phase-execution-plan-for-gemini-38-flash-high)

---

## 1. High-Level System Overview

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         BROWSER  VIEWPORT                               │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  z-index: 0 — Fixed <Canvas> (React Three Fiber)                  │  │
│  │  ┌──────────────────────────────────────────────────────────┐      │  │
│  │  │  CatmullRomCurve3 Camera Rig                             │      │  │
│  │  │  ┌──────────────────────────────────────┐                │      │  │
│  │  │  │ Procedural 3D Centerpiece             │                │      │  │
│  │  │  │  • Gyroscopic titanium rings (×3)     │                │      │  │
│  │  │  │  • Refractive physical core           │                │      │  │
│  │  │  │  • 8 orbital project nodes            │                │      │  │
│  │  │  └──────────────────────────────────────┘                │      │  │
│  │  │  Lights · Env · Post-processing                          │      │  │
│  │  └──────────────────────────────────────────────────────────┘      │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  z-index: 10 — Semantic HTML5 DOM Overlay                         │  │
│  │  ┌──────────────────────────────────────────────────────────┐      │  │
│  │  │ Section 0: Entry Gate (h1, designation, CTA)             │      │  │
│  │  │ Section 1: Executive Overview                            │      │  │
│  │  │ Section 2: Project Showroom (8 cards, live links, GH)    │      │  │
│  │  │ Section 3: Tech Stack / FinTech Architecture             │      │  │
│  │  │ Section 4: Contact Portal                                │      │  │
│  │  └──────────────────────────────────────────────────────────┘      │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘

                              ▼ Static Export
              ┌───────────────────────────────────┐
              │  Cloudflare Pages / Workers        │
              │  _headers  ·  _redirects           │
              │  JSON-LD  ·  OG meta               │
              └───────────────────────────────────┘
```

**Key constraint:** The entire experience ships as a **Next.js `output: 'export'`** static site. No server-side functions, no API routes, no SSR runtime. Pure edge-distributed HTML + JS + CSS.

---

## 2. Directory & File Structure

```
personal-marketing-website/
├── ARCHITECTURE.md                        ← this document
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── .eslintrc.json
├── .gitignore
│
├── public/
│   ├── _headers                           ← Cloudflare security headers
│   ├── _redirects                         ← Cloudflare redirect rules
│   ├── favicon.ico
│   ├── og-image.png                       ← 1200×630 Open Graph image
│   ├── robots.txt
│   └── sitemap.xml
│
└── src/
    ├── app/
    │   ├── layout.tsx                     ← Root layout (fonts, metadata, JSON-LD)
    │   ├── page.tsx                       ← Single-page orchestrator
    │   └── globals.css                    ← Tailwind directives + custom props
    │
    ├── components/
    │   ├── canvas/
    │   │   ├── Experience.tsx             ← Master R3F <Canvas> wrapper (dynamic, ssr:false)
    │   │   ├── CameraRig.tsx             ← CatmullRomCurve3 scroll-driven camera
    │   │   ├── Centerpiece.tsx           ← Procedural gyroscopic sculpture
    │   │   ├── GyroscopicRings.tsx       ← 3 interlocking brushed-titanium torus rings
    │   │   ├── RefractiveCoreOrb.tsx     ← Central refractive/emissive glass orb
    │   │   ├── ProjectNodes.tsx          ← 8 orbital satellite spheres
    │   │   ├── Lighting.tsx              ← Env lights, HDRI-free IBL, rim lights
    │   │   └── Effects.tsx               ← Optional Bloom / Vignette post-processing
    │   │
    │   ├── dom/
    │   │   ├── DomOverlay.tsx            ← z-index:10 fixed overlay container
    │   │   ├── EntryGate.tsx             ← "WALI MUHAMMAD" monumental type + CTA
    │   │   ├── ExecutiveOverview.tsx      ← Value proposition (Section 1)
    │   │   ├── ProjectShowroom.tsx        ← 8 project cards grid (Section 2)
    │   │   ├── ProjectCard.tsx           ← Single project card component
    │   │   ├── TechStack.tsx             ← Engineering stack section (Section 3)
    │   │   ├── ContactPortal.tsx         ← Contact form / CTA section (Section 4)
    │   │   ├── Navigation.tsx            ← Minimal floating nav dots / progress
    │   │   └── ScrollProgress.tsx        ← Visual scroll indicator
    │   │
    │   └── shared/
    │       ├── SmoothScroll.tsx           ← Lenis initialization wrapper
    │       ├── QualityGate.tsx            ← GPU tier detection → qualityTier
    │       └── ContextLossHandler.tsx     ← WebGL context-loss resilience
    │
    ├── data/
    │   └── projects.ts                    ← 8 projects typed data array
    │
    ├── store/
    │   └── usePortfolioStore.ts           ← Zustand global store
    │
    ├── hooks/
    │   ├── useScrollProgress.ts           ← Lenis → normalized 0–1 scroll
    │   ├── useEntryTransition.ts          ← GSAP timeline for gate → orbit
    │   ├── useSectionDetection.ts         ← Active section from scroll %
    │   └── useGpuTier.ts                  ← Detect GPU capability tier
    │
    ├── lib/
    │   ├── cameraPath.ts                  ← Spline waypoints & curve factory
    │   ├── constants.ts                   ← Breakpoints, timing, color palette
    │   └── seo.ts                         ← JSON-LD generator, metadata factory
    │
    └── types/
        └── index.ts                       ← Shared TypeScript interfaces
```

---

## 3. Dependency Manifest (`package.json`)

```jsonc
{
  "name": "wali-muhammad-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next build"
  },
  "dependencies": {
    // ── Framework ──────────────────────────────────────────
    "next":                          "14.2.15",
    "react":                         "18.3.1",
    "react-dom":                     "18.3.1",

    // ── 3D / WebGL ────────────────────────────────────────
    "three":                         "0.169.0",
    "@react-three/fiber":            "8.17.10",
    "@react-three/drei":             "9.114.3",
    "@react-three/postprocessing":   "2.16.3",
    "postprocessing":                "6.36.3",

    // ── Animation ─────────────────────────────────────────
    "gsap":                          "3.12.5",
    "lenis":                         "1.1.14",

    // ── State ─────────────────────────────────────────────
    "zustand":                       "5.0.0",

    // ── UI / Icons ────────────────────────────────────────
    "lucide-react":                  "0.451.0",
    "clsx":                          "2.1.1",
    "tailwind-merge":                "2.5.4"
  },
  "devDependencies": {
    // ── Tooling ───────────────────────────────────────────
    "typescript":                    "5.6.3",
    "@types/react":                  "18.3.11",
    "@types/react-dom":              "18.3.1",
    "@types/three":                  "0.169.0",
    "tailwindcss":                   "3.4.14",
    "postcss":                       "8.4.47",
    "autoprefixer":                  "10.4.20",
    "eslint":                        "8.57.1",
    "eslint-config-next":            "14.2.15"
  }
}
```

> [!IMPORTANT]
> **Version lock rationale:** Three.js `0.169.0` is paired with `@types/three@0.169.0` for 1:1 type parity. R3F `8.17.x` targets Three.js `≥0.160 <0.170`. GSAP `3.12.5` is the last version before the GSAP 4.x license change. Next.js `14.2.15` is the most stable App Router release supporting `output: 'export'` with Turbopack dev.

---

## 4. Camera Spline — Mathematical Specification

### 4.1 Coordinate System Convention

- **Origin `(0, 0, 0)`** is the geometric center of the 3D Centerpiece.
- **Y-up** (Three.js default).
- All units are in Three.js world units (≈ 1 unit = 1 meter at perceptual scale).

### 4.2 The 5 Waypoints

| Waypoint | Section Name | `position: [x, y, z]` | `lookAt: [x, y, z]` | Camera FOV | Description |
|:--------:|:-------------|:----------------------:|:--------------------:|:----------:|:------------|
| **W0** | Entry Gate (Pre-Enter) | `[0, 0, 12]` | `[0, 0, 0]` | `50°` | Head-on macro view. Typography fills viewport. Object behind text at origin. |
| **W1** | Executive Overview | `[6, 4, 8]` | `[0, 0.5, 0]` | `45°` | Top-right orbital. 45° azimuth, 25° elevation. Reveals object dimensionality. |
| **W2** | Project Showroom | `[8, 1, 0]` | `[0, 0, 0]` | `40°` | Side orbit (90° azimuth). Camera equator-level. 8 satellite nodes in view ring. |
| **W3** | Tech Stack | `[4, 6, -5]` | `[0, 0, 0]` | `42°` | Elevated rear-quarter. 135° azimuth, 40° elevation. Object enters wireframe state. |
| **W4** | Contact Portal | `[0, 3, 4]` | `[0, 0, 0]` | `35°` | Zenith approach. Near-overhead, gentle tilt. Intimate close-up. |

### 4.3 Spline Construction

```typescript
// src/lib/cameraPath.ts

import * as THREE from 'three';

export interface CameraWaypoint {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  fov: number;
  sectionId: number;      // 0–4
  sectionName: string;
}

export const WAYPOINTS: CameraWaypoint[] = [
  {
    position: new THREE.Vector3(0, 0, 12),
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 50,
    sectionId: 0,
    sectionName: 'entry-gate',
  },
  {
    position: new THREE.Vector3(6, 4, 8),
    lookAt: new THREE.Vector3(0, 0.5, 0),
    fov: 45,
    sectionId: 1,
    sectionName: 'executive-overview',
  },
  {
    position: new THREE.Vector3(8, 1, 0),
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 40,
    sectionId: 2,
    sectionName: 'project-showroom',
  },
  {
    position: new THREE.Vector3(4, 6, -5),
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 42,
    sectionId: 3,
    sectionName: 'tech-stack',
  },
  {
    position: new THREE.Vector3(0, 3, 4),
    lookAt: new THREE.Vector3(0, 0, 0),
    fov: 35,
    sectionId: 4,
    sectionName: 'contact-portal',
  },
];

/**
 * Builds a closed-false CatmullRomCurve3 through all 5 position waypoints.
 * The curve's `tension` is set to 0.35 for smooth, non-overshooting arcs.
 *
 * Usage: `curve.getPointAt(t)` where t ∈ [0, 1] maps to scrollProgress.
 */
export function createCameraSpline(): THREE.CatmullRomCurve3 {
  const points = WAYPOINTS.map((w) => w.position.clone());
  const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.35);
  return curve;
}

/**
 * Interpolates lookAt target and FOV for a given normalized scroll `t ∈ [0, 1]`.
 * Uses segment-aware linear interpolation between the two bounding waypoints.
 */
export function interpolateWaypointData(t: number) {
  const segmentCount = WAYPOINTS.length - 1;  // 4 segments
  const rawIndex = t * segmentCount;
  const i = Math.min(Math.floor(rawIndex), segmentCount - 1);
  const alpha = rawIndex - i;

  const a = WAYPOINTS[i];
  const b = WAYPOINTS[i + 1];

  return {
    lookAt: a.lookAt.clone().lerp(b.lookAt, alpha),
    fov: THREE.MathUtils.lerp(a.fov, b.fov, alpha),
    sectionId: alpha < 0.5 ? a.sectionId : b.sectionId,
    sectionName: alpha < 0.5 ? a.sectionName : b.sectionName,
  };
}
```

### 4.4 Scroll-to-Spline Mapping

```
scrollProgress ∈ [0, 1]
     ↓
curve.getPointAt(scrollProgress)  →  camera.position
interpolateWaypointData(scrollProgress)  →  camera lookAt + FOV
```

- `scrollProgress = 0.0` → **W0** (Entry Gate)
- `scrollProgress = 0.25` → **W1** (Executive Overview)
- `scrollProgress = 0.50` → **W2** (Project Showroom)
- `scrollProgress = 0.75` → **W3** (Tech Stack)
- `scrollProgress = 1.00` → **W4** (Contact Portal)

> [!NOTE]
> The **Entry Transition** (clicking "ENTER EXPERIENCE") does NOT use scroll. It plays a dedicated GSAP timeline that animates from `W0` at `FOV 50°` → a brief `FOV 65°` warp → settles at `W0` with scroll unlocked. After the transition completes, `hasEntered = true` and scroll-driven spline takes over.

---

## 5. Zustand Global State Store Schema

```typescript
// src/store/usePortfolioStore.ts

import { create } from 'zustand';

export type QualityTier = 'high' | 'medium' | 'low';

export type SectionName =
  | 'entry-gate'
  | 'executive-overview'
  | 'project-showroom'
  | 'tech-stack'
  | 'contact-portal';

export interface PortfolioState {
  // ── Gate state ──────────────────────────────────────────
  /** Whether the user has clicked "ENTER EXPERIENCE" */
  hasEntered: boolean;
  /** Whether the entry GSAP transition is currently playing */
  isTransitioning: boolean;

  // ── Scroll state ────────────────────────────────────────
  /** Normalized 0–1 Lenis scroll progress across full page height */
  scrollProgress: number;
  /** Currently active section derived from scrollProgress thresholds */
  activeSection: SectionName;
  /** Index 0–4 of active section (mirrors activeSection for numeric use) */
  activeSectionIndex: number;

  // ── Project interaction ─────────────────────────────────
  /** ID of the project card currently hovered/focused (null = none) */
  activeProjectId: string | null;

  // ── Performance ─────────────────────────────────────────
  /** GPU capability tier detected at mount (drives LOD, post-processing) */
  qualityTier: QualityTier;

  // ── WebGL resilience ────────────────────────────────────
  /** Incremented on WebGL context-loss to force Canvas remount */
  contextLossCount: number;

  // ── Actions ─────────────────────────────────────────────
  setHasEntered: (val: boolean) => void;
  setIsTransitioning: (val: boolean) => void;
  setScrollProgress: (val: number) => void;
  setActiveSection: (section: SectionName, index: number) => void;
  setActiveProjectId: (id: string | null) => void;
  setQualityTier: (tier: QualityTier) => void;
  incrementContextLoss: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  hasEntered: false,
  isTransitioning: false,
  scrollProgress: 0,
  activeSection: 'entry-gate',
  activeSectionIndex: 0,
  activeProjectId: null,
  qualityTier: 'high',
  contextLossCount: 0,

  setHasEntered: (val) => set({ hasEntered: val }),
  setIsTransitioning: (val) => set({ isTransitioning: val }),
  setScrollProgress: (val) => set({ scrollProgress: val }),
  setActiveSection: (section, index) =>
    set({ activeSection: section, activeSectionIndex: index }),
  setActiveProjectId: (id) => set({ activeProjectId: id }),
  setQualityTier: (tier) => set({ qualityTier: tier }),
  incrementContextLoss: () =>
    set((s) => ({ contextLossCount: s.contextLossCount + 1 })),
}));
```

### 5.1 Section Detection Thresholds

| `scrollProgress` range | `activeSectionIndex` | `activeSection` |
|:-----------------------:|:--------------------:|:----------------|
| `0.00 – 0.15` | 0 | `entry-gate` |
| `0.15 – 0.35` | 1 | `executive-overview` |
| `0.35 – 0.65` | 2 | `project-showroom` |
| `0.65 – 0.85` | 3 | `tech-stack` |
| `0.85 – 1.00` | 4 | `contact-portal` |

---

## 6. TypeScript Interfaces & Data Layer (`src/data/projects.ts`)

### 6.1 Interfaces

```typescript
// src/types/index.ts

export interface ProjectData {
  /** Unique slug identifier (kebab-case) */
  id: string;
  /** Display order index (0–7) */
  index: number;
  /** Project title as shown in the showroom */
  title: string;
  /** Short editorial tagline (≤ 12 words) */
  tagline: string;
  /** Full description paragraph for expanded state */
  description: string;
  /** Technology stack badges */
  stack: string[];
  /** Category / vertical label */
  category: ProjectCategory;
  /** Live production URL (Vercel deployment) */
  liveUrl: string;
  /** GitHub repository URL (source code) */
  githubUrl: string;
  /** Accent color hex for the orbital node emissive glow */
  accentColor: string;
  /**
   * Angular position (radians) of this project's orbital node
   * around the 3D centerpiece on the XZ plane.
   * Evenly distributed: index × (2π / 8)
   */
  orbitalAngle: number;
  /** Orbital ring radius from centerpiece origin */
  orbitalRadius: number;
}

export type ProjectCategory =
  | 'Platform'
  | 'E-Commerce'
  | 'Creative Tech'
  | 'FinTech'
  | 'Web App';

export interface SectionConfig {
  id: number;
  name: string;
  scrollStart: number;
  scrollEnd: number;
}
```

### 6.2 Complete Project Data

```typescript
// src/data/projects.ts

import { type ProjectData } from '@/types';

const ORBITAL_RADIUS = 4.5;
const toAngle = (i: number) => i * ((2 * Math.PI) / 8);

export const PROJECTS: ProjectData[] = [
  {
    id: 'zynnco-chauffeurs',
    index: 0,
    title: 'Zynnco Chauffeurs',
    tagline: 'Luxury Chauffeur & Executive Fleet Booking Platform',
    description:
      'End-to-end luxury chauffeur booking platform featuring real-time fleet availability, route optimization, executive-class vehicle selection, and a conversion-optimized reservation flow built for high-net-worth clientele.',
    stack: ['Next.js', 'Tailwind CSS', 'UI/UX Architecture', 'Vercel'],
    category: 'Platform',
    liveUrl: 'https://zynnco-chauffeurs.vercel.app',
    githubUrl: 'https://github.com/walimuhammad/zynnco-chauffeurs',
    accentColor: '#C9A96E',     // Champagne gold
    orbitalAngle: toAngle(0),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'corpassion-events',
    index: 1,
    title: 'Corpassion Events',
    tagline: 'High-End Event Architecture & Experience Platform',
    description:
      'A premium event architecture platform with immersive motion design, cinematic scroll sequences, and bespoke service showcases — engineered to convert corporate and luxury event inquiries at scale.',
    stack: ['Modern Web Stack', 'Interactive Motion', 'Vercel'],
    category: 'Platform',
    liveUrl: 'https://corpassion-events.vercel.app',
    githubUrl: 'https://github.com/walimuhammad/corpassion-events',
    accentColor: '#8B5CF6',     // Violet
    orbitalAngle: toAngle(1),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: '3d-resume-builder',
    index: 2,
    title: '3D Interactive Resume Builder',
    tagline: 'Spatial 3D & WebGL Resume Generation App',
    description:
      'A spatial computing–inspired resume builder that renders resumes in an interactive 3D environment. Users manipulate sections in three-dimensional space and export pixel-perfect PDF documents.',
    stack: ['Three.js', 'WebGL', 'JavaScript', 'Vercel'],
    category: 'Creative Tech',
    liveUrl: 'https://3d-resume-builder.vercel.app',
    githubUrl: 'https://github.com/walimuhammad/3d-resume-builder',
    accentColor: '#06B6D4',     // Cyan
    orbitalAngle: toAngle(2),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'nexus-bay',
    index: 3,
    title: 'Nexus Bay',
    tagline: 'Full-Stack Digital Platform & Commercial Web Experience',
    description:
      'A full-stack commercial digital experience featuring dynamic product showcases, responsive micro-interactions, and a scalable component architecture designed for enterprise content delivery.',
    stack: ['Next.js', 'TypeScript', 'Responsive UI', 'Vercel'],
    category: 'Platform',
    liveUrl: 'https://nexus-bay.vercel.app',
    githubUrl: 'https://github.com/walimuhammad/nexus-bay',
    accentColor: '#3B82F6',     // Blue
    orbitalAngle: toAngle(3),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'amirs-kalonji-oil',
    index: 4,
    title: "Amirs Kalonji Oil",
    tagline: 'Direct-to-Consumer E-Commerce & Brand Storefront',
    description:
      'A conversion-optimized DTC e-commerce storefront with product storytelling, trust-signal architecture, and performance-first Core Web Vitals engineering for maximum organic reach and sales velocity.',
    stack: ['Conversion UI', 'Web Performance', 'Vercel'],
    category: 'E-Commerce',
    liveUrl: 'https://amirs-kalonji-oil.vercel.app',
    githubUrl: 'https://github.com/walimuhammad/amirs-kalonji-oil',
    accentColor: '#10B981',     // Emerald
    orbitalAngle: toAngle(4),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'digital-wedding-suite',
    index: 5,
    title: 'Bespoke Digital Wedding Suite',
    tagline: 'Interactive Motion-Driven Event Invitation & RSVP Web App',
    description:
      'A bespoke, motion-rich digital wedding invitation featuring custom scroll-triggered animations, RSVP flow integration, and cinematic visual storytelling — crafted as a one-of-a-kind frontend engineering showcase.',
    stack: ['Custom Animations', 'Frontend Engineering', 'Vercel'],
    category: 'Web App',
    liveUrl: 'https://digital-wedding-suite.vercel.app',
    githubUrl: 'https://github.com/walimuhammad/digital-wedding-suite',
    accentColor: '#F43F5E',     // Rose
    orbitalAngle: toAngle(5),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'commercial-sanitary-hub',
    index: 6,
    title: 'Commercial Sanitary & Hardware Hub',
    tagline: 'B2B/B2C Product Catalog & Retail Web System',
    description:
      'A full-stack product catalog and retail web system with category-driven navigation, technical SEO infrastructure, and a robust B2B/B2C purchasing interface engineered for commercial hardware distribution.',
    stack: ['Full-Stack Web Architecture', 'Technical SEO', 'Vercel'],
    category: 'E-Commerce',
    liveUrl: 'https://commercial-sanitary-hub.vercel.app',
    githubUrl: 'https://github.com/walimuhammad/commercial-sanitary-hub',
    accentColor: '#F59E0B',     // Amber
    orbitalAngle: toAngle(6),
    orbitalRadius: ORBITAL_RADIUS,
  },
  {
    id: 'fintech-risk-engine',
    index: 7,
    title: 'FinTech Market Structure & Risk Engine',
    tagline: 'Quantitative Position Sizing, Technical Analysis & Risk Management System',
    description:
      'A quantitative finance platform implementing institutional-grade position sizing algorithms, multi-timeframe technical analysis, and real-time risk management dashboards — built on a Python + TypeScript hybrid architecture.',
    stack: ['Python', 'TypeScript', 'Financial Algorithms'],
    category: 'FinTech',
    liveUrl: 'https://fintech-risk-engine.vercel.app',
    githubUrl: 'https://github.com/walimuhammad/fintech-risk-engine',
    accentColor: '#EF4444',     // Red
    orbitalAngle: toAngle(7),
    orbitalRadius: ORBITAL_RADIUS,
  },
];
```

### 6.3 Orbital Node Geometry

The 8 project nodes are placed on the XZ plane at `y = 0` around the centerpiece origin:

```
nodePosition(i) = [
  cos(i × 2π/8) × ORBITAL_RADIUS,   // x
  0,                                  // y
  sin(i × 2π/8) × ORBITAL_RADIUS    // z
]
```

With `ORBITAL_RADIUS = 4.5`:

| Node | Angle (°) | Position `[x, y, z]` |
|:----:|:---------:|:---------------------:|
| 0 | 0° | `[4.50, 0, 0.00]` |
| 1 | 45° | `[3.18, 0, 3.18]` |
| 2 | 90° | `[0.00, 0, 4.50]` |
| 3 | 135° | `[-3.18, 0, 3.18]` |
| 4 | 180° | `[-4.50, 0, 0.00]` |
| 5 | 225° | `[-3.18, 0, -3.18]` |
| 6 | 270° | `[0.00, 0, -4.50]` |
| 7 | 315° | `[3.18, 0, -3.18]` |

---

## 7. Component Architecture & Rendering Pipeline

### 7.1 Page Orchestrator

```
src/app/page.tsx
 ├─ <SmoothScroll />           ← Lenis init, writes scrollProgress to store
 ├─ <QualityGate />            ← GPU detect, writes qualityTier to store
 ├─ <ContextLossHandler />     ← Listens for webglcontextlost, increments counter
 ├─ <Experience key={contextLossCount} />  ← R3F Canvas (dynamic import, ssr:false)
 └─ <DomOverlay />             ← All semantic HTML sections
```

### 7.2 Canvas Component Tree

```
<Experience>
  <Canvas
    gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
    dpr={qualityTier === 'low' ? 1 : [1, 2]}
    camera={{ fov: 50, near: 0.1, far: 100, position: [0, 0, 12] }}
    style={{ position: 'fixed', inset: 0, zIndex: 0 }}
  >
    <CameraRig />              ← Reads scrollProgress, drives spline + lookAt + FOV
    <Lighting />               ← Ambient, directional, rim, env (no HDRI file)
    <Centerpiece>              ← Groups all procedural geometry
      <GyroscopicRings />      ← 3 torus rings, staggered axes, brushed metal
      <RefractiveCoreOrb />    ← IcosahedronGeometry + MeshPhysicalMaterial (transmission)
      <ProjectNodes />         ← 8 spheres on orbital ring, emissive on hover
    </Centerpiece>
    {qualityTier === 'high' && <Effects />}  ← Bloom, Vignette (conditional)
  </Canvas>
</Experience>
```

### 7.3 DOM Overlay Component Tree

```
<DomOverlay>                   ← position:fixed, inset:0, z-index:10, pointer-events:none
  <EntryGate />                ← pointer-events:auto when !hasEntered
  <Navigation />               ← Always visible floating dots
  <ScrollProgress />           ← Thin progress bar
  <main>                       ← pointer-events:auto, sections snap to scroll regions
    <ExecutiveOverview />
    <ProjectShowroom />        ← Maps PROJECTS → <ProjectCard />
    <TechStack />
    <ContactPortal />
  </main>
</DomOverlay>
```

### 7.4 Dynamic Import Pattern

```typescript
// src/components/canvas/Experience.tsx is loaded via:
import dynamic from 'next/dynamic';

const Experience = dynamic(
  () => import('@/components/canvas/Experience'),
  { ssr: false }
);
```

This prevents Three.js from executing during the static build and guarantees the HTML shell renders on first paint (FCP) before the GL context initializes.

---

## 8. Animation Choreography Contract

### 8.1 Entry Transition Timeline (GSAP)

```
Timeline: "entryTransition" — Triggered on "ENTER EXPERIENCE" click

t = 0.00s  │  Store: isTransitioning = true
           │  Typography scale: 1.0 → 6.0 (fly outward past camera)
           │  Typography opacity: 1.0 → 0.0
           │
t = 0.30s  │  Camera FOV: 50° → 65° (warp stretch)
           │
t = 0.60s  │  Camera FOV: 65° → 50° (settle)
           │  CTA overlay: opacity → 0, display → none
           │
t = 1.00s  │  Camera orbital micro-drift begins (gentle idle float ±0.2 units)
           │  Store: isTransitioning = false, hasEntered = true
           │  Scroll is now unlocked → Lenis begins emitting scrollProgress
           │
Total duration: 1.0s
Easing: "power3.inOut"
```

### 8.2 Scroll-Driven 3D Reactions

| Section | 3D Centerpiece State | Ring Behavior | Core Orb | Nodes |
|:--------|:---------------------|:-------------|:---------|:------|
| 0 – Entry Gate | Default pose | Slow idle rotation (0.3 rad/s) | Subtle refraction | Dim, distant |
| 1 – Overview | Slight tilt | Speed +20%, axis shift | Warm emissive pulse | Fade in |
| 2 – Showroom | Full orbital view | Rotation pauses, rings frame nodes | Neutral | Fully lit, hover-reactive |
| 3 – Tech Stack | **Wireframe mode** | Rings switch to `wireframe: true` | Wireframe + emissive edges | Wireframe spheres |
| 4 – Contact | Intimate close-up | Slow ceremonial rotation | Bright core glow (emissive 2.0) | Fade out gracefully |

### 8.3 Centerpiece Geometry Specification

#### Gyroscopic Rings (×3)

```
Ring 0 (Outer):   TorusGeometry(3.0, 0.04, 16, 128)  rotation axis: [1, 0, 0]  speed: 0.3 rad/s
Ring 1 (Middle):  TorusGeometry(2.4, 0.04, 16, 100)  rotation axis: [0, 1, 0.3] speed: 0.2 rad/s
Ring 2 (Inner):   TorusGeometry(1.8, 0.04, 16, 80)   rotation axis: [0.3, 0, 1] speed: 0.15 rad/s

Material: MeshStandardMaterial {
  color: #B8C4D0 (brushed titanium),
  metalness: 0.85,
  roughness: 0.25,
  wireframe: false  ← toggled to true in tech-stack section
}
```

#### Refractive Core Orb

```
Geometry: IcosahedronGeometry(0.9, 4)

Material: MeshPhysicalMaterial {
  color: #FFFFFF,
  transmission: 0.92,
  roughness: 0.05,
  thickness: 1.5,
  ior: 1.45,
  chromaticAberration: 0.03,
  envMapIntensity: 1.0,
  emissive: #1A1A2E,
  emissiveIntensity: 0.3  ← animates 0.3 → 2.0 in contact section
}
```

#### Orbital Project Nodes (×8)

```
Geometry: SphereGeometry(0.18, 16, 16)

Material: MeshStandardMaterial {
  color: project.accentColor,
  emissive: project.accentColor,
  emissiveIntensity: 0.2  ← animates to 1.5 on hover/active
  metalness: 0.6,
  roughness: 0.3
}

Position: See §6.3 orbital table
Hover: scale 1.0 → 1.6, emissiveIntensity 0.2 → 1.5 (GSAP, 0.3s)
```

### 8.4 Performance Rule — Zero Allocations Inside `useFrame`

> [!CAUTION]
> **No `new THREE.Vector3()`, `new THREE.Quaternion()`, or any object instantiation inside `useFrame`.** All reusable math objects must be declared at module scope or `useRef` scope and mutated in-place via `.set()`, `.lerp()`, `.copy()`.

```typescript
// ✅ CORRECT — module-scope reusable vectors
const _position = new THREE.Vector3();
const _lookAt = new THREE.Vector3();

function CameraRig() {
  useFrame(() => {
    const t = usePortfolioStore.getState().scrollProgress;
    curve.getPointAt(t, _position);       // writes into _position
    camera.position.copy(_position);
    // ...
  });
}

// ❌ FORBIDDEN — allocates every frame
useFrame(() => {
  const pos = new THREE.Vector3();        // GC pressure, frame drops
  const target = curve.getPointAt(t);     // creates new Vector3
});
```

---

## 9. Security, Technical SEO & WebGL Performance Budget

### 9.1 Security Headers (`public/_headers`)

```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https:; worker-src 'self' blob:; child-src 'self' blob:;
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Embedder-Policy: require-corp
```

> [!WARNING]
> `'unsafe-eval'` is required by Three.js shader compilation on some browsers. This is the minimum viable CSP for a WebGL site. If `unsafe-eval` can be removed after testing, remove it.

### 9.2 Technical SEO Checklist

| Item | Implementation | File |
|:-----|:--------------|:-----|
| **JSON-LD (Person + Portfolio)** | `<script type="application/ld+json">` in `<head>` | `layout.tsx` via `src/lib/seo.ts` |
| **Open Graph meta** | `og:title`, `og:description`, `og:image`, `og:url`, `og:type=website` | `layout.tsx` metadata export |
| **Twitter Card** | `twitter:card=summary_large_image` | `layout.tsx` metadata export |
| **Canonical URL** | `<link rel="canonical" href="https://walimuhammad.com" />` | `layout.tsx` |
| **`robots.txt`** | `Allow: /` + `Sitemap:` reference | `public/robots.txt` |
| **`sitemap.xml`** | Single URL entry (SPA) with `lastmod`, `changefreq`, `priority` | `public/sitemap.xml` |
| **Semantic HTML** | `<h1>` for name, `<h2>` per section, `<article>` per project, `<a>` for all links | DOM overlay components |
| **Alt text** | N/A (no `<img>` tags — all 3D is `<canvas>`) | — |
| **`aria-label`** | On all interactive elements (CTA, nav dots, project links) | DOM components |
| **Indexable project links** | Real `<a href="...">` to all 8 Vercel URLs + 8 GitHub URLs | `ProjectCard.tsx` |

### 9.3 JSON-LD Schema

```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Wali Muhammad",
    "jobTitle": "Full-Stack Engineer, FinTech Systems Architect & Creative Developer",
    "url": "https://walimuhammad.com",
    "sameAs": [
      "https://github.com/walimuhammad",
      "https://linkedin.com/in/walimuhammad"
    ],
    "knowsAbout": [
      "Next.js", "React", "Three.js", "TypeScript", "Python",
      "FinTech", "WebGL", "Cloud Architecture"
    ],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Full-Stack Development & FinTech Architecture"
      }
    }
  }
}
```

### 9.4 WebGL Performance Budget

| Metric | Target | How |
|:-------|:-------|:----|
| **FCP** | < 1.0s | Static HTML shell renders before Canvas hydrates. `ssr: false` dynamic import. |
| **LCP** | < 2.5s | "WALI MUHAMMAD" `<h1>` is the LCP element (DOM, not Canvas). |
| **TBT** | < 200ms | No synchronous Three.js init on main thread. Canvas loads asynchronously. |
| **CLS** | 0.0 | Fixed-position Canvas + fixed-position DOM overlay. No layout shifts. |
| **Draw calls** | ≤ 20 | 3 rings + 1 orb + 8 nodes + lights = ~14 draw calls. Instancing optional. |
| **Triangles** | ≤ 50,000 | Rings: ~11k, Orb: ~5k, 8 Nodes: ~8k, Total: ~24k. Well under budget. |
| **Texture memory** | 0 MB | No external textures, no HDRI, no `.glb`. Fully procedural. |
| **JS bundle (gzip)** | ≤ 350 KB | Three.js tree-shaken ~180 KB + R3F ~30 KB + App ~60 KB + GSAP ~30 KB. |
| **Frame rate** | ≥ 60 FPS on mid-tier GPU | Zero allocations in `useFrame`. Conditional post-processing. |
| **WebGL context loss** | Auto-recovery | `ContextLossHandler` listens on `canvas`, increments store counter, forces `<Canvas>` remount via React key. |

### 9.5 Quality Tier Downgrade Strategy

```
GPU Detection (at mount via canvas.getContext('webgl2').getParameter()):

Tier 'high'   →  dpr: [1, 2],  antialias: true,  postprocessing: ON,   node count: 8
Tier 'medium' →  dpr: [1, 1.5], antialias: true,  postprocessing: OFF,  node count: 8
Tier 'low'    →  dpr: 1,        antialias: false, postprocessing: OFF,  node count: 4 (skip alt nodes)
```

---

## 10. Cloudflare Zero-Downtime Deployment

### 10.1 Architecture

```
GitHub (main branch)
     │
     ├── push / merge
     │
     ▼
Cloudflare Pages (Build Hook)
     │
     ├── npm ci && npm run build
     │   → next build (output: 'export') → /out/
     │
     ├── Atomic deploy to Cloudflare edge (~200 PoPs)
     │   • Zero-downtime: new build deploys alongside old
     │   • Traffic switches atomically on success
     │   • Rollback = 1-click in Cloudflare dashboard
     │
     └── Custom domain: walimuhammad.com
         • Cloudflare DNS (proxied)
         • Auto SSL (edge certificate)
         • HTTP/3 + Brotli compression
         • Browser Cache TTL: 1 year (hashed assets)
         • HTML Cache: 0 (revalidate on deploy)
```

### 10.2 `next.config.ts`

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,       // No image optimization API in static export
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Transpile Three.js ecosystem for compatibility
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

export default nextConfig;
```

### 10.3 `public/_redirects`

```
# SPA fallback for client-side routing (if any future routes added)
/*  /index.html  200
```

---

## 11. Phase Execution Plan (for Gemini 3.8 Flash High)

> [!IMPORTANT]
> Each phase must compile and run (`npm run dev`) before advancing to the next. No phase may introduce build errors that carry forward.

### Phase 1 — Foundation & 3D Canvas _(Est. ~45 min)_

**Goal:** Bootable Next.js app with a visible procedural 3D centerpiece spinning on screen.

| Step | Files to Create | Description |
|:-----|:----------------|:------------|
| 1.1 | `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `.eslintrc.json`, `.gitignore` | Scaffold project with exact dependency versions from §3. |
| 1.2 | `src/app/layout.tsx`, `src/app/globals.css` | Root layout with fonts (Inter + editorial serif), Tailwind directives, dark theme CSS custom properties. |
| 1.3 | `src/app/page.tsx` | Page orchestrator. Dynamic-imports `<Experience />`. |
| 1.4 | `src/types/index.ts` | All TypeScript interfaces from §6.1. |
| 1.5 | `src/data/projects.ts` | Complete 8-project data array from §6.2. |
| 1.6 | `src/store/usePortfolioStore.ts` | Full Zustand store from §5. |
| 1.7 | `src/lib/cameraPath.ts`, `src/lib/constants.ts` | Camera spline factory (§4.3) + design constants (colors, timing, breakpoints). |
| 1.8 | `src/components/canvas/Experience.tsx` | R3F `<Canvas>` wrapper with GL config from §7.2. |
| 1.9 | `src/components/canvas/Lighting.tsx` | Ambient (0.4) + Directional (1.0) + 2 rim point lights. No HDRI. |
| 1.10 | `src/components/canvas/GyroscopicRings.tsx` | 3 torus rings per §8.3 spec. Idle rotation in `useFrame` (no allocs). |
| 1.11 | `src/components/canvas/RefractiveCoreOrb.tsx` | Icosahedron with `MeshPhysicalMaterial` transmission per §8.3. |
| 1.12 | `src/components/canvas/ProjectNodes.tsx` | 8 spheres positioned from `PROJECTS` orbital data. |
| 1.13 | `src/components/canvas/Centerpiece.tsx` | Groups Rings + Orb + Nodes. |

**Exit criteria:** `npm run dev` shows spinning 3D gyroscopic sculpture with refractive core and 8 colored orbital nodes on a dark background.

---

### Phase 2 — Camera Spline, Scroll System & Entry Gate _(Est. ~40 min)_

**Goal:** Scroll drives the camera along the spline. The Entry Gate blocks scroll until clicked.

| Step | Files to Create / Modify | Description |
|:-----|:------------------------|:------------|
| 2.1 | `src/components/shared/SmoothScroll.tsx` | Initialize Lenis. On scroll, normalize to `0–1` and write `scrollProgress` to Zustand. |
| 2.2 | `src/components/canvas/CameraRig.tsx` | Read `scrollProgress` in `useFrame`. Drive camera position via `curve.getPointAt()`, lookAt via `interpolateWaypointData()`, animated FOV. Zero allocs (§8.4). |
| 2.3 | `src/hooks/useScrollProgress.ts` | Hook wrapping Lenis `onScroll` → store update. |
| 2.4 | `src/hooks/useSectionDetection.ts` | Derives `activeSection` + `activeSectionIndex` from `scrollProgress` per §5.1 thresholds. Writes to store. |
| 2.5 | `src/components/dom/EntryGate.tsx` | Full-viewport overlay with "WALI MUHAMMAD" in massive editorial type + "ENTER EXPERIENCE" CTA. `pointer-events: auto`. Blocks scroll when `!hasEntered`. |
| 2.6 | `src/hooks/useEntryTransition.ts` | GSAP timeline per §8.1: typography scale/fade, FOV warp, store transitions. |
| 2.7 | `src/components/dom/DomOverlay.tsx` | Fixed overlay container. Conditionally renders gate vs. sections based on `hasEntered`. |
| 2.8 | Modify `src/app/page.tsx` | Integrate `<SmoothScroll>`, `<DomOverlay>`, section detection hooks. |

**Exit criteria:** Page loads with monumental "WALI MUHAMMAD" gate. Click "ENTER EXPERIENCE" triggers cinematic GSAP transition. After entry, scrolling orbits the camera smoothly through all 5 waypoints around the 3D centerpiece.

---

### Phase 3 — DOM Content Sections & Project Interactivity _(Est. ~40 min)_

**Goal:** All 5 semantic HTML sections render, project cards link to live apps, hover highlights 3D nodes.

| Step | Files to Create / Modify | Description |
|:-----|:------------------------|:------------|
| 3.1 | `src/components/dom/ExecutiveOverview.tsx` | Section 1 DOM content: headline, value proposition, designation, scroll-triggered fade-in. |
| 3.2 | `src/components/dom/ProjectCard.tsx` | Single project card: title, tagline, stack badges, live URL `<a>`, GitHub `<a>`, `onMouseEnter` → `setActiveProjectId`. |
| 3.3 | `src/components/dom/ProjectShowroom.tsx` | Section 2: maps `PROJECTS` → `<ProjectCard>` grid (responsive 1→2→4 cols). |
| 3.4 | `src/components/dom/TechStack.tsx` | Section 3: categorized tech stack grid (Frontend, Backend, DevOps, FinTech). |
| 3.5 | `src/components/dom/ContactPortal.tsx` | Section 4: CTA headline, email link, social links, brief form or mailto. |
| 3.6 | `src/components/dom/Navigation.tsx` | 5 floating dots (right edge), active dot highlights. Click scrolls to section. |
| 3.7 | `src/components/dom/ScrollProgress.tsx` | Thin horizontal bar at top, width = `scrollProgress × 100%`. |
| 3.8 | Modify `ProjectNodes.tsx` | Read `activeProjectId` from store. When a node's project is hovered, GSAP-animate scale to 1.6 and `emissiveIntensity` to 1.5. |
| 3.9 | Modify `Centerpiece.tsx` | Read `activeSectionIndex`. Toggle `wireframe: true` on rings/orb/nodes when in section 3 (tech-stack). Animate core `emissiveIntensity` to 2.0 in section 4 (contact). |

**Exit criteria:** All 5 content sections visible and scrollable. Hovering a project card highlights its 3D orbital node. Section 3 triggers wireframe mode on the sculpture. All 16 external links (8 live + 8 GitHub) are real `<a>` tags.

---

### Phase 4 — SEO, Security, Performance & Deploy Readiness _(Est. ~30 min)_

**Goal:** Production-grade polish. Passes Lighthouse audit. Ready for `next build` → Cloudflare Pages deploy.

| Step | Files to Create / Modify | Description |
|:-----|:------------------------|:------------|
| 4.1 | `src/lib/seo.ts` | JSON-LD generator per §9.3. Metadata factory for OG + Twitter. |
| 4.2 | Modify `src/app/layout.tsx` | Inject JSON-LD `<script>`, full Next.js `metadata` export (title, description, OG, Twitter, canonical). |
| 4.3 | `public/robots.txt` | `User-agent: * / Allow: / / Sitemap: https://walimuhammad.com/sitemap.xml` |
| 4.4 | `public/sitemap.xml` | Single-URL sitemap with current `lastmod`. |
| 4.5 | `public/_headers` | Full Cloudflare security headers from §9.1. |
| 4.6 | `public/_redirects` | SPA fallback from §10.3. |
| 4.7 | `src/components/shared/QualityGate.tsx` | GPU tier detection at mount. Writes `qualityTier` to store. |
| 4.8 | `src/components/shared/ContextLossHandler.tsx` | WebGL context-loss listener. Increments `contextLossCount` → forces Canvas remount. |
| 4.9 | `src/hooks/useGpuTier.ts` | Helper hook for GPU detection (renderer info string parsing). |
| 4.10 | Modify `Experience.tsx` | Apply `qualityTier`-driven `dpr`, `antialias`, conditional `<Effects>`. Key canvas by `contextLossCount`. |
| 4.11 | `src/components/canvas/Effects.tsx` | Selective Bloom + Vignette via `@react-three/postprocessing`. Only renders on `qualityTier === 'high'`. |
| 4.12 | Accessibility pass | Add `aria-label` to all interactive elements. Ensure tab order. Add `prefers-reduced-motion` media query to disable 3D rotation for vestibular sensitivity. |
| 4.13 | Final build test | `npm run build` must succeed with zero errors. Verify `/out/` directory contains `index.html` + hashed assets. |

**Exit criteria:** `npm run build` produces a clean static export. JSON-LD, OG tags, security headers, sitemap, robots.txt all present. WebGL context-loss resilience tested. GPU quality downgrade path functional. Project is deploy-ready for Cloudflare Pages.

---

## Appendix A — Color Palette & Design Tokens

```css
/* src/app/globals.css — Custom Properties */

:root {
  /* ── Background ─────────────────────────────── */
  --bg-primary:        #0A0A0F;     /* Near-black with blue undertone  */
  --bg-secondary:      #12121A;     /* Card / elevated surface         */
  --bg-glass:          rgba(18, 18, 26, 0.7);  /* Frosted glass panels */

  /* ── Typography ─────────────────────────────── */
  --text-primary:      #F0F0F5;     /* Off-white                       */
  --text-secondary:    #8888A0;     /* Muted silver                    */
  --text-accent:       #C9A96E;     /* Champagne gold highlights       */

  /* ── Brand ──────────────────────────────────── */
  --accent-gold:       #C9A96E;
  --accent-blue:       #3B82F6;
  --accent-cyan:       #06B6D4;

  /* ── Surfaces ───────────────────────────────── */
  --border-subtle:     rgba(255, 255, 255, 0.06);
  --border-hover:      rgba(255, 255, 255, 0.12);

  /* ── Motion ─────────────────────────────────── */
  --ease-out-expo:     cubic-bezier(0.16, 1, 0.3, 1);
  --duration-section:  0.8s;
}
```

## Appendix B — Typography Scale

| Element | Font | Weight | Size (clamp) | Letter-spacing | Text-transform |
|:--------|:-----|:-------|:-------------|:--------------|:---------------|
| `h1` (Gate name) | `'Inter Tight'`, sans-serif | 800 | `clamp(3rem, 10vw, 12rem)` | `-0.04em` | `uppercase` |
| `h2` (Section heads) | `'Inter Tight'`, sans-serif | 700 | `clamp(1.5rem, 4vw, 3.5rem)` | `-0.02em` | `uppercase` |
| `h3` (Project titles) | `'Inter'`, sans-serif | 600 | `clamp(1.1rem, 2vw, 1.5rem)` | `-0.01em` | `none` |
| Body | `'Inter'`, sans-serif | 400 | `clamp(0.875rem, 1.2vw, 1.1rem)` | `0` | `none` |
| Designation | `'Inter'`, sans-serif | 300 | `clamp(0.75rem, 1.5vw, 1.25rem)` | `0.15em` | `uppercase` |
| CTA button | `'Inter'`, sans-serif | 500 | `0.875rem` | `0.1em` | `uppercase` |

## Appendix C — Tailwind Config Extensions

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          primary: '#0A0A0F',
          secondary: '#12121A',
        },
        accent: {
          gold: '#C9A96E',
          blue: '#3B82F6',
          cyan: '#06B6D4',
        },
        muted: '#8888A0',
      },
      fontFamily: {
        display: ['"Inter Tight"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backdropBlur: {
        glass: '20px',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

> **This document is the single source of truth for implementation. Gemini 3.8 Flash High should execute Phases 1 → 4 sequentially, validating each phase's exit criteria before proceeding.**
