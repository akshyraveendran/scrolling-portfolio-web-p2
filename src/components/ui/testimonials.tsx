import * as React from "react";
import { gsap } from "@/lib/gsap";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Creative Director, Studio X",
    content: "Working with Akshay was seamless. The level of detail and interaction quality is outstanding.",
    avatar: "https://i.pravatar.cc/150?u=alex",
    featured: true,
  },
  {
    name: "Sarah Chen",
    role: "Founder, Zenith Digital",
    content: "Rare combination of design sensibility and deep technical skill. A true unicorn.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "Marcus Reid",
    role: "CEO, Nocturn",
    content: "They transformed our vision into something far beyond what we imagined. The result speaks for itself.",
    avatar: "https://i.pravatar.cc/150?u=marcus",
  },
  {
    name: "Elena Vance",
    role: "Senior UX Designer, Flow",
    content: "Intuitive, professional, and visually stunning. The animations feel performant and smooth.",
    avatar: "https://i.pravatar.cc/150?u=elena",
  },
];

export const Testimonials = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".testimonial-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section id="testimonials" className="section-padding bg-transparent">
      <div className="portfolio-container">
        <div className="mb-16">
          <p className="fluid-body-sm text-[#a1a1a1] uppercase tracking-[0.2em] mb-4">
            Kind Words
          </p>
          <h2 className="fluid-heading-lg text-[#e5e5e5]">
            Clients / Collaborators
          </h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className={cn(
                "testimonial-card bg-transparent border-none shadow-none group transition-all duration-500",
                t.featured && "md:col-span-2 lg:col-span-2"
              )}
            >
              <CardContent className="p-0">
                <div className="flex flex-col h-full bg-transparent">
                  <div className="mb-10">
                    <p className={cn(
                      "text-[#e5e5e5] font-light leading-relaxed",
                      t.featured ? "fluid-heading-md" : "fluid-body"
                    )}>
                      "{t.content}"
                    </p>
                  </div>
                  <div className="mt-auto flex items-center gap-4">
                    <Avatar className="h-14 w-14 border border-[#a1a1a1]/10 bg-transparent">
                      <AvatarImage src={t.avatar} alt={t.name} className="grayscale hover:grayscale-0 transition-all duration-500" />
                      <AvatarFallback className="bg-transparent text-[#a1a1a1]">
                        {t.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-[#e5e5e5] font-medium text-lg leading-none mb-1">{t.name}</p>
                      <p className="text-[#a1a1a1] text-sm uppercase tracking-wider">{t.role}</p>
                    </div>
                    {t.featured && (
                      <div className="ml-auto hidden sm:block">
                        <span className="text-[#ff4d00] text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-[#ff4d00]/30 rounded-full">
                          Featured Review
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Custom subtle separator */}
                <div className="w-full h-[1px] bg-white/5 mt-12 group-hover:bg-[#ff4d00]/30 transition-colors duration-700" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
