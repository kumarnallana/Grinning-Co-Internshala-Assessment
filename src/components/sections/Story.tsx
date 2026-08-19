"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function Story() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Image Mask Reveal & Focal Settling
  const clipTop = useTransform(scrollYProgress, [0.1, 0.45], [100, 0]);
  const clipPath = useTransform(clipTop, val => `inset(${val}% 0 0 0)`);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.8, 1], [0.15, 0.45, 0.45, 0.2]);
  
  // Typography Choreography
  const labelOpacity = useTransform(scrollYProgress, [0.25, 0.38], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.25, 0.38], [20, 0]);
  
  const text1Opacity = useTransform(scrollYProgress, [0.38, 0.5], [0, 1]);
  const text1Y = useTransform(scrollYProgress, [0.38, 0.5], [25, 0]);
  
  const text2Opacity = useTransform(scrollYProgress, [0.5, 0.62], [0, 1]);
  const text2Y = useTransform(scrollYProgress, [0.5, 0.62], [25, 0]);

  return (
    <section ref={containerRef} id="story" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Full-bleed background with mask reveal */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ clipPath: prefersReducedMotion ? "none" : clipPath }}
      >
        <motion.div 
          className="absolute inset-[-5%]"
          style={{ 
            scale: prefersReducedMotion ? 1 : imageScale,
            opacity: prefersReducedMotion ? 0.4 : imageOpacity
          }}
        >
          <Image
            src="/images/story_bg_1787075461396.jpg"
            alt="Deep plum and midnight indigo botanical representing stillness"
            fill
            className="object-cover object-center mix-blend-luminosity"
            sizes="100vw"
          />
          {/* Subtle warm backlight glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-primary/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-transparent to-primary/90" />
        </motion.div>
      </motion.div>

      {/* Central Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] max-w-[500px] bg-highlight/10 blur-[120px] rounded-full pointer-events-none z-[1]" />

      <Container className="relative z-10 max-w-4xl text-center">
        <motion.div
          style={{ 
            opacity: prefersReducedMotion ? 1 : labelOpacity,
            y: prefersReducedMotion ? 0 : labelY
          }}
        >
          <h2 className="text-highlight font-semibold tracking-[0.2em] text-sm uppercase mb-12">
            The Paradigm Shift
          </h2>
        </motion.div>

        <div className="space-y-12 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.2] text-foreground">
          <motion.p
            style={{ 
              opacity: prefersReducedMotion ? 1 : text1Opacity,
              y: prefersReducedMotion ? 0 : text1Y
            }}
          >
            Modern culture demands constant acceleration. <br className="hidden sm:block" />
            <span className="text-muted-foreground/60 italic text-3xl sm:text-4xl md:text-5xl tracking-tight">It asks you to push harder, run faster, and never stop.</span>
          </motion.p>
          
          <motion.div
            style={{ 
              opacity: prefersReducedMotion ? 1 : text2Opacity,
              y: prefersReducedMotion ? 0 : text2Y
            }}
          >
            <p className="text-highlight mb-8 tracking-tight">
              We are asking you to stop.
            </p>
            <p className="text-xl sm:text-2xl text-muted-foreground font-sans leading-relaxed max-w-2xl mx-auto font-light">
              Redroot is not just a tea. It is a definitive boundary between your output and your recovery. A sensory ritual designed to silence the adrenaline and bring you back to center.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
