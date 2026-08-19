"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PRODUCTS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { motion, useReducedMotion, useTransform, useMotionValue, useSpring } from "framer-motion";

const PRODUCT_IMAGES = [
  "/images/product_1_1787073157894.jpg",
  "/images/product_2_1787073183249.jpg",
  "/images/product_3_1787073202462.jpg",
];

const BLEND_THEMES = [
  {
    glow: "rgba(59, 94, 125, 0.35)",
    badge: "Oceanic Twilight",
  },
  {
    glow: "rgba(201, 161, 90, 0.3)",
    badge: "Warm Golden Spice",
  },
  {
    glow: "rgba(109, 59, 125, 0.35)",
    badge: "Midnight Botanical",
  },
];

function ProductImageCard({ 
  src, 
  alt, 
  theme, 
  prefersReducedMotion 
}: { 
  src: string; 
  alt: string; 
  theme: typeof BLEND_THEMES[0]; 
  prefersReducedMotion: boolean | null;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[45vh] lg:h-[62vh] w-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 transition-colors duration-700"
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center mix-blend-luminosity opacity-85 transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent pointer-events-none" />

        {/* Specular Sheen Sweep on hover */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none mix-blend-overlay bg-gradient-to-tr from-transparent via-white to-transparent" />
        )}
      </motion.div>

      {/* Signature Blend Atmospheric Glow */}
      <div 
        className="absolute inset-0 blur-[90px] rounded-full z-[-1] scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: theme.glow }}
      />
    </div>
  );
}

function ProductRow({ product, index }: { product: typeof PRODUCTS[0], index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const theme = BLEND_THEMES[index] || BLEND_THEMES[0];

  return (
    <div ref={ref} className="relative min-h-[75vh] flex items-center py-16 sm:py-20 border-b border-muted/20 last:border-0">
      <div className={`w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-center ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
        
        {/* Tangible 3D Image Container */}
        <div className={`relative w-full ${index % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
          <ProductImageCard
            src={PRODUCT_IMAGES[index]}
            alt={`Packaging for Redroot ${product.name}`}
            theme={theme}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* Contextual Information Sequence */}
        <motion.div 
          className={`relative z-10 p-4 sm:p-8 lg:p-0 ${index % 2 !== 0 ? 'lg:col-start-1' : ''}`}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-[0.2em] text-highlight font-semibold">
              Blend 0{index + 1}
            </span>
            <span className="w-8 h-px bg-highlight/30" />
            <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
              {theme.badge}
            </span>
          </div>
          
          <h3 className="font-display tracking-tight text-5xl sm:text-6xl lg:text-7xl text-foreground mb-4">
            {product.name}
          </h3>
          <span className="text-2xl text-highlight font-light tabular-nums tracking-wider mb-6 block">
            {product.price}
          </span>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
            {product.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-10">
            {product.notes.map((note) => (
              <span key={note} className="text-xs tracking-[0.1em] uppercase text-highlight/90 font-medium px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10">
                ✦ {note}
              </span>
            ))}
          </div>

          <div>
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-muted-foreground/30 hover:bg-highlight hover:text-primary hover:border-highlight group/btn">
              Explore Blend
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export function ProductShowcase() {
  return (
    <section id="blends" className="relative pt-24 sm:pt-32">
      <Container>
        <div className="mb-16 md:mb-24 max-w-2xl">
          <h2 className="text-highlight font-semibold tracking-[0.2em] text-sm uppercase mb-4">
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
