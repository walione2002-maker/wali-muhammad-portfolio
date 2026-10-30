'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function Exp02SpatialSystem() {
  const mode = usePortfolioStore((s) => s.experimentModes['02-spatial-system'] || 'assembled');
  const groupRef = useRef<THREE.Group>(null);

  // References for layered planes
  const p0 = useRef<THREE.Mesh>(null);
  const p1 = useRef<THREE.Mesh>(null);
  const p2 = useRef<THREE.Mesh>(null);
  const p3 = useRef<THREE.Mesh>(null);
  const rails = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.1);

    // Dynamic rotation & pointer responsiveness
    groupRef.current.rotation.y += 0.12 * dt;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      state.pointer.y * 0.25 + 0.35,
      dt * 3.0
    );

    // Target Z-depth separations based on mode
    let sep = 0.5; // assembled
    if (mode === 'deconstructed') sep = 1.35;
    if (mode === 'planar') sep = 0.05;

    if (p0.current) p0.current.position.z = THREE.MathUtils.lerp(p0.current.position.z, -sep * 1.5, dt * 4);
    if (p1.current) p1.current.position.z = THREE.MathUtils.lerp(p1.current.position.z, -sep * 0.5, dt * 4);
    if (p2.current) p2.current.position.z = THREE.MathUtils.lerp(p2.current.position.z, sep * 0.5, dt * 4);
    if (p3.current) p3.current.position.z = THREE.MathUtils.lerp(p3.current.position.z, sep * 1.5, dt * 4);

    if (rails.current) {
      rails.current.scale.z = THREE.MathUtils.lerp(rails.current.scale.z, mode === 'planar' ? 0.05 : 1.0, dt * 4);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Plane 0: Foundation / Database Tier */}
      <mesh ref={p0} position={[0, -0.6, -0.75]}>
        <boxGeometry args={[3.6, 2.2, 0.04]} />
        <meshStandardMaterial
          color="#0F0F0F"
          metalness={0.92}
          roughness={0.15}
          emissive="#1E1E1E"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Plane 1: Backend Services & API Tier */}
      <mesh ref={p1} position={[0, -0.2, -0.25]}>
        <boxGeometry args={[3.2, 1.8, 0.04]} />
        <meshStandardMaterial
          color="#161616"
          metalness={0.85}
          roughness={0.2}
          emissive="#FF4D00"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Plane 2: Component Architecture & State Tier */}
      <mesh ref={p2} position={[0, 0.2, 0.25]}>
        <boxGeometry args={[2.8, 1.6, 0.03]} />
        <meshStandardMaterial
          color="#1A1A1A"
          wireframe={mode === 'deconstructed'}
          emissive="#E8E4DE"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Plane 3: UI Viewport & Client Presentation Tier */}
      <mesh ref={p3} position={[0, 0.6, 0.75]}>
        <boxGeometry args={[2.4, 1.4, 0.02]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.92}
          roughness={0.08}
          thickness={1.5}
          ior={1.45}
          transparent
          opacity={0.88}
          emissive="#FF4D00"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Vertical Structural Connecting Rails */}
      <group ref={rails}>
        {[
          [-1.5, -1.0],
          [1.5, -1.0],
          [-1.5, 1.0],
          [1.5, 1.0],
        ].map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 3.8, 12]} />
            <meshStandardMaterial color="#FF4D00" emissive="#FF4D00" emissiveIntensity={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default Exp02SpatialSystem;
