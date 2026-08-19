"use client";

import { m, useReducedMotion } from "motion/react";
import { SIGNATURE_EASE, SIGNATURE_DURATION } from "@/lib/motion-tokens";

interface RevealHeadlineProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function RevealHeadline({ children, className, delay = 0 }: RevealHeadlineProps) {
  const prefersReducedMotion = useReducedMotion();

  // If reduced motion is requested, just render normally
  if (prefersReducedMotion) {
    return <h1 className={className}>{children}</h1>;
  }

  // Assuming children is a string, split by lines if possible, or just animate the block
  // For simplicity and robust use, we wrap the content in a clipped container
  return (
    <h1 className={`${className} overflow-hidden`}>
      <m.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ 
          duration: SIGNATURE_DURATION, 
          ease: SIGNATURE_EASE, 
          delay 
        }}
      >
        {children}
      </m.div>
    </h1>
  );
}
