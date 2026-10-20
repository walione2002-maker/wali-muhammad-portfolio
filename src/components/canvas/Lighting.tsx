'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { PROJECTS } from '@/data/projects';

// Module-scoped reusable Color objects to prevent GC allocations in useFrame
const _targetRim1 = new THREE.Color('#38BDF8'); // Sapphire Blue
const _targetRim2 = new THREE.Color('#6366F1'); // Indigo
const _targetRim3 = new THREE.Color('#F59E0B'); // Warm Gold
const _targetCore = new THREE.Color('#38BDF8');

export function Lighting() {
  const rimLight1Ref = useRef<THREE.SpotLight>(null);
  const rimLight2Ref = useRef<THREE.SpotLight>(null);
  const rimLight3Ref = useRef<THREE.PointLight>(null);
  const dynamicLightRef = useRef<THREE.PointLight>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    const { activeProjectId } = usePortfolioStore.getState();
    const dt = Math.min(delta, 0.1);

    // Warm modern studio lighting rig with dynamic accent matching
    if (activeProjectId) {
      const p = PROJECTS.find((proj) => proj.id === activeProjectId);
      if (p) {
        _targetRim1.set(p.accentColor);
        _targetRim2.set('#6366F1');
        _targetRim3.set('#F59E0B');
        _targetCore.set(p.accentColor);
      }
    } else {
      // Default modern palette: Sapphire Blue + Indigo + Warm Gold
      _targetRim1.set('#38BDF8');
      _targetRim2.set('#6366F1');
      _targetRim3.set('#F59E0B');
      _targetCore.set('#38BDF8');
    }

    // Smoothly interpolate studio rim lights
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
      coreLightRef.current.intensity = THREE.MathUtils.lerp(
        coreLightRef.current.intensity,
        2.2,
        dt * 4
      );
    }
  });

  return (
    <>
      {/* Studio ambient base illumination */}
      <ambientLight intensity={0.65} color="#0E162B" />

      {/* Primary key light: Crisp white specular sheen */}
      <directionalLight
        position={[12, 18, 14]}
        intensity={1.8}
        color="#ffffff"
        castShadow={false}
      />

      {/* Cool blue secondary fill light */}
      <directionalLight
        position={[-14, 8, -10]}
        intensity={1.0}
        color="#38BDF8"
      />

      {/* Studio Rim Light 1: Sapphire Blue specular beam */}
      <spotLight
        ref={rimLight1Ref}
        position={[-8, 12, 6]}
        intensity={3.4}
        angle={0.65}
        penumbra={0.8}
        color="#38BDF8"
        distance={38}
      />

      {/* Studio Rim Light 2: Indigo counter-rim accent */}
      <spotLight
        ref={rimLight2Ref}
        position={[10, -8, -6]}
        intensity={3.0}
        angle={0.7}
        penumbra={0.9}
        color="#6366F1"
        distance={38}
      />

      {/* Studio Rim Light 3: Warm Gold edge separation back-rim */}
      <pointLight
        ref={rimLight3Ref}
        position={[8, 8, -8]}
        intensity={2.8}
        color="#F59E0B"
        distance={28}
        decay={2}
      />

      {/* Dynamic Reactive Chromatic Light */}
      <pointLight
        ref={dynamicLightRef}
        position={[-6, -6, 8]}
        intensity={2.6}
        color="#38BDF8"
        distance={28}
        decay={2}
      />

      {/* Internal Core Illumination */}
      <pointLight
        ref={coreLightRef}
        position={[0, 0, 0]}
        intensity={2.2}
        color="#38BDF8"
        distance={8}
        decay={2}
      />
    </>
  );
}

export default Lighting;
