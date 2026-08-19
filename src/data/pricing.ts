export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended: boolean;
  cta: string;
  badge?: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Single Harvest",
    price: "$52",
    period: "per apothecary jar",
    description: "For exploratory rituals or seasonal restorative retreats.",
    features: [
      "30 servings of signature botanical blend",
      "UV-protective amber glass apothecary jar",
      "Standard priority carbon-neutral shipping",
      "Single-purchase with zero recurring commitment",
    ],
    recommended: false,
    cta: "Purchase Once",
  },
  {
    name: "Monthly Ritual",
    price: "$44",
    period: "per month",
    description: "The complete circadian practice delivered fresh every 30 days.",
    features: [
      "30 servings delivered automatically each month",
      "15% perpetual member savings ($8/jar)",
      "Complimentary priority climate-neutral shipping",
      "Flexible member portal: pause, skip, or switch blends anytime",
      "Access to private Sleep Biology archive & guides",
    ],
    recommended: true,
    cta: "Subscribe & Save",
    badge: "Most Popular",
  },
  {
    name: "Founding Patron",
    price: "$400",
    period: "per annum ($33/mo)",
    description: "An annual commitment to circadian restoration with bespoke collector items.",
    features: [
      "12 monthly apothecary jars delivered on schedule",
      "Handcrafted Japanese stoneware steeping vessel & spoon",
      "VIP private apothecary consultation with master herbalist",
      "First access to rare, limited seasonal micro-harvests",
      "Complimentary worldwide expedited courier delivery",
    ],
    recommended: false,
    cta: "Become a Patron",
    badge: "Limited Allotment",
  },
];
