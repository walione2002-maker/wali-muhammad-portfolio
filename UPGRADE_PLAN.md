# Comprehensive 60 FPS Mobile GPU Optimization & Chromatic Luxury Palette Upgrade Plan

**Target Production Architecture:** Next.js 14 (App Router) + React Three Fiber 8 + Three.js 0.169 + Tailwind CSS + Lenis + Cloudflare Pages  
**Target Live URL:** `https://devwalimuhammad.pages.dev`  
**Target Hardware Metric:** Sustained 60 FPS on iOS (Safari/WebKit) & Android (Chrome/Gecko), Zero DOM Scroll Jank, Zero-Allocation useFrame Math, Triangles < 10k on Mobile.

---

## Executive Summary & System Objectives
This engineering upgrade eliminates mobile GPU bottlenecks, eradicates multi-pass WebGL transmission stalls, eliminates 60Hz React state thrashing during scrolling, and introduces an eye-catching Chromatic Luxury visual palette.

---

## Phase Breakdown

### PHASE A: 60 FPS Mobile GPU & WebGL Engine Optimization (iOS & Android)
1. **Strict Mobile DPR & WebGL Context Tuning (`Experience.tsx`):**
   - Precise mobile/touch detection via `window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches`.
   - On mobile/touch: Cap Canvas DPR strictly to `[0.75, 1.1]`, disable antialiasing (`antialias: false`), set `powerPreference: 'high-performance'`, `alpha: false`, `stencil: false`, `depth: true`.
   - On desktop: Maintain `dpr={[1, 1.75]}`, `antialias: true`, `alpha: true`.
2. **Eliminate Multi-Pass Glass Transmission on Mobile (`RefractiveCoreOrb.tsx`):**
   - Eliminate `MeshPhysicalMaterial` transmission on mobile/low/medium tiers, avoiding the costly second full-screen FBO copy pass that causes frame drops on mobile GPUs.
   - Deploy single-pass High-Contrast Iridescent Metallic / Emissive Core Material (`MeshStandardMaterial` with `metalness: 0.92`, `roughness: 0.14`, vibrant `emissive` color, and `emissiveIntensity: 1.4`) plus an additive backface Fresnel glow shell.
3. **Mobile Geometry LOD (Level of Detail) Reduction:**
   - Halve torus, sphere, ring, and icosahedron segment counts dynamically on mobile to ensure total scene polygon budget stays comfortably under 10,000 triangles.
   - Verify strictly zero `new THREE.Vector3()`, `new THREE.Color()`, or `new THREE.Matrix4()` allocations inside any `useFrame` loop.

### PHASE B: Zero-Jank Mobile Touch Scroll & 3D DOM Compositing
1. **Eliminate Mobile Compositor Bottlenecks (`SpatialProjectOrbital.tsx`, `ProjectCard.tsx`):**
   - Strip out animated CSS `filter: blur(...)` during scroll transitions—rely strictly on GPU-composited `transform: translate3d(...) rotateY(...) scale(...)` and `opacity`.
   - Replace heavy `backdrop-blur-2xl` on mobile with high-contrast, ultra-crisp opaque dark gradient surfaces (`background: linear-gradient(145deg, rgba(14,19,42,0.96), rgba(6,9,22,0.98))`) with glowing neon borders.
   - Enforce card culling: Apply `visibility: hidden` and `pointer-events: none` on any orbital card whose opacity drops below `0.15` to prevent mobile rasterization overhead.
2. **Zero React State Re-Renders on Scroll & Native Mobile Touch:**
   - Decouple continuous scroll progress from React component state trees. Store continuous scroll progress in mutable refs / non-re-rendering store channels.
   - Only trigger React re-renders when discrete integer values change: `activeSectionIndex` (`0..4`) or focused project index (`0..7`).
   - Implement `touch-action: pan-y` for fluid native vertical scrolling, and ensure mobile `Swipe / Next / Prev` controls snap cleanly between all 8 projects.
   - Update top scroll progress bar via direct DOM transform styling without 60Hz React lifecycle re-evaluations.

### PHASE C: Eye-Catching Chromatic Luxury Color & Lighting Overhaul
1. **Dynamic Section & Project Chromatic Lighting Rig (`Lighting.tsx`, `GyroscopicRings.tsx`, `RefractiveCoreOrb.tsx`, `ChromaticBackdrop.tsx`):**
   - Implement 3 high-intensity colored studio rim lights in Three.js (`Electric Cyan #00F0FF`, `Hyper Magenta #FF2E93`, and `Molten Gold #FFB800`) interpolating dynamically:
     - **Section 00 (Entry Gate):** Electric Cyan `#00F0FF` + Molten Gold `#FFB800` over Deep Cyber Obsidian `#040714`.
     - **Section 01 (Strategic Architecture):** Ultraviolet `#8B5CF6` + Laser Cyan `#38BDF8`.
     - **Section 02 (8 Live Deployments):** Synchronize 3D core orb, gyroscopic titanium rings, and radial screen aura to the focused project's vivid neon accent (`#00F0FF`, `#A855F7`, `#10B981`, `#FF2E93`, `#F59E0B`, `#3B82F6`, `#F43F5E`, `#84CC16`).
     - **Section 03 (Wireframe Architecture Stack):** Matrix Neon Emerald `#00FF9D` + Cyber Cyan `#00E5FF`.
     - **Section 04 (Client Brief Portal):** Supernova Gold `#FFB800` + Hyper Violet `#EC4899`.
2. **Vibrant UI Accents & High-Contrast Typography:**
   - Upgrade `EntryGate.tsx`, section indicators (`01`–`04`), impact metric badges (`+68% Booking Conversion`, etc.), and active `ProjectCard.tsx` borders with luminous chromatic gradients and neon glow accents.

### PHASE D: SEO Canonical Fix, Build Verification & Live Deployment
1. **Canonical Domain Synchronization:**
   - Update canonical domain fallback across `src/app/layout.tsx`, `src/lib/seo.ts`, `public/sitemap.xml`, and `public/robots.txt` from `https://walimuhammad.com` to `https://devwalimuhammad.pages.dev`.
   - Preserve all 8 live `.vercel.app` production project links and `github.com/walione2002-maker` repository URLs intact.
2. **Build Verification & Static Generation:**
   - Execute `cmd /c npx tsc --noEmit` to verify 100% clean TypeScript types.
   - Execute `cmd /c npm run build` to verify `./out` static export generates without errors.
3. **Cloudflare Pages Live Deployment:**
   - Deploy the build to Cloudflare Pages via `cmd /c npx wrangler pages deploy out --project-name=devwalimuhammad`.
   - Verify deployment status and live URL accessibility on `https://devwalimuhammad.pages.dev`.
