import * as React from "react";
import { Container } from "@/components/ui/Container";
import { FAQS } from "@/lib/constants";
import { Accordion } from "@/components/ui/Accordion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function FAQ() {
  return (
    <section id="faq" className="pt-24 sm:pt-32 pb-0 relative">
      <Container>
        <RevealOnScroll className="mb-16 md:mb-24 text-center">
          <h2 className="text-highlight font-semibold tracking-[0.2em] text-sm uppercase mb-4">
            Clarity
          </h2>
          <p className="font-display text-4xl sm:text-5xl text-foreground">
            Frequently asked questions.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <Accordion items={FAQS} />
        </RevealOnScroll>
      </Container>
    </section>
  );
}
