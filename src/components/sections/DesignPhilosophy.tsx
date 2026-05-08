import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionWrapper from "@/components/layout/SectionWrapper";

const DesignPhilosophy: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const lines = ref.current.querySelectorAll(".philosophy-line");

    gsap.fromTo(
      lines,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <SectionWrapper id="philosophy" fullHeight>
      <div ref={ref} className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        <p className="philosophy-line fluid-body-sm text-muted-foreground uppercase tracking-[0.2em] mb-12">
          Philosophy
        </p>
        <h2 className="philosophy-line fluid-heading-xl text-foreground mb-6">
          Less noise.
        </h2>
        <h2 className="philosophy-line fluid-heading-xl text-primary mb-12">
          More signal.
        </h2>
        <p className="philosophy-line fluid-body text-muted-foreground max-w-2xl">
          I believe design should be invisible until it needs to be seen.
          Every element earns its place. Every animation serves a purpose.
        </p>
      </div>
    </SectionWrapper>
  );
};

export default DesignPhilosophy;
