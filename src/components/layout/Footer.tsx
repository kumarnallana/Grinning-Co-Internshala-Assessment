import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BRAND } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { Twitter, Instagram, Github } from "lucide-react";

const FOOTER_LINKS = {
  shop: [
    { name: "All Blends", href: "#blends" },
    { name: "The Formula", href: "#ingredients" },
  ],
  company: [
    { name: "Our Story", href: "#story" },
    { name: "The Evidence", href: "#reviews" },
  ],
  support: [
    { name: "FAQ", href: "#faq" },
    { name: "Get in Touch", href: "#join" },
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
              className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight rounded-sm inline-flex mb-4"
              aria-label="Redroot Home"
            >
              <Logo />
              <span className="font-display text-3xl font-semibold tracking-wide text-foreground">{BRAND.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {BRAND.tagline}
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-highlight transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-highlight transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-highlight transition-colors" aria-label="GitHub">
                <Github size={18} />
              </a>
            </div>
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
            <Link href="/" className="text-xs text-muted-foreground hover:text-highlight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight rounded-sm">
              Privacy Policy
            </Link>
            <Link href="/" className="text-xs text-muted-foreground hover:text-highlight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight rounded-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
