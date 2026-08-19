"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  xRange: number;
  yRange: number;
}

export function HeroCanvas() {
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo<Particle[]>(() => {
    const count = 60;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,          // % across viewport
      y: Math.random() * 100,          // % down viewport
      size: Math.random() * 2 + 0.5,   // 0.5–2.5px
      duration: Math.random() * 20 + 25, // 25–45s per cycle
      delay: -(Math.random() * 30),    // stagger start positions
      xRange: (Math.random() - 0.5) * 6, // ±3% drift
      yRange: (Math.random() - 0.5) * 6,
    }));
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <div
      className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-foreground"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0,
          }}
          animate={{
            x: [`0%`, `${p.xRange}%`, `0%`],
            y: [`0%`, `${p.yRange}%`, `0%`],
            opacity: [0, 0.25, 0.12, 0.25, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
      ))}
    </div>
  );
}
