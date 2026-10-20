'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PROJECTS } from '@/data/projects';
import { usePortfolioStore } from '@/store/usePortfolioStore';

// Module-scoped reusable math objects to ensure strictly 0 allocations inside useFrame
const _tempScale = new THREE.Vector3();

interface SingleNodeProps {
  id: string;
  angle: number;
  radius: number;
  accentColor: string;
}

function SingleNode({ id, angle, radius, accentColor }: SingleNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const haloMatRef = useRef<THREE.MeshBasicMaterial>(null);

  const activeProjectId = usePortfolioStore((s) => s.activeProjectId);
  const isMobile = usePortfolioStore((s) => s.isMobile);

  const isActive = activeProjectId === id;
  const initialX = Math.cos(angle) * radius;
  const initialZ = Math.sin(angle) * radius;

  useFrame((_, delta) => {
    if (!meshRef.current || !matRef.current) return;
    const dt = Math.min(delta, 0.1);

    // Target scale: 1.65 when active/hovered, 1.0 default
    const targetScale = isActive ? 1.65 : 1.0;
    _tempScale.set(targetScale, targetScale, targetScale);
    meshRef.current.scale.lerp(_tempScale, dt * 10);

    // Target emissive intensity
    const targetEmissive = isActive ? 2.4 : 0.45;

    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      matRef.current.emissiveIntensity,
      targetEmissive,
      dt * 8
    );

    // Halo pulse animation when active
    if (haloRef.current && haloMatRef.current) {
      const haloTargetScale = isActive ? 1.8 : 0.01;
      _tempScale.set(haloTargetScale, haloTargetScale, haloTargetScale);
      haloRef.current.scale.lerp(_tempScale, dt * 8);

      haloMatRef.current.opacity = THREE.MathUtils.lerp(
        haloMatRef.current.opacity,
        isActive ? 0.6 : 0,
        dt * 8
      );
    }
  });

  return (
    <group position={[initialX, 0, initialZ]} name={`node-group-${id}`}>
      {/* Central Satellite Sphere */}
      <mesh ref={meshRef} name={`node-${id}`}>
        <sphereGeometry args={[0.18, isMobile ? 12 : 24, isMobile ? 12 : 24]} />
        <meshStandardMaterial
          ref={matRef}
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Hover Glow Halo */}
      <mesh ref={haloRef} rotation={[-Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
        <ringGeometry args={[0.22, 0.36, isMobile ? 16 : 32]} />
        <meshBasicMaterial
          ref={haloMatRef}
          color={accentColor}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export function ProjectNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const isMobile = usePortfolioStore((s) => s.isMobile);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.1);
    groupRef.current.rotation.y += 0.05 * dt;
  });

  return (
    <group ref={groupRef} name="project-nodes-orbital-ring">
      {/* Subtle Orbital Plane Guide Track */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.5, 0.008, 8, isMobile ? 60 : 140]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.12} />
      </mesh>

      {/* 8 Orbital Project Satellites */}
      {PROJECTS.map((p) => (
        <SingleNode
          key={p.id}
          id={p.id}
          angle={p.orbitalAngle}
          radius={p.orbitalRadius}
          accentColor={p.accentColor}
        />
      ))}
    </group>
  );
}

export default ProjectNodes;
