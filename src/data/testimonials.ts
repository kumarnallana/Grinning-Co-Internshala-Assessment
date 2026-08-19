export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  initials: string;
  location: string;
  blendUsed: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "I spent my entire career optimizing for cognitive throughput and speed. Redroot is the only ritual that actually taught my nervous system how to optimize for deliberate stillness.",
    author: "Marcus V.",
    role: "Managing Partner, Deep Tech Capital",
    initials: "MV",
    location: "San Francisco, CA",
    blendUsed: "Low Tide & Amber Hour",
  },
  {
    quote: "The contrast is staggering. After ten straight hours of high-stakes creative directing, this warm botanical infusion draws a sharp, definitive boundary between my output and my recovery.",
    author: "Sophia L.",
    role: "Global Creative Director",
    initials: "SL",
    location: "London, UK",
    blendUsed: "Last Light",
  },
  {
    quote: "Most sleep aids feel like turning off a computer by pulling the plug from the wall. Redroot brings you down with graceful biological elegance. You awaken restored, clear, and sharp.",
    author: "Elena R.",
    role: "Neurobiology Researcher",
    initials: "ER",
    location: "Zurich, CH",
    blendUsed: "Low Tide",
  },
];
