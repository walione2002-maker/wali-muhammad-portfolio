'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { PROJECTS } from '@/data/projects';

// Module-scoped color objects to guarantee 0 allocations in useFrame
const _ringTargetAccent = new THREE.Color('#38BDF8');

export function GyroscopicRings() {
  const ring0Ref = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const mat0Ref = useRef<THREE.MeshStandardMaterial>(null);
  const mat1Ref = useRef<THREE.MeshStandardMaterial>(null);
  const mat2Ref = useRef<THREE.MeshStandardMaterial>(null);

  const activeProjectId = usePortfolioStore((s) => s.activeProjectId);
  const isMobile = usePortfolioStore((s) => s.isMobile);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);

    if (ring0Ref.current) {
      ring0Ref.current.rotation.x += 0.32 * dt;
      ring0Ref.current.rotation.y += 0.08 * dt;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y += 0.22 * dt;
      ring1Ref.current.rotation.z += 0.10 * dt;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z += 0.18 * dt;
      ring2Ref.current.rotation.x += 0.07 * dt;
    }

    // Chromatic sync to focused project or clean modern palette
    if (activeProjectId) {
      const p = PROJECTS.find((proj) => proj.id === activeProjectId);
      if (p) _ringTargetAccent.set(p.accentColor);
    } else {
      _ringTargetAccent.set('#38BDF8');
    }

    const targetEmissiveIntensity = activeProjectId ? 0.45 : 0.12;

    if (mat0Ref.current) {
      mat0Ref.current.emissive.lerp(_ringTargetAccent, dt * 4);
      mat0Ref.current.emissiveIntensity = THREE.MathUtils.lerp(
        mat0Ref.current.emissiveIntensity,
        targetEmissiveIntensity * 0.7,
        dt * 4
      );
    }
    if (mat1Ref.current) {
      mat1Ref.current.emissive.lerp(_ringTargetAccent, dt * 4);
      mat1Ref.current.emissiveIntensity = THREE.MathUtils.lerp(
        mat1Ref.current.emissiveIntensity,
        targetEmissiveIntensity * 0.85,
        dt * 4
      );
    }
    if (mat2Ref.current) {
      mat2Ref.current.emissive.lerp(_ringTargetAccent, dt * 4);
      mat2Ref.current.emissiveIntensity = THREE.MathUtils.lerp(
        mat2Ref.current.emissiveIntensity,
        targetEmissiveIntensity * 1.2,
        dt * 4
      );
    }
  });

  return (
    <group name="gyroscopic-rings">
      {/* Outer Ring — Polished Titanium */}
      <mesh ref={ring0Ref}>
        <torusGeometry args={[3.0, 0.045, isMobile ? 12 : 24, isMobile ? 70 : 160]} />
        <meshStandardMaterial
          ref={mat0Ref}
          color="#E2E8F0"
          metalness={0.95}
          roughness={0.14}
          emissive="#38BDF8"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Middle Ring — Cobalt Titanium */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.4, 0.045, isMobile ? 12 : 24, isMobile ? 60 : 140]} />
        <meshStandardMaterial
          ref={mat1Ref}
          color="#CBD5E1"
          metalness={0.93}
          roughness={0.16}
          emissive="#6366F1"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Inner Ring — Warm Gold Accent */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.8, 0.045, isMobile ? 12 : 24, isMobile ? 50 : 120]} />
        <meshStandardMaterial
          ref={mat2Ref}
          color="#F59E0B"
          metalness={0.98}
          roughness={0.12}
          emissive="#F59E0B"
          emissiveIntensity={0.18}
        />
      </mesh>
    </group>
  );
}

export default GyroscopicRings;
