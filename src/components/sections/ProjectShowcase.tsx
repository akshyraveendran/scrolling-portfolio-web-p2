import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionWrapper from "@/components/layout/SectionWrapper";

const projects = [
  {
    title: "Phantom Dashboard",
    category: "Web Application",
    year: "2024",
    color: "hsl(42, 100%, 60%)",
  },
  {
    title: "Nocturn Brand",
    category: "Brand Identity",
    year: "2023",
    color: "hsl(200, 60%, 50%)",
  },
  {
    title: "Flux Commerce",
    category: "E-Commerce",
    year: "2023",
    color: "hsl(340, 70%, 55%)",
  },
];

const ProjectShowcase: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll(".project-card");

    gsap.fromTo(
      items,
      { y: 80, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <SectionWrapper id="projects">
      <div className="mb-16">
        <p className="fluid-body-sm text-muted-foreground uppercase tracking-[0.2em] mb-4">
          Selected Work
        </p>
        <h2 className="fluid-heading-lg text-foreground">Projects</h2>
      </div>

      <div ref={ref} className="space-y-8">
        {projects.map((project, i) => (
          <div
            key={i}
            className="project-card group relative w-full aspect-[16/9] md:aspect-[21/9] rounded-lg overflow-hidden cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)` }}
            data-cursor="hover"
          >
            <div className="absolute inset-0 bg-secondary/50 group-hover:bg-secondary/20 transition-all duration-700" />

            {/* Cursor-follow play button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-primary-foreground font-display font-bold text-sm uppercase tracking-wider"
                style={{ background: project.color }}
              >
                View
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex items-end justify-between">
              <div>
                <h3 className="fluid-heading-md text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="fluid-body-sm text-muted-foreground">
                  {project.category}
                </p>
              </div>
              <span className="fluid-body-sm text-muted-foreground">
                {project.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ProjectShowcase;
