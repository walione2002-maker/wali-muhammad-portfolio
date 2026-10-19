'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { PROJECTS } from '@/data/projects';

// Module-scoped Color object to avoid GC allocations in useFrame
const _coreColor = new THREE.Color();
const _targetCoreColor = new THREE.Color('#00F0FF');

export function RefractiveCoreOrb() {
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const fresnelMeshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const stdMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const fresnelMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const innerMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const activeSectionIndex = usePortfolioStore((s) => s.activeSectionIndex);
  const activeProjectId = usePortfolioStore((s) => s.activeProjectId);
  const qualityTier = usePortfolioStore((s) => s.qualityTier);
  const isMobile = usePortfolioStore((s) => s.isMobile);

  const isWireframe = activeSectionIndex === 3;
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

    // Dynamic tumble of internal faceted quantum nucleus
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y += 0.45 * dt;
      innerMeshRef.current.rotation.z -= 0.3 * dt;
    }

    // Resolve target color from active project or section
    if (activeProjectId) {
      const p = PROJECTS.find((proj) => proj.id === activeProjectId);
      if (p) _targetCoreColor.set(p.accentColor);
    } else if (activeSectionIndex === 1) {
      _targetCoreColor.set('#FFB800'); // Molten Gold
    } else if (activeSectionIndex === 2) {
      _targetCoreColor.set('#00F0FF'); // Electric Cyan
    } else if (activeSectionIndex === 3) {
      _targetCoreColor.set('#00FF9D'); // Matrix Neon Emerald
    } else if (activeSectionIndex === 4) {
      _targetCoreColor.set('#FFB800'); // Supernova Gold
    } else {
      _targetCoreColor.set('#00F0FF');
    }

    // High-performance single-pass metallic core on mobile
    if (stdMatRef.current) {
      stdMatRef.current.emissive.lerp(_targetCoreColor, dt * 5);
      let targetEmissive = 1.4;
      if (activeSectionIndex === 1) targetEmissive = 1.6;
      else if (activeSectionIndex === 2) targetEmissive = 1.8;
      else if (activeSectionIndex === 3) targetEmissive = 2.0;
      else if (activeSectionIndex === 4) targetEmissive = 2.8;

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
      let targetEmissive = 0.4;
      if (activeSectionIndex === 1) targetEmissive = 0.75;
      else if (activeSectionIndex === 2) targetEmissive = 1.0;
      else if (activeSectionIndex === 3) targetEmissive = 1.5;
      else if (activeSectionIndex === 4) targetEmissive = 2.6;

      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        matRef.current.emissiveIntensity,
        targetEmissive,
        dt * 4
      );
    }

    if (innerMatRef.current) {
      innerMatRef.current.emissive.lerp(_targetCoreColor, dt * 5);
      const innerTarget = activeSectionIndex === 4 ? 3.5 : 1.6;
      innerMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        innerMatRef.current.emissiveIntensity,
        innerTarget,
        dt * 4
      );
    }
  });

  return (
    <group name="refractive-core-composite">
      {/* Outer Core Shell: Single-pass Metallic on mobile / Physical glass on high-tier desktop */}
      <mesh ref={outerMeshRef} name="refractive-core-orb">
        <icosahedronGeometry args={[0.92, isMobile ? 2 : 4]} />
        {isSinglePass ? (
          <meshStandardMaterial
            ref={stdMatRef}
            color="#080C18"
            metalness={0.92}
            roughness={0.14}
            emissive="#00F0FF"
            emissiveIntensity={1.4}
            wireframe={isWireframe}
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
            emissive="#00F0FF"
            emissiveIntensity={0.4}
            wireframe={isWireframe}
            transparent
            opacity={0.94}
          />
        )}
      </mesh>

      {/* Additive Backface Fresnel Glow Shell for vibrant mobile luminescence */}
      {isSinglePass && (
        <mesh ref={fresnelMeshRef} scale={[1.08, 1.08, 1.08]} name="fresnel-glow-shell">
          <icosahedronGeometry args={[0.92, 1]} />
          <meshBasicMaterial
            ref={fresnelMatRef}
            color="#00F0FF"
            transparent
            opacity={0.35}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Internal Glowing Quantum Nucleus */}
      <mesh ref={innerMeshRef} name="inner-quantum-nucleus">
        <octahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial
          ref={innerMatRef}
          color="#ffffff"
          emissive="#FFB800"
          emissiveIntensity={1.6}
          metalness={0.9}
          roughness={0.15}
          wireframe={isWireframe}
        />
      </mesh>
    </group>
  );
}

export default RefractiveCoreOrb;
