'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function RefractiveCoreOrb() {
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const innerMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);
  const isWireframe = activeSectionIndex === 3;

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);

    // Counter-rotation of outer glass shell
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.y -= 0.15 * dt;
      outerMeshRef.current.rotation.x += 0.08 * dt;
    }

    // Faster tumble of internal glowing core facet
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y += 0.4 * dt;
      innerMeshRef.current.rotation.z -= 0.25 * dt;
    }

    // Smoothly interpolate emissive intensity based on active section
    if (matRef.current) {
      let targetEmissive = 0.35;
      if (activeSectionIndex === 1) targetEmissive = 0.7;
      else if (activeSectionIndex === 3) targetEmissive = 1.2;
      else if (activeSectionIndex === 4) targetEmissive = 2.4; // Radiant zenith core glow

      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        matRef.current.emissiveIntensity,
        targetEmissive,
        dt * 4
      );
    }

    if (innerMatRef.current) {
      const innerTarget = activeSectionIndex === 4 ? 3.0 : 1.2;
      innerMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        innerMatRef.current.emissiveIntensity,
        innerTarget,
        dt * 4
      );
    }
  });

  return (
    <group name="refractive-core-composite">
      {/* Outer Refractive Glass Shell */}
      <mesh ref={outerMeshRef} name="refractive-core-orb">
        <icosahedronGeometry args={[0.92, 4]} />
        <meshPhysicalMaterial
          ref={matRef}
          color="#ffffff"
          transmission={0.96}
          roughness={0.03}
          thickness={2.2}
          ior={1.52}
          envMapIntensity={1.2}
          emissive="#38BDF8"
          emissiveIntensity={0.35}
          wireframe={isWireframe}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Internal Glowing Quantum Nucleus — Visible through refractive glass */}
      <mesh ref={innerMeshRef} name="inner-quantum-nucleus">
        <octahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial
          ref={innerMatRef}
          color="#60A5FA"
          emissive="#F59E0B"
          emissiveIntensity={1.2}
          metalness={0.8}
          roughness={0.2}
          wireframe={isWireframe}
        />
      </mesh>
    </group>
  );
}

export default RefractiveCoreOrb;
