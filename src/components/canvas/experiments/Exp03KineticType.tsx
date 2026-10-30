'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { graphicsManager } from '@/lib/graphics/quality';

// Helper to generate crisp, beveled 3D letterforms
function createGlyphGeometry(char: string): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const w = 0.52, h = 0.72, t = 0.12;
  const hw = w / 2, hh = h / 2;

  if (char === 'I') {
    shape.moveTo(-t / 2, -hh);
    shape.lineTo(t / 2, -hh);
    shape.lineTo(t / 2, hh);
    shape.lineTo(-t / 2, hh);
  } else if (char === 'L') {
    shape.moveTo(-hw, hh);
    shape.lineTo(-hw + t, hh);
    shape.lineTo(-hw + t, -hh + t);
    shape.lineTo(hw, -hh + t);
    shape.lineTo(hw, -hh);
    shape.lineTo(-hw, -hh);
  } else if (char === 'T') {
    shape.moveTo(-hw, hh);
    shape.lineTo(hw, hh);
    shape.lineTo(hw, hh - t);
    shape.lineTo(t / 2, hh - t);
    shape.lineTo(t / 2, -hh);
    shape.lineTo(-t / 2, -hh);
    shape.lineTo(-t / 2, hh - t);
    shape.lineTo(-hw, hh - t);
  } else if (char === 'E') {
    shape.moveTo(-hw, hh);
    shape.lineTo(hw, hh);
    shape.lineTo(hw, hh - t);
    shape.lineTo(-hw + t, hh - t);
    shape.lineTo(-hw + t, t / 2);
    shape.lineTo(hw * 0.7, t / 2);
    shape.lineTo(hw * 0.7, -t / 2);
    shape.lineTo(-hw + t, -t / 2);
    shape.lineTo(-hw + t, -hh + t);
    shape.lineTo(hw, -hh + t);
    shape.lineTo(hw, -hh);
    shape.lineTo(-hw, -hh);
  } else if (char === 'U') {
    shape.moveTo(-hw, hh);
    shape.lineTo(-hw + t, hh);
    shape.lineTo(-hw + t, -hh + t);
    shape.lineTo(hw - t, -hh + t);
    shape.lineTo(hw - t, hh);
    shape.lineTo(hw, hh);
    shape.lineTo(hw, -hh);
    shape.lineTo(-hw, -hh);
  } else if (char === 'H') {
    shape.moveTo(-hw, hh);
    shape.lineTo(-hw + t, hh);
    shape.lineTo(-hw + t, t / 2);
    shape.lineTo(hw - t, t / 2);
    shape.lineTo(hw - t, hh);
    shape.lineTo(hw, hh);
    shape.lineTo(hw, -hh);
    shape.lineTo(hw - t, -hh);
    shape.lineTo(hw - t, -t / 2);
    shape.lineTo(-hw + t, -t / 2);
    shape.lineTo(-hw + t, -hh);
    shape.lineTo(-hw, -hh);
  } else if (char === 'N') {
    shape.moveTo(-hw, hh);
    shape.lineTo(-hw + t, hh);
    shape.lineTo(hw - t, -hh + t * 1.5);
    shape.lineTo(hw - t, hh);
    shape.lineTo(hw, hh);
    shape.lineTo(hw, -hh);
    shape.lineTo(hw - t, -hh);
    shape.lineTo(-hw + t, hh - t * 1.5);
    shape.lineTo(-hw + t, -hh);
    shape.lineTo(-hw, -hh);
  } else if (char === 'D') {
    shape.moveTo(-hw, -hh);
    shape.lineTo(hw * 0.35, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, 0);
    shape.quadraticCurveTo(hw, hh, hw * 0.35, hh);
    shape.lineTo(-hw, hh);
    const hole = new THREE.Path();
    hole.moveTo(-hw + t, -hh + t);
    hole.lineTo(hw * 0.15, -hh + t);
    hole.quadraticCurveTo(hw - t, -hh + t, hw - t, 0);
    hole.quadraticCurveTo(hw - t, hh - t, hw * 0.15, hh - t);
    hole.lineTo(-hw + t, hh - t);
    shape.holes.push(hole);
  } else if (char === 'B') {
    shape.moveTo(-hw, -hh);
    shape.lineTo(hw * 0.25, -hh);
    shape.quadraticCurveTo(hw, -hh * 0.5, hw * 0.25, 0);
    shape.quadraticCurveTo(hw, hh * 0.5, hw * 0.25, hh);
    shape.lineTo(-hw, hh);
    const hole1 = new THREE.Path();
    hole1.moveTo(-hw + t, 0.04);
    hole1.lineTo(hw * 0.15, 0.04);
    hole1.quadraticCurveTo(hw - t, hh * 0.5, hw * 0.15, hh - t);
    hole1.lineTo(-hw + t, hh - t);
    const hole2 = new THREE.Path();
    hole2.moveTo(-hw + t, -hh + t);
    hole2.lineTo(hw * 0.15, -hh + t);
    hole2.quadraticCurveTo(hw - t, -hh * 0.5, hw * 0.15, -0.04);
    hole2.lineTo(-hw + t, -0.04);
    shape.holes.push(hole1, hole2);
  } else if (char === 'W') {
    shape.moveTo(-hw, hh);
    shape.lineTo(-hw + t * 0.8, hh);
    shape.lineTo(-hw * 0.4, -hh + t);
    shape.lineTo(-t * 0.3, hh * 0.3);
    shape.lineTo(t * 0.3, hh * 0.3);
    shape.lineTo(hw * 0.4, -hh + t);
    shape.lineTo(hw - t * 0.8, hh);
    shape.lineTo(hw, hh);
    shape.lineTo(hw * 0.3, -hh);
    shape.lineTo(hw * 0.1, -hh);
    shape.lineTo(0, -hh * 0.2);
    shape.lineTo(-hw * 0.1, -hh);
    shape.lineTo(-hw * 0.3, -hh);
  }

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.14,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.02,
    bevelSegments: 2,
  });
  geo.center();
  return geo;
}

