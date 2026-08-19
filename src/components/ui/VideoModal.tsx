"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Loader2, Play } from "lucide-react";
import { MEDIA } from "@/data/media";

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
            {/* Intentional Media Handling based on Centralized Data */}
            {MEDIA.ritualVideo.src ? (
              <>
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-highlight gap-4 z-10 bg-primary">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <p className="text-sm font-display tracking-widest uppercase">Loading Ritual...</p>
                  </div>
                )}
                <video
                  src={MEDIA.ritualVideo.src}
                  poster={MEDIA.ritualVideo.poster}
                  autoPlay
                  controls
                  className="absolute inset-0 w-full h-full object-cover z-20"
                  title={MEDIA.ritualVideo.title}
                  onLoadedData={() => setIsLoading(false)}
                />
              </>
            ) : (
              /* Intentional Unavailable State */
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${MEDIA.ritualVideo.poster}')` }}
              >
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
                  <p className="text-highlight text-sm tracking-[0.2em] uppercase mb-4 font-semibold">Media Unavailable</p>
                  <h3 className="text-2xl sm:text-3xl font-display text-white mb-2">{MEDIA.ritualVideo.title}</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    The ritual sequence is currently unavailable. Please check back later.
                  </p>
                  <div className="text-xs text-muted-foreground/50 border border-white/10 rounded-full px-4 py-2 bg-black/20">
                    To enable this feature, provide a valid <code className="text-highlight">src</code> in <code className="text-highlight">src/data/media.ts</code>
                  </div>
                </div>
              </div>
            )}

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
