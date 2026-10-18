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
  });

  return (
    <group name="gyroscopic-rings">
      {/* Outer Ring — Polished Aerospace Titanium */}
      <mesh ref={ring0Ref}>
        <torusGeometry args={[3.0, 0.045, 24, 160]} />
        <meshStandardMaterial
          color="#E2E8F0"
          metalness={0.95}
          roughness={0.14}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Middle Ring — Anodized Cobalt-Infused Titanium */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.4, 0.045, 24, 140]} />
        <meshStandardMaterial
          color="#CBD5E1"
          metalness={0.93}
          roughness={0.16}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Inner Ring — Polished 24k Molten Gold Accent */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.8, 0.045, 24, 120]} />
        <meshStandardMaterial
          color="#FFB800"
          metalness={0.98}
          roughness={0.12}
          wireframe={isWireframe}
        />
      </mesh>
    </group>
  );
}

export default GyroscopicRings;
