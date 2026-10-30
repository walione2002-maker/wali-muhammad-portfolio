'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function InstrumentAssembly() {
  const groupRef = useRef<THREE.Group>(null);
  const plane1Ref = useRef<THREE.Mesh>(null);
  const plane2Ref = useRef<THREE.Mesh>(null);
  const plane3Ref = useRef<THREE.Mesh>(null);
  const railRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.1);

    // Subtle pointer parallax tilt
    const targetRotX = state.pointer.y * 0.25;
    const targetRotY = state.pointer.x * 0.35;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, dt * 3.5);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, dt * 3.5);

    // Architectural slow breathing float
    const time = state.clock.getElapsedTime();
    if (plane1Ref.current) plane1Ref.current.position.y = Math.sin(time * 0.8) * 0.08 + 0.4;
    if (plane2Ref.current) plane2Ref.current.position.y = Math.sin(time * 0.8 + 1.2) * 0.06 - 0.2;
    if (plane3Ref.current) plane3Ref.current.position.z = Math.cos(time * 0.6) * 0.08 - 0.3;
    if (railRef.current) railRef.current.rotation.z = Math.sin(time * 0.4) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Primary Structural Frame */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3.2, 2.2, 0.6)]} />
        <lineBasicMaterial color="#333333" linewidth={1} />
      </lineSegments>

      {/* Layer 01: Core Architecture Plane */}
      <mesh ref={plane1Ref} position={[0, 0.4, 0.2]}>
        <boxGeometry args={[2.4, 1.2, 0.04]} />
        <meshStandardMaterial
          color="#161616"
          metalness={0.85}
          roughness={0.2}
          emissive="#FF4D00"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Layer 02: Interface Grid Plane */}
      <mesh ref={plane2Ref} position={[0.4, -0.2, 0.4]}>
        <planeGeometry args={[2.0, 1.0]} />
        <meshBasicMaterial
          color="#E8E4DE"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Layer 03: Data Depth Plane */}
      <mesh ref={plane3Ref} position={[-0.3, -0.1, -0.3]}>
        <boxGeometry args={[1.8, 1.4, 0.02]} />
        <meshStandardMaterial
          color="#0F0F0F"
          metalness={0.9}
          roughness={0.1}
          emissive="#10B981"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* Coordinate Rails & System Nodes */}
      <group ref={railRef}>
        {/* Horizontal Guide Axis */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 3.8, 16]} />
          <meshBasicMaterial color="#FF4D00" transparent opacity={0.6} />
        </mesh>

        {/* System Alignment Nodes */}
        {[-1.4, -0.5, 0.5, 1.4].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <octahedronGeometry args={[0.08, 0]} />
            <meshStandardMaterial
              color={i === 2 ? '#FF4D00' : '#E8E4DE'}
              emissive={i === 2 ? '#FF4D00' : '#E8E4DE'}
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function HeroInstrument() {
  return (
    <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] flex items-center justify-center">
      {/* Background Frame Accent */}
      <div className="absolute inset-0 border border-[#1A1A1A] bg-[#0A0A0A]/40 pointer-events-none" />
      <div className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest text-[#555555] pointer-events-none">
        Fig. 01 — Digital Systems Instrument
      </div>
      <div className="absolute bottom-3 right-3 text-[10px] font-mono uppercase tracking-widest text-[#555555] pointer-events-none">
        Real-time Vector Assembly
      </div>

      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.8], fov: 42 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 8, 5]} intensity={1.4} />
        <directionalLight position={[-6, -4, -4]} intensity={0.5} color="#FF4D00" />
        <InstrumentAssembly />
      </Canvas>
    </div>
  );
}

export default HeroInstrument;
