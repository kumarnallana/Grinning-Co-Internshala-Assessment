import * as React from "react";
import { Container } from "@/components/ui/Container";
import { FAQS } from "@/lib/constants";
import { Accordion } from "@/components/ui/Accordion";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";

export function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32 relative">
      <Container>
        <AnimatedReveal className="mb-16 md:mb-24 text-center">
          <h2 className="text-highlight font-semibold tracking-widest text-sm uppercase mb-4">
            Clarity
          </h2>
          <p className="font-display text-4xl sm:text-5xl text-foreground">
            Frequently asked questions.
          </p>
        </AnimatedReveal>

        <AnimatedReveal delay={0.2}>
          <Accordion items={FAQS} />
        </AnimatedReveal>
      </Container>
    </section>
  );
}
