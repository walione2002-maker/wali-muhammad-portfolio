'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { graphicsManager } from '@/lib/graphics/quality';

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

  // Network connection lines
  const linesGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    CONNECTIONS.forEach(([fromIdx, toIdx]) => {
      points.push(new THREE.Vector3(...NODES[fromIdx].pos));
      points.push(new THREE.Vector3(...NODES[toIdx].pos));
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const packetCount = 30;

  useFrame((state, delta) => {
    graphicsManager.reportFrameDelta(delta);
    if (!groupRef.current || !packetsRef.current) return;
    const dt = Math.min(delta, 0.1);
    const time = state.clock.getElapsedTime();
    const speed = mode === 'burst' ? 2.8 : 1.3;

    // Slow ambient rotation
    groupRef.current.rotation.y += 0.09 * dt;

    // Animate packet pulses along each connection
    for (let i = 0; i < packetCount; i++) {
      const connIdx = i % CONNECTIONS.length;
      const [fromIdx, toIdx] = CONNECTIONS[connIdx];
      const fromPos = new THREE.Vector3(...NODES[fromIdx].pos);
      const toPos = new THREE.Vector3(...NODES[toIdx].pos);

      // In 'route' mode, highlight only primary edge route [0->1->2->4->5]
      const isRouteActive = mode === 'route' ? connIdx !== 2 && connIdx !== 4 : true;

      const progress = ((time * speed * 0.35 + i / packetCount) % 1.0);
      const currentPos = new THREE.Vector3().lerpVectors(fromPos, toPos, progress);

      dummy.position.copy(currentPos);
      const scale = isRouteActive ? (mode === 'burst' ? 1.5 : 1.1) : 0.001;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      packetsRef.current.setMatrixAt(i, dummy.matrix);
    }
    packetsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Ground Reference Plane */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.0, 3.8, 36]} />
        <meshBasicMaterial color="#080808" transparent opacity={0.4} />
      </mesh>

      {/* Network Connection Lines */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial color="#333333" transparent opacity={0.7} />
      </lineSegments>

      {/* Network Infrastructure Nodes */}
      {NODES.map((node) => (
        <group key={node.id} position={node.pos}>
          {/* Beveled Icosahedral Core */}
          <mesh>
            <icosahedronGeometry args={[0.22, 1]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.8}
              metalness={0.85}
              roughness={0.18}
            />
          </mesh>

          {/* Precision Telemetry Orbit Ring */}
          <mesh rotation={[Math.PI / 3.5, 0, 0]}>
            <torusGeometry args={[0.35, 0.012, 8, 36]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.45} />
          </mesh>
        </group>
      ))}

      {/* Traveling Photonic Data Packets */}
      <instancedMesh ref={packetsRef} args={[undefined, undefined, packetCount]}>
        <sphereGeometry args={[0.065, 8, 8]} />
        <meshBasicMaterial color="#FF4D00" />
      </instancedMesh>
    </group>
  );
}

export default Exp04SignalArchitecture;