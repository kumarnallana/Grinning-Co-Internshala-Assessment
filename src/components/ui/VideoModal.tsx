"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Film } from "lucide-react";
import { MEDIA } from "@/data/media";
import { useScrollLock } from "@/hooks/useScrollLock";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [isOpen]);

  useScrollLock(isOpen);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
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
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl z-10 bg-[#0A0D12]"
          >
            {MEDIA.ritualVideo.status === "ready" && MEDIA.ritualVideo.src && !hasError ? (
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
                  onError={() => setHasError(true)}
                />
              </>
            ) : MEDIA.ritualVideo.status === "awaiting_asset" ? (
              /* Intentional Awaiting Asset State */
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${MEDIA.ritualVideo.poster}')` }}
              >
                {/* Layered cinematic vignettes */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/90" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 gap-8">
                  {/* Premium Icon */}
                  <div className="w-16 h-16 rounded-full bg-[#D4A86A]/10 border border-[#D4A86A]/30 flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(212,168,106,0.15)]">
                    <Film className="w-6 h-6 text-[#D4A86A]" strokeWidth={1.5} />
                  </div>

                  {/* Messaging */}
                  <div className="max-w-lg">
                    <p className="text-[#D4A86A] text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-4">
                      Brand Film in Production
                    </p>
                    <h3 className="font-serif text-3xl sm:text-4xl text-white mb-4 leading-tight">
                      Awaiting Final Asset
                    </h3>
                    <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-sm mx-auto font-light">
                      The AI-generated cinematic ritual film is currently being rendered by the production environment.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Unexpected Media Error State */
              <div className="absolute inset-0 bg-[#0A0D12] flex flex-col items-center justify-center text-center p-8 gap-6 border border-red-900/30">
                <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-400" />
                </div>
                <div className="max-w-lg">
                  <p className="text-red-400/80 text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold mb-3">
                    Playback Failed
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white mb-3 leading-tight">
                    Unable to load media
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto">
                    The ritual film could not be loaded. Please check your connection or try again later.
                  </p>
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
