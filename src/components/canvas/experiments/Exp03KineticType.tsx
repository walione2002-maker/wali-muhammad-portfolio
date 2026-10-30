'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';

interface LetterBlockProps {
  char: string;
  gridPos: [number, number, number];
  index: number;
  mode: string;
}

function LetterBlock({ char, gridPos, index, mode }: LetterBlockProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetPos = useRef(new THREE.Vector3(...gridPos));
  const currentPos = useRef(new THREE.Vector3(...gridPos));

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const dt = Math.min(delta, 0.1);
    const time = state.clock.getElapsedTime();

    if (mode === 'velocity') {
      // Dynamic pointer proximity wave
      const dx = state.pointer.x * 3.0 - gridPos[0];
      const dy = state.pointer.y * 2.0 - gridPos[1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      const push = Math.max(0, 1.8 - dist) * 0.8;

      targetPos.current.set(
        gridPos[0] + (dx / (dist + 0.1)) * push * 0.5,
        gridPos[1] + (dy / (dist + 0.1)) * push * 0.5,
        gridPos[2] + Math.sin(time * 3 + index * 0.4) * 0.2 + push
      );
    } else if (mode === 'grid') {
      targetPos.current.set(
        (index % 4 - 1.5) * 1.2,
        (Math.floor(index / 4) - 1.5) * 0.8,
        Math.sin(time * 2 + index) * 0.15
      );
    } else {
      // Harmonic baseline resting state
      targetPos.current.set(
        gridPos[0],
        gridPos[1] + Math.sin(time * 1.5 + index * 0.3) * 0.05,
        gridPos[2]
      );
    }

    currentPos.current.lerp(targetPos.current, dt * 6.0);
    meshRef.current.position.copy(currentPos.current);

    // Subtle tilt toward pointer
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      state.pointer.x * 0.2,
      dt * 4.0
    );
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.55, 0.65, 0.15]} />
        <meshStandardMaterial
          color={index % 2 === 0 ? '#E8E4DE' : '#1A1A1A'}
          metalness={0.9}
          roughness={0.15}
          emissive={index === 5 ? '#FF4D00' : '#080808'}
          emissiveIntensity={index === 5 ? 0.8 : 0.1}
        />
      </mesh>
    </group>
  );
}

// "BUILD WITH INTENT" 15 letter positions
const LETTERS = 'BUILDWITHINTENT'.split('');

export function Exp03KineticType() {
  const mode = usePortfolioStore((s) => s.experimentModes['03-kinetic-type'] || 'harmonic');
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.1);
    groupRef.current.rotation.y += 0.08 * dt;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {LETTERS.map((char, i) => {
        // Layout into 3 words: BUILD (row 1), WITH (row 2), INTENT (row 3)
        let row = 0;
        let col = i;
        if (i < 5) {
          row = 1.0;
          col = i - 2.0;
        } else if (i < 9) {
          row = 0.0;
          col = i - 6.5;
        } else {
          row = -1.0;
          col = i - 11.5;
        }

        const posX = col * 0.72;
        const posY = row * 0.9;
        const posZ = 0;

        return (
          <LetterBlock
            key={i}
            char={char}
            gridPos={[posX, posY, posZ]}
            index={i}
            mode={mode}
          />
        );
      })}
    </group>
  );
}

export default Exp03KineticType;
