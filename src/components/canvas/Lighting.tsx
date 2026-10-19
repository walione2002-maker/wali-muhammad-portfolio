'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { PROJECTS } from '@/data/projects';

// Module-scoped reusable Color objects to prevent GC allocations in useFrame
const _targetRim1 = new THREE.Color('#00F0FF');
const _targetRim2 = new THREE.Color('#FF2E93');
const _targetRim3 = new THREE.Color('#FFB800');
const _targetCore = new THREE.Color('#00F0FF');

export function Lighting() {
  const rimLight1Ref = useRef<THREE.SpotLight>(null);
  const rimLight2Ref = useRef<THREE.SpotLight>(null);
  const rimLight3Ref = useRef<THREE.PointLight>(null);
  const dynamicLightRef = useRef<THREE.PointLight>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);

  const activeProjectId = usePortfolioStore((s) => s.activeProjectId);
  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);

    // Dynamic Section & Project Chromatic Lighting Rig
    if (activeProjectId) {
      const p = PROJECTS.find((proj) => proj.id === activeProjectId);
      if (p) {
        _targetRim1.set(p.accentColor);
        _targetRim2.set('#00F0FF');
        _targetRim3.set('#FFB800');
        _targetCore.set(p.accentColor);
      }
    } else if (activeSectionIndex === 0) {
      // Section 00 (Entry Gate): Electric Cyan #00F0FF + Molten Gold #FFB800
      _targetRim1.set('#00F0FF');
      _targetRim2.set('#FFB800');
      _targetRim3.set('#00F0FF');
      _targetCore.set('#00F0FF');
    } else if (activeSectionIndex === 1) {
      // Section 01 (Strategic Architecture): Ultraviolet #8B5CF6 + Laser Cyan #38BDF8
      _targetRim1.set('#8B5CF6');
      _targetRim2.set('#38BDF8');
      _targetRim3.set('#8B5CF6');
      _targetCore.set('#8B5CF6');
    } else if (activeSectionIndex === 2) {
      // Section 02 (8 Live Deployments Showroom): Electric Cyan #00F0FF + Hyper Magenta #FF2E93
      _targetRim1.set('#00F0FF');
      _targetRim2.set('#FF2E93');
      _targetRim3.set('#FFB800');
      _targetCore.set('#00F0FF');
    } else if (activeSectionIndex === 3) {
      // Section 03 (Wireframe Architecture Stack): Matrix Neon Emerald #00FF9D + Cyber Cyan #00E5FF
      _targetRim1.set('#00FF9D');
      _targetRim2.set('#00E5FF');
      _targetRim3.set('#00FF9D');
      _targetCore.set('#00FF9D');
    } else if (activeSectionIndex === 4) {
      // Section 04 (Client Brief Portal): Supernova Gold #FFB800 + Hyper Violet #EC4899
      _targetRim1.set('#FFB800');
      _targetRim2.set('#EC4899');
      _targetRim3.set('#FFB800');
      _targetCore.set('#FFB800');
    }

    // Smoothly interpolate the 3 studio rim lights
    if (rimLight1Ref.current) {
      rimLight1Ref.current.color.lerp(_targetRim1, dt * 4);
    }
    if (rimLight2Ref.current) {
      rimLight2Ref.current.color.lerp(_targetRim2, dt * 4);
    }
    if (rimLight3Ref.current) {
      rimLight3Ref.current.color.lerp(_targetRim3, dt * 4);
    }

    if (dynamicLightRef.current) {
      dynamicLightRef.current.color.lerp(_targetRim1, dt * 4);
    }

    if (coreLightRef.current) {
      coreLightRef.current.color.lerp(_targetCore, dt * 5);
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

      {/* Studio Rim Light 1: High-intensity directional specular rim beam */}
      <spotLight
        ref={rimLight1Ref}
        position={[-8, 12, 6]}
        intensity={3.4}
        angle={0.65}
        penumbra={0.8}
        color="#00F0FF"
        distance={38}
      />

      {/* Studio Rim Light 2: High-intensity counter-rim accent */}
      <spotLight
        ref={rimLight2Ref}
        position={[10, -8, -6]}
        intensity={3.0}
        angle={0.7}
        penumbra={0.9}
        color="#FF2E93"
        distance={38}
      />

      {/* Studio Rim Light 3: Edge separation back-rim */}
      <pointLight
        ref={rimLight3Ref}
        position={[8, 8, -8]}
        intensity={2.8}
        color="#FFB800"
        distance={28}
        decay={2}
      />

      {/* Dynamic Reactive Chromatic Light — Tracks active section/project */}
      <pointLight
        ref={dynamicLightRef}
        position={[-6, -6, 8]}
        intensity={2.6}
        color="#00F0FF"
        distance={28}
        decay={2}
      />

      {/* Internal Core Illumination — Illuminates core quantum nucleus */}
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
