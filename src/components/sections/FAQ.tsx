"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { FAQS, FAQ_CATEGORIES } from "@/data/faq";
import { Accordion } from "@/components/ui/Accordion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { motion } from "framer-motion";
import { MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FAQ() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredFaqs = React.useMemo(() => {
    if (selectedCategory === "All") return FAQS;
    return FAQS.filter(faq => faq.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="faq" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] bg-highlight/5 blur-[140px] rounded-full pointer-events-none z-0" />

      <Container className="relative z-10">
        <RevealOnScroll className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-highlight/10 border border-highlight/20 text-xs font-semibold uppercase tracking-[0.2em] text-highlight mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clarity & Guidance</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight mb-6">
            Frequently asked questions.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed font-light">
            Everything you need to know about the formulation, circadian science, and ritual delivery.
          </p>
        </RevealOnScroll>

        {/* Category Filters */}
        <RevealOnScroll delay={0.1} className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {FAQ_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight ${
                  isSelected 
                    ? "text-primary font-semibold" 
                    : "text-muted-foreground hover:text-foreground bg-white/[0.02] hover:bg-white/[0.05] border border-white/5"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="faq-category-pill"
                    className="absolute inset-0 rounded-full bg-highlight shadow-[0_0_20px_rgba(201,161,90,0.35)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </RevealOnScroll>

        {/* Dynamic Animated Accordion */}
        <div className="mb-16">
          <Accordion key={selectedCategory} items={filteredFaqs} />
        </div>

        {/* Apothecary Concierge Card */}
        <RevealOnScroll delay={0.2} className="max-w-3xl mx-auto">
          <div className="p-8 sm:p-10 rounded-3xl bg-secondary/20 border border-highlight/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-highlight/10 blur-3xl rounded-full pointer-events-none" />
            
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-12 h-12 rounded-2xl bg-highlight/15 border border-highlight/30 flex items-center justify-center text-highlight shrink-0 shadow-lg">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl text-foreground mb-1.5">
                  Have a specific botanical inquiry?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md font-light">
                  Our master herbalists are available to guide your custom evening formulation.
                </p>
              </div>
            </div>

            <Button variant="outline" size="sm" className="whitespace-nowrap shrink-0 border-highlight/30 hover:bg-highlight hover:text-primary hover:border-highlight group/btn">
              Consult Herbalist
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
