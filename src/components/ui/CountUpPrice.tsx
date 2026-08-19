"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion, useSpring, useInView } from "motion/react";
import { useRef } from "react";

export function CountUpPrice({ value, className }: { value: string; className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? value : "$0");

  // Extract the numeric part (assuming format like "$52")
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const prefix = value.replace(/[0-9]/g, "");

  const spring = useSpring(0, {
    stiffness: 80,
    damping: 20,
    mass: 1
  });

  useEffect(() => {
    if (prefersReducedMotion || isNaN(numericValue)) return;
    
    if (isInView) {
      spring.set(numericValue);
    }
  }, [isInView, numericValue, prefersReducedMotion, spring]);

  useEffect(() => {
    if (prefersReducedMotion || isNaN(numericValue)) return;
    
    const unsubscribe = spring.on("change", (latest) => {
      setDisplayValue(`${prefix}${Math.round(latest)}`);
    });
    
    return () => unsubscribe();
  }, [spring, prefix, numericValue, prefersReducedMotion]);

  if (prefersReducedMotion || isNaN(numericValue)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <m.span ref={ref} className={className}>
      {displayValue}
    </m.span>
  );
}
