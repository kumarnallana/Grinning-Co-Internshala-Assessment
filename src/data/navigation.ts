export interface NavItem {
  name: string;
  href: string;
}

export const BRAND = {
  name: "Redroot",
  tagline: "Some brands give you wings. We bring you home.",
  statement: "A nightly ritual for people who run too fast.",
  origin: "Circadian Botanical Apothecary",
  founded: "2026",
};

export const NAVIGATION: NavItem[] = [
  { name: "Ritual", href: "#ritual" },
  { name: "Blends", href: "#blends" },
  { name: "Formula", href: "#formula" },
  { name: "Reviews", href: "#reviews" },
  { name: "FAQ", href: "#faq" },
];

export const FOOTER_LINKS = {
  shop: [
    { name: "All Blends", href: "#blends" },
    { name: "Monthly Ritual", href: "#pricing" },
    { name: "The Formula", href: "#formula" },
    { name: "Gift Sets", href: "#pricing" },
  ],
  company: [
    { name: "Our Story", href: "#story" },
    { name: "Circadian Science", href: "#journal" },
    { name: "The Journal", href: "#journal" },
    { name: "Ethics & Origin", href: "#formula" },
  ],
  support: [
    { name: "FAQ", href: "#faq" },
    { name: "Botanical Concierge", href: "#faq" },
    { name: "Shipping & Returns", href: "#faq" },
    { name: "Account", href: "#" },
  ],
};
