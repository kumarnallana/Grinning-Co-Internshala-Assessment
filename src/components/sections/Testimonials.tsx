"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { TESTIMONIALS } from "@/lib/constants";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";

function TestimonialItem({ 
  review, 
  index, 
  total,
  scrollYProgress 
}: { 
  review: typeof TESTIMONIALS[0], 
  index: number,
  total: number,
  scrollYProgress: MotionValue<number> 
}) {
  const step = 1 / total;
  const start = index * step;
  const peak = start + (step / 2);
  const end = start + step;
  
  const opacityRanges = index === total - 1 
    ? [start - 0.1, start, 1] 
    : [start - 0.1, start, peak, end];
  
  const opacityValues = index === total - 1 
    ? [0, 1, 1]
    : [0, 1, 1, 0];

  const opacity = useTransform(scrollYProgress, opacityRanges, opacityValues);
  const y = useTransform(scrollYProgress, [start - 0.1, start, peak, end], [30, 0, 0, -30]);

  return (
    <motion.figure 
      className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-8"
      style={{ opacity, y, pointerEvents: index === total - 1 ? "auto" : "none" }}
    >
      <div className="text-highlight font-display text-8xl mb-4 opacity-20">
        &ldquo;
      </div>
      <blockquote className="max-w-4xl font-display text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground mb-12">
        {review.quote}
      </blockquote>
      <figcaption className="flex flex-col items-center">
        <div className="font-medium text-foreground uppercase tracking-widest text-sm mb-1">
          {review.author}
        </div>
        <div className="text-muted-foreground text-sm">
          {review.role}
        </div>
      </figcaption>
    </motion.figure>
  );
}

export function Testimonials() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} id="reviews" className="relative bg-secondary/5 border-t border-muted/30" style={{ height: prefersReducedMotion ? 'auto' : '300vh' }}>
      <div className={prefersReducedMotion ? "py-24 sm:py-32" : "sticky top-0 h-screen flex flex-col overflow-hidden"}>
        <div className="w-full text-center pt-24 sm:pt-32 relative z-20">
          <h2 className="text-highlight font-semibold tracking-widest text-sm uppercase mb-4">
            The Evidence
          </h2>
          <p className="font-display text-xl text-muted-foreground">
            Those who have stopped.
          </p>
        </div>

        <Container className="relative z-10 w-full flex-1">
          {prefersReducedMotion ? (
            <div className="space-y-24 mt-16">
               {TESTIMONIALS.map((review, index) => (
                  <figure key={index} className="flex flex-col items-center text-center">
                    <div className="text-highlight font-display text-8xl mb-4 opacity-20">&ldquo;</div>
                    <blockquote className="max-w-4xl font-display text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground mb-12">
                      {review.quote}
                    </blockquote>
                    <figcaption className="flex flex-col items-center">
                      <div className="font-medium text-foreground uppercase tracking-widest text-sm mb-1">
                        {review.author}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {review.role}
                      </div>
                    </figcaption>
                  </figure>
               ))}
            </div>
          ) : (
            <div className="relative w-full h-full">
              {TESTIMONIALS.map((review, index) => (
                <TestimonialItem 
                  key={index} 
                  review={review} 
                  index={index} 
                  total={TESTIMONIALS.length}
                  scrollYProgress={scrollYProgress} 
                />
              ))}
            </div>
          )}
        </Container>
      </div>
    </section>
  );
}
