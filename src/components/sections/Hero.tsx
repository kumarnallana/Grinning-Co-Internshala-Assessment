"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowDown, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function Hero() {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  
  // Parallax and fade effects (disabled if reduced motion)
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  const bgOpacity = useTransform(scrollY, [0, 800], [0.3, 0.05]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const textY = useTransform(scrollY, [0, 400], [0, 50]);
  const productY = useTransform(scrollY, [0, 400], [0, 100]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" aria-labelledby="hero-heading">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 origin-top"
        style={{ scale: prefersReducedMotion ? 1 : bgScale }}
      >
        <motion.div className="relative w-full h-full bg-primary" style={{ opacity: prefersReducedMotion ? 0.3 : bgOpacity }}>
          <Image
            src="/images/hero_bg_1787072201282.jpg"
            alt="Moody, dark editorial tea steeping representing deep rest"
            fill
            priority
            className="object-cover object-center mix-blend-luminosity"
            sizes="100vw"
          />
        </motion.div>
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-transparent" />
      </motion.div>

      <Container className="relative z-10 grid lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div 
          className="max-w-2xl"
          style={{ 
            opacity: prefersReducedMotion ? 1 : textOpacity, 
            y: prefersReducedMotion ? 0 : textY 
          }}
        >
          <p className="text-highlight font-semibold tracking-[0.2em] text-sm uppercase mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-highlight"></span>
            For those who run too fast
          </p>
          <h1 id="hero-heading" className="font-display font-light text-5xl sm:text-6xl lg:text-7xl leading-[1.1] mb-6 text-foreground tracking-tight">
            Release your day. <br />
            <span className="text-muted-foreground italic">Return to stillness.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
            A nightly ritual crafted from potent botanicals. Slow down, silence the noise, and experience the deep restoration you&apos;ve earned.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="w-full sm:w-auto">
              Begin Your Ritual
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
              <Play className="w-4 h-4" />
              Watch the Ritual
            </Button>
          </div>
        </motion.div>

        {/* Floating Product Jar for Visual Prominence */}
        <motion.div 
          className="hidden lg:flex justify-end items-center relative"
          style={{ 
            opacity: prefersReducedMotion ? 1 : textOpacity, 
            y: prefersReducedMotion ? 0 : productY 
          }}
        >
          <div className="relative w-full max-w-sm aspect-[4/5]">
             <Image
                src="/images/product_1_1787073157894.jpg"
                alt="Redroot signature blend apothecary jar"
                fill
                priority
                className="object-cover rounded-md mix-blend-luminosity opacity-90 shadow-2xl"
                sizes="(max-width: 1024px) 0vw, 33vw"
             />
             {/* Glow effect */}
             <div className="absolute inset-0 bg-highlight/20 blur-[100px] rounded-full z-[-1] scale-75" />
          </div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse"
        style={{ opacity: prefersReducedMotion ? 1 : textOpacity }}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
        <ArrowDown className="w-4 h-4 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
