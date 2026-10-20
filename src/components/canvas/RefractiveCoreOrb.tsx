'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { PROJECTS } from '@/data/projects';

// Module-scoped Color object to avoid GC allocations in useFrame
const _targetCoreColor = new THREE.Color('#38BDF8');

export function RefractiveCoreOrb() {
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const fresnelMeshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const stdMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const fresnelMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const innerMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const activeProjectId = usePortfolioStore((s) => s.activeProjectId);
  const qualityTier = usePortfolioStore((s) => s.qualityTier);
  const isMobile = usePortfolioStore((s) => s.isMobile);

  const isSinglePass = isMobile || qualityTier !== 'high';

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);

    // Counter-rotation of outer glass / metallic shell
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.y -= 0.18 * dt;
      outerMeshRef.current.rotation.x += 0.09 * dt;
    }

    if (fresnelMeshRef.current) {
      fresnelMeshRef.current.rotation.y -= 0.18 * dt;
      fresnelMeshRef.current.rotation.x += 0.09 * dt;
    }

    // Dynamic tumble of internal nucleus
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y += 0.45 * dt;
      innerMeshRef.current.rotation.z -= 0.3 * dt;
    }

    // Resolve target color from active project or default modern palette
    if (activeProjectId) {
      const p = PROJECTS.find((proj) => proj.id === activeProjectId);
      if (p) _targetCoreColor.set(p.accentColor);
    } else {
      _targetCoreColor.set('#38BDF8');
    }

    // Single-pass metallic core on mobile
    if (stdMatRef.current) {
      stdMatRef.current.emissive.lerp(_targetCoreColor, dt * 5);
      const targetEmissive = activeProjectId ? 1.8 : 1.4;
      stdMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        stdMatRef.current.emissiveIntensity,
        targetEmissive,
        dt * 4
      );
    }

    // Additive backface Fresnel glow shell on mobile
    if (fresnelMatRef.current) {
      fresnelMatRef.current.color.lerp(_targetCoreColor, dt * 5);
    }

    // Multi-pass Physical Transmission Material (Desktop high tier only)
    if (matRef.current) {
      matRef.current.emissive.lerp(_targetCoreColor, dt * 4);
      const targetEmissive = activeProjectId ? 1.0 : 0.6;
      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        matRef.current.emissiveIntensity,
        targetEmissive,
        dt * 4
      );
    }

    if (innerMatRef.current) {
      innerMatRef.current.emissive.lerp(_targetCoreColor, dt * 5);
      innerMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        innerMatRef.current.emissiveIntensity,
        2.0,
        dt * 4
      );
    }
  });

  return (
    <group name="core-orb-composite">
      {/* Outer Core Shell: Single-pass Metallic on mobile / Physical glass on desktop */}
      <mesh ref={outerMeshRef} name="core-orb">
        <icosahedronGeometry args={[0.92, isMobile ? 2 : 4]} />
        {isSinglePass ? (
          <meshStandardMaterial
            ref={stdMatRef}
            color="#080E1E"
            metalness={0.92}
            roughness={0.14}
            emissive="#38BDF8"
            emissiveIntensity={1.4}
          />
        ) : (
          <meshPhysicalMaterial
            ref={matRef}
            color="#ffffff"
            transmission={0.97}
            roughness={0.02}
            thickness={2.5}
            ior={1.54}
            envMapIntensity={1.5}
            emissive="#38BDF8"
            emissiveIntensity={0.6}
            transparent
            opacity={0.94}
          />
        )}
      </mesh>

      {/* Additive Backface Fresnel Glow Shell for vibrant luminescence */}
      {isSinglePass && (
        <mesh ref={fresnelMeshRef} scale={[1.08, 1.08, 1.08]} name="fresnel-glow-shell">
          <icosahedronGeometry args={[0.92, 1]} />
          <meshBasicMaterial
            ref={fresnelMatRef}
            color="#38BDF8"
            transparent
            opacity={0.35}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Internal Glowing Quantum Nucleus */}
      <mesh ref={innerMeshRef} name="inner-nucleus">
        <octahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial
          ref={innerMatRef}
          color="#ffffff"
          emissive="#F59E0B"
          emissiveIntensity={1.8}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}

export default RefractiveCoreOrb;