interface GlyphItem {
  char: string;
  gridPos: [number, number, number];
  index: number;
}

// "BUILD WITH INTENT" 3-row layout coordinates
const PHRASE_ITEMS: GlyphItem[] = [
  // Row 1: B U I L D (5 chars)
  { char: 'B', gridPos: [-1.44, 1.05, 0], index: 0 },
  { char: 'U', gridPos: [-0.72, 1.05, 0], index: 1 },
  { char: 'I', gridPos: [0.0, 1.05, 0], index: 2 },
  { char: 'L', gridPos: [0.72, 1.05, 0], index: 3 },
  { char: 'D', gridPos: [1.44, 1.05, 0], index: 4 },

  // Row 2: W I T H (4 chars)
  { char: 'W', gridPos: [-1.15, 0.0, 0], index: 5 },
  { char: 'I', gridPos: [-0.38, 0.0, 0], index: 6 },
  { char: 'T', gridPos: [0.38, 0.0, 0], index: 7 },
  { char: 'H', gridPos: [1.15, 0.0, 0], index: 8 },

  // Row 3: I N T E N T (6 chars)
  { char: 'I', gridPos: [-1.8, -1.05, 0], index: 9 },
  { char: 'N', gridPos: [-1.08, -1.05, 0], index: 10 },
  { char: 'T', gridPos: [-0.36, -1.05, 0], index: 11 },
  { char: 'E', gridPos: [0.36, -1.05, 0], index: 12 },
  { char: 'N', gridPos: [1.08, -1.05, 0], index: 13 },
  { char: 'T', gridPos: [1.8, -1.05, 0], index: 14 },
];

