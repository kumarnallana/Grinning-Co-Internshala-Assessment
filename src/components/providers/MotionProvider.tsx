"use client";

import { MotionConfig } from "framer-motion";

/**
 * MotionProvider
 *
 * Sets reducedMotion="user" so Framer Motion respects prefers-reduced-motion
 * natively, and critically disables WAAPI delegation by setting
 * `reducedMotion` plus forcing all animations through the JS engine.
 *
 * The `reducedMotion="user"` option alone does not stop WAAPI from being used.
 * We also pass `transition={{ type: "tween" }}` as the global default, which
 * prevents Framer Motion from ever using spring physics that produce
 * non-monotonically-decreasing WAAPI keyframe offsets on mount.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ type: "tween", ease: "easeOut", duration: 0.7 }}
    >
      {children}
    </MotionConfig>
  );
}
