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

  // Subtle 2-4% parallax for the sticky image
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  return (
    <section ref={containerRef} className="pt-24 sm:pt-32 pb-0 relative h-[200vh] mb-[20vh]">
      <Container className="w-full h-full relative">
        <div className="sticky top-32 grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left: Sticky Image Context with Parallax */}
          <div className="lg:col-span-5 relative h-[400px] lg:h-[600px] rounded-sm overflow-hidden border border-muted/30">
            <motion.div 
              className="absolute inset-0 origin-center"
              style={{ scale: prefersReducedMotion ? 1 : parallaxScale }}
            >
              {INGREDIENTS.map((ingredient, index) => (
                <motion.div
                  key={ingredient.name}
                  initial={false}
                  animate={{ opacity: activeIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <Image
                    src={ingredient.image}
                    alt={`Macro photography representing ${ingredient.role}`}
                    fill
                    className="object-cover object-center mix-blend-luminosity opacity-70"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Crossfading Text (No vertical lines) */}
          <div className="lg:col-span-7 relative flex flex-col justify-center min-h-[400px] lg:min-h-[600px]">
            <RevealOnScroll className="mb-12">
              <h2 className="text-highlight font-semibold tracking-[0.2em] text-sm uppercase mb-4">
                The Formula
              </h2>
              <p className="font-display text-4xl sm:text-5xl text-foreground mb-6">
                Nothing synthetic. <br />
                Nothing accidental.
              </p>
            </RevealOnScroll>

            <div className="relative h-[200px]">
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
                  <h3 className="font-display text-3xl text-foreground mb-4">
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
          className="flex gap-32 px-[10vw] w-max"
        >
          {INGREDIENTS.map((ingredient, index) => (
            <div key={ingredient.name} className="w-[80vw] sm:w-[60vw] lg:w-[40vw] flex-shrink-0 flex flex-col justify-center">
              <span className="text-highlight font-semibold tracking-[0.2em] text-sm uppercase mb-6 block">
                0{index + 1}
              </span>
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-end mb-8">
                <h3 className="font-display text-6xl sm:text-7xl lg:text-8xl text-foreground whitespace-nowrap">
                  {ingredient.name}
                </h3>
                <span className="text-xl text-muted-foreground italic mb-2 md:mb-4">
                  {ingredient.role}
                </span>
              </div>
              <div className="h-px w-full bg-muted-foreground/30 mb-8" />
              <p className="text-2xl sm:text-3xl text-foreground/90 font-light leading-relaxed max-w-2xl">
                {ingredient.description}
              </p>
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