function LetterGlyph({
  item,
  mode,
  geometry,
  material,
  accentMaterial,
}: {
  item: GlyphItem;
  mode: string;
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  accentMaterial: THREE.Material;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetPos = useRef(new THREE.Vector3(...item.gridPos));
  const currentPos = useRef(new THREE.Vector3(...item.gridPos));

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const dt = Math.min(delta, 0.1);
    const time = state.clock.getElapsedTime();

    if (mode === 'velocity') {
      // Dynamic pointer proximity displacement wave
      const dx = state.pointer.x * 3.5 - item.gridPos[0];
      const dy = state.pointer.y * 2.2 - item.gridPos[1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      const push = Math.max(0, 1.8 - dist) * 0.9;

      targetPos.current.set(
        item.gridPos[0] + (dx / (dist + 0.1)) * push * 0.45,
        item.gridPos[1] + (dy / (dist + 0.1)) * push * 0.45,
        item.gridPos[2] + Math.sin(time * 3 + item.index * 0.4) * 0.15 + push
      );
    } else if (mode === 'grid') {
      // Strict architectural typographic grid
      targetPos.current.set(
        item.gridPos[0],
        item.gridPos[1],
        Math.sin(time * 1.5 + item.index * 0.2) * 0.04
      );
    } else {
      // Harmonic rhythmic wave
      targetPos.current.set(
        item.gridPos[0],
        item.gridPos[1] + Math.sin(time * 2.0 + item.index * 0.4) * 0.08,
        item.gridPos[2] + Math.cos(time * 1.8 + item.index * 0.3) * 0.06
      );
    }

    currentPos.current.lerp(targetPos.current, dt * 6.5);
    meshRef.current.position.copy(currentPos.current);

    // Responsive pointer tilt
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      state.pointer.x * 0.25,
      dt * 4.0
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -state.pointer.y * 0.2,
      dt * 4.0
    );
  });

  const isAccent = item.index === 0 || item.index === 14;

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={isAccent ? accentMaterial : material}
      position={item.gridPos}
    />
  );
}

export function Exp03KineticType() {
  const mode = usePortfolioStore((s) => s.experimentModes['03-kinetic-type'] || 'harmonic');
  const groupRef = useRef<THREE.Group>(null);

  // Pre-generate and cache geometries for the 10 unique glyphs
  const geometries = useMemo(() => {
    const map = new Map<string, THREE.BufferGeometry>();
    const chars = ['B', 'U', 'I', 'L', 'D', 'W', 'T', 'H', 'N', 'E'];
    chars.forEach((c) => {
      map.set(c, createGlyphGeometry(c));
    });
    return map;
  }, []);

  const titaniumMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#E8E4DE',
        metalness: 0.92,
        roughness: 0.16,
        emissive: '#111111',
        emissiveIntensity: 0.2,
      }),
    []
  );

  const orangeAccentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#FF4D00',
        metalness: 0.85,
        roughness: 0.2,
        emissive: '#FF4D00',
        emissiveIntensity: 1.2,
      }),
    []
  );

  useFrame((state, delta) => {
    graphicsManager.reportFrameDelta(delta);
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.1);
    // Subtle overall stage rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.18,
      dt * 2.5
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Grid Mode Typographic Baseline & Guide Lines */}
      {mode === 'grid' && (
        <group position={[0, 0, -0.15]}>
          {[1.05, 0.0, -1.05].map((y, idx) => (
            <mesh key={idx} position={[0, y - 0.42, 0]}>
              <boxGeometry args={[4.4, 0.015, 0.01]} />
              <meshBasicMaterial color="#FF4D00" transparent opacity={0.4} />
            </mesh>
          ))}
        </group>
      )}

      {/* Render 15 Engineered 3D Glyphs forming "BUILD WITH INTENT" */}
      {PHRASE_ITEMS.map((item) => {
        const geo = geometries.get(item.char);
        if (!geo) return null;
        return (
          <LetterGlyph
            key={item.index}
            item={item}
            mode={mode}
            geometry={geo}
            material={titaniumMaterial}
            accentMaterial={orangeAccentMaterial}
          />
        );
      })}
    </group>
  );
}

export default Exp03KineticType;