"use client";

import * as React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PRICING_PLANS } from "@/lib/constants";

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = React.useState(PRICING_PLANS.find(p => p.recommended) || PRICING_PLANS[0]);

  return (
    <section className="py-24 sm:py-32 relative border-t border-muted/30">
      <Container>
        <div className="mb-16 md:mb-24 max-w-2xl text-center md:text-left mx-auto md:mx-0">
          <h2 className="text-highlight font-semibold tracking-[0.2em] text-sm uppercase mb-4">
            Commitment
          </h2>
          <p className="font-display text-4xl sm:text-5xl text-foreground mb-6">
            Invest in your rest.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Choose the ritual that best supports your transition from output to stillness.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left: Atmospheric Visual */}
          <div className="relative h-[400px] lg:h-[600px] w-full rounded-sm overflow-hidden bg-secondary/20 hidden md:block border border-muted/30">
            <Image
              src="/images/pricing_bg_1787073095593.jpg"
              alt="Nightly ritual abstract fluid atmosphere"
              fill
              className="object-cover object-center mix-blend-luminosity opacity-40"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
            
            <div className="absolute bottom-12 left-12 right-12 text-center transition-all duration-500">
               <div className="font-display text-4xl text-foreground mb-2">{selectedPlan.name}</div>
               <div className="text-highlight tracking-[0.2em] uppercase text-sm">{selectedPlan.period}</div>
            </div>
          </div>

          {/* Right: Plan Selection */}
          <div className="space-y-6">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                role="radio"
                aria-checked={selectedPlan.name === plan.name}
                tabIndex={0}
                onClick={() => setSelectedPlan(plan)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedPlan(plan); } }}
                className={`w-full text-left p-6 sm:p-8 rounded-sm border transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight ${
                  selectedPlan.name === plan.name 
                    ? "border-highlight bg-secondary/30 scale-100 shadow-2xl shadow-highlight/5" 
                    : "border-muted/30 hover:border-muted/60 opacity-60 hover:opacity-100"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                  <div>
                    <h3 className="font-display text-2xl text-foreground mb-1">{plan.name}</h3>
                    {plan.recommended && (
                      <span className="text-xs text-highlight tracking-[0.2em] uppercase font-medium">Most Popular</span>
                    )}
                  </div>
                  <div className="sm:text-right">
                    <span className="font-display text-4xl text-foreground block">{plan.price}</span>
                    <span className="text-xs text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <div 
                  className={`grid transition-all duration-500 ${
                    selectedPlan.name === plan.name ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="space-y-3 mb-8 border-t border-muted/30 pt-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-muted-foreground">
                          <Check className="w-5 h-5 text-highlight shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-full bg-highlight text-primary hover:bg-highlight/90"
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
