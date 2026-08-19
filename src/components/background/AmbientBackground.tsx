"use client";

import Image from "next/image";
import { useScroll, useMotionValueEvent } from "motion/react";

export function AmbientBackground() {
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    // Interpolate atmosphere target values based on rough scroll regions
    // This runs completely outside React's render cycle!
    let temp = 0;
    let noise = 0;
    
    if (progress < 0.2) {
      temp = 0.2;
      noise = 0.6;
    } else if (progress < 0.6) {
      temp = 0.5;
      noise = 0.3;
    } else {
      // Warmest/cleanest near bottom CTA
      temp = 0.8;
      noise = 0.1;
    }
    
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty("--atmosphere-temp", temp.toString());
      document.documentElement.style.setProperty("--atmosphere-noise", noise.toString());
    }
  });

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none" aria-hidden="true">
      {/* Base Global Background Texture */}
      <div className="absolute inset-0 bg-primary" />
      
      {/* Dynamic CSS Atmosphere Layer (P2) */}
      <div className="absolute inset-0 atmosphere-layer" />
      
      {/* Very subtle background image across the whole page to prevent flat colors */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-luminosity">
        <Image
          src="/images/story_bg_1787075461396.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      
      {/* Global gradient overlays to ensure text remains readable and sections blend naturally */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary/95" />
      
      {/* Dynamic Orbs for localized atmospheric lighting */}
      <div className="ambient-orb orb-primary w-[40vw] h-[40vw] top-[-10%] left-[-10%]" />
      <div className="ambient-orb orb-secondary w-[30vw] h-[30vw] top-[40%] right-[-5%]" style={{ animationDelay: '-5s' }} />
      <div className="ambient-orb orb-primary w-[35vw] h-[35vw] bottom-[-10%] left-[20%]" style={{ animationDelay: '-10s' }} />
      
      {/* Base Noise Texture for depth */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjgiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
    </div>
  );
}
