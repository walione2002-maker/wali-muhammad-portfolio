'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { graphicsManager, type GraphicsSettings } from '@/lib/graphics/quality';

/**
 * High-Precision Architectural Digital Systems Instrument
 * Multi-layered chassis: Anodized titanium foundation, optical refractive substrate,
 * copper circuit bus lines, and laser-aligned coordinate calipers.
 */
function InstrumentChassis({ settings }: { settings: GraphicsSettings }) {
  const groupRef = useRef<THREE.Group>(null);
  const foundationRef = useRef<THREE.Mesh>(null);
  const opticalRef = useRef<THREE.Mesh>(null);
  const circuitBusRef = useRef<THREE.Group>(null);
  const nodeRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    graphicsManager.reportFrameDelta(delta);
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.1);
    const time = state.clock.getElapsedTime();

    if (!settings.isReducedMotion) {
      // Precision pointer parallax with dampening
      const targetRotX = (state.pointer.y * 0.18) + 0.12;
      const targetRotY = (state.pointer.x * 0.22) - 0.15;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, dt * 3.5);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, dt * 3.5);

      // Subtle asynchronous architectural breathing float
      if (foundationRef.current) {
        foundationRef.current.position.y = Math.sin(time * 0.7) * 0.03;
      }
      if (opticalRef.current) {
        opticalRef.current.position.y = Math.sin(time * 0.7 + 1.2) * 0.04 + 0.1;
      }
      if (circuitBusRef.current) {
        circuitBusRef.current.position.z = Math.cos(time * 0.5) * 0.025 + 0.2;
      }
      if (nodeRef.current) {
        nodeRef.current.rotation.z = Math.sin(time * 0.4) * 0.03;
      }
    }
  });

  // Reusable materials with physically based response
  const titaniumMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#121212',
        metalness: 0.94,
        roughness: 0.24,
        emissive: '#0A0A0A',
        emissiveIntensity: 0.2,
      }),
    []
  );

  const opticalSubstrateMaterial = useMemo(
    () =>
      settings.transmission
        ? new THREE.MeshPhysicalMaterial({
            color: '#1C1C1C',
            metalness: 0.1,
            roughness: 0.06,
            transmission: 0.88,
            thickness: 1.4,
            ior: 1.52,
            transparent: true,
            opacity: 0.9,
            reflectivity: 0.7,
            clearcoat: 0.8,
            clearcoatRoughness: 0.1,
          })
        : new THREE.MeshStandardMaterial({
            color: '#181818',
            metalness: 0.8,
            roughness: 0.2,
            transparent: true,
            opacity: 0.75,
          }),
    [settings.transmission]
  );

  const circuitTraceMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#FF4D00',
        emissive: '#FF4D00',
        emissiveIntensity: 1.6,
        roughness: 0.2,
        metalness: 0.8,
      }),
    []
  );

  const caliperWireMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: '#383838',
        transparent: true,
        opacity: 0.6,
      }),
    []
  );

  // Wireframe bounding bounds
  const boundingLines = useMemo(() => {
    return new THREE.EdgesGeometry(new THREE.BoxGeometry(3.4, 2.1, 0.65));
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.12, -0.15, 0]}>
      {/* Precision Caliper Bounding Frustum */}
      <lineSegments geometry={boundingLines} material={caliperWireMaterial} />

      {/* Layer 01: Beveled Titanium Base Foundation */}
      <mesh ref={foundationRef} position={[0, -0.1, -0.15]} material={titaniumMaterial}>
        <boxGeometry args={[3.0, 1.7, 0.1]} />
      </mesh>

      {/* Layer 02: Optical Refractive Circuit Substrate */}
      <mesh ref={opticalRef} position={[0.12, 0.1, 0.08]} material={opticalSubstrateMaterial}>
        <boxGeometry args={[2.5, 1.4, 0.05]} />
      </mesh>

      {/* Layer 03: Precision Emissive Circuit Buses */}
      <group ref={circuitBusRef} position={[0, 0.12, 0.2]}>
        {/* Horizontal Primary Data Conduit */}
        <mesh position={[0, 0, 0]} material={circuitTraceMaterial}>
          <boxGeometry args={[2.3, 0.025, 0.02]} />
        </mesh>

        {/* Vertical Routing Branches */}
        {[-0.75, 0.0, 0.75].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, (idx - 1) * 0.22, 0.01]} material={circuitTraceMaterial}>
            <boxGeometry args={[0.025, 0.65, 0.02]} />
          </mesh>
        ))}

        {/* Laser-cut Alignment Caliper Dots */}
        {[-1.0, -0.5, 0.0, 0.5, 1.0].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.03]}>
            <boxGeometry args={[0.05, 0.05, 0.02]} />
            <meshStandardMaterial
              color={i === 2 ? '#FF4D00' : '#E8E4DE'}
              emissive={i === 2 ? '#FF4D00' : '#E8E4DE'}
              emissiveIntensity={i === 2 ? 1.8 : 0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Layer 04: Floating Structural Telemetry Nodes */}
      <group ref={nodeRef} position={[0, 0, 0.3]}>
        {/* Focal Indicator Octahedron */}
        <mesh position={[1.0, 0.6, 0]}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshStandardMaterial
            color="#FF4D00"
            emissive="#FF4D00"
            emissiveIntensity={2.0}
          />
        </mesh>
        <mesh position={[-1.1, -0.6, 0]}>
          <octahedronGeometry args={[0.065, 0]} />
          <meshStandardMaterial
            color="#E8E4DE"
            emissive="#E8E4DE"
            emissiveIntensity={1.0}
          />
        </mesh>
      </group>
    </group>
  );
}

export function HeroInstrument() {
  const [settings, setSettings] = useState<GraphicsSettings>(graphicsManager.getSettings());
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    const unsub = graphicsManager.subscribe((newSettings) => setSettings(newSettings));
    return () => {
      window.removeEventListener('resize', checkWidth);
      unsub();
    };
  }, []);

  // Responsive camera framing: pull camera back on narrow portrait screens so edges never clip
  const cameraZ = isMobileScreen ? 5.6 : 4.6;
  const cameraFov = isMobileScreen ? 44 : 40;

  return (
    <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto h-[260px] xs:h-[300px] sm:h-[380px] lg:h-[460px] flex items-center justify-center">
      {/* Architectural Technical Container Framing */}
      <div className="absolute inset-0 border border-[#1C1C1C] bg-[#0A0A0A]/60 pointer-events-none" />
      
      {/* Telemetry Header */}
      <div className="absolute top-2.5 left-3 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#777777] flex items-center gap-1.5 pointer-events-none truncate max-w-[200px] sm:max-w-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse shrink-0" />
        <span className="truncate">Fig. 01 — Digital Systems Instrument</span>
      </div>

      {/* Telemetry Footer */}
      <div className="absolute bottom-2.5 right-3 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#666666] pointer-events-none hidden xs:block">
        Real-Time Spatial Assembly · {settings.tier.toUpperCase()} TIER
      </div>

      <Canvas
        gl={{
          antialias: settings.antialiasing,
          alpha: true,
          powerPreference: settings.powerPreference,
        }}
        dpr={settings.dpr}
        camera={{ position: [0, 0, cameraZ], fov: cameraFov }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Calibrated Studio Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[7, 10, 6]} intensity={1.8} />
        <directionalLight position={[-6, -4, -4]} intensity={0.8} color="#FF4D00" />
        <directionalLight position={[4, -6, 2]} intensity={0.4} color="#38BDF8" />

        <InstrumentChassis settings={settings} />
      </Canvas>
    </div>
  );
}

export default HeroInstrument;