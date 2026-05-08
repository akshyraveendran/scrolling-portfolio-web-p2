import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionWrapper from "@/components/layout/SectionWrapper";

const expertiseItems = [
  { title: "UI/UX Design", description: "Designing intuitive, elegant interfaces rooted in human behavior." },
  { title: "Frontend Development", description: "Building performant web experiences with modern frameworks." },
  { title: "Motion & Interaction", description: "Crafting animations that elevate digital products." },
  { title: "Brand Identity", description: "Creating cohesive visual systems that resonate." },
  { title: "Creative Direction", description: "Leading vision from concept to polished execution." },
];

const HoverRevealList: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll(".expertise-item");

    gsap.fromTo(
      items,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 80%",
        },
      }
    );

    items.forEach((item) => {
      const fill = item.querySelector(".item-fill");
      const text = item.querySelector(".item-text");
      const desc = item.querySelector(".item-desc");

      const tl = gsap.timeline({ paused: true });
      tl.to(fill, { scaleX: 1, duration: 0.5, ease: "power2.out" })
        .to(text, { x: 20, skewX: -2, duration: 0.4, ease: "power2.out" }, 0)
        .to(desc, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }, 0.1);

      item.addEventListener("mouseenter", () => tl.play());
      item.addEventListener("mouseleave", () => tl.reverse());
    });
  }, []);

  return (
    <SectionWrapper id="expertise">
      <div className="mb-16">
        <p className="fluid-body-sm text-muted-foreground uppercase tracking-[0.2em] mb-4">
          What I Do
        </p>
        <h2 className="fluid-heading-lg text-foreground">
          Expertise
        </h2>
      </div>

      <div ref={listRef} className="space-y-0">
        {expertiseItems.map((item, i) => (
          <div
            key={i}
            className="expertise-item relative border-t border-border py-8 md:py-10 cursor-pointer group overflow-hidden"
            data-cursor="hover"
          >
            <div className="item-fill absolute inset-0 bg-secondary origin-left" style={{ transform: "scaleX(0)" }} />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-6 md:gap-12">
                <span className="fluid-body-sm text-muted-foreground w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="item-text fluid-heading-md text-foreground">
                  {item.title}
                </h3>
              </div>
              <p
                className="item-desc hidden md:block fluid-body text-muted-foreground max-w-xs opacity-0"
                style={{ transform: "translateX(20px)" }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
        <div className="border-t border-border" />
      </div>
    </SectionWrapper>
  );
};

export default HoverRevealList;
