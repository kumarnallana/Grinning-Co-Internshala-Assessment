export interface RitualStep {
  step: string;
  title: string;
  description: string;
  theme: string;
  glow: string;
  cue: string;
  border: string;
  timing: string;
}

export const HOW_IT_WORKS: RitualStep[] = [
  {
    step: "01",
    title: "Steep",
    description: "Begin the transition. Allow 5–7 minutes for whole botanical flowers and adaptogenic roots to release their grounding compounds into fresh hot water.",
    theme: "from-highlight/15 via-highlight/5 to-transparent",
    glow: "rgba(201, 161, 90, 0.08)",
    cue: "Warm Infusion",
    border: "border-highlight/30",
    timing: "45 min before sleep",
  },
  {
    step: "02",
    title: "Dim",
    description: "Lower artificial blue lighting. Darkness signals your pineal gland to initiate endogenous melatonin synthesis, breaking the daytime alert cycle.",
    theme: "from-[#182038]/60 via-[#101526]/40 to-transparent",
    glow: "rgba(24, 32, 56, 0.15)",
    cue: "Light Reduction",
    border: "border-[#3b476d]/40",
    timing: "35 min before sleep",
  },
  {
    step: "03",
    title: "Breathe",
    description: "Inhale the warm botanical aroma. Practice extended 4-7-8 exhalations to stimulate the vagus nerve, rapidly lowering resting heart rate.",
    theme: "from-[#8C2F39]/20 via-[#4a191f]/10 to-transparent",
    glow: "rgba(140, 47, 57, 0.1)",
    cue: "Respiratory Rhythm",
    border: "border-[#8C2F39]/40",
    timing: "20 min before sleep",
  },
  {
    step: "04",
    title: "Sleep",
    description: "Surrender to uninterrupted stillness. Experience restored slow-wave delta sleep and awaken without pharmacological grogginess.",
    theme: "from-black/70 via-[#0a0a0a]/50 to-transparent",
    glow: "rgba(0, 0, 0, 0.3)",
    cue: "Zero-Stimulus Stillness",
    border: "border-white/15",
    timing: "Nightly Restoration",
  },
];
