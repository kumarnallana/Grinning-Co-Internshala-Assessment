"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { INGREDIENTS } from "@/data/ingredients";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { motion, useScroll, useTransform, useReducedMotion, useSpring, useMotionTemplate, AnimatePresence } from "framer-motion";
import { Sparkles, Compass, Dna } from "lucide-react";

function FormulaSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Single Source of Truth for Active Botanical State
  const [activeIndex, setActiveIndex] = React.useState(0);
  
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Discrete bucketed boundaries with clear hysteresis thresholds
      if (latest < 0.33) {
        setActiveIndex(0);
      } else if (latest < 0.66) {
        setActiveIndex(1);
      } else {
        setActiveIndex(2);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Cinematic macro focal crawl
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.07]);
  const activeIngredient = INGREDIENTS[activeIndex] || INGREDIENTS[0];

  return (
    <section ref={containerRef} id="formula" className="py-24 sm:py-32 relative h-[240vh]">
      <Container className="w-full h-full relative">
        <div className="sticky top-32 grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left: Sticky Macro Image Canvas (Single Source of Truth) */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] lg:h-[580px] rounded-2xl overflow-hidden border border-highlight/25 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-secondary/30">
            <motion.div 
              className="absolute inset-0 origin-center"
              style={{ scale: prefersReducedMotion ? 1 : parallaxScale }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIngredient.name}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeIngredient.image}
                    alt={`High-magnification botanical macro photography of ${activeIngredient.name}`}
                    fill
                    priority
                    className="object-cover object-center mix-blend-luminosity opacity-85"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  {/* Atmospheric vignette & light overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-transparent to-primary/50" />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Specular glass edge & corner badge */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-muted-foreground z-20">
              <span className="flex items-center gap-1.5 text-highlight font-medium">
                <Compass className="w-3.5 h-3.5" />
                <span>{activeIngredient.origin}</span>
              </span>
              <span className="font-mono text-[10px] tracking-wider text-muted-foreground/80">100% BIO-ACTIVE</span>
            </div>
          </div>

          {/* Right: Crossfading Narrative with Zero-Ghosting Architecture */}
          <div className="lg:col-span-7 relative flex flex-col justify-center min-h-[380px] lg:min-h-[580px]">
            <RevealOnScroll className="mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-highlight/10 border border-highlight/20 text-xs font-semibold uppercase tracking-[0.2em] text-highlight mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pharmacological Architecture</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl text-foreground tracking-tight mb-4">
                The Formula.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl font-light">
                Nothing synthetic. Nothing accidental. Every adaptogen and amino acid is calibrated to systematically quiet the central nervous system.
              </p>
            </RevealOnScroll>

            {/* Active Botanical Presenter: AnimatePresence mode="wait" guarantees ZERO simultaneous text double-exposure */}
            <div className="relative min-h-[260px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIngredient.number}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                  aria-live="polite"
                >
                  {/* Editorial Hierarchy: NUMBER -> CATEGORY -> BOTANICAL ROLE */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm uppercase tracking-[0.25em] text-highlight font-bold font-mono">
                      {activeIngredient.number}
                    </span>
                    <span className="w-6 h-px bg-highlight/40" />
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                      Active Botanical
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-highlight/60" />
                    <span className="text-xs uppercase tracking-wider text-highlight/90 font-medium">
                      {activeIngredient.botanicalFamily}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3 tracking-tight">
                    {activeIngredient.role} — <span className="text-highlight font-normal">{activeIngredient.name}</span>
                  </h3>

                  <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed max-w-xl mb-4 font-light">
                    {activeIngredient.description}
                  </p>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-2.5 max-w-xl">
                    <Dna className="w-4 h-4 text-highlight shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      <span className="text-foreground font-medium">Clinical Impact: </span>
                      {activeIngredient.scienceNote}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
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
  // Physics-based spring momentum
  const springScroll = useSpring(scrollPercent, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const transform = useMotionTemplate`translateX(calc(-${springScroll}% + ${springScroll}vw))`;

  return (
    <section ref={targetRef} id="ingredients" className="relative h-[200vh] border-t border-muted/30">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div 
          style={{ transform: prefersReducedMotion ? "none" : transform }} 
          className="flex gap-16 sm:gap-24 lg:gap-32 px-[8vw] w-max"
        >
          {INGREDIENTS.map((ingredient) => (
            <div 
              key={ingredient.name} 
              className="w-[85vw] sm:w-[70vw] lg:w-[55vw] xl:w-[48vw] flex-shrink-0 flex flex-col justify-center p-8 sm:p-12 rounded-3xl bg-secondary/15 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group"
            >
              {/* Subtle background ambient glow */}
              <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-highlight/5 blur-3xl rounded-full pointer-events-none group-hover:bg-highlight/10 transition-colors duration-700" />

              <div className="flex items-center justify-between mb-8">
                <span className="text-highlight font-semibold tracking-[0.2em] text-sm uppercase">
                  Botanical Origin {ingredient.number}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground/70 font-medium">
                  {ingredient.role}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8">
                <div className="md:col-span-7">
                  <h3 className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground tracking-tight mb-3">
                    {ingredient.name}
                  </h3>
                  <span className="text-xs font-mono tracking-wider text-highlight/80 uppercase block mb-4">
                    {ingredient.botanicalFamily}
                  </span>
                  <div className="h-px w-20 bg-highlight/40 mb-5" />
                  <p className="text-base sm:text-lg text-foreground/90 font-light leading-relaxed mb-4">
                    {ingredient.description}
                  </p>
                  <p className="text-xs text-muted-foreground/80 italic">
                    Source: {ingredient.origin}
                  </p>
                </div>

                {/* Tactile Macro Botanical Photo Window */}
                <div className="md:col-span-5 relative aspect-square w-full max-w-[240px] sm:max-w-[260px] mx-auto rounded-2xl overflow-hidden border border-highlight/30 shadow-xl group-hover:border-highlight/50 transition-colors duration-500">
                  <Image
                    src={ingredient.image}
                    alt={`Macro view of raw ${ingredient.name}`}
                    fill
                    className="object-cover object-center mix-blend-luminosity opacity-85 transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground/60 tracking-wider uppercase">
                <span>100% Pure Bio-Active Origin</span>
                <span>Clinically Validated Sourcing</span>
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
