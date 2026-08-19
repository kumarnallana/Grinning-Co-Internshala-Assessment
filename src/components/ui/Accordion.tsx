"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export interface AccordionItem {
  question: string;
  answer: string;
  category?: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0); // First item open by default for rich visual entry

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const itemNumber = (index + 1).toString().padStart(2, "0");

        return (
          <motion.div 
            key={item.question}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
              isOpen 
                ? "bg-secondary/30 border-highlight/35 shadow-[0_10px_35px_-10px_rgba(201,161,90,0.12)]" 
                : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.035]"
            }`}
          >
            <button
              id={`faq-question-${index}`}
              className="flex w-full items-center justify-between text-left p-6 sm:p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight rounded-2xl group cursor-pointer"
              onClick={() => toggleIndex(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <div className="flex items-center gap-4 sm:gap-6 pr-6">
                <span className={`font-display text-sm sm:text-base transition-colors duration-300 font-light tabular-nums ${
                  isOpen ? "text-highlight" : "text-muted-foreground/60 group-hover:text-muted-foreground"
                }`}>
                  {itemNumber}
                </span>
                <span className={`font-display text-xl sm:text-2xl transition-colors duration-300 ${
                  isOpen ? "text-foreground font-medium" : "text-foreground/85 group-hover:text-foreground"
                }`}>
                  {item.question}
                </span>
              </div>

              {/* Animated Geometric Indicator */}
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${
                isOpen 
                  ? "bg-highlight text-primary border-highlight shadow-[0_0_15px_rgba(201,161,90,0.4)]" 
                  : "bg-white/[0.04] text-muted-foreground border-white/10 group-hover:border-highlight/40 group-hover:text-highlight"
              }`}>
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div className="px-6 sm:px-8 pb-8 pt-0 pl-14 sm:pl-20">
                    <div className="h-px w-12 bg-highlight/30 mb-4" />
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
