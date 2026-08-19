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

  // Image Mask Reveal
  const clipTop = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);
  const clipPath = useTransform(clipTop, val => `inset(${val}% 0 0 0)`);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  
  // Typography Choreography
  const labelOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.3, 0.4], [20, 0]);
  
  const text1Opacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const text1Y = useTransform(scrollYProgress, [0.4, 0.5], [30, 0]);
  
  const text2Opacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const text2Y = useTransform(scrollYProgress, [0.5, 0.6], [30, 0]);

  return (
    <section ref={containerRef} id="story" className="relative flex items-center justify-center py-24 sm:py-32">
      {/* Full-bleed background with mask reveal */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ clipPath: prefersReducedMotion ? "none" : clipPath }}
      >
        <motion.div 
          className="absolute inset-[-10%]"
          style={{ scale: prefersReducedMotion ? 1 : imageScale }}
        >
          <Image
            src="/images/story_bg_1787075461396.jpg"
            alt="Deep plum and midnight indigo botanical representing stillness"
            fill
            className="object-cover object-center opacity-40 mix-blend-luminosity"
            sizes="100vw"
          />
          {/* Gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-transparent to-transparent" />
        </motion.div>
      </motion.div>

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
