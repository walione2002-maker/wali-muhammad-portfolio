'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { PROJECTS } from '@/data/projects';

// Module-scoped Color object to prevent GC allocations in useFrame
const _targetCoreColor = new THREE.Color('#38BDF8');

export function RefractiveCoreOrb() {
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const stdMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const innerMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const activeProjectId = usePortfolioStore((s) => s.activeProjectId);
  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);
  const qualityTier = usePortfolioStore((s) => s.qualityTier);
  const isMobile = usePortfolioStore((s) => s.isMobile);

  const isSinglePass = isMobile || qualityTier === 'low';

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);

    // Counter-rotation of outer shell
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.y -= 0.18 * dt;
      outerMeshRef.current.rotation.x += 0.09 * dt;
    }

    // Dynamic rotation of internal quantum nucleus
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y += 0.45 * dt;
      innerMeshRef.current.rotation.z -= 0.3 * dt;
    }

    // Resolve target color from active project or section
    if (activeProjectId) {
      const p = PROJECTS.find((proj) => proj.id === activeProjectId);
      if (p) _targetCoreColor.set(p.accentColor);
    } else if (activeSectionIndex === 3) {
      _targetCoreColor.set('#F59E0B'); // Warm gold in contact section
    } else if (activeSectionIndex === 2) {
      _targetCoreColor.set('#6366F1'); // Indigo in services section
    } else {
      _targetCoreColor.set('#38BDF8'); // Cyan/Teal in hero
    }

    // Core glow intensity: rises in contact section for warm intimate approach
    const targetIntensity = activeSectionIndex === 3 ? 1.6 : activeProjectId ? 1.2 : 0.7;

    // Outer shell material update
    if (matRef.current) {
      matRef.current.emissive.lerp(_targetCoreColor, dt * 4);
      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        matRef.current.emissiveIntensity,
        targetIntensity,
        dt * 4
      );
    }

    if (stdMatRef.current) {
      stdMatRef.current.emissive.lerp(_targetCoreColor, dt * 5);
      stdMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        stdMatRef.current.emissiveIntensity,
        targetIntensity * 1.5,
        dt * 4
      );
    }

    // Inner nucleus update
    if (innerMatRef.current) {
      innerMatRef.current.emissive.lerp(_targetCoreColor, dt * 5);
      innerMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        innerMatRef.current.emissiveIntensity,
        2.2,
        dt * 4
      );
    }
  });

  return (
    <group name="core-orb-composite">
      {/* Outer Core Shell: Glass transmission on desktop, sleek metallic standard on mobile */}
      <mesh ref={outerMeshRef} name="core-orb">
        <icosahedronGeometry args={[0.92, isMobile ? 2 : 4]} />
        {isSinglePass ? (
          <meshStandardMaterial
            ref={stdMatRef}
            color="#080E1E"
            metalness={0.92}
            roughness={0.14}
            emissive="#38BDF8"
            emissiveIntensity={1.2}
          />
        ) : (
          <meshPhysicalMaterial
            ref={matRef}
            color="#ffffff"
            transmission={0.97}
            roughness={0.03}
            thickness={2.2}
            ior={1.52}
            envMapIntensity={1.4}
            emissive="#38BDF8"
            emissiveIntensity={0.7}
            transparent
            opacity={0.94}
          />
        )}
      </mesh>

      {/* Internal Glowing Quantum Nucleus */}
      <mesh ref={innerMeshRef} name="inner-nucleus">
        <octahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial
          ref={innerMatRef}
          color="#ffffff"
          emissive="#F59E0B"
          emissiveIntensity={2.0}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}

export default RefractiveCoreOrb;
