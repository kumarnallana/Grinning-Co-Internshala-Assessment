"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2, ShieldCheck, Moon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

const RECOVERY_FOCUSES = [
  "Racing Mind & Overthinking",
  "Physical Tension & Stress",
  "Circadian Rhythm Desync",
  "Deep REM & Recovery"
];

export function LeadGen() {
  const [email, setEmail] = React.useState("");
  const [selectedFocus, setSelectedFocus] = React.useState<string>("Racing Mind & Overthinking");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please provide a valid email address.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    // Simulate luxury API dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <section id="journal" className="py-24 sm:py-32 relative border-t border-muted/30 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vw] max-w-[700px] bg-highlight/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-[#8C2F39]/10 blur-[130px] rounded-full pointer-events-none z-0" />

      <Container className="relative z-10 max-w-4xl">
        <RevealOnScroll>
          <div className="rounded-3xl bg-secondary/25 border border-highlight/25 p-8 sm:p-14 lg:p-16 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.6)] relative overflow-hidden">
            
            {/* Subtle top gold accent bar */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-highlight to-transparent" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-highlight/10 border border-highlight/20 text-xs font-semibold uppercase tracking-[0.2em] text-highlight mb-6">
                    <Moon className="w-3.5 h-3.5 text-highlight" />
                    <span>The Evening Dispatch</span>
                  </div>

                  <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight mb-5 leading-tight">
                    Join the Circadian Circle.
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                    Weekly private essays on nervous system deceleration, circadian biology, and rare botanical harvest notes. Delivered every Sunday at dusk.
                  </p>
                </div>

                {/* Interactive Recovery Focus Selector */}
                <div className="mb-8">
                  <label className="block text-xs uppercase tracking-[0.2em] text-highlight/90 font-medium text-center mb-4">
                    Select Your Primary Evening Challenge:
                  </label>
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                    {RECOVERY_FOCUSES.map((focus) => {
                      const isSelected = selectedFocus === focus;
                      return (
                        <button
                          key={focus}
                          type="button"
                          onClick={() => setSelectedFocus(focus)}
                          className={`px-4 py-2 rounded-full text-xs sm:text-sm transition-all duration-300 border ${
                            isSelected
                              ? "bg-highlight text-primary border-highlight font-medium shadow-[0_0_15px_rgba(201,161,90,0.3)]"
                              : "bg-white/[0.03] text-muted-foreground border-white/10 hover:border-highlight/30 hover:text-foreground"
                          }`}
                        >
                          {focus}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Lead Generation Form */}
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address..."
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.04] border border-white/15 text-foreground placeholder:text-muted-foreground/60 text-sm sm:text-base focus:outline-none focus:border-highlight focus:ring-2 focus:ring-highlight/30 transition-all"
                        disabled={isSubmitting}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isSubmitting}
                      className="whitespace-nowrap px-8 rounded-xl shadow-[0_0_25px_rgba(201,161,90,0.25)] hover:shadow-[0_0_35px_rgba(201,161,90,0.4)] transition-all group/btn"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          <span>Reserving...</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          <span>Request Access</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </span>
                      )}
                    </Button>
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs mt-3 text-center tracking-wide">
                      {error}
                    </p>
                  )}

                  {/* Trust & Privacy Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-muted-foreground/70">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-highlight/80" />
                      <span>Zero promotions or spam</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-highlight/80" />
                      <span>Includes seasonal formulation previews</span>
                    </div>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-highlight/20 border border-highlight/40 text-highlight flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(201,161,90,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-xs uppercase tracking-[0.25em] text-highlight font-semibold block mb-2">
                  Access Granted
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-foreground mb-4">
                  Welcome to the Circadian Circle.
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto mb-6 leading-relaxed font-light">
                  Your first dispatch tailored for <span className="text-highlight font-normal">{selectedFocus}</span> has been scheduled for this Sunday at dusk.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs text-muted-foreground tracking-wider uppercase">
                  <span>Confirmation dispatched to {email}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
