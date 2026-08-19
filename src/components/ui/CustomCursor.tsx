"use client";

import * as React from "react";
import { m, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = React.useState(false);

  const [cursorScale, setCursorScale] = React.useState(1);
  const [isIdle, setIsIdle] = React.useState(false);
  const [isCta, setIsCta] = React.useState(false);
  const idleTimer = React.useRef<NodeJS.Timeout>();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for the outer trailing halo
  const springOuterX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.8 });
  const springOuterY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.8 });

  // Distinct stiff spring for the inner precision dot
  const springInnerX = useSpring(mouseX, { stiffness: 800, damping: 35, mass: 0.1 });
  const springInnerY = useSpring(mouseY, { stiffness: 800, damping: 35, mass: 0.1 });

  React.useEffect(() => {
    // Progressive enhancement: strictly disable on touch/mobile or reduced-motion
    if (typeof window === "undefined" || prefersReducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches) {
      return;
    }

    const startBreathing = () => setIsIdle(true);
    const stopBreathing = () => setIsIdle(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      
      stopBreathing();
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(startBreathing, 3000);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      stopBreathing();
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect target element state via CSS variable and dataset
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cta = target.closest("button") || target.closest(".btn") || target.closest("[data-cursor='cta']");
      setIsCta(!!cta);

      // Try reading CSS variable if defined, else fallback to sensible defaults
      let scale = 1;
      if (cta) scale = 1.6;
      else if (target.closest("a")) scale = 1.2;
      else if (target.closest("p") || target.closest("h1") || target.closest("h2") || target.closest("h3")) scale = 0.6;
      else if (target.closest("img") || target.closest("[data-cursor='image']")) scale = 1.2;

      setCursorScale(scale);
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
      if (idleTimer.current) clearTimeout(idleTimer.current);
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

      {/* Trailing Luxury Aura Ring (Blend-mode difference) */}
      <m.div
        className="fixed top-0 left-0 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: springOuterX,
          y: springOuterY,
          width: 24,
          height: 24,
          opacity: isVisible ? 1 : 0,
          mixBlendMode: "difference",
          backgroundColor: isCta ? "white" : "transparent",
          border: isCta ? "none" : "1px solid white",
        }}
        animate={{
          scale: isIdle ? 1.03 : cursorScale,
          opacity: isIdle ? 0.8 : (isCta ? 1 : 0.6),
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
