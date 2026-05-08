import React, { useEffect, useRef } from "react";
import { gsap, createWordReveal } from "@/lib/gsap";
import SectionWrapper from "@/components/layout/SectionWrapper";

const narrativeText =
  "Over the past decade, I've collaborated with ambitious startups and established brands to build digital products that matter. My approach blends design thinking with technical precision — every pixel serves a purpose, every interaction tells a story. I believe the best work happens at the intersection of art and engineering.";

const ScrollRevealText: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const words = containerRef.current.querySelectorAll(".word");
    const anim = createWordReveal(containerRef.current, Array.from(words));

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <SectionWrapper id="narrative">
      <div className="mb-16">
        <p className="fluid-body-sm text-muted-foreground uppercase tracking-[0.2em]">
          My Story
        </p>
      </div>
      <div ref={containerRef} className="max-w-5xl">
        <p className="fluid-heading-md text-foreground leading-relaxed">
          {narrativeText.split(" ").map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </p>
      </div>
    </SectionWrapper>
  );
};

export default ScrollRevealText;
