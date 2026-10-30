'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function Exp06TopographicShader() {
  const mode = usePortfolioStore((s) => s.experimentModes['06-topographic-shader'] || 'frequencies');
  const meshRef = useRef<THREE.Mesh>(null);
  const pointerPos = useRef(new THREE.Vector2(0, 0));

  // Custom vertex deformation & fragment contour shader
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uMode: { value: 0.0 }, // 0 = frequencies, 1 = topography, 2 = pulse
        uColorPrimary: { value: new THREE.Color('#FF4D00') },
        uColorBase: { value: new THREE.Color('#0A0A0A') },
        uColorHighlight: { value: new THREE.Color('#E8E4DE') },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uPointer;
        uniform float uMode;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Frequency calculation
          float wave1 = sin(pos.x * 2.5 + uTime * 1.5) * 0.18;
          float wave2 = cos(pos.y * 2.0 + uTime * 1.2) * 0.18;
          float dist = distance(pos.xy, uPointer * 2.0);
          float ripple = sin(dist * 6.0 - uTime * 3.0) * exp(-dist * 1.2) * 0.35;

          float elevation = wave1 + wave2 + ripple;

          if (uMode > 0.5 && uMode < 1.5) {
            // Stepped topographic elevation
            elevation = floor(elevation * 6.0) / 6.0;
          } else if (uMode > 1.5) {
            // Intense pulse shockwave
            elevation = sin(dist * 8.0 - uTime * 4.0) * exp(-dist * 0.8) * 0.45;
          }

          pos.z += elevation;
          vElevation = elevation;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorPrimary;
        uniform vec3 uColorBase;
        uniform vec3 uColorHighlight;
        uniform float uMode;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          // Contour line calculation based on elevation
          float contour = fract(vElevation * 8.0);
          float line = step(0.85, contour);

          vec3 color = mix(uColorBase, uColorHighlight, vElevation + 0.4);
          if (line > 0.5) {
            color = mix(color, uColorPrimary, 0.9);
          }

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      wireframe: mode === 'frequencies' ? false : true,
      side: THREE.DoubleSide,
    });
  }, [mode]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const dt = Math.min(delta, 0.1);
    const time = state.clock.getElapsedTime();

    // Track smoothed pointer
    pointerPos.current.lerp(new THREE.Vector2(state.pointer.x, state.pointer.y), dt * 4.0);

    shaderMaterial.uniforms.uTime.value = time;
    shaderMaterial.uniforms.uPointer.value.copy(pointerPos.current);

    let modeVal = 0.0;
    if (mode === 'topography') modeVal = 1.0;
    if (mode === 'pulse') modeVal = 2.0;
    shaderMaterial.uniforms.uMode.value = modeVal;

    // Slow ambient rotation
    meshRef.current.rotation.z = time * 0.04;
  });

  return (
    <group position={[0, 0, 0]} rotation={[-Math.PI / 3.2, 0, 0]}>
      <mesh ref={meshRef} material={shaderMaterial}>
        <planeGeometry args={[4.2, 3.6, 64, 64]} />
      </mesh>
    </group>
  );
}

export default Exp06TopographicShader;
