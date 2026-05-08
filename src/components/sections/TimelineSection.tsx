import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionWrapper from "@/components/layout/SectionWrapper";

const timelineData = [
  { year: "2024", role: "Lead Creative Developer", company: "Studio Eleven" },
  { year: "2022", role: "Senior Frontend Engineer", company: "Phantom Labs" },
  { year: "2020", role: "UI/UX Designer", company: "Nocturn Agency" },
  { year: "2018", role: "Interactive Developer", company: "Flux Digital" },
  { year: "2016", role: "Junior Designer", company: "Aperture Co." },
];

const TimelineSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const rows = ref.current.querySelectorAll(".timeline-row");

    gsap.fromTo(
      rows,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <SectionWrapper id="timeline">
      <div className="mb-16">
        <p className="fluid-body-sm text-muted-foreground uppercase tracking-[0.2em] mb-4">
          Career Path
        </p>
        <h2 className="fluid-heading-lg text-foreground">Timeline</h2>
      </div>

      <div ref={ref}>
        {timelineData.map((item, i) => (
          <div
            key={i}
            className="timeline-row group border-t border-border py-6 md:py-8 grid grid-cols-3 gap-4 items-center cursor-pointer transition-colors duration-300 hover:bg-secondary/50"
            data-cursor="hover"
          >
            <span className="fluid-body text-muted-foreground group-hover:text-primary transition-colors duration-300">
              {item.year}
            </span>
            <span className="fluid-body text-foreground font-medium">
              {item.role}
            </span>
            <span className="fluid-body text-muted-foreground text-right">
              {item.company}
            </span>
          </div>
        ))}
        <div className="border-t border-border" />
      </div>
    </SectionWrapper>
  );
};

export default TimelineSection;
