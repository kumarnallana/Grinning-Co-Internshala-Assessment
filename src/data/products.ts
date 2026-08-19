export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  notes: string[];
  price: string;
  image: string;
  accentGlow: string;
  badge: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "low-tide",
    name: "Low Tide",
    tagline: "The Adrenaline Wash",
    description: "Our signature blend formulated to dissolve the lingering tension of high-stakes output. A cool, serene infusion that signals immediate deceleration to the vagus nerve.",
    notes: ["Chamomile", "Ashwagandha", "Skullcap"],
    price: "$48",
    image: "/images/product_1_1787073157894.jpg",
    accentGlow: "rgba(59, 94, 125, 0.35)",
    badge: "Oceanic Twilight",
  },
  {
    id: "amber-hour",
    name: "Amber Hour",
    tagline: "The Sensory Anchor",
    description: "A warming, deeply aromatic sensory ritual that anchors the mind and softens the edges of reality. Formulated with grounding roots and soothing culinary botanicals.",
    notes: ["Valerian Root", "Cinnamon", "Nutmeg"],
    price: "$52",
    image: "/images/product_2_1787073183249.jpg",
    accentGlow: "rgba(201, 161, 90, 0.3)",
    badge: "Warm Golden Spice",
  },
  {
    id: "last-light",
    name: "Last Light",
    tagline: "The Ultimate Cessation",
    description: "The definitive transition into stillness. Specially formulated for stubborn, overactive minds that refuse to cease running long after the day has concluded.",
    notes: ["Passionflower", "Lemon Balm", "Lavender"],
    price: "$56",
    image: "/images/product_3_1787073202462.jpg",
    accentGlow: "rgba(109, 59, 125, 0.35)",
    badge: "Midnight Botanical",
  },
];
