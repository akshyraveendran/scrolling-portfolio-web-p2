import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionWrapper from "@/components/layout/SectionWrapper";

const links = [
  { label: "Twitter / X", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "Email", href: "mailto:hello@portfolio.dev" },
];

const MagneticLink: React.FC<{ label: string; href: string }> = ({ label, href }) => {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
    };

    const onMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      className="inline-block fluid-heading-md text-foreground hover:text-primary transition-colors duration-300 relative group"
      data-cursor="hover"
    >
      {label}
      <span className="absolute bottom-0 left-0 w-full h-px bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </a>
  );
};

const FooterContact: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll(".footer-link");

    gsap.fromTo(
      items,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <SectionWrapper id="contact">
      <div className="mb-16">
        <p className="fluid-body-sm text-muted-foreground uppercase tracking-[0.2em] mb-4">
          Get In Touch
        </p>
        <h2 className="fluid-heading-xl text-foreground">
          Let's work
          <br />
          together.
        </h2>
      </div>

      <div ref={ref} className="flex flex-wrap gap-8 md:gap-12 mb-24">
        {links.map((link, i) => (
          <div key={i} className="footer-link">
            <MagneticLink label={link.label} href={link.href} />
          </div>
        ))}
      </div>

      <div className="divider-line mb-8" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="fluid-body-sm text-muted-foreground">
          © {new Date().getFullYear()} — Portfolio
        </p>
        <p className="fluid-body-sm text-muted-foreground">
          Built with craft & intention
        </p>
      </div>
    </SectionWrapper>
  );
};

export default FooterContact;
