"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function FinalCTA() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["rgba(18, 17, 19, 0)", "rgba(22, 13, 20, 1)", "rgba(5, 5, 5, 1)"]
  );

  const jarOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const jarY = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);
  const jarScale = useTransform(scrollYProgress, [0.2, 1], [0.95, 1.05]);

  const textOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.5, 0.7], [0.95, 1]);

  const ctaOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.7, 0.85], [20, 0]);

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <motion.div 
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: prefersReducedMotion ? "#050505" : backgroundColor }}
      >
        {/* Background Jar Image */}
        <motion.div 
          className="absolute inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-luminosity pointer-events-none"
          style={{ 
            opacity: prefersReducedMotion ? 0.4 : jarOpacity,
            y: prefersReducedMotion ? 0 : jarY,
            scale: prefersReducedMotion ? 1 : jarScale
          }}
        >
          <div className="relative w-full max-w-2xl aspect-square">
            <Image
              src="/images/product_3_1787073202462.jpg"
              alt="Last Light Product"
              fill
              className="object-cover object-center rounded-full blur-2xl opacity-30"
              sizes="100vw"
            />
            <Image
              src="/images/product_3_1787073202462.jpg"
              alt="Last Light Product"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* Base gradients for blending into background */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
            
            {/* Heavy Text-safe Scrim for WCAG AA contrast over the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        </motion.div>

        <Container className="relative z-10 text-center flex flex-col items-center justify-center h-full pt-32">
          <motion.div
            style={{ 
              opacity: prefersReducedMotion ? 1 : textOpacity,
              scale: prefersReducedMotion ? 1 : textScale
            }}
            className="flex flex-col items-center"
          >
            <h2 className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] text-foreground tracking-tighter mb-8 leading-none drop-shadow-2xl">
              Stop running.
            </h2>
            <p className="text-2xl sm:text-3xl text-muted-foreground/80 font-display italic max-w-2xl mx-auto mb-16 font-light">
              The day is over. It&apos;s time to return to yourself.
            </p>
          </motion.div>

          <motion.div
            style={{ 
              opacity: prefersReducedMotion ? 1 : ctaOpacity,
              y: prefersReducedMotion ? 0 : ctaY
            }}
          >
            <Button size="lg" variant="outline" className="min-w-[240px] text-lg bg-transparent border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-500 rounded-full py-8 tracking-[0.1em] uppercase group/btn">
              Begin Your Ritual
            </Button>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
