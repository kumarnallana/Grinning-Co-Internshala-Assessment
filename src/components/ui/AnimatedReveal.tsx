"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

export function AnimatedReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 30,
}: AnimatedRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialY = () => {
    if (direction === "up") return distance;
    if (direction === "down") return -distance;
    return 0;
  };

  const getInitialX = () => {
    if (direction === "left") return distance;
    if (direction === "right") return -distance;
    return 0;
  };

  const initial = shouldReduceMotion
    ? { opacity: 1, x: 0, y: 0 }
    : { opacity: 0, x: getInitialX(), y: getInitialY() };

  const animate = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1,
        ease: "easeOut",
        delay: shouldReduceMotion ? 0 : delay,
      }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
}
