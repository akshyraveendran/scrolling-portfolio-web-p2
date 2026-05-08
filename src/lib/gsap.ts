import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// Reusable animation factories
export const createScrollReveal = (
  element: Element,
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    start?: string;
  } = {}
) => {
  const {
    y = 60,
    opacity = 0,
    duration = 1.2,
    delay = 0,
    ease = "power2.out",
    start = "top 85%",
  } = options;

  return gsap.fromTo(
    element,
    { y, opacity },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none none",
      },
    }
  );
};

export const createStaggerReveal = (
  elements: Element[],
  options: {
    y?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    start?: string;
  } = {}
) => {
  const {
    y = 40,
    duration = 1,
    stagger = 0.1,
    ease = "power2.out",
    start = "top 85%",
  } = options;

  return gsap.fromTo(
    elements,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: elements[0],
        start,
        toggleActions: "play none none none",
      },
    }
  );
};

export const createParallax = (
  element: Element,
  speed: number = 0.5,
  options: { start?: string; end?: string } = {}
) => {
  const { start = "top bottom", end = "bottom top" } = options;

  return gsap.to(element, {
    yPercent: speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: true,
    },
  });
};

export const createWordReveal = (
  container: Element,
  words: Element[],
  options: {
    duration?: number;
    start?: string;
    end?: string;
  } = {}
) => {
  const {
    start = "top 80%",
    end = "bottom 40%",
  } = options;

  return gsap.fromTo(
    words,
    { opacity: 0.15, y: 4 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start,
        end,
        scrub: 1,
      },
    }
  );
};
