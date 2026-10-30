# Graphics Pipeline Architecture Specification
**Wali Muhammad Portfolio — High-Fidelity Real-Time Graphics System**
**Frameworks:** Next.js 14 App Router, Three.js 0.169, React Three Fiber 8.17, React Three Drei 9.114

---

## 1. System Architecture Overview

The graphics pipeline is designed around three strict principles: **hardware isolation**, **adaptive tier management**, and **zero-allocation rendering loops**.

```
[Window / Hardware Capabilities Detection]
           |
           v
[GraphicsQualityManager] (src/lib/graphics/quality.ts)
           |
     +-----+-----+--------------------+
     |           |                    |
     v           v                    v
[Tier: ULTRA] [Tier: HIGH] [Tier: BALANCED] [Tier: EFFICIENT/FALLBACK]
(DPR 1.5,     (DPR 1.5,    (DPR 1.25,       (DPR 1.0, No Transmission,
 Transmission)Transmission)Fast Materials)    CSS/Static Fallback)
           |           |                    |
           +-----+-----+--------------------+
                 |
                 v
        [Adaptive Canvas Mount]
     - IntersectionObserver (Offscreen Pausing)
     - Touch-Action: pan-y (No scroll trapping)
     - Prefers-Reduced-Motion Clamping
```

---

## 2. Adaptive Quality Manager (`src/lib/graphics/quality.ts`)

The graphics manager operates without user-agent sniffing heuristics where standard capability APIs exist:
- **`prefers-reduced-motion`:** Detects user OS accessibility settings and locks rendering to `'fallback'` tier (demand-driven, zero continuous rotation).
- **`saveData`:** Inspects `navigator.connection?.saveData` to prevent heavy WebGL asset streaming on metered connections.
- **`devicePixelRatio` Clamping:** Enforces an upper bound of 1.5× on desktop and 1.25× on mobile screens to prevent mobile GPUs from rendering 3× Retina resolutions unnecessarily.
- **Exponential Moving Average (EMA) Frame Profiling:** During active rendering, frame deltas are recorded in a 60-frame rolling window. If sustained frame times exceed 28.0 ms (below 35 FPS for >45 consecutive frames), the manager automatically steps down from `ultra` -> `high` -> `balanced` -> `efficient` without oscillation.

---

## 3. Render Loop Discipline

To prevent garbage collection pauses (GC spikes) that cause micro-stuttering:
1. **Pre-allocated Scratch Objects:** All `Vector3`, `Euler`, `Matrix4`, `Color`, and `Quaternion` instances are instantiated once outside frame hooks (`useMemo`) and reused across frames via `.lerp()`, `.copy()`, and `.set()`.
2. **Zero In-Loop Array Allocations:** No `.map()`, `.filter()`, or object destructuring inside `useFrame`.
3. **Delta Clamping:** Frame deltas are strictly clamped: `const dt = Math.min(delta, 0.1);` to prevent explosive physics jumps when returning from background browser tabs.
4. **Offscreen Canvas Halting:** `InteractiveLab` uses an `IntersectionObserver` with a 200px margin. When scrolled out of the viewport, the Canvas completely unmounts/pauses rendering, consuming 0% GPU and 0% CPU.

---

## 4. Physically Based Shaders & Materials

### MeshPhysicalMaterial (Optical Crystal & UI Viewports)
- **Transmission:** 0.95 with thickness 2.4 and Index of Refraction (IOR) 1.54.
- **Clearcoat:** 1.0 with 0.05 clearcoat roughness for clean specular grazing highlights.
- **Performance Safeguard:** Automatically degrades to standard metallic material with opacity blending when the quality tier steps down to `efficient` or `fallback`.

### Custom GLSL Topographic Shader (Exp 06)
- **Vertex Shader:** Multi-frequency sine displacement with exponential radial decay ripples. Normal vectors are analytically perturbed in the vertex stage so fragment calculations avoid expensive finite-difference derivatives.
- **Fragment Shader:** Generates antialiased contour isolines using `fract()` and `step()` functions without branch divergence.

---

## 5. Geometry Engineering & Asset Independence

- **Zero External Model Weight:** All geometries (including the 3D letterforms in Exp 03 "BUILD WITH INTENT") are procedurally generated via `THREE.ExtrudeGeometry`, `THREE.IcosahedronGeometry`, `THREE.TorusGeometry`, and `THREE.BoxGeometry`.
- **Zero Network Lag / 100% Offline Resilience:** No external GLTF/GLB or 3D font files are requested over the network. Geometry initialization is instantaneous and fully compatible with static export and edge CDN caching.
