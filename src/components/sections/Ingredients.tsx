"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { INGREDIENTS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

export function Ingredients() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeIngredient = INGREDIENTS[activeIndex];

  return (
    <section id="ingredients" className="py-32 relative text-foreground border-t border-muted/30 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-primary/90 z-[-1]" />
      <Container className="w-full">
        <div className="mb-16">
          <h2 className="text-highlight font-semibold tracking-[0.2em] text-sm uppercase mb-4">
            The Formula
          </h2>
          <p className="font-display text-4xl sm:text-5xl mb-6">
            Nothing synthetic. <br />
            Nothing accidental.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Left: Interactive List */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {INGREDIENTS.map((ingredient, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={ingredient.name}
                  onClick={() => setActiveIndex(index)}
                  className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight rounded-sm"
                >
                  <span className={`block text-xs tracking-[0.2em] uppercase mb-2 transition-colors duration-500 ${isActive ? 'text-highlight' : 'text-muted-foreground group-hover:text-highlight/70'}`}>
                    0{index + 1} — {ingredient.role}
                  </span>
                  <h3 className={`font-display text-4xl sm:text-5xl md:text-6xl transition-all duration-500 ${isActive ? 'text-foreground translate-x-4' : 'text-muted-foreground/30 group-hover:text-muted-foreground'}`}>
                    {ingredient.name}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Right: Dynamic Visual State */}
          <div className="lg:col-span-7 relative h-[500px] lg:h-[600px] rounded-sm overflow-hidden bg-secondary/20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIngredient.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activeIngredient.image}
                  alt={`Macro photography of ${activeIngredient.name}`}
                  fill
                  className="object-cover object-center opacity-70 mix-blend-luminosity"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
                  <p className="text-xl sm:text-2xl text-foreground leading-relaxed font-display max-w-xl">
                    {activeIngredient.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
