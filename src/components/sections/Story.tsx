import * as React from "react";
import { Container } from "@/components/ui/Container";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";

export function Story() {
  return (
    <section id="story" className="py-24 sm:py-32 relative">
      <Container className="max-w-4xl text-center">
        <AnimatedReveal>
          <h2 className="text-highlight font-semibold tracking-widest text-sm uppercase mb-8">
            The Paradigm Shift
          </h2>
          <div className="space-y-8 font-display text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground">
            <p>
              Modern culture demands constant acceleration. <br className="hidden sm:block" />
              <span className="text-muted-foreground">It asks you to push harder, run faster, and never stop.</span>
            </p>
            <p className="text-highlight">
              We are asking you to stop.
            </p>
            <p className="text-xl sm:text-2xl text-muted-foreground font-sans leading-relaxed max-w-2xl mx-auto pt-8">
              Redroot is not just a tea. It is a definitive boundary between your output and your recovery. A sensory ritual designed to silence the adrenaline and bring you back to center.
            </p>
          </div>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
