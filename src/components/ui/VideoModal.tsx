"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play } from "lucide-react";
import { MEDIA } from "@/data/media";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
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
          transition={{ duration: 0.3 }}
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
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl z-10"
          >
            {MEDIA.ritualVideo.src ? (
              <>
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-[#D4A86A] gap-4 z-10 bg-[#0A0D12]">
                    <div className="w-8 h-8 border-2 border-[#D4A86A] border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-semibold tracking-widest uppercase">Loading Ritual...</p>
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
              /* Premium "Coming Soon" Cinematic State */
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${MEDIA.ritualVideo.poster}')` }}
              >
                {/* Layered cinematic vignettes */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/40" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 gap-6">
                  {/* Animated pulsing play button */}
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#D4A86A]/30"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#D4A86A]/15"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    />
                    <div className="relative w-20 h-20 rounded-full bg-[#D4A86A]/20 border-2 border-[#D4A86A]/60 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-8 h-8 text-[#D4A86A] fill-[#D4A86A] translate-x-0.5" />
                    </div>
                  </div>

                  {/* Premium messaging */}
                  <div className="max-w-lg">
                    <p className="text-[#D4A86A] text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold mb-3">
                      The Ritual
                    </p>
                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight">
                      {MEDIA.ritualVideo.title}
                    </h3>
                    <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                      An intimate journey through the nightly ritual. Filmed across three seasons of botanical harvest.
                    </p>
                  </div>

                  {/* Releasing soon badge */}
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A86A] animate-pulse" />
                    <span className="text-xs text-white/70 tracking-[0.15em] uppercase font-medium">
                      Releasing Soon
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-[#D4A86A] hover:text-black transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A86A]"
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
