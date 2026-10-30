'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';

interface NodeData {
  id: string;
  label: string;
  pos: [number, number, number];
  color: string;
}

const NODES: NodeData[] = [
  { id: 'client', label: 'Client Device', pos: [-2.6, 0.8, 0], color: '#E8E4DE' },
  { id: 'edge', label: 'Cloudflare Edge', pos: [-1.2, 0.2, 0.8], color: '#FF4D00' },
  { id: 'app', label: 'Next.js App Server', pos: [0.2, 1.0, -0.4], color: '#38BDF8' },
  { id: 'cache', label: 'KV Cache', pos: [0.0, -0.8, 0.6], color: '#10B981' },
  { id: 'db', label: 'Database Cluster', pos: [1.6, 0.4, 0.2], color: '#8B5CF6' },
  { id: 'fintech', label: 'FinTech Engine', pos: [2.5, -0.6, -0.5], color: '#F59E0B' },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], // Client -> Edge
  [1, 2], // Edge -> App
  [1, 3], // Edge -> Cache
  [2, 4], // App -> DB
  [3, 4], // Cache -> DB
  [4, 5], // DB -> FinTech
];

export function Exp04SignalArchitecture() {
  const mode = usePortfolioStore((s) => s.experimentModes['04-signal-architecture'] || 'continuous');
  const groupRef = useRef<THREE.Group>(null);
  const packetsRef = useRef<THREE.InstancedMesh>(null);

  // Line paths between connected nodes
  const linesGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    CONNECTIONS.forEach(([fromIdx, toIdx]) => {
      points.push(new THREE.Vector3(...NODES[fromIdx].pos));
      points.push(new THREE.Vector3(...NODES[toIdx].pos));
    });
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const packetCount = 24;

  useFrame((state, delta) => {
    if (!groupRef.current || !packetsRef.current) return;
    const dt = Math.min(delta, 0.1);
    const time = state.clock.getElapsedTime();
    const speed = mode === 'burst' ? 2.5 : 1.2;

    groupRef.current.rotation.y += 0.1 * dt;

    // Animate packet pulses along each connection
    for (let i = 0; i < packetCount; i++) {
      const connIdx = i % CONNECTIONS.length;
      const [fromIdx, toIdx] = CONNECTIONS[connIdx];
      const fromPos = new THREE.Vector3(...NODES[fromIdx].pos);
      const toPos = new THREE.Vector3(...NODES[toIdx].pos);

      // Normalized progress 0..1
      const progress = ((time * speed * 0.4 + (i / packetCount)) % 1.0);
      const currentPos = new THREE.Vector3().lerpVectors(fromPos, toPos, progress);

      dummy.position.copy(currentPos);
      const scale = mode === 'burst' ? 1.4 : 1.0;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      packetsRef.current.setMatrixAt(i, dummy.matrix);
    }
    packetsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Network Connection Lines */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial color="#333333" linewidth={1} transparent opacity={0.6} />
      </lineSegments>

      {/* Network Nodes */}
      {NODES.map((node, i) => (
        <group key={node.id} position={node.pos}>
          {/* Main Node Shell */}
          <mesh>
            <icosahedronGeometry args={[0.22, 1]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.6}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Node Orbit Ring */}
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.34, 0.012, 8, 32]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.4} />
          </mesh>
        </group>
      ))}

      {/* Traveling Data Packets (Instanced for 60 FPS performance) */}
      <instancedMesh ref={packetsRef} args={[undefined, undefined, packetCount]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#FF4D00" />
      </instancedMesh>
    </group>
  );
}

export default Exp04SignalArchitecture;
