"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";

export function PageLoader() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    
    // Simulate asset/font loading time or wait for window.onload
    const handleLoad = () => {
      // Small delay to ensure render is complete
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "";
      }, 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Fallback timeout in case load event takes too long
    const timeout = setTimeout(handleLoad, 3000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          {/* Subtle Branded Loading State */}
          <div className="flex flex-col items-center gap-6">
            <motion.div 
              className="w-12 h-12 rounded-full border border-highlight/20 border-t-highlight"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
            />
            <span className="text-muted-foreground/60 tracking-[0.2em] uppercase text-xs font-medium">
              Preparing Ritual
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
