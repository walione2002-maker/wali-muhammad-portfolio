'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { PROJECTS } from '@/data/projects';

// Module-scoped reusable Color objects to prevent allocations in useFrame
const _activeColor = new THREE.Color();
const _targetColor = new THREE.Color('#00F0FF');
const _goldColor = new THREE.Color('#FFB800');
const _magentaColor = new THREE.Color('#FF2E93');

export function Lighting() {
  const dynamicLightRef = useRef<THREE.PointLight>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);

  const activeProjectId = usePortfolioStore((s) => s.activeProjectId);
  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);

    // Resolve target chromatic color from active project or section
    if (activeProjectId) {
      const p = PROJECTS.find((proj) => proj.id === activeProjectId);
      if (p) _targetColor.set(p.accentColor);
    } else if (activeSectionIndex === 1) {
      _targetColor.set('#FFB800'); // Molten Gold
    } else if (activeSectionIndex === 2) {
      _targetColor.set('#00F0FF'); // Electric Cyan
    } else if (activeSectionIndex === 3) {
      _targetColor.set('#7C3AED'); // Ultraviolet
    } else if (activeSectionIndex === 4) {
      _targetColor.set('#FF2E93'); // Hyper Magenta
    } else {
      _targetColor.set('#00F0FF');
    }

    if (dynamicLightRef.current) {
      dynamicLightRef.current.color.lerp(_targetColor, dt * 4);
    }
    if (coreLightRef.current) {
      coreLightRef.current.color.lerp(_targetColor, dt * 5);
      const targetIntensity = activeSectionIndex === 4 ? 3.5 : 1.8;
      coreLightRef.current.intensity = THREE.MathUtils.lerp(
        coreLightRef.current.intensity,
        targetIntensity,
        dt * 4
      );
    }
  });

  return (
    <>
      {/* Studio ambient base illumination */}
      <ambientLight intensity={0.5} color="#080B14" />

      {/* Primary key light: Crisp white specular sheen */}
      <directionalLight
        position={[12, 20, 14]}
        intensity={1.8}
        color="#ffffff"
        castShadow={false}
      />

      {/* Cool blue secondary fill light */}
      <directionalLight
        position={[-14, 8, -10]}
        intensity={0.9}
        color="#38BDF8"
      />

      {/* Spot 1: Electric Cyan specular beam aimed at titanium rings */}
      <spotLight
        position={[-8, 12, 6]}
        intensity={3.2}
        angle={0.6}
        penumbra={0.8}
        color="#00F0FF"
        distance={35}
      />

      {/* Spot 2: Hyper Magenta counter-rim accent */}
      <spotLight
        position={[10, -8, -6]}
        intensity={2.8}
        angle={0.7}
        penumbra={0.9}
        color="#FF2E93"
        distance={35}
      />

      {/* Rim light: Molten gold edge separation */}
      <pointLight
        position={[8, 8, -8]}
        intensity={2.5}
        color="#FFB800"
        distance={25}
        decay={2}
      />

      {/* Dynamic Reactive Chromatic Light — Tracks currently active project/section */}
      <pointLight
        ref={dynamicLightRef}
        position={[-6, -6, 8]}
        intensity={2.6}
        color="#00F0FF"
        distance={28}
        decay={2}
      />

      {/* Internal core illumination — Illuminates crystal orb from within */}
      <pointLight
        ref={coreLightRef}
        position={[0, 0, 0]}
        intensity={1.8}
        color="#00F0FF"
        distance={8}
        decay={2}
      />
    </>
  );
}

export default Lighting;
