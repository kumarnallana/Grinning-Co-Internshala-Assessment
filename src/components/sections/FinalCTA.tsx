"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Clock, Mail, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const CHALLENGES = [
  "Racing Mind & Overthinking",
  "Physical Tension & Stress",
  "Circadian Rhythm Desync",
  "Deep REM & Recovery",
] as const;

export function FinalCTA() {
  const prefersReducedMotion = useReducedMotion();
  const [challenge, setChallenge] = useState<string>(CHALLENGES[1]);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Front-end demo only — no backend, nothing is persisted.
    setTimeout(() => {
      setStatus("done");
    }, 900);
  }

  return (
    <section id="join" className="relative overflow-hidden py-28" aria-labelledby="final-cta-heading">
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(212,168,106,0.16), rgba(181,73,63,0.08), transparent)",
          }}
          animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.06, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative mx-auto max-w-2xl rounded-[28px] border border-[#2A2E37] bg-[#0F1219]/90 p-10 text-center shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] backdrop-blur mx-4 sm:mx-auto"
      >
        <motion.span variants={item} className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4A86A]/30 bg-[#D4A86A]/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#D4A86A]">
          <Clock size={13} aria-hidden />
          The Evening Dispatch
        </motion.span>

        <motion.h2 id="final-cta-heading" variants={item} className="font-serif text-4xl text-[#F2E7D5] sm:text-5xl">
          Join the Circadian Circle.
        </motion.h2>

        <motion.p variants={item} className="mx-auto mt-4 max-w-md text-[#B7BBC4]">
          Weekly private essays on nervous system deceleration, circadian biology, and rare botanical harvest notes. Delivered every Sunday at dusk.
        </motion.p>

        <motion.p variants={item} className="mt-10 text-xs uppercase tracking-[0.2em] text-[#8A8F99]">
          Select your primary evening challenge
        </motion.p>

        <motion.div variants={item} className="mt-4 flex flex-wrap justify-center gap-2">
          {CHALLENGES.map((c) => {
            const active = c === challenge;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setChallenge(c)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
                  active
                    ? "border-[#D4A86A] bg-[#D4A86A] text-[#12151C]"
                    : "border-[#2A2E37] bg-transparent text-[#B7BBC4] hover:border-[#D4A86A]/50"
                }`}
              >
                {c}
              </button>
            );
          })}
        </motion.div>

        <motion.form variants={item} onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="cta-email" className="sr-only">Email address</label>
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#2A2E37] bg-[#F2E7D5]/95 px-4 py-3">
            <Mail size={16} className="text-[#6E7280]" aria-hidden />
            <input
              id="cta-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent text-sm text-[#12151C] outline-none placeholder:text-[#8A8F99]"
            />
          </div>
          <button
            type="submit"
            disabled={status !== "idle"}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4A86A] px-6 py-3 text-sm font-medium text-[#12151C] transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-70"
          >
            {status === "loading" && "Reserving…"}
            {status === "done" && "Demo confirmed"}
            {status === "idle" && (
              <>
                Reserve my seat
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </>
            )}
          </button>
        </motion.form>

        <motion.div variants={item} className="mt-5 flex justify-center gap-6 text-xs text-[#6E7280]">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} aria-hidden /> Zero promotions or spam</span>
          <span className="inline-flex items-center gap-1.5"><Sparkles size={13} aria-hidden /> Seasonal formulation previews</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
