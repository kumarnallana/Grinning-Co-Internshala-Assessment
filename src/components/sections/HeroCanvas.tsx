"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

function Particulate() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Minimal particle count for high performance
  const count = 150;
  
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Spread particles widely
      pos[i * 3] = (Math.random() - 0.5) * 20;     // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // z (slightly pushed back)
      sc[i] = Math.random();
    }
    return [pos, sc];
  }, [count]);

  const pointerRef = useRef(new THREE.Vector2());

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize pointer coordinates to -1 to +1
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    // Slow drifting
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.02;

    // Gentle parallax response to mouse
    const targetX = pointerRef.current.x * 0.5;
    const targetY = pointerRef.current.y * 0.5;
    
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation={true}
        color="#F4EFE6"
        transparent={true}
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function HeroCanvas() {
  const prefersReducedMotion = useReducedMotion();

  // If the user prefers reduced motion, do not render the 3D canvas at all
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none opacity-50 mix-blend-screen" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]} // Limit pixel ratio for performance
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Particulate />
      </Canvas>
    </div>
  );
}
