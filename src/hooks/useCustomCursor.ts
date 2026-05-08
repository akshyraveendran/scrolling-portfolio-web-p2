import { useEffect, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";

type CursorState = "default" | "hover" | "mask";

export const useCustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      currentRef.current.x += (posRef.current.x - currentRef.current.x) * 0.15;
      currentRef.current.y += (posRef.current.y - currentRef.current.y) * 0.15;
      cursor.style.transform = `translate(${currentRef.current.x - cursor.offsetWidth / 2}px, ${currentRef.current.y - cursor.offsetHeight / 2}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    requestAnimationFrame(animate);

    // Hover detection
    const addHoverListeners = () => {
      document.querySelectorAll("a, button, [data-cursor='hover']").forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
      });
      document.querySelectorAll("[data-cursor='mask']").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursor.classList.remove("hover");
          cursor.classList.add("mask");
        });
        el.addEventListener("mouseleave", () => cursor.classList.remove("mask"));
      });
    };

    // Observe DOM changes to reattach
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    addHoverListeners();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      cursor.remove();
    };
  }, []);

  const setCursorState = useCallback((state: CursorState) => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    cursor.classList.remove("hover", "mask");
    if (state !== "default") cursor.classList.add(state);
  }, []);

  return { setCursorState };
};
