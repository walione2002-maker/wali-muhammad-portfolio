'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { graphicsManager } from '@/lib/graphics/quality';

/**
 * Exp 02: Spatial Interface Architecture
 * Exploded architectural isometric view of a modern full-stack web application.
 * 4 structural strata: Database, Services, State, and Viewport Presentation.
 */
export function Exp02SpatialSystem() {
  const mode = usePortfolioStore((s) => s.experimentModes['02-spatial-system'] || 'assembled');
  const groupRef = useRef<THREE.Group>(null);

  // References for layered strata
  const p0 = useRef<THREE.Mesh>(null);
  const p1 = useRef<THREE.Mesh>(null);
  const p2 = useRef<THREE.Mesh>(null);
  const p3 = useRef<THREE.Mesh>(null);
  const rails = useRef<THREE.Group>(null);
  const conduitRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    graphicsManager.reportFrameDelta(delta);
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.1);
    const time = state.clock.getElapsedTime();

    // Subtle pointer parallax tilt
    groupRef.current.rotation.y += 0.12 * dt;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      state.pointer.y * 0.22 + 0.38,
      dt * 3.0
    );

    // Target Z-depth separations based on mode
    let sep = 0.52; // assembled
    if (mode === 'deconstructed') sep = 1.45;
    if (mode === 'planar') sep = 0.04;

    if (p0.current) p0.current.position.z = THREE.MathUtils.lerp(p0.current.position.z, -sep * 1.5, dt * 4.5);
    if (p1.current) p1.current.position.z = THREE.MathUtils.lerp(p1.current.position.z, -sep * 0.5, dt * 4.5);
    if (p2.current) p2.current.position.z = THREE.MathUtils.lerp(p2.current.position.z, sep * 0.5, dt * 4.5);
    if (p3.current) p3.current.position.z = THREE.MathUtils.lerp(p3.current.position.z, sep * 1.5, dt * 4.5);

    if (rails.current) {
      rails.current.scale.z = THREE.MathUtils.lerp(rails.current.scale.z, mode === 'planar' ? 0.04 : 1.0, dt * 4.5);
    }
    if (conduitRef.current) {
      conduitRef.current.rotation.z = Math.sin(time * 0.8) * 0.05;
    }
  });

  // Physically based materials
  const matDatabase = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0D0D0D',
        metalness: 0.94,
        roughness: 0.2,
        emissive: '#181818',
        emissiveIntensity: 0.4,
      }),
    []
  );

  const matServices = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#161616',
        metalness: 0.88,
        roughness: 0.22,
        emissive: '#FF4D00',
        emissiveIntensity: 0.25,
      }),
    []
  );

  const matState = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#202020',
        metalness: 0.8,
        roughness: 0.15,
        wireframe: mode === 'deconstructed',
        emissive: '#E8E4DE',
        emissiveIntensity: 0.35,
      }),
    [mode]
  );

  const matViewport = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#FFFFFF',
        transmission: 0.92,
        roughness: 0.06,
        thickness: 1.4,
        ior: 1.48,
        transparent: true,
        opacity: 0.88,
        emissive: '#FF4D00',
        emissiveIntensity: 0.15,
        clearcoat: 1.0,
      }),
    []
  );

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Ground Contact Shadow */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.8, 3.8]} />
        <meshBasicMaterial color="#050505" transparent opacity={0.4} />
      </mesh>

      {/* Strata 0: Foundation / Database Tier */}
      <mesh ref={p0} position={[0, -0.6, -0.78]} material={matDatabase}>
        <boxGeometry args={[3.6, 2.2, 0.06]} />
      </mesh>

      {/* Strata 1: Backend Services & API Gateway */}
      <mesh ref={p1} position={[0, -0.2, -0.26]} material={matServices}>
        <boxGeometry args={[3.2, 1.8, 0.05]} />
      </mesh>

      {/* Strata 2: Component Architecture & State Tier */}
      <mesh ref={p2} position={[0, 0.2, 0.26]} material={matState}>
        <boxGeometry args={[2.8, 1.6, 0.04]} />
      </mesh>

      {/* Strata 3: UI Viewport & Client Presentation Tier */}
      <mesh ref={p3} position={[0, 0.6, 0.78]} material={matViewport}>
        <boxGeometry args={[2.4, 1.4, 0.03]} />
      </mesh>

      {/* Precision Structural Vertical Connecting Rails */}
      <group ref={rails}>
        {[
          [-1.55, -0.95],
          [1.55, -0.95],
          [-1.55, 0.95],
          [1.55, 0.95],
        ].map(([x, y], i) => (
          <group key={i} position={[x, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[0.022, 0.022, 3.6, 12]} />
              <meshStandardMaterial
                color="#FF4D00"
                emissive="#FF4D00"
                emissiveIntensity={0.9}
                metalness={0.9}
              />
            </mesh>
            {/* Top and Bottom Beveled Collar Bushings */}
            <mesh position={[0, 1.7, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.08, 16]} />
              <meshStandardMaterial color="#E8E4DE" metalness={0.95} roughness={0.1} />
            </mesh>
            <mesh position={[0, -1.7, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.08, 16]} />
              <meshStandardMaterial color="#E8E4DE" metalness={0.95} roughness={0.1} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Optical Vertical Data Conduits */}
      <group ref={conduitRef}>
        {[
          [-0.6, 0],
          [0.6, 0],
        ].map(([x, y], idx) => (
          <mesh key={idx} position={[x, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 2.8, 8]} />
            <meshBasicMaterial color="#38BDF8" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default Exp02SpatialSystem;