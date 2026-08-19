"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { m, useReducedMotion } from "motion/react";

import { SPRING_TRANSITION, SIGNATURE_EASE } from "@/lib/motion-tokens";

export function FinalCTA() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
      {/* Background Jar Image */}
      <m.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: prefersReducedMotion ? 0.4 : 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: SIGNATURE_EASE }}
        className="absolute inset-0 z-0 flex items-center justify-center opacity-40 mix-blend-luminosity pointer-events-none"
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
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-transparent pointer-events-none" />
          
          {/* Atmospheric Midnight Plum Halo */}
          <div className="absolute inset-0 bg-[#6d3b7d]/15 blur-[120px] rounded-full scale-90 pointer-events-none" />
        </div>
      </m.div>

      <Container className="relative z-10 text-center flex flex-col items-center justify-center">
        <div className="flex flex-col items-center overflow-hidden mb-8">
          <m.h2 
            initial={{ opacity: 0, y: "100%", scale: 1.05 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={prefersReducedMotion ? { duration: 0 } : { ...SPRING_TRANSITION, delay: 0 }}
            className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] text-foreground tracking-tighter leading-none drop-shadow-2xl"
          >
            Stop running.
          </m.h2>
        </div>
        
        <div className="overflow-hidden mb-16">
          <m.p 
            initial={{ opacity: 0, y: "50%", scale: 1.02 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={prefersReducedMotion ? { duration: 0 } : { ...SPRING_TRANSITION, delay: 0.08 }}
            className="text-2xl sm:text-3xl text-muted-foreground/80 font-display italic max-w-2xl mx-auto font-light"
          >
            The day is over. It&apos;s time to return to yourself.
          </m.p>
        </div>

        <m.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={prefersReducedMotion ? { duration: 0 } : { ...SPRING_TRANSITION, delay: 0.16 }}
        >
          <Button size="lg" variant="outline" className="min-w-[240px] text-lg bg-transparent border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-500 rounded-full py-8 tracking-[0.1em] uppercase group/btn">
            Begin Your Ritual
          </Button>
        </m.div>
      </Container>
    </section>
  );
}
