'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { graphicsManager } from '@/lib/graphics/quality';

interface ModuleConfig {
  id: string;
  targetPos: [number, number, number];
  targetScale: [number, number, number];
  color: string;
  emissive?: string;
  wireframe?: boolean;
}

export function Exp05LayoutEngine() {
  const mode = usePortfolioStore((s) => s.experimentModes['05-layout-engine'] || 'balanced');
  const groupRef = useRef<THREE.Group>(null);
  const mRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Compute dynamic layouts per mode
  const layout = useMemo((): ModuleConfig[] => {
    if (mode === 'dense') {
      return [
        { id: 'm1', targetPos: [-1.25, 0.95, 0], targetScale: [1.1, 0.75, 0.08], color: '#E8E4DE' },
        { id: 'm2', targetPos: [0.0, 0.95, 0], targetScale: [1.1, 0.75, 0.08], color: '#FF4D00', emissive: '#FF4D00' },
        { id: 'm3', targetPos: [1.25, 0.95, 0], targetScale: [1.1, 0.75, 0.08], color: '#161616' },
        { id: 'm4', targetPos: [-1.25, -0.25, 0], targetScale: [1.1, 1.25, 0.08], color: '#1A1A1A' },
        { id: 'm5', targetPos: [0.0, -0.25, 0], targetScale: [1.1, 1.25, 0.08], color: '#222222' },
        { id: 'm6', targetPos: [1.25, -0.25, 0], targetScale: [1.1, 1.25, 0.08], color: '#E8E4DE', wireframe: true },
      ];
    } else if (mode === 'minimal') {
      return [
        { id: 'm1', targetPos: [0, 1.15, 0], targetScale: [3.0, 0.55, 0.08], color: '#E8E4DE' },
        { id: 'm2', targetPos: [0, 0.1, 0], targetScale: [3.0, 1.25, 0.08], color: '#FF4D00', emissive: '#FF4D00' },
        { id: 'm3', targetPos: [0, -1.05, 0], targetScale: [3.0, 0.65, 0.08], color: '#161616' },
        { id: 'm4', targetPos: [0, 0, -2], targetScale: [0.01, 0.01, 0.01], color: '#111111' },
        { id: 'm5', targetPos: [0, 0, -2], targetScale: [0.01, 0.01, 0.01], color: '#111111' },
        { id: 'm6', targetPos: [0, 0, -2], targetScale: [0.01, 0.01, 0.01], color: '#111111' },
      ];
    } else {
      // Balanced Golden-Ratio Editorial Grid
      return [
        { id: 'm1', targetPos: [0, 1.22, 0], targetScale: [3.5, 0.48, 0.08], color: '#E8E4DE' },
        { id: 'm2', targetPos: [-0.9, 0.22, 0.08], targetScale: [1.65, 1.35, 0.08], color: '#FF4D00', emissive: '#FF4D00' },
        { id: 'm3', targetPos: [0.95, 0.55, -0.04], targetScale: [1.55, 0.72, 0.08], color: '#161616' },
        { id: 'm4', targetPos: [0.95, -0.25, 0], targetScale: [1.55, 0.65, 0.08], color: '#222222' },
        { id: 'm5', targetPos: [-0.9, -0.92, 0], targetScale: [1.65, 0.65, 0.08], color: '#1A1A1A' },
        { id: 'm6', targetPos: [0.95, -0.92, 0], targetScale: [1.55, 0.52, 0.08], color: '#E8E4DE', wireframe: true },
      ];
    }
  }, [mode]);

  useFrame((state, delta) => {
    graphicsManager.reportFrameDelta(delta);
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.1);

    // Responsive pointer tilt
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.22,
      dt * 3.5
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.18,
      dt * 3.5
    );

    // Smooth physics interpolation for cards
    layout.forEach((config, i) => {
      const mesh = mRefs.current[i];
      if (mesh) {
        mesh.position.lerp(new THREE.Vector3(...config.targetPos), dt * 5.5);
        mesh.scale.lerp(new THREE.Vector3(...config.targetScale), dt * 5.5);
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Structural Wireframe Bounding Caliper Frame */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(4.2, 3.3, 0.5)]} />
        <lineBasicMaterial color="#222222" transparent opacity={0.6} />
      </lineSegments>

      {/* Dynamic Modular Spatial Cards */}
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
            metalness={0.88}
            roughness={0.18}
            emissive={config.emissive || (config.color === '#FF4D00' ? '#FF4D00' : '#080808')}
            emissiveIntensity={config.emissive ? 0.9 : 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

export default Exp05LayoutEngine;