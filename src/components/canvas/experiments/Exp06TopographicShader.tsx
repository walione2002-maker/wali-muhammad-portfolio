'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { graphicsManager } from '@/lib/graphics/quality';

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
        varying vec3 vNormalVec;

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Harmonic multi-frequency waves
          float wave1 = sin(pos.x * 2.4 + uTime * 1.4) * 0.2;
          float wave2 = cos(pos.y * 2.1 + uTime * 1.1) * 0.18;
          float dist = distance(pos.xy, uPointer * 2.2);
          float ripple = sin(dist * 6.5 - uTime * 3.2) * exp(-dist * 1.1) * 0.38;

          float elevation = wave1 + wave2 + ripple;

          if (uMode > 0.5 && uMode < 1.5) {
            // Stepped topographic elevation terraces
            elevation = floor(elevation * 7.0) / 7.0;
          } else if (uMode > 1.5) {
            // High-energy shockwave pulse
            elevation = sin(dist * 9.0 - uTime * 4.5) * exp(-dist * 0.75) * 0.52;
          }

          pos.z += elevation;
          vElevation = elevation;
          vNormalVec = normalMatrix * normal;

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
        varying vec3 vNormalVec;

        void main() {
          // Sharp anti-aliased contour isolines
          float contour = fract(vElevation * 8.0);
          float line = step(0.86, contour);

          // Specular grazing highlight simulation
          vec3 viewDir = vec3(0.0, 0.0, 1.0);
          float rim = 1.0 - max(dot(normalize(vNormalVec), viewDir), 0.0);

          vec3 color = mix(uColorBase, uColorHighlight, vElevation * 0.8 + 0.35);
          color += rim * 0.18;

          if (line > 0.5) {
            color = mix(color, uColorPrimary, 0.95);
          }

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      wireframe: mode === 'frequencies' ? false : true,
      side: THREE.DoubleSide,
    });
  }, [mode]);

  useFrame((state, delta) => {
    graphicsManager.reportFrameDelta(delta);
    if (!meshRef.current) return;
    const dt = Math.min(delta, 0.1);
    const time = state.clock.getElapsedTime();

    // Smoothed pointer tracking
    pointerPos.current.lerp(new THREE.Vector2(state.pointer.x, state.pointer.y), dt * 4.0);

    shaderMaterial.uniforms.uTime.value = time;
    shaderMaterial.uniforms.uPointer.value.copy(pointerPos.current);

    let modeVal = 0.0;
    if (mode === 'topography') modeVal = 1.0;
    if (mode === 'pulse') modeVal = 2.0;
    shaderMaterial.uniforms.uMode.value = modeVal;

    // Slow ambient rotation
    meshRef.current.rotation.z = time * 0.035;
  });

  return (
    <group position={[0, 0, 0]} rotation={[-Math.PI / 3.4, 0, 0]}>
      <mesh ref={meshRef} material={shaderMaterial}>
        <planeGeometry args={[4.4, 3.8, 72, 72]} />
      </mesh>
    </group>
  );
}

export default Exp06TopographicShader;