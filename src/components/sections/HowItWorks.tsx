"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { HOW_IT_WORKS } from "@/lib/constants";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";

function StepItem({ 
  item, 
  index, 
  scrollYProgress 
}: { 
  item: typeof HOW_IT_WORKS[0], 
  index: number, 
  scrollYProgress: MotionValue<number> 
}) {
  const start = index * 0.25;
  const peak = start + 0.125;
  const end = start + 0.25;
  
  const opacityRanges = index === 3 
    ? [start - 0.05, start, 1] 
    : [start - 0.05, start, peak, end];
  
  const opacityValues = index === 3 
    ? [0, 1, 1]
    : [0, 1, 1, 0];

  const opacity = useTransform(scrollYProgress, opacityRanges, opacityValues);
  const y = useTransform(scrollYProgress, 
    [start - 0.1, start, peak, end], 
    [50, 0, 0, -50]
  );

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity, y, pointerEvents: index === 3 ? "auto" : "none" }}
    >
      <div className="group flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
        <span className="font-display text-6xl sm:text-7xl text-highlight/20 font-light tabular-nums tracking-tighter">
          {item.step}
        </span>
        <div>
          <h3 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
            {item.title}
          </h3>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section ref={containerRef} id="ritual" className="relative bg-primary" style={{ height: prefersReducedMotion ? 'auto' : '400vh' }}>
      <div className={prefersReducedMotion ? "py-24 sm:py-32" : "sticky top-0 h-screen flex items-center overflow-hidden"}>
        {!prefersReducedMotion && (
          <motion.div 
            className="absolute inset-0 z-0 bg-secondary/10"
            style={{ opacity: bgOpacity }}
          />
        )}

        <Container className="relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="max-w-md">
              <h2 className="text-highlight font-semibold tracking-[0.2em] text-sm uppercase mb-4">
                The Ritual
              </h2>
              <p className="font-display text-4xl sm:text-5xl text-foreground mb-6">
                How to return <br /> to yourself.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                True rest requires intent. We designed this four-step process to actively signal to your nervous system that the day&apos;s acceleration is officially over.
              </p>
            </div>

            {prefersReducedMotion ? (
              <div className="space-y-16">
                {HOW_IT_WORKS.map((item) => (
                  <div key={item.step} className="group flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                    <span className="font-display text-6xl sm:text-7xl text-highlight/20 font-light tabular-nums tracking-tighter">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
                        {item.title}
                      </h3>
                      <p className="text-xl text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative h-[300px] flex items-center">
                {HOW_IT_WORKS.map((item, index) => (
                  <StepItem 
                    key={item.step} 
                    item={item} 
                    index={index} 
                    scrollYProgress={scrollYProgress} 
                  />
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
