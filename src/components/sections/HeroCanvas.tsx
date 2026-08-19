"use client";

import React, { useMemo } from "react";
import { m, useReducedMotion } from "motion/react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  xRange: number;
  yRange: number;
  isGold: boolean;
}

export function HeroCanvas() {
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo<Particle[]>(() => {
    const count = 50;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,          // % across viewport
      y: Math.random() * 100,          // % down viewport
      size: Math.random() * 2.5 + 0.8, // 0.8–3.3px
      duration: Math.random() * 18 + 22, // 22–40s per cycle
      delay: -(Math.random() * 30),    // stagger start positions
      xRange: (Math.random() - 0.5) * 10, // ±5% horizontal drift
      yRange: -Math.random() * 15 - 5, // gentle upward steam float
      isGold: i % 3 === 0, // 33% golden botanical motes
    }));
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <div
      className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <m.span
          key={p.id}
          className={`absolute rounded-full ${p.isGold ? 'bg-highlight/70 shadow-[0_0_8px_rgba(201,161,90,0.5)]' : 'bg-foreground/45'}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0,
            filter: p.size > 2.2 ? 'blur(0.8px)' : 'none',
          }}
          animate={{
            x: [`0%`, `${p.xRange}%`, `${p.xRange * 1.5}%`, `0%`],
            y: [`0%`, `${p.yRange * 0.5}%`, `${p.yRange}%`, `0%`],
            opacity: [0, p.isGold ? 0.45 : 0.25, p.isGold ? 0.2 : 0.1, p.isGold ? 0.4 : 0.22, 0],
            scale: [1, 1.2, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.6, 0.85, 1],
          }}
        />
      ))}
    </div>
  );
}
