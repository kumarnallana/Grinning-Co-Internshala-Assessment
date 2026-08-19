"use client";

import { MotionConfig, LazyMotion, domMax } from "motion/react";

/**
 * MotionProvider
 *
 * Sets reducedMotion="user" so Framer Motion respects prefers-reduced-motion
 * natively. Wraps the app in LazyMotion for bundle size optimization.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax}>
      <MotionConfig
        reducedMotion="user"
        transition={{ type: "tween", ease: "easeOut", duration: 0.7 }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
