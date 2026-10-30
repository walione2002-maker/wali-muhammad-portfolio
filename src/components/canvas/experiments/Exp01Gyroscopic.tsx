'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { PROJECTS } from '@/data/projects';

export function Exp01Gyroscopic() {
  const mode = usePortfolioStore((s) => s.experimentModes['01-gyroscopic'] || 'refraction');
  const coreRef = useRef<THREE.Mesh>(null);
  const nucleusRef = useRef<THREE.Mesh>(null);
  const ring0Ref = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const speedMult = mode === 'kinetic' ? 2.4 : 1.0;

    if (coreRef.current) {
      coreRef.current.rotation.y += 0.28 * speedMult * dt;
      coreRef.current.rotation.x += 0.14 * speedMult * dt;
    }
    if (nucleusRef.current) {
      nucleusRef.current.rotation.y -= 0.65 * speedMult * dt;
      nucleusRef.current.rotation.z += 0.4 * speedMult * dt;
    }
    if (ring0Ref.current) {
      ring0Ref.current.rotation.x += 0.35 * speedMult * dt;
      ring0Ref.current.rotation.y += 0.09 * speedMult * dt;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y += 0.24 * speedMult * dt;
      ring1Ref.current.rotation.z += 0.14 * speedMult * dt;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z += 0.2 * speedMult * dt;
      ring2Ref.current.rotation.x += 0.1 * speedMult * dt;
    }
    if (nodesGroupRef.current) {
      nodesGroupRef.current.rotation.y += 0.18 * speedMult * dt;
    }
  });

  const isWireframe = mode === 'wireframe';

  return (
    <group position={[0, 0, 0]}>
      {/* Central Core Shell */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.05, 3]} />
        {mode === 'refraction' ? (
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.97}
            roughness={0.04}
            thickness={2.2}
            ior={1.52}
            emissive="#FF4D00"
            emissiveIntensity={0.35}
            transparent
            opacity={0.94}
          />
        ) : (
          <meshStandardMaterial
            color="#E8E4DE"
            wireframe={isWireframe}
            metalness={0.88}
            roughness={0.16}
            emissive={isWireframe ? '#FF4D00' : '#E8E4DE'}
            emissiveIntensity={isWireframe ? 0.9 : 0.4}
          />
        )}
      </mesh>

      {/* Internal Quantum Nucleus */}
      <mesh ref={nucleusRef}>
        <octahedronGeometry args={[0.48, 0]} />
        <meshStandardMaterial
          color="#FF4D00"
          emissive="#FF4D00"
          emissiveIntensity={2.4}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Outer Gyroscopic Ring */}
      <mesh ref={ring0Ref}>
        <torusGeometry args={[2.85, 0.045, 16, 120]} />
        <meshStandardMaterial
          color="#E8E4DE"
          metalness={0.96}
          roughness={0.12}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Middle Gyroscopic Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.25, 0.042, 16, 100]} />
        <meshStandardMaterial
          color="#A8A8A8"
          metalness={0.94}
          roughness={0.15}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Inner Gyroscopic Ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.65, 0.038, 16, 90]} />
        <meshStandardMaterial
          color="#FF4D00"
          emissive="#FF4D00"
          emissiveIntensity={0.6}
          metalness={0.98}
          roughness={0.1}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Orbital Project Satellites */}
      <group ref={nodesGroupRef}>
        {PROJECTS.map((p) => {
          const x = Math.cos(p.orbitalAngle) * 3.65;
          const z = Math.sin(p.orbitalAngle) * 3.65;
          return (
            <mesh key={p.id} position={[x, 0, z]}>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial
                color={p.accentColor}
                emissive={p.accentColor}
                emissiveIntensity={mode === 'kinetic' ? 2.8 : 1.4}
                wireframe={isWireframe}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export default Exp01Gyroscopic;
