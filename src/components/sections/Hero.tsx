"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowDown, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./HeroCanvas").then(mod => mod.HeroCanvas), { 
  ssr: false,
});

function HeroProductJar({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 140, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 140, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[290px] sm:max-w-sm lg:max-w-md aspect-[4/5] group cursor-pointer mx-auto lg:mx-0"
      style={{ perspective: 1200 }}
    >
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full"
      >
        <motion.div
          className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] border border-highlight/25 backdrop-blur-sm"
          style={{
            rotateX: prefersReducedMotion ? 0 : rotateX,
            rotateY: prefersReducedMotion ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src="/images/product_1_1787073157894.jpg"
            alt="Redroot Low Tide signature blend apothecary jar"
            fill
            priority
            className="object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Dynamic Specular Sheen Reflection */}
          {!prefersReducedMotion && (
            <div 
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-700 mix-blend-overlay bg-gradient-to-tr from-transparent via-white/80 to-transparent"
            />
          )}

          {/* Ambient Dark Scrim at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-transparent to-transparent pointer-events-none" />

          {/* Corner Luxe Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-highlight/30 text-[10px] uppercase tracking-[0.2em] text-highlight flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-3 h-3 text-highlight" />
            <span>01 Low Tide</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Warm Gold Corona Backlight */}
      <div className="absolute inset-0 bg-highlight/25 blur-[100px] rounded-full z-[-1] scale-90 pointer-events-none group-hover:bg-highlight/40 group-hover:scale-105 transition-all duration-700" />
    </div>
  );
}

export function Hero() {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  
  // Parallax and fade effects
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.12]);
  const bgOpacity = useTransform(scrollY, [0, 800], [0.35, 0.05]);
  const textOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const textY = useTransform(scrollY, [0, 450], [0, 35]);
  const productY = useTransform(scrollY, [0, 450], [0, 45]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden" aria-labelledby="hero-heading">
      <HeroCanvas />
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 origin-top"
        style={{ scale: prefersReducedMotion ? 1 : bgScale }}
      >
        <motion.div className="relative w-full h-full" style={{ opacity: prefersReducedMotion ? 0.35 : bgOpacity }}>
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
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
      </motion.div>

      <Container className="relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        <motion.div 
          className="lg:col-span-7 max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
          style={{ 
            opacity: prefersReducedMotion ? 1 : textOpacity, 
            y: prefersReducedMotion ? 0 : textY 
          }}
        >
          {/* Shimmering Eyebrow Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-highlight/10 border border-highlight/25 backdrop-blur-md mb-8 relative overflow-hidden group shadow-[0_0_25px_rgba(201,161,90,0.12)]"
          >
            <span className="w-2 h-2 rounded-full bg-highlight animate-pulse" />
            <span className="text-highlight font-semibold tracking-[0.22em] text-xs uppercase">
              For Those Who Run Too Fast
            </span>
          </motion.div>

          {/* Kinetic Headline Reveal */}
          <div className="overflow-hidden mb-6">
            <motion.h1 
              id="hero-heading" 
              className="font-display font-light text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.08] text-foreground tracking-tight"
              initial={{ y: "80%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              Release your day. <br />
              <span className="text-muted-foreground/80 italic font-serif">Return to stillness.</span>
            </motion.h1>
          </div>

          <motion.p 
            className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            A nightly ritual crafted from potent botanicals. Slow down, silence the noise, and experience the deep restoration you&apos;ve earned.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button size="lg" className="w-full sm:w-auto shadow-[0_0_30px_rgba(201,161,90,0.25)] hover:shadow-[0_0_40px_rgba(201,161,90,0.4)] transition-all">
              Begin Your Ritual
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-white/20 hover:border-highlight group/btn">
              <Play className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
              Watch the Ritual
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating 3D Product Jar for Visual Prominence */}
        <motion.div 
          className="lg:col-span-5 flex justify-center lg:justify-end items-center relative"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{ 
            opacity: prefersReducedMotion ? 1 : textOpacity, 
            y: prefersReducedMotion ? 0 : productY 
          }}
        >
          <HeroProductJar prefersReducedMotion={prefersReducedMotion} />
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse"
        style={{ opacity: prefersReducedMotion ? 1 : textOpacity }}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
        <ArrowDown className="w-4 h-4 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
