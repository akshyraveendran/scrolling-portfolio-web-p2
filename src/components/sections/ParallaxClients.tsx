import React, { useEffect, useRef } from "react";
import { gsap, createParallax } from "@/lib/gsap";
import SectionWrapper from "@/components/layout/SectionWrapper";

const clients = [
  "Google", "Spotify", "Stripe", "Vercel",
  "Linear", "Figma", "Notion", "Framer",
];

const ParallaxClients: React.FC = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (row1Ref.current) createParallax(row1Ref.current, -0.3);
    if (row2Ref.current) createParallax(row2Ref.current, 0.3);
  }, []);

  return (
    <SectionWrapper id="clients">
      <div className="mb-16">
        <p className="fluid-body-sm text-muted-foreground uppercase tracking-[0.2em] mb-4">
          Collaborations
        </p>
        <h2 className="fluid-heading-lg text-foreground">
          Trusted By
        </h2>
      </div>

      <div className="overflow-hidden py-12 space-y-8">
        <div ref={row1Ref} className="flex gap-12 md:gap-20 whitespace-nowrap">
          {[...clients.slice(0, 4), ...clients.slice(0, 4)].map((name, i) => (
            <span
              key={i}
              className="font-display text-[clamp(2rem,4vw,4rem)] text-muted-foreground/30 font-bold uppercase tracking-wider"
            >
              {name}
            </span>
          ))}
        </div>
        <div ref={row2Ref} className="flex gap-12 md:gap-20 whitespace-nowrap">
          {[...clients.slice(4), ...clients.slice(4)].map((name, i) => (
            <span
              key={i}
              className="font-display text-[clamp(2rem,4vw,4rem)] text-muted-foreground/30 font-bold uppercase tracking-wider"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ParallaxClients;
