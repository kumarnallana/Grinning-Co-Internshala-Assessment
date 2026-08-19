"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { INGREDIENTS } from "@/lib/constants";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { motion, useScroll } from "framer-motion";

export function Ingredients() {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Simple scroll progress mapping to index for image switching
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.33) setActiveImageIndex(0);
      else if (latest < 0.66) setActiveImageIndex(1);
      else setActiveImageIndex(2);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} id="ingredients" className="py-24 sm:py-32 relative border-t border-muted/30">
      <Container className="w-full">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left: Sticky Image Context */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 relative h-[400px] lg:h-[600px] rounded-sm overflow-hidden bg-secondary/20 order-last lg:order-first border border-muted/30 mt-16 lg:mt-0">
            {INGREDIENTS.map((ingredient, index) => (
              <motion.div
                key={ingredient.name}
                initial={false}
                animate={{ opacity: activeImageIndex === index ? 1 : 0, scale: activeImageIndex === index ? 1 : 1.05 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 pointer-events-none"
              >
                <Image
                  src={ingredient.image}
                  alt={`Macro photography of ${ingredient.name}`}
                  fill
                  className="object-cover object-center mix-blend-luminosity opacity-70"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>

          {/* Right: Progressive Reveal Vertical List */}
          <div className="lg:col-span-7 relative">
            <RevealOnScroll className="mb-16">
              <h2 className="text-highlight font-semibold tracking-[0.2em] text-sm uppercase mb-4">
                The Formula
              </h2>
              <p className="font-display text-4xl sm:text-5xl text-foreground mb-6">
                Nothing synthetic. <br />
                Nothing accidental.
              </p>
            </RevealOnScroll>

            {/* Background track line */}
            <div className="absolute left-0 top-32 bottom-8 w-px bg-muted-foreground/20 hidden sm:block" />

            <div className="space-y-24 sm:space-y-32 ml-0 sm:ml-8">
              {INGREDIENTS.map((ingredient, index) => (
                <motion.div
                  key={ingredient.name}
                  className="relative group flex flex-col items-start pl-0 sm:pl-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                  variants={{
                    hidden: { opacity: 0.3, x: -10, filter: "grayscale(100%)" },
                    visible: { opacity: 1, x: 0, filter: "grayscale(0%)" }
                  }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Active highlight line indicator overlay */}
                  <div className="absolute left-[-32px] top-0 bottom-0 w-px bg-highlight origin-top hidden sm:block scale-y-0 group-[[data-inview='true']]:scale-y-100 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]" />

                  <span className="block text-xs tracking-[0.2em] uppercase mb-4 text-highlight">
                    0{index + 1} — {ingredient.role}
                  </span>
                  <h3 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-6">
                    {ingredient.name}
                  </h3>
                  <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                    {ingredient.description}
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
