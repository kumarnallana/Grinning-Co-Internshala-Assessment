import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BRAND } from "@/lib/constants";

const FOOTER_LINKS = {
  shop: [
    { name: "All Blends", href: "#blends" },
    { name: "Monthly Ritual", href: "#" },
    { name: "Gift Cards", href: "#" },
  ],
  company: [
    { name: "Our Story", href: "#story" },
    { name: "The Science", href: "#ingredients" },
    { name: "Journal", href: "#" },
  ],
  support: [
    { name: "FAQ", href: "#faq" },
    { name: "Shipping", href: "#" },
    { name: "Returns", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary pt-24 pb-12 border-t border-muted/30">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link 
              href="/" 
              className="font-display text-3xl font-semibold tracking-wide text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight rounded-sm inline-block mb-4"
              aria-label="Redroot Home"
            >
              {BRAND.name}
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {BRAND.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground uppercase tracking-[0.2em] text-xs mb-6">
              Shop
            </h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-highlight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight rounded-sm px-1 -ml-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground uppercase tracking-[0.2em] text-xs mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-highlight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight rounded-sm px-1 -ml-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground uppercase tracking-[0.2em] text-xs mb-6">
              Support
            </h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-highlight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight rounded-sm px-1 -ml-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-muted/30 gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-highlight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight rounded-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-highlight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight rounded-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
