'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';

interface ModuleConfig {
  id: string;
  targetPos: [number, number, number];
  targetScale: [number, number, number];
  color: string;
  wireframe?: boolean;
}

export function Exp05LayoutEngine() {
  const mode = usePortfolioStore((s) => s.experimentModes['05-layout-engine'] || 'balanced');
  const groupRef = useRef<THREE.Group>(null);
  const mRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Compute dynamic layouts per mode
  const getLayout = (): ModuleConfig[] => {
    if (mode === 'dense') {
      return [
        { id: 'm1', targetPos: [-1.2, 1.0, 0], targetScale: [1.1, 0.7, 0.1], color: '#E8E4DE' },
        { id: 'm2', targetPos: [0.0, 1.0, 0], targetScale: [1.1, 0.7, 0.1], color: '#FF4D00' },
        { id: 'm3', targetPos: [1.2, 1.0, 0], targetScale: [1.1, 0.7, 0.1], color: '#161616' },
        { id: 'm4', targetPos: [-1.2, -0.2, 0], targetScale: [1.1, 1.2, 0.1], color: '#1A1A1A' },
        { id: 'm5', targetPos: [0.0, -0.2, 0], targetScale: [1.1, 1.2, 0.1], color: '#222222' },
        { id: 'm6', targetPos: [1.2, -0.2, 0], targetScale: [1.1, 1.2, 0.1], color: '#E8E4DE', wireframe: true },
      ];
    } else if (mode === 'minimal') {
      return [
        { id: 'm1', targetPos: [0, 1.1, 0], targetScale: [2.8, 0.5, 0.1], color: '#E8E4DE' },
        { id: 'm2', targetPos: [0, 0.1, 0], targetScale: [2.8, 1.2, 0.1], color: '#FF4D00' },
        { id: 'm3', targetPos: [0, -1.0, 0], targetScale: [2.8, 0.6, 0.1], color: '#161616' },
        { id: 'm4', targetPos: [0, 0, -2], targetScale: [0.1, 0.1, 0.1], color: '#111111' },
        { id: 'm5', targetPos: [0, 0, -2], targetScale: [0.1, 0.1, 0.1], color: '#111111' },
        { id: 'm6', targetPos: [0, 0, -2], targetScale: [0.1, 0.1, 0.1], color: '#111111' },
      ];
    } else {
      // Balanced Golden-Ratio Grid
      return [
        { id: 'm1', targetPos: [0, 1.2, 0], targetScale: [3.4, 0.45, 0.1], color: '#E8E4DE' },
        { id: 'm2', targetPos: [-0.85, 0.2, 0.1], targetScale: [1.6, 1.3, 0.1], color: '#FF4D00' },
        { id: 'm3', targetPos: [0.95, 0.5, -0.05], targetScale: [1.5, 0.7, 0.1], color: '#161616' },
        { id: 'm4', targetPos: [0.95, -0.25, 0], targetScale: [1.5, 0.6, 0.1], color: '#222222' },
        { id: 'm5', targetPos: [-0.85, -0.9, 0], targetScale: [1.6, 0.6, 0.1], color: '#1A1A1A' },
        { id: 'm6', targetPos: [0.95, -0.9, 0], targetScale: [1.5, 0.5, 0.1], color: '#E8E4DE', wireframe: true },
      ];
    }
  };

  const layout = getLayout();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.1);

    // Subtle pointer tilt
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.25,
      dt * 3
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.2,
      dt * 3
    );

    // Morph module positions and scales
    layout.forEach((config, i) => {
      const mesh = mRefs.current[i];
      if (mesh) {
        mesh.position.lerp(new THREE.Vector3(...config.targetPos), dt * 5.0);
        mesh.scale.lerp(new THREE.Vector3(...config.targetScale), dt * 5.0);
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {layout.map((config, i) => (
        <mesh
          key={config.id}
          ref={(el) => {
            mRefs.current[i] = el;
          }}
          position={config.targetPos}
          scale={config.targetScale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={config.color}
            wireframe={config.wireframe}
            metalness={0.85}
            roughness={0.2}
            emissive={config.color === '#FF4D00' ? '#FF4D00' : '#080808'}
            emissiveIntensity={config.color === '#FF4D00' ? 0.6 : 0.1}
          />
        </mesh>
      ))}

      {/* Structural Wireframe Bounding Box */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(4.0, 3.2, 0.4)]} />
        <lineBasicMaterial color="#222222" />
      </lineSegments>
    </group>
  );
}

export default Exp05LayoutEngine;
