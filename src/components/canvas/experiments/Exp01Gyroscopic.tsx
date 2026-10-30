'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { PROJECTS } from '@/data/projects';
import { graphicsManager } from '@/lib/graphics/quality';

/**
 * Flagship Real-Time Gyroscopic Material & Gimbal Study
 * Precision dual-gimbal assembly, physical transmission crystal optics,
 * and orbital satellite telemetry.
 */
export function Exp01Gyroscopic() {
  const mode = usePortfolioStore((s) => s.experimentModes['01-gyroscopic'] || 'refraction');
  const coreRef = useRef<THREE.Mesh>(null);
  const nucleusRef = useRef<THREE.Mesh>(null);
  const ring0Ref = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const orbitalGroupRef = useRef<THREE.Group>(null);

  // Scratch objects for zero-allocation frame loop
  const speedMult = mode === 'kinetic' ? 2.6 : 1.0;

  useFrame((state, delta) => {
    graphicsManager.reportFrameDelta(delta);
    const dt = Math.min(delta, 0.1);
    const time = state.clock.getElapsedTime();

    // Harmonic multi-axis counter-rotations
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.22 * speedMult * dt;
      coreRef.current.rotation.x += 0.12 * speedMult * dt;
    }
    if (nucleusRef.current) {
      nucleusRef.current.rotation.y -= 0.55 * speedMult * dt;
      nucleusRef.current.rotation.z += 0.35 * speedMult * dt;
      // Quantum pulse
      const pulse = 1.8 + Math.sin(time * 3.5) * 0.4;
      if (nucleusRef.current.material instanceof THREE.MeshStandardMaterial) {
        nucleusRef.current.material.emissiveIntensity = pulse;
      }
    }
    if (ring0Ref.current) {
      ring0Ref.current.rotation.x += 0.28 * speedMult * dt;
      ring0Ref.current.rotation.y += 0.08 * speedMult * dt;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y += 0.22 * speedMult * dt;
      ring1Ref.current.rotation.z += 0.12 * speedMult * dt;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z += 0.18 * speedMult * dt;
      ring2Ref.current.rotation.x += 0.09 * speedMult * dt;
    }
    if (orbitalGroupRef.current) {
      orbitalGroupRef.current.rotation.y += 0.14 * speedMult * dt;
    }
  });

  const isWireframe = mode === 'wireframe';

  // Precision Physical Transmission Material for Refraction Mode
  const crystalMaterial = useMemo(() => {
    if (mode === 'refraction') {
      return new THREE.MeshPhysicalMaterial({
        color: '#FFFFFF',
        transmission: 0.95,
        roughness: 0.04,
        thickness: 2.4,
        ior: 1.54,
        reflectivity: 0.8,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        transparent: true,
        opacity: 0.96,
        emissive: '#FF4D00',
        emissiveIntensity: 0.25,
      });
    }
    return new THREE.MeshStandardMaterial({
      color: '#E8E4DE',
      metalness: 0.92,
      roughness: 0.18,
      wireframe: isWireframe,
      emissive: isWireframe ? '#FF4D00' : '#141414',
      emissiveIntensity: isWireframe ? 0.9 : 0.2,
    });
  }, [mode, isWireframe]);

  const ringMaterialTitanium = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#E8E4DE',
        metalness: 0.95,
        roughness: 0.16,
        wireframe: isWireframe,
      }),
    [isWireframe]
  );

  const ringMaterialGunmetal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#888888',
        metalness: 0.92,
        roughness: 0.2,
        wireframe: isWireframe,
      }),
    [isWireframe]
  );

  const ringMaterialOrange = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#FF4D00',
        emissive: '#FF4D00',
        emissiveIntensity: 0.7,
        metalness: 0.85,
        roughness: 0.22,
        wireframe: isWireframe,
      }),
    [isWireframe]
  );

  return (
    <group position={[0, 0, 0]}>
      {/* Subtle Ground Contact Grid Shadow Ring */}
      <mesh position={[0, -2.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 3.8, 48]} />
        <meshBasicMaterial color="#0A0A0A" transparent opacity={0.4} />
      </mesh>

      {/* Flagship Central Optical Refractive Core */}
      <mesh ref={coreRef} material={crystalMaterial}>
        <icosahedronGeometry args={[1.1, 3]} />
      </mesh>

      {/* Internal Quantum Nucleus */}
      <mesh ref={nucleusRef}>
        <octahedronGeometry args={[0.48, 0]} />
        <meshStandardMaterial
          color="#FF4D00"
          emissive="#FF4D00"
          emissiveIntensity={2.2}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Outer Gyroscopic Beveled Gimbal Ring */}
      <group ref={ring0Ref}>
        <mesh material={ringMaterialTitanium}>
          <torusGeometry args={[2.85, 0.052, 16, 120]} />
        </mesh>
        {/* Ring Index Pin */}
        <mesh position={[2.85, 0, 0]}>
          <boxGeometry args={[0.08, 0.14, 0.08]} />
          <meshStandardMaterial color="#FF4D00" emissive="#FF4D00" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* Middle Gyroscopic Beveled Gimbal Ring */}
      <group ref={ring1Ref}>
        <mesh material={ringMaterialGunmetal}>
          <torusGeometry args={[2.25, 0.046, 16, 100]} />
        </mesh>
      </group>

      {/* Inner Gyroscopic Beveled Gimbal Ring */}
      <group ref={ring2Ref}>
        <mesh material={ringMaterialOrange}>
          <torusGeometry args={[1.68, 0.042, 16, 90]} />
        </mesh>
      </group>

      {/* Orbital Project Satellites with Telemetry Traces */}
      <group ref={orbitalGroupRef}>
        {/* Orbital Track Guide Line */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.64, 3.66, 64]} />
          <meshBasicMaterial color="#333333" transparent opacity={0.35} />
        </mesh>

        {PROJECTS.map((p) => {
          const x = Math.cos(p.orbitalAngle) * 3.65;
          const z = Math.sin(p.orbitalAngle) * 3.65;
          return (
            <group key={p.id} position={[x, 0, z]}>
              <mesh>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshStandardMaterial
                  color={p.accentColor}
                  emissive={p.accentColor}
                  emissiveIntensity={mode === 'kinetic' ? 2.8 : 1.4}
                  metalness={0.9}
                  roughness={0.15}
                  wireframe={isWireframe}
                />
              </mesh>
              {/* Vertical Grounding Indicator Line */}
              <mesh position={[0, -0.6, 0]}>
                <cylinderGeometry args={[0.008, 0.008, 1.2, 8]} />
                <meshBasicMaterial color={p.accentColor} transparent opacity={0.3} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

export default Exp01Gyroscopic;