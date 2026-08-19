"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { TESTIMONIALS } from "@/lib/constants";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [direction, setDirection] = React.useState(1);

  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir * 100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir * -100,
      opacity: 0,
    }),
  };

  return (
    <section 
      id="reviews" 
      className="pt-24 sm:pt-32 pb-12 relative overflow-hidden text-foreground border-t border-muted/30"
      aria-labelledby="testimonials-heading"
    >
      <Container className="relative z-10 w-full mb-16">
        <RevealOnScroll className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-highlight font-semibold tracking-[0.2em] text-sm uppercase mb-4">
              The Evidence
            </h2>
            <p id="testimonials-heading" className="font-display text-4xl sm:text-5xl">
              Those who have stopped.
            </p>
          </div>
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

      <Container>
        <div 
          className="relative max-w-4xl mx-auto"
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer Testimonials"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Controls */}
          <div className="absolute top-1/2 -left-4 sm:-left-12 -translate-y-1/2 z-20">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full border border-white/10 bg-secondary/50 hover:bg-secondary text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 sm:-right-12 -translate-y-1/2 z-20">
            <button 
              onClick={handleNext}
              className="p-2 rounded-full border border-white/10 bg-secondary/50 hover:bg-secondary text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Carousel Track */}
          <div className="relative h-[350px] sm:h-[300px] overflow-hidden rounded-xl border border-white/5 bg-secondary/20 shadow-2xl">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
                className="absolute inset-0 flex flex-col justify-between p-8 sm:p-12"
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonial ${currentIndex + 1} of ${TESTIMONIALS.length}`}
              >
                <div className="mb-8">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-highlight text-highlight" />
                    ))}
                  </div>
                  <blockquote className="font-display text-xl sm:text-2xl leading-relaxed text-foreground/90">
                    &ldquo;{TESTIMONIALS[currentIndex].quote}&rdquo;
                  </blockquote>
                </div>
                
                <figcaption className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm border border-highlight/20 bg-primary flex items-center justify-center relative overflow-hidden shrink-0 shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)]">
                    <span className="font-display text-highlight text-lg italic tracking-widest relative z-10 opacity-90">
                      {TESTIMONIALS[currentIndex].author.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground tracking-wide text-sm">
                      {TESTIMONIALS[currentIndex].author}
                    </div>
                    <div className="text-muted-foreground text-xs uppercase tracking-widest mt-1">
                      {TESTIMONIALS[currentIndex].role}
                    </div>
                  </div>
                </figcaption>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight ${
                  index === currentIndex ? "w-8 bg-highlight" : "w-2 bg-muted hover:bg-muted/80"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
