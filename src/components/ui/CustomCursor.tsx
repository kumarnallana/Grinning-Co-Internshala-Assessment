"use client";

import * as React from "react";
import { m, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = React.useState(false);
  const [cursorType, setCursorType] = React.useState<"default" | "link" | "button" | "card">("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for the outer trailing halo (soft, trailing)
  const springOuterX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.8 });
  const springOuterY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.8 });

  // Distinct stiff spring for the inner precision dot (removes raw coordinate lag)
  const springInnerX = useSpring(mouseX, { stiffness: 800, damping: 35, mass: 0.1 });
  const springInnerY = useSpring(mouseY, { stiffness: 800, damping: 35, mass: 0.1 });

  React.useEffect(() => {
    // Progressive enhancement: strictly disable on touch/mobile or reduced-motion
    if (typeof window === "undefined" || prefersReducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect target element state
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest("button") || target.closest(".btn") || target.closest("[role='button']")) {
        setCursorType("button");
      } else if (target.closest("a") || target.closest("input") || target.closest("select")) {
        setCursorType("link");
      } else if (target.closest(".group") || target.closest("[data-cursor='card']")) {
        setCursorType("card");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible, prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden hidden md:block" aria-hidden="true">
      {/* Precision Core Dot (Tracks exact coordinate) */}
      <m.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-highlight pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: springInnerX,
          y: springInnerY,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Trailing Luxury Aura Ring */}
      <m.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
        style={{
          x: springOuterX,
          y: springOuterY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: cursorType === "button" ? 48 : cursorType === "link" ? 40 : cursorType === "card" ? 36 : 24,
          height: cursorType === "button" ? 48 : cursorType === "link" ? 40 : cursorType === "card" ? 36 : 24,
          backgroundColor: cursorType === "button" ? "rgba(201, 161, 90, 0.12)" : cursorType === "link" ? "rgba(201, 161, 90, 0.08)" : "rgba(201, 161, 90, 0.02)",
          borderColor: cursorType === "button" ? "rgba(201, 161, 90, 0.8)" : cursorType === "link" ? "rgba(201, 161, 90, 0.6)" : "rgba(201, 161, 90, 0.3)",
          backdropFilter: cursorType === "button" ? "blur(2px)" : "none",
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
