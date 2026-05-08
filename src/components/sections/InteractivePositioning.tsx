import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import SectionWrapper from "@/components/layout/SectionWrapper";

const MaskRevealText: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current || !maskRef.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const container = containerRef.current;
    const mask = maskRef.current;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      posRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const animate = () => {
      currentRef.current.x += (posRef.current.x - currentRef.current.x) * 0.08;
      currentRef.current.y += (posRef.current.y - currentRef.current.y) * 0.08;

      mask.style.clipPath = `circle(140px at ${currentRef.current.x}px ${currentRef.current.y}px)`;
      rafId = requestAnimationFrame(animate);
    };

    let rafId = requestAnimationFrame(animate);
    container.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // Entrance animation
  const textRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!textRef.current) return;
    const lines = textRef.current.querySelectorAll(".reveal-line");
    gsap.fromTo(
      lines,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <SectionWrapper id="positioning" fullHeight>
      <div
        ref={containerRef}
        className="relative w-full min-h-[70vh] flex items-center cursor-none"
        data-cursor="mask"
      >
        {/* Base layer */}
        <div ref={textRef} className="w-full">
          <div className="overflow-hidden">
            <p className="reveal-line fluid-body-sm text-muted-foreground mb-8 uppercase tracking-[0.2em]">
              Creative Developer & Designer
            </p>
          </div>
          <div className="overflow-hidden">
            <h2 className="reveal-line fluid-heading-xl text-foreground">
              I craft digital
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="reveal-line fluid-heading-xl text-foreground">
              experiences that
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="reveal-line fluid-heading-xl text-muted-foreground">
              feel alive.
            </h2>
          </div>
        </div>

        {/* Mask reveal layer */}
        <div
          ref={maskRef}
          className="absolute inset-0 flex items-center pointer-events-none"
          style={{ clipPath: "circle(0px at 50% 50%)" }}
        >
          <div className="portfolio-container">
            <p className="fluid-body-sm text-primary mb-8 uppercase tracking-[0.2em]">
              Creative Developer & Designer
            </p>
            <h2 className="fluid-heading-xl text-primary">
              I craft digital
            </h2>
            <h2 className="fluid-heading-xl text-primary">
              experiences that
            </h2>
            <h2 className="fluid-heading-xl text-primary">
              feel alive.
            </h2>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default MaskRevealText;
