export const BRAND = {
  name: "Redroot",
  tagline: "Some brands give you wings. We bring you home.",
  statement: "A nightly ritual for people who run too fast.",
};

export const NAVIGATION = [
  { name: "Ritual", href: "#ritual" },
  { name: "Blends", href: "#blends" },
  { name: "Reviews", href: "#reviews" },
  { name: "FAQ", href: "#faq" },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Steep",
    description: "Begin the transition. Let the botanicals release their grounding properties into warm water.",
  },
  {
    step: "02",
    title: "Dim",
    description: "Lower the lights. Signal to your nervous system that the day's acceleration is over.",
  },
  {
    step: "03",
    title: "Breathe",
    description: "Inhale the calm. Each breath draws you further away from the noise and closer to center.",
  },
  {
    step: "04",
    title: "Sleep",
    description: "Surrender to stillness. Experience the deep, uninterrupted restoration you've earned.",
  },
];

export const PRODUCTS = [
  {
    id: "low-tide",
    name: "Low Tide",
    description: "Our signature blend designed to wash away the adrenaline of high-stakes days.",
    notes: ["Chamomile", "Ashwagandha", "Skullcap"],
    price: "$48",
  },
  {
    id: "amber-hour",
    name: "Amber Hour",
    description: "A warming, sensory ritual that anchors the mind and softens the edges of reality.",
    notes: ["Valerian Root", "Cinnamon", "Nutmeg"],
    price: "$52",
  },
  {
    id: "last-light",
    name: "Last Light",
    description: "The ultimate cessation. For those nights when the mind simply refuses to stop running.",
    notes: ["Passionflower", "Lemon Balm", "Lavender"],
    price: "$56",
  },
];

export const INGREDIENTS = [
  {
    name: "Chamomile",
    role: "The Unwinder",
    description: "Traditionally associated with evening rituals and relaxation, chamomile brings a gentle botanical note to the nighttime formula.",
    image: "/images/ingredient_1_1787072931218.jpg"
  },
  {
    name: "Ashwagandha",
    role: "The Anchor",
    description: "An ancient adaptogen that has been used for centuries in Ayurvedic traditions to promote a grounded, centered feeling.",
    image: "/images/ingredient_2_1787073619761.jpg"
  },
  {
    name: "L-Theanine",
    role: "The Silencer",
    description: "An amino acid commonly found in green tea leaves, associated with fostering a calm, quiet mindset before sleep.",
    image: "/images/ingredient_3_crystalline_1787074113589.jpg"
  },
];

export const TESTIMONIALS = [
  {
    quote: "I spent my entire career optimizing for speed. Redroot taught me how to optimize for stillness. It's the only ritual that actually turns my mind off.",
    author: "Marcus V.",
    role: "Venture Capitalist",
  },
  {
    quote: "The contrast is staggering. After a day of relentless output, this tea is the definitive line between my work and my rest.",
    author: "Sophia L.",
    role: "Creative Director",
  },
  {
    quote: "It doesn't just put you to sleep; it brings you down gracefully. You wake up feeling restored, not groggy.",
    author: "Elena R.",
    role: "Creative Director",
  },
];

export const PRICING_PLANS = [
  {
    name: "One-Time",
    price: "$52",
    period: "per jar",
    features: [
      "30 servings of Redroot",
      "Standard shipping",
      "Single purchase"
    ],
    recommended: false,
    cta: "Purchase Once"
  },
  {
    name: "Monthly Ritual",
    price: "$44",
    period: "per month",
    features: [
      "30 servings of Redroot",
      "Free priority shipping",
      "Cancel anytime",
      "Access to sleep guides"
    ],
    recommended: true,
    cta: "Subscribe & Save"
  },
  {
    name: "Founding Member",
    price: "$400",
    period: "per year",
    features: [
      "12 monthly jars of Redroot",
      "Handcrafted ceramic mug",
      "VIP customer support",
      "Early access to new blends"
    ],
    recommended: false,
    cta: "Become a Member"
  }
];

export const FAQS = [
  {
    question: "Is Redroot caffeine-free?",
    answer: "Absolutely. Redroot is intentionally formulated to be the antithesis of energy drinks. Every blend is 100% caffeine-free and designed to promote deep rest."
  },
  {
    question: "When should I drink it?",
    answer: "We recommend beginning your Redroot ritual 45 to 60 minutes before you intend to sleep. This gives the botanicals time to interact with your nervous system."
  },
  {
    question: "What does it taste like?",
    answer: "Unlike medicinal sleep aids, Redroot is a sensory luxury. It features deep, earthy notes with subtle hints of warming spices and calm florals, depending on the blend."
  },
  {
    question: "How does the ritual work?",
    answer: "It's a four-step process: Steep the tea, Dim the lights, Breathe deeply, and allow yourself to Sleep. The physical act of the ritual is as important as the ingredients."
  },
  {
    question: "How is it shipped?",
    answer: "Orders are processed within 24 hours and shipped via priority couriers in premium, eco-friendly, minimalist packaging to preserve the integrity of the botanicals."
  },
  {
    question: "Can I subscribe?",
    answer: "Yes. Our Monthly Ritual plan ensures you never run out, offering a 15% discount and complimentary shipping on every order."
  }
];
