'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { PROJECTS } from '@/data/projects';

// Module-scoped color objects to guarantee 0 allocations in useFrame
const _ringTargetAccent = new THREE.Color('#00F0FF');

export function GyroscopicRings() {
  const ring0Ref = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const mat0Ref = useRef<THREE.MeshStandardMaterial>(null);
  const mat1Ref = useRef<THREE.MeshStandardMaterial>(null);
  const mat2Ref = useRef<THREE.MeshStandardMaterial>(null);

  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);
  const activeProjectId = usePortfolioStore((s) => s.activeProjectId);
  const isMobile = usePortfolioStore((s) => s.isMobile);
  const isWireframe = activeSectionIndex === 3;

  useFrame((_, delta) => {
    // Dynamic speed based on section
    let speedMult = 1.0;
    if (activeSectionIndex === 1) speedMult = 1.3;
    else if (activeSectionIndex === 2) speedMult = 0.35; // Controlled majestic rotation during showroom
    else if (activeSectionIndex === 3) speedMult = 0.9;  // Wireframe scan speed
    else if (activeSectionIndex === 4) speedMult = 0.55; // Ceremonial slow rotation in contact

    const dt = Math.min(delta, 0.1);

    if (ring0Ref.current) {
      ring0Ref.current.rotation.x += 0.34 * speedMult * dt;
      ring0Ref.current.rotation.y += 0.09 * speedMult * dt;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y += 0.24 * speedMult * dt;
      ring1Ref.current.rotation.z += 0.11 * speedMult * dt;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z += 0.19 * speedMult * dt;
      ring2Ref.current.rotation.x += 0.08 * speedMult * dt;
    }

    // Chromatic sync to focused project or section
    if (activeProjectId) {
      const p = PROJECTS.find((proj) => proj.id === activeProjectId);
      if (p) _ringTargetAccent.set(p.accentColor);
    } else if (activeSectionIndex === 2) {
      _ringTargetAccent.set('#00F0FF');
    } else if (activeSectionIndex === 3) {
      _ringTargetAccent.set('#00FF9D');
    } else {
      _ringTargetAccent.set('#FFB800');
    }

    const isShowroom = activeSectionIndex === 2 || Boolean(activeProjectId);
    const targetEmissiveIntensity = isShowroom ? 0.45 : 0.08;

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
      {/* Outer Ring — Polished Aerospace Titanium */}
      <mesh ref={ring0Ref}>
        <torusGeometry args={[3.0, 0.045, isMobile ? 12 : 24, isMobile ? 70 : 160]} />
        <meshStandardMaterial
          ref={mat0Ref}
          color="#E2E8F0"
          metalness={0.95}
          roughness={0.14}
          emissive="#00F0FF"
          emissiveIntensity={0.08}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Middle Ring — Anodized Cobalt-Infused Titanium */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.4, 0.045, isMobile ? 12 : 24, isMobile ? 60 : 140]} />
        <meshStandardMaterial
          ref={mat1Ref}
          color="#CBD5E1"
          metalness={0.93}
          roughness={0.16}
          emissive="#7C3AED"
          emissiveIntensity={0.08}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Inner Ring — Polished 24k Molten Gold Accent */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.8, 0.045, isMobile ? 12 : 24, isMobile ? 50 : 120]} />
        <meshStandardMaterial
          ref={mat2Ref}
          color="#FFB800"
          metalness={0.98}
          roughness={0.12}
          emissive="#FFB800"
          emissiveIntensity={0.15}
          wireframe={isWireframe}
        />
      </mesh>
    </group>
  );
}

export default GyroscopicRings;
