"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PRODUCTS, Product } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { m, useReducedMotion, useTransform, useMotionValue, useSpring } from "motion/react";

function ProductImageCard({ 
  product,
  prefersReducedMotion 
}: { 
  product: Product;
  prefersReducedMotion: boolean | null;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    (e.target as HTMLElement).style.willChange = "transform";
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    (e.target as HTMLElement).style.willChange = "auto";
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
      className="relative h-[45vh] lg:h-[60vh] w-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
      style={{ perspective: 1200 }}
    >
      <m.div
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        initial={prefersReducedMotion ? { opacity: 1 } : { clipPath: "inset(0 100% 0 0)" }}
        whileInView={prefersReducedMotion ? undefined : { clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="relative w-full h-full rounded-2xl overflow-hidden border border-white/15 transition-colors duration-700 bg-secondary/20"
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src={product.image}
          alt={`Apothecary jar packaging for Redroot ${product.name} - ${product.tagline}`}
          fill
          className="object-cover object-center mix-blend-luminosity opacity-85 transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent pointer-events-none" />

        {/* Specular Sheen Sweep on hover */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none mix-blend-overlay bg-gradient-to-tr from-transparent via-white to-transparent" />
        )}

        {/* Blend Theme Badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-[0.2em] text-highlight flex items-center gap-1.5 shadow-lg">
          <Sparkles className="w-3 h-3 text-highlight" />
          <span>{product.badge}</span>
        </div>
      </m.div>

      {/* Signature Blend Atmospheric Glow */}
      <div 
        className="absolute inset-0 blur-[100px] rounded-full z-[-1] scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: product.accentGlow }}
      />
    </div>
  );
}

function ProductRow({ product, index }: { product: Product, index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative min-h-[70vh] flex items-center py-16 sm:py-20 border-b border-muted/20 last:border-0">
      <div className={`w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-center ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
        
        {/* Tangible 3D Image Container */}
        <div className={`relative w-full ${index % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
          <ProductImageCard
            product={product}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* Contextual Information Sequence */}
        <m.div 
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
              {product.tagline}
            </span>
          </div>
          
          <h3 className="font-display tracking-tight text-5xl sm:text-6xl lg:text-7xl text-foreground mb-4">
            {product.name}
          </h3>
          <span className="text-2xl text-highlight font-light tabular-nums tracking-wider mb-6 block">
            {product.price}
          </span>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg font-light">
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
              Explore Formulation
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </m.div>

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
          <p className="text-lg text-muted-foreground leading-relaxed font-light">
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
