"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { HOW_IT_WORKS } from "@/lib/constants";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { motion } from "framer-motion";

export function HowItWorks() {
  return (
    <section id="ritual" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 z-0 bg-secondary/5" />

      <Container className="relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left: Sticky Header Context */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 max-w-md">
            <RevealOnScroll>
              <h2 className="text-highlight font-semibold tracking-[0.2em] text-sm uppercase mb-4">
                The Ritual
              </h2>
              <p className="font-display text-4xl sm:text-5xl text-foreground mb-6">
                How to return <br /> to yourself.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                True rest requires intent. We designed this four-step process to actively signal to your nervous system that the day&apos;s acceleration is officially over.
              </p>
            </RevealOnScroll>
          </div>

          {/* Right: Progressive Reveal Vertical List */}
          <div className="lg:col-span-7 relative">
            {/* Background track line */}
            <div className="absolute left-[35px] sm:left-[43px] top-8 bottom-8 w-px bg-muted-foreground/20 hidden sm:block" />

            <div className="space-y-24 sm:space-y-32">
              {HOW_IT_WORKS.map((item) => (
                <motion.div
                  key={item.step}
                  className="relative group flex flex-col sm:flex-row gap-6 sm:gap-12 items-start p-4 sm:p-8 rounded-xl transition-colors duration-1000"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                  variants={{
                    hidden: { opacity: 0.3, scale: 0.95, filter: "grayscale(100%)", backgroundColor: "rgba(21, 23, 38, 0)" },
                    visible: { opacity: 1, scale: 1, filter: "grayscale(0%)", backgroundColor: "rgba(21, 23, 38, 0.5)" }
                  }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Subtle active state glow */}
                  <motion.div 
                    className="absolute inset-0 rounded-xl bg-highlight/5 z-0"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 }
                    }}
                  />

                  {/* Active highlight line indicator overlay (animates height when active) */}
                  <motion.div 
                    className="absolute left-[51px] sm:left-[75px] top-0 bottom-0 w-px bg-highlight origin-top hidden sm:block z-20"
                    variants={{
                      hidden: { scaleY: 0 },
                      visible: { scaleY: 1 }
                    }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  />

                  <div className="relative z-10 font-display text-6xl sm:text-7xl text-highlight/40 font-light tabular-nums tracking-tighter transition-colors duration-700 group-hover:text-highlight/80">
                    {item.step}
                  </div>
                  <div className="pt-2 sm:pt-4 relative z-10">
                    <h3 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
                      {item.title}
                    </h3>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
