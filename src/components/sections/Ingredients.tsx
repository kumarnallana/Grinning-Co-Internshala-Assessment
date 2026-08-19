"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { INGREDIENTS } from "@/lib/constants";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { motion, useScroll, useTransform, useReducedMotion, useSpring, useMotionTemplate } from "framer-motion";

function FormulaSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end center"],
  });

  const [activeIndex, setActiveIndex] = React.useState(0);
  
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.33) setActiveIndex(0);
      else if (latest < 0.66) setActiveIndex(1);
      else setActiveIndex(2);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Cinematic macro focal crawl
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.07]);

  return (
    <section ref={containerRef} className="py-24 sm:py-32 relative h-[200vh]">
      <Container className="w-full h-full relative">
        <div className="sticky top-32 grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left: Sticky Image Context with Macro Focal Crawl */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] lg:h-[580px] rounded-2xl overflow-hidden border border-highlight/20 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-secondary/20">
            <motion.div 
              className="absolute inset-0 origin-center"
              style={{ scale: prefersReducedMotion ? 1 : parallaxScale }}
            >
              {INGREDIENTS.map((ingredient, index) => (
                <motion.div
                  key={ingredient.name}
                  initial={false}
                  animate={{ 
                    opacity: activeIndex === index ? 1 : 0,
                    scale: activeIndex === index ? 1 : 1.04
                  }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <Image
                    src={ingredient.image}
                    alt={`High-magnification macro photography of raw ${ingredient.name}`}
                    fill
                    className="object-cover object-center mix-blend-luminosity opacity-80"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  {/* Subtle dark vignette and warm backlight */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-primary/40" />
                </motion.div>
              ))}
            </motion.div>

            {/* Specular glass edge */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
          </div>

          {/* Right: Crossfading Editorial Narrative */}
          <div className="lg:col-span-7 relative flex flex-col justify-center min-h-[380px] lg:min-h-[580px]">
            <RevealOnScroll className="mb-12">
              <h2 className="text-highlight font-semibold tracking-[0.2em] text-sm uppercase mb-4">
                The Formula
              </h2>
              <p className="font-display text-4xl sm:text-5xl text-foreground mb-6">
                Nothing synthetic. <br />
                Nothing accidental.
              </p>
            </RevealOnScroll>

            <div className="relative h-[220px]">
              {INGREDIENTS.map((ingredient, index) => (
                <motion.div
                  key={ingredient.name}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ 
                    opacity: activeIndex === index ? 1 : 0,
                    y: activeIndex === index ? 0 : 20,
                    pointerEvents: activeIndex === index ? "auto" : "none"
                  }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs uppercase tracking-[0.2em] text-highlight font-semibold">
                      0{index + 1}
                    </span>
                    <span className="w-6 h-px bg-highlight/40" />
                    <span className="text-sm uppercase tracking-wider text-muted-foreground">
                      Active Botanical
                    </span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
                    {ingredient.role}
                  </h3>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                    We select each element not just for its individual efficacy, but for how it synergizes with the rest of the formula to decelerate your nervous system.
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function IngredientsHorizontalScroll() {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const scrollPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  // Add physics to the scroll for a smoother, high-end feel
  const springScroll = useSpring(scrollPercent, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const transform = useMotionTemplate`translateX(calc(-${springScroll}% + ${springScroll}vw))`;

  return (
    <section ref={targetRef} className="relative h-[200vh] border-t border-muted/30">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div 
          style={{ transform: prefersReducedMotion ? "none" : transform }} 
          className="flex gap-16 sm:gap-24 lg:gap-32 px-[8vw] w-max"
        >
          {INGREDIENTS.map((ingredient, index) => (
            <div 
              key={ingredient.name} 
              className="w-[85vw] sm:w-[70vw] lg:w-[55vw] xl:w-[48vw] flex-shrink-0 flex flex-col justify-center p-8 sm:p-12 rounded-3xl bg-secondary/15 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group"
            >
              {/* Subtle background glow tailored to ingredient */}
              <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-highlight/5 blur-3xl rounded-full pointer-events-none group-hover:bg-highlight/10 transition-colors duration-700" />

              <div className="flex items-center justify-between mb-8">
                <span className="text-highlight font-semibold tracking-[0.2em] text-sm uppercase">
                  Botanical Origin 0{index + 1}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground/70 font-medium">
                  {ingredient.role}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8">
                <div className="md:col-span-7">
                  <h3 className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground tracking-tight mb-4">
                    {ingredient.name}
                  </h3>
                  <div className="h-px w-20 bg-highlight/40 mb-6" />
                  <p className="text-lg sm:text-xl text-foreground/90 font-light leading-relaxed">
                    {ingredient.description}
                  </p>
                </div>

                {/* Tactile Macro Botanical Photo Window */}
                <div className="md:col-span-5 relative aspect-square w-full max-w-[240px] sm:max-w-[260px] mx-auto rounded-2xl overflow-hidden border border-highlight/30 shadow-xl group-hover:border-highlight/50 transition-colors duration-500">
                  <Image
                    src={ingredient.image}
                    alt={`Macro view of ${ingredient.name}`}
                    fill
                    className="object-cover object-center mix-blend-luminosity opacity-85 transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground/60 tracking-wider uppercase">
                <span>100% Pure Origin</span>
                <span>Ethically Sourced</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function Ingredients() {
  return (
    <>
      <FormulaSection />
      <IngredientsHorizontalScroll />
    </>
  );
}
