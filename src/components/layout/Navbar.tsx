"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NAVIGATION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { LoginModal } from "@/components/ui/LoginModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          isScrolled ? "bg-primary/95 backdrop-blur-md border-b border-muted" : "bg-transparent"
        )}
      >
        <nav className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight rounded-sm"
            aria-label="Redroot Home"
          >
            <Logo />
            <span className="font-display text-2xl font-semibold tracking-wide text-foreground">Redroot</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {NAVIGATION.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight rounded-sm px-2 py-1"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden lg:inline-flex"
              onClick={() => setIsLoginOpen(true)}
            >
              Log In
            </Button>
            <Button size="sm">Begin Ritual</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight rounded-sm"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-primary flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="flex items-center justify-between px-4 sm:px-6 h-20 border-b border-muted">
              <Link 
                href="/" 
                className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight rounded-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Logo />
                <span className="font-display text-2xl font-semibold tracking-wide text-foreground">Redroot</span>
              </Link>
              <button
                className="p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight rounded-sm"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-6 gap-8">
              <ul className="flex flex-col gap-6">
                {NAVIGATION.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="font-display text-4xl text-foreground hover:text-highlight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight rounded-sm block w-fit"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4 mt-8">
                <Button size="lg" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>Begin Ritual</Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full" 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsLoginOpen(true);
                  }}
                >
                  Log In
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
