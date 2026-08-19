"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { HOW_IT_WORKS } from "@/lib/constants";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { m } from "motion/react";

const RITUAL_STATES: Record<string, { theme: string; glow: string; cue: string; border: string }> = {
  "01": {
    theme: "from-highlight/15 via-highlight/5 to-transparent",
    glow: "rgba(201, 161, 90, 0.08)",
    cue: "Warm Infusion",
    border: "border-highlight/30"
  },
  "02": {
    theme: "from-[#182038]/60 via-[#101526]/40 to-transparent",
    glow: "rgba(24, 32, 56, 0.15)",
    cue: "Light Reduction",
    border: "border-[#3b476d]/40"
  },
  "03": {
    theme: "from-[#8C2F39]/20 via-[#4a191f]/10 to-transparent",
    glow: "rgba(140, 47, 57, 0.1)",
    cue: "Respiratory Rhythm",
    border: "border-[#8C2F39]/40"
  },
  "04": {
    theme: "from-black/70 via-[#0a0a0a]/50 to-transparent",
    glow: "rgba(0, 0, 0, 0.3)",
    cue: "Zero-Stimulus Stillness",
    border: "border-white/15"
  }
};

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
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                True rest requires intent. We designed this four-step process to actively signal to your nervous system that the day&apos;s acceleration is officially over.
              </p>
              <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                <span className="text-xs uppercase tracking-[0.2em] text-highlight/80 font-medium block mb-1">Ritual Discipline</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Perform each step in sequence 45 minutes before sleep to establish circadian Pavlovian stillness.
                </p>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: Progressive Reveal Vertical List */}
          <div className="lg:col-span-7 relative">
            {/* Background track line */}
            <div className="absolute left-[35px] sm:left-[43px] top-8 bottom-8 w-px bg-muted-foreground/20 hidden sm:block" />

            <div className="space-y-24 sm:space-y-32">
              {HOW_IT_WORKS.map((item) => {
                const state = RITUAL_STATES[item.step] || RITUAL_STATES["01"];
                return (
                  <m.div
                    key={item.step}
                    className={`relative group flex flex-col sm:flex-row gap-6 sm:gap-12 items-start p-6 sm:p-10 rounded-2xl border transition-all duration-1000 ${state.border}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                    variants={{
                      hidden: { opacity: 0.35, scale: 0.96, filter: "grayscale(80%)", backgroundColor: "rgba(10, 10, 15, 0)" },
                      visible: { opacity: 1, scale: 1, filter: "grayscale(0%)", backgroundColor: "rgba(18, 19, 28, 0.65)" }
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Sensory Ambient Gradient Background */}
                    <m.div 
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${state.theme} z-0 pointer-events-none`}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                      }}
                      transition={{ duration: 1 }}
                    />

                    {/* Active highlight line indicator overlay */}
                    <m.div 
                      className="absolute left-[51px] sm:left-[75px] top-0 bottom-0 w-px bg-highlight origin-top hidden sm:block z-20"
                      variants={{
                        hidden: { scaleY: 0 },
                        visible: { scaleY: 1 }
                      }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    />

                    <div className="relative z-10 flex flex-col items-start">
                      <span className="font-display text-6xl sm:text-7xl text-highlight/40 font-light tabular-nums tracking-tighter transition-colors duration-700 group-hover:text-highlight/90">
                        {item.step}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mt-1 font-medium">
                        {state.cue}
                      </span>
                    </div>

                    <div className="pt-2 sm:pt-4 relative z-10">
                      <h3 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
                        {item.title}
                      </h3>
                      <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                        {item.description}
                      </p>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
