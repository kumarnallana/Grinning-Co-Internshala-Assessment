"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { TESTIMONIALS } from "@/lib/constants";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

export function Testimonials() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Slight parallax effect for background
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} id="reviews" className="pt-24 sm:pt-32 pb-12 relative overflow-hidden text-foreground border-t border-muted/30">
      
      {/* Subtle parallax background texture */}
      {!prefersReducedMotion && (
        <motion.div 
          style={{ y }}
          className="absolute inset-0 opacity-5 pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-full h-[200%] bg-[url('/images/story_bg_1787075461396.jpg')] bg-repeat bg-[length:400px_400px]" />
        </motion.div>
      )}

      <Container className="relative z-10 w-full mb-16 sm:mb-24">
        <RevealOnScroll className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-highlight font-semibold tracking-[0.2em] text-sm uppercase mb-4">
              The Evidence
            </h2>
            <p className="font-display text-4xl sm:text-5xl">
              Those who have stopped.
            </p>
          </div>
          
          {/* Trust Signals */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-highlight text-highlight" />
              ))}
            </div>
            <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground">
              4.9/5 Average Rating (500+ Reviews)
            </p>
          </div>
        </RevealOnScroll>
      </Container>

      {/* Horizontal Draggable/Scrollable Carousel */}
      <div 
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing pb-12"
        ref={scrollContainerRef}
      >
        <motion.div
          drag="x"
          dragConstraints={scrollContainerRef}
          className="flex gap-6 sm:gap-8 px-4 sm:px-8 md:px-16 w-max"
        >
          {TESTIMONIALS.map((review, index) => (
            <motion.div 
              key={index}
              className="flex-shrink-0 w-[300px] sm:w-[400px] md:w-[500px] bg-secondary/30 p-8 sm:p-12 rounded-sm border border-white/5 flex flex-col justify-between"
              whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-highlight text-highlight" />
                  ))}
                </div>
                <blockquote className="font-display text-xl sm:text-2xl leading-relaxed text-foreground/90">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
              </div>
              
              <figcaption className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm border border-highlight/20 bg-primary flex items-center justify-center relative overflow-hidden shrink-0 shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-highlight/20 via-transparent to-transparent" />
                  <div className="absolute inset-0 opacity-20 bg-[url('/images/story_bg_1787075461396.jpg')] bg-cover mix-blend-overlay" />
                  <span className="font-display text-highlight text-lg italic tracking-widest relative z-10 opacity-90">
                    {review.author.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground tracking-wide text-sm">
                    {review.author}
                  </div>
                  <div className="text-muted-foreground text-xs uppercase tracking-widest mt-1">
                    {review.role}
                  </div>
                </div>
              </figcaption>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
