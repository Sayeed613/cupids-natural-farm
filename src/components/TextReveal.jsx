import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * TextReveal — Animates text words with a clip-path slide-up reveal.
 * Each word starts with a clip-path that covers it, then slides open.
 *
 * Props:
 *   text               — string to animate
 *   as                 — HTML element to render (default "h2")
 *   className          — additional classes
 *   stagger            — stagger delay between words (default 0.05)
 *   duration           — animation duration per word (default 0.6)
 *   scrollTrigger      — if true, triggers on scroll (default false)
 *   scrollTriggerStart — ScrollTrigger start position (default "top 85%")
 *   delay              — initial delay before animation starts (default 0)
 *   style              — inline styles
 */
export function TextReveal({
  text,
  as: Tag = "h2",
  className = "",
  stagger = 0.05,
  duration = 0.6,
  scrollTrigger = false,
  scrollTriggerStart = "top 85%",
  delay = 0,
  style = {},
}) {
  const containerRef = useRef(null);
  const words = text.split(" ");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const wordEls = container.querySelectorAll("[data-reveal-word]");
      if (!wordEls.length) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        gsap.set(wordEls, { opacity: 1, clipPath: "inset(0%)" });
        return;
      }

      gsap.set(wordEls, {
        opacity: 1,
        clipPath: "inset(0% 0% 100% 0%)",
        y: 8,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration },
        delay,
        scrollTrigger: scrollTrigger
          ? {
              trigger: container,
              start: scrollTriggerStart,
              end: "bottom 25%",
              scrub: 1,
              invalidateOnRefresh: true,
            }
          : undefined,
      });

      tl.to(wordEls, {
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0,
        stagger,
      });
    }, container);

    return () => ctx.revert();
  }, [text, stagger, duration, scrollTrigger, scrollTriggerStart, delay]);

  return (
    <Tag ref={containerRef} className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          data-reveal-word
          className="inline-block"
          style={{
            opacity: 0,
            clipPath: "inset(0% 0% 100% 0%)",
            willChange: "clip-path, transform",
          }}
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}
