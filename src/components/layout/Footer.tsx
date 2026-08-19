import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BRAND } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

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
                <TwitterIcon size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-highlight transition-colors" aria-label="Instagram">
                <InstagramIcon size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-highlight transition-colors" aria-label="GitHub">
                <GithubIcon size={18} />
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
