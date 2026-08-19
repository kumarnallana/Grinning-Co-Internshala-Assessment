export interface FAQItem {
  question: string;
  answer: string;
  category: "The Ritual" | "Ingredients & Biology" | "Orders & Membership";
}

export const FAQS: FAQItem[] = [
  {
    question: "Is Redroot 100% caffeine-free?",
    answer: "Absolutely. Redroot is formulated as the physiological antithesis of energy drinks. Every single blend is 100% free of caffeine, stimulants, and artificial sweeteners, engineered solely to promote deep restorative sleep without morning grogginess.",
    category: "Ingredients & Biology",
  },
  {
    question: "When should I begin my evening ritual?",
    answer: "We recommend steeping your blend 45 to 60 minutes before your intended sleep time. This timeframe matches the pharmacokinetics of our bio-available adaptogens, allowing them to lower cortisol and induce alpha brain waves smoothly as you wind down.",
    category: "The Ritual",
  },
  {
    question: "What flavor profile can I expect?",
    answer: "Unlike medicinal concoctions, Redroot is a sensory luxury. It features rich, earthy undertones layered with delicate warming spices (Ceylon cinnamon, nutmeg) and soothing floral notes, offering a deeply grounding and satisfying palate experience.",
    category: "Ingredients & Biology",
  },
  {
    question: "How does the four-step ritual function biologically?",
    answer: "The ritual pairs physical and behavioral cues (Steep, Dim, Breathe, Sleep) with bio-active compounds. The intentional act of dimming lights, breathing deeply, and drinking warm botanical infusions creates a Pavlovian signal that stops daytime cognitive acceleration.",
    category: "The Ritual",
  },
  {
    question: "How is Redroot packaged and shipped?",
    answer: "Each batch is sealed in recyclable, pharmaceutical-grade dark amber UV glass apothecary jars to shield volatile botanical terpenes from photodegradation. Orders dispatch within 24 hours via carbon-neutral priority couriers.",
    category: "Orders & Membership",
  },
  {
    question: "How does the Monthly Ritual subscription work?",
    answer: "The Monthly Ritual guarantees you never run out, delivering a fresh jar every 30 days at a 15% discount with complimentary priority shipping. You have complete freedom to pause, reschedule, change blends, or cancel with a single click at any time.",
    category: "Orders & Membership",
  },
];

export const FAQ_CATEGORIES = [
  "All",
  "The Ritual",
  "Ingredients & Biology",
  "Orders & Membership",
] as const;
