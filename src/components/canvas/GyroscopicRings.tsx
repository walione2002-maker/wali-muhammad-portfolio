'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function GyroscopicRings() {
  const ring0Ref = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);
  const isWireframe = activeSectionIndex === 3;

  useFrame((_, delta) => {
    // Speed multiplier based on active section
    let speedMult = 1.0;
    if (activeSectionIndex === 1) speedMult = 1.25;
    else if (activeSectionIndex === 2) speedMult = 0.35; // Majestic slow motion during showroom
    else if (activeSectionIndex === 3) speedMult = 0.85; // Technical scan speed in wireframe
    else if (activeSectionIndex === 4) speedMult = 0.5; // Ceremonial slow rotation in contact

    const dt = Math.min(delta, 0.1);

    if (ring0Ref.current) {
      ring0Ref.current.rotation.x += 0.32 * speedMult * dt;
      ring0Ref.current.rotation.y += 0.08 * speedMult * dt;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y += 0.22 * speedMult * dt;
      ring1Ref.current.rotation.z += 0.1 * speedMult * dt;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z += 0.18 * speedMult * dt;
      ring2Ref.current.rotation.x += 0.07 * speedMult * dt;
    }
  });

  return (
    <group name="gyroscopic-rings">
      {/* Outer Ring — Brushed Aerospace Titanium */}
      <mesh ref={ring0Ref}>
        <torusGeometry args={[3.0, 0.045, 24, 160]} />
        <meshStandardMaterial
          color="#D1D5DB"
          metalness={0.94}
          roughness={0.16}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Middle Ring — Anodized Platinum / Cool Titanium */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.4, 0.045, 24, 140]} />
        <meshStandardMaterial
          color="#9CA3AF"
          metalness={0.92}
          roughness={0.18}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Inner Ring — Polished Champagne Gold Accent */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.8, 0.045, 24, 120]} />
        <meshStandardMaterial
          color="#F59E0B"
          metalness={0.96}
          roughness={0.14}
          wireframe={isWireframe}
        />
      </mesh>
    </group>
  );
}

export default GyroscopicRings;
