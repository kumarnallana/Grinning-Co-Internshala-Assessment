"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Loader2 } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsLoading(true);
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 lg:p-12"
          role="dialog"
          aria-modal="true"
          aria-label="Redroot Ritual Video"
        >
          {/* Close Background Overlay */}
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={onClose} 
            aria-hidden="true"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl aspect-video bg-primary/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 flex items-center justify-center"
            ref={modalRef}
          >
            {/* 
              TODO: Add actual video asset here. 
              The requested 'Watch the Ritual' asset was not found in the project.
              Swap the <iframe> or <video> src when the asset is provided.
            */}
            
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-highlight gap-4 z-10 bg-primary">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="text-sm font-display tracking-widest uppercase">Loading Ritual...</p>
              </div>
            )}
            
            {/* Fallback Placeholder (Since we don't have the video asset) */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/hero_bg_1787072201282.jpg')" }}
            >
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-8 text-center">
                <p className="text-highlight text-sm tracking-[0.2em] uppercase mb-4 font-semibold">Video Asset Missing</p>
                <h3 className="text-2xl sm:text-3xl font-display text-white mb-2">The Nightly Ritual</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  A high-quality video asset was not found in the repository. Please insert the correct video source in <code className="text-xs bg-white/10 px-1 py-0.5 rounded">src/components/ui/VideoModal.tsx</code>.
                </p>
              </div>
            </div>

            {/* This is how the real video would look: 
            <iframe
              src="YOUR_VIDEO_URL_HERE?autoplay=1&controls=1&rel=0"
              className="absolute inset-0 w-full h-full object-cover z-20"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="The Redroot Ritual"
              onLoad={() => setIsLoading(false)}
            />
            */}

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-highlight hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight"
              aria-label="Close video modal"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
