'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { PROJECTS } from '@/data/projects';

function LabGeometry() {
  const labMode = usePortfolioStore((s) => s.labMode);
  const coreRef = useRef<THREE.Mesh>(null);
  const innerNucleusRef = useRef<THREE.Mesh>(null);
  const ring0Ref = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const speedMult = labMode === 'kinetic' ? 2.2 : 1.0;

    if (coreRef.current) {
      coreRef.current.rotation.y += 0.25 * speedMult * dt;
      coreRef.current.rotation.x += 0.12 * speedMult * dt;
    }
    if (innerNucleusRef.current) {
      innerNucleusRef.current.rotation.y -= 0.6 * speedMult * dt;
      innerNucleusRef.current.rotation.z += 0.35 * speedMult * dt;
    }
    if (ring0Ref.current) {
      ring0Ref.current.rotation.x += 0.3 * speedMult * dt;
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
    if (nodesGroupRef.current) {
      nodesGroupRef.current.rotation.y += 0.15 * speedMult * dt;
    }
  });

  const isWireframe = labMode === 'wireframe';

  return (
    <group position={[0, 0, 0]}>
      {/* Central Core Shell */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.0, 3]} />
        {labMode === 'refraction' ? (
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.96}
            roughness={0.06}
            thickness={2.0}
            ior={1.5}
            emissive="#FF4D00"
            emissiveIntensity={0.3}
            transparent
            opacity={0.92}
          />
        ) : (
          <meshStandardMaterial
            color="#E8E4DE"
            wireframe={isWireframe}
            metalness={0.8}
            roughness={0.2}
            emissive={isWireframe ? '#FF4D00' : '#38BDF8'}
            emissiveIntensity={isWireframe ? 0.8 : 0.4}
          />
        )}
      </mesh>

      {/* Internal Quantum Nucleus */}
      <mesh ref={innerNucleusRef}>
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color="#FF4D00"
          emissive="#FF4D00"
          emissiveIntensity={2.2}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Outer Gyroscopic Ring */}
      <mesh ref={ring0Ref}>
        <torusGeometry args={[2.8, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#E8E4DE"
          metalness={0.95}
          roughness={0.15}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Middle Gyroscopic Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.04, 16, 90]} />
        <meshStandardMaterial
          color="#9CA3AF"
          metalness={0.92}
          roughness={0.18}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Inner Gyroscopic Ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.6, 0.035, 16, 80]} />
        <meshStandardMaterial
          color="#FF4D00"
          emissive="#FF4D00"
          emissiveIntensity={0.5}
          metalness={0.96}
          roughness={0.1}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Orbital Project Satellites */}
      <group ref={nodesGroupRef}>
        {PROJECTS.map((p) => {
          const x = Math.cos(p.orbitalAngle) * 3.6;
          const z = Math.sin(p.orbitalAngle) * 3.6;
          return (
            <mesh key={p.id} position={[x, 0, z]}>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial
                color={p.accentColor}
                emissive={p.accentColor}
                emissiveIntensity={labMode === 'kinetic' ? 2.5 : 1.2}
                wireframe={isWireframe}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export function LabCanvas() {
  return (
    <Canvas
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        alpha: true,
      }}
      dpr={[1, 1.5]}
      camera={{ fov: 45, position: [0, 1.2, 8] }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 12, 8]} intensity={1.5} />
      <directionalLight position={[-10, -5, -8]} intensity={0.6} color="#FF4D00" />
      <pointLight position={[0, 0, 0]} intensity={1.0} color="#FF4D00" />

      <LabGeometry />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        rotateSpeed={0.8}
        dampingFactor={0.05}
      />
    </Canvas>
  );
}

export default LabCanvas;
