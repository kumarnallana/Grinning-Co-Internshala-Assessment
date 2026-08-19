"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { INGREDIENTS } from "@/lib/constants";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "motion/react";

function ActiveBotanicalStage({ activeIndex }: { activeIndex: number }) {
  const prefersReducedMotion = useReducedMotion();
  const active = INGREDIENTS[activeIndex];

  return (
    <div className="relative grid" role="group" aria-label="Botanical detail">
      <AnimatePresence mode="popLayout" initial={false}>
        {active && (
          <motion.div
            key={active.name}
            className="col-start-1 row-start-1"
            data-active="true"
            data-state="active"
            aria-hidden="false"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, pointerEvents: "auto" }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, pointerEvents: "none" }}
            transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onAnimationStart={() => {
              // During exit, Framer Motion animates the element but it stays in DOM until exit finishes.
              // To ensure it doesn't receive pointer events, we added pointerEvents: "none" to the exit state above.
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs uppercase tracking-[0.2em] text-highlight font-semibold">
                0{activeIndex + 1}
              </span>
              <span className="w-6 h-px bg-highlight/40" />
              <span className="text-sm uppercase tracking-wider text-muted-foreground">
                Active Botanical
              </span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
              {active.role}
            </h3>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              {active.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Ingredients() {
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
    <section ref={containerRef} id="ingredients" className="py-24 sm:py-32 relative h-[200vh]">
      <Container className="w-full h-full relative">
        <div className="sticky top-32 grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left: Sticky Image Context with Macro Focal Crawl */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] lg:h-[580px] rounded-2xl overflow-hidden border border-highlight/20 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-secondary/20">
            <motion.div 
              className="absolute inset-0 origin-center"
              style={{ scale: prefersReducedMotion ? 1 : parallaxScale }}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={false}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <Image
                    src={INGREDIENTS[activeIndex].image}
                    alt={`High-magnification macro photography of raw ${INGREDIENTS[activeIndex].name}`}
                    fill
                    className="object-cover object-center mix-blend-luminosity opacity-80"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  {/* Subtle dark vignette and warm backlight */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-primary/40" />
                </motion.div>
              </AnimatePresence>
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

            <ActiveBotanicalStage activeIndex={activeIndex} />
          </div>
        </div>
      </Container>
    </section>
  );
}
