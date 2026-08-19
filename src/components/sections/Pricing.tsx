"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PRICING_PLANS } from "@/lib/constants";

export function Pricing() {
  return (
    <section className="pt-24 sm:pt-32 pb-0 relative border-t border-muted/30">
      <Container>
        <div className="mb-16 md:mb-24 text-center max-w-2xl mx-auto">
          <h2 className="text-highlight font-semibold tracking-[0.2em] text-sm uppercase mb-4">
            Commitment
          </h2>
          <p className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6">
            Invest in your rest.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Choose the ritual that best supports your transition from output to stillness.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col relative group ${
                plan.recommended ? "" : "opacity-70 hover:opacity-100 transition-opacity duration-500"
              }`}
            >
              {/* Top Rule Line */}
              <div className={`h-px w-full mb-8 ${plan.recommended ? 'bg-highlight' : 'bg-muted-foreground/30 group-hover:bg-muted-foreground/60 transition-colors duration-500'}`} />
              
              <div className="mb-8">
                {plan.recommended ? (
                  <span className="text-xs text-highlight tracking-[0.2em] uppercase font-medium block mb-4">
                    Most Popular
                  </span>
                ) : (
                  <span className="text-xs text-transparent tracking-[0.2em] uppercase font-medium block mb-4 selection:bg-transparent" aria-hidden="true">
                    &nbsp;
                  </span>
                )}
                
                <h3 className="font-display text-3xl text-foreground mb-4">{plan.name}</h3>
                
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display text-5xl lg:text-6xl text-foreground tracking-tight">{plan.price}</span>
                </div>
                <span className="text-sm tracking-wide text-muted-foreground uppercase">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4 text-muted-foreground/90 text-sm">
                    <span className="text-highlight text-[10px] mt-1.5 opacity-60">✦</span>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.recommended ? "primary" : "outline"} 
                size="lg" 
                className={`w-full rounded-sm ${plan.recommended ? 'bg-highlight text-primary hover:bg-highlight/90' : 'border-muted/30 hover:border-highlight hover:text-foreground'}`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
