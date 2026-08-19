"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { LoginForm } from "./LoginForm";
import { Logo } from "./Logo";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
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
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop overlay (Desktop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm hidden md:block"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full md:h-auto md:w-full md:max-w-md bg-[#0F1219] md:rounded-[28px] md:border md:border-[#2A2E37] md:shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Login Modal"
          >
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Logo />
                <span className="font-display font-semibold">Redroot</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close login"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors hidden md:block z-10"
              aria-label="Close login modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Form Content */}
            <div className="flex-1 flex flex-col justify-center p-8 md:p-10">
              <div className="text-center mb-10">
                <div className="hidden md:flex justify-center mb-6">
                  <Logo />
                </div>
                <h2 className="font-serif text-3xl text-[#F2E7D5] mb-3">
                  Welcome back.
                </h2>
                <p className="text-[#B7BBC4] text-sm">
                  Access your ritual history, manage subscriptions, and read the journal.
                </p>
              </div>

              <LoginForm onSuccess={onClose} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
