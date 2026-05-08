import { useEffect, useRef } from "react";
import { createScrollReveal, createStaggerReveal } from "@/lib/gsap";

export const useScrollReveal = (options?: Parameters<typeof createScrollReveal>[1]) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const anim = createScrollReveal(ref.current, options);
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return ref;
};

export const useStaggerReveal = (selector: string, options?: Parameters<typeof createStaggerReveal>[1]) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = Array.from(containerRef.current.querySelectorAll(selector));
    if (elements.length === 0) return;
    const anim = createStaggerReveal(elements, options);
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return containerRef;
};
