"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PRODUCTS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const PRODUCT_IMAGES = [
  "/images/product_1_1787073157894.jpg",
  "/images/product_2_1787073183249.jpg",
  "/images/product_3_1787073202462.jpg",
];

function ProductRow({ product, index }: { product: typeof PRODUCTS[0], index: number }) {
  const prefersReducedMotion = useReducedMotion();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center py-20 border-b border-muted/20 last:border-0">
      <div className={`w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-center ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
        
        {/* Tangible Image Container */}
        <div className={`relative h-[50vh] lg:h-[70vh] w-full overflow-hidden rounded-sm ${index % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
          <motion.div 
            className="absolute inset-[-10%]"
            initial={prefersReducedMotion ? { opacity: 1 } : { scale: 1.15, rotate: 2, opacity: 0 }}
            whileInView={prefersReducedMotion ? {} : { scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={PRODUCT_IMAGES[index]}
              alt={`Packaging for ${product.name}`}
              fill
              className="object-cover object-center mix-blend-luminosity opacity-70"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
          </motion.div>
        </div>

        {/* Contextual Information Sequence */}
        <motion.div 
          className={`relative z-10 p-8 lg:p-0 ${index % 2 !== 0 ? 'lg:col-start-1' : ''}`}
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-6">
            {product.notes.map((note) => (
              <span key={note} className="text-xs tracking-[0.1em] uppercase text-highlight/90 font-medium">
                {note}
              </span>
            ))}
          </motion.div>
          
          <motion.h3 variants={itemVariants} className="font-display tracking-tight text-5xl sm:text-6xl lg:text-7xl text-foreground mb-4">
            {product.name}
          </motion.h3>
          <motion.span variants={itemVariants} className="text-2xl text-highlight font-light tabular-nums tracking-wider mb-8 block">
            {product.price}
          </motion.span>

          <motion.p variants={itemVariants} className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
            {product.description}
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-muted-foreground/30 hover:bg-highlight hover:text-primary hover:border-highlight group/btn">
              Explore Blend
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}

export function ProductShowcase() {
  return (
    <section id="blends" className="relative bg-primary pt-24 sm:pt-32">
      <Container>
        <div className="mb-16 md:mb-24 max-w-2xl">
          <h2 className="text-highlight font-semibold tracking-widest text-sm uppercase mb-4">
            Signature Blends
          </h2>
          <p className="font-display text-4xl sm:text-5xl text-foreground mb-6">
            The architecture of rest.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Three distinct formulations. Each designed to target specific stages of sensory deceleration and mental unspooling.
          </p>
        </div>
      </Container>

      <Container>
        {PRODUCTS.map((product, index) => (
          <ProductRow key={product.id} product={product} index={index} />
        ))}
      </Container>
    </section>
  );
}
