import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useParallax — Applies a parallax Y-offset to an element as it scrolls.
 *
 * @param {number} speed - Parallax speed factor (0–1). Higher = faster.
 * @param {string} triggerScope - CSS selector for the scroll trigger container.
 *
 * Usage:
 *   const imgRef = useParallax(0.4);
 *   <div ref={imgRef}> ... </div>
 */
export function useParallax(speed = 0.3, triggerScope = null) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: `${speed * 8}%` },
        {
          y: `${-speed * 8}%`,
          ease: "none",
          scrollTrigger: {
            trigger: triggerScope ? el.closest(triggerScope) : el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [speed, triggerScope]);

  return ref;
}
