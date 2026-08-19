export interface Ingredient {
  number: string;
  role: string;
  name: string;
  botanicalFamily: string;
  description: string;
  scienceNote: string;
  image: string;
  origin: string;
}

export const INGREDIENTS: Ingredient[] = [
  {
    number: "01",
    role: "The Unwinder",
    name: "German Chamomile",
    botanicalFamily: "Matricaria chamomilla",
    description: "Rich in apigenin, an active flavonoid that selectively binds to benzodiazepine receptors in the brain, gently lowering sympathetic nervous system tone and inviting restful quiet.",
    scienceNote: "Promotes parasympathetic activation without morning cognitive fatigue.",
    image: "/images/ingredient_1_1787072931218.jpg",
    origin: "Croatian Glades — Certified Organic",
  },
  {
    number: "02",
    role: "The Anchor",
    name: "KSM-66 Ashwagandha",
    botanicalFamily: "Withania somnifera",
    description: "A revered Ayurvedic adaptogen clinically proven to modulate circulating serum cortisol levels, dampening the physiological stress feedback loop caused by intense cognitive output.",
    scienceNote: "Blunts the afternoon cortisol spike to smooth the circadian descent.",
    image: "/images/ingredient_2_1787073619761.jpg",
    origin: "Rajasthan Highlands — Full-Spectrum Root",
  },
  {
    number: "03",
    role: "The Silencer",
    name: "L-Theanine",
    botanicalFamily: "Camellia sinensis extract",
    description: "A specialized non-protein amino acid that crosses the blood-brain barrier to trigger soothing alpha-wave brain oscillations, neutralizing racing thoughts while preserving pure mental tranquility.",
    scienceNote: "Fosters deep mental stillness without pharmacologic sedation.",
    image: "/images/ingredient_3_crystalline_1787074113589.jpg",
    origin: "Kyoto Prefecture — Crystalline Purity",
  },
];
