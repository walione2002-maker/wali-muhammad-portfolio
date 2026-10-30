# Creative & Interaction Specification: "Architectural Precision & Interactive Laboratory"

**Client**: Wali Muhammad  
**Direction**: Second-Pass High-Fidelity Editorial & Multi-Experiment Spatial Lab  
**Deployment**: Cloudflare Pages / Static Export  

---

## 1. Core Creative Positioning

Wali Muhammad represents the synthesis of **rigorous software architecture** (FAST-NUCES FinTech engineering) and **high-craft digital product design**.

The second pass elevates the site from an austere "wireframe-editorial" into an **authoritative, media-rich architectural monograph** paired with an **unrivaled interactive engineering laboratory**.

---

## 2. Typographic & Visual System Upgrades

### Typography
- **Hero Title**: `Syne` (weights 700–800) arranged in a balanced two-line architectural composition (`WALI / MUHAMMAD`) or fluid clamp (`clamp(3.5rem, 8vw, 7.5rem)`) to guarantee zero accidental edge clipping.
- **Value Proposition**: Scaled up to `clamp(1.125rem, 2vw, 1.45rem)` with enhanced contrast (`#E8E4DE` and `#D1D5DB`) and comfortable reading line-height (1.6).
- **Body Text**: 17–19px on desktop, minimum 16px on mobile, with high legibility.
- **Monospace Tokens**: Strictly for technical instrumentation, indices (`01`, `02`), coordinates, and live telemetry; never used for paragraph prose.

### Palette & Contrast
- **Background**: `#080808` (Obsidian Base)
- **Surfaces**: `#0F0F0F` (Card background), `#141414` (Elevated controls)
- **Primary Text**: `#E8E4DE` (Warm Alabaster)
- **Secondary Text**: `#B3B3B3` (Increased from previous low-contrast `#737373`)
- **Accent**: `#FF4D00` (Signal Burnt Orange for active states, focus, and focal geometry)
- **Status Green**: `#10B981` (Live production and availability indicators)
- **Hairlines**: `#1E1E1E` (Borders and dividers)

---

## 3. Hero Redesign: "Digital Systems Instrument"

### Composition & Layout
- **Left Column**: Two-line stacked monumental title, high-contrast positioning statement, clear action duo (`Explore Work ↓`, `Start a Project →`), and an expanded credentials strip (FAST-NUCES FinTech, Next.js 14 & Three.js architecture, 6 production deliveries).
- **Right Column**: An original, interactive lightweight WebGL instrument: **"The Digital Systems Instrument"**.
  - **Concept**: A modular architectural assembly of floating precision planes, data rails, and crystalline geometric nodes that subtly tilt and separate with pointer movement.
  - **Distinct Identity**: Zero orbs, zero concentric rings (preserving uniqueness for Experiment 01 in the Lab). Represents commerce, applications, and interactive systems.
  - **Performance**: Lightweight geometry, clamped DPR, pauses when scrolled out of view.

---

## 4. Project Presentation: Editorial Hierarchy & Proof

### Hierarchy
1. **Featured Case Study 01 (Corpassion Events)**:
   - Full-width hero presentation with large high-resolution screenshot preview.
   - Narrative divided into: **Product Context**, **The Challenge**, and **Engineering & Design Response**.
   - Direct live deployment link and source code badge.
2. **Featured Case Study 02 (3D Interactive Resume Builder)**:
   - Asymmetric split presentation highlighting the Three.js WebGL spatial document architecture.
   - Vector PDF export and client-side rendering breakdown.
3. **Featured Case Study 03 (Amirs Kalonji Oil)**:
   - D2C e-commerce case study with mobile checkout flow and WhatsApp direct funnel evidence.
4. **Featured Case Study 04 (Nexus Bay)**:
   - Digital agency platform focusing on Core Web Vitals and edge delivery.
5. **Curated Archive (Federal Sanitary & Fatima-Ali Wedding)**:
   - Compact, high-density index with persistent preview thumbnails, tech tags, and direct links.

---

## 5. 3D Laboratory: 6 Distinct High-Craft Experiments

### Strict Ordering:
1. **Experiment 01: Gyroscopic Material Study (Refined)**
   - *Status*: Opens first by default.
   - *Internal Modes*: `Refraction` (transmission physical material), `Wireframe` (cad-line topology), `Kinetic` (harmonic velocity).
   - *Refinements*: Polished lighting, improved optical dispersion, responsive touch-orbiting without scroll trapping.
2. **Experiment 02: Spatial Interface System**
   - *Concept*: Modular architectural interface planes assembling into a digital product architecture in 3D space.
   - *Interaction*: Drag to rotate system; toggle between `Deconstructed`, `Assembled`, and `Planar` states.
3. **Experiment 03: Kinetic Type Field**
   - *Concept*: 3D typographic sculpture displaying "BUILD WITH INTENT".
   - *Interaction*: Dynamic velocity distortion based on pointer proximity; smooth damped return to architectural alignment.
4. **Experiment 04: Responsive Signal Architecture**
   - *Concept*: Information routing network with data packets traveling along deliberate geometric tracks between nodes.
   - *Interaction*: Click/drag nodes to reroute data flows; toggle packet transmission velocity.
5. **Experiment 05: Generative Layout Engine**
   - *Concept*: Dynamic grid-constraint experiment adapting typographic blocks and aspect ratios in real time.
   - *Interaction*: Adjust grid density, column rhythms, and scale parameters.
6. **Experiment 06: Topographic Shader Study**
   - *Concept*: Real-time GLSL displacement surface representing system load and frequency fields.
   - *Interaction*: Pointer position generates ripples and wave interference patterns; toggle frequency modes.

### Lab Navigation & Architecture:
- Single clean WebGL canvas or safely swapped isolated components.
- Inactive experiments are completely unmounted and their geometries/materials explicitly disposed of.
- IntersectionObserver halts all rendering when the Lab is outside the viewport.
- Touch controls use `touch-action: pan-y` so vertical page scrolling is never blocked on mobile.
