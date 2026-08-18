import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";

export function FinalCTA() {
  return (
    <section className="py-32 sm:py-48 relative border-t border-muted/30">
      <Container className="text-center">
        <AnimatedReveal>
          <h2 className="font-display text-6xl sm:text-7xl md:text-8xl text-foreground mb-8">
            Stop running.
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground font-sans max-w-2xl mx-auto mb-12">
            The day is over. It&apos;s time to return to yourself.
          </p>
          <Button size="lg" className="w-full sm:w-auto min-w-[200px] text-lg">
            Begin Your Ritual
          </Button>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
