import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * CounterStats — Animated counter that counts up when scrolled into view.
 */
function Counter({ value, suffix = "", label, duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(value / (duration * 60));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <span
        className="block font-serif leading-none"
        style={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          color: "var(--color-primary)",
        }}
      >
        {count}
        {suffix}
      </span>
      <span
        className="block text-xs md:text-sm mt-2 tracking-[0.05em]"
        style={{ color: "var(--color-text)", opacity: 0.7 }}
      >
        {label}
      </span>
    </div>
  );
}

const STATS = [
  { value: 4, suffix: "+", label: "Acres of Sanctuary" },
  { value: 2013, label: "Year Established" },
  { value: 8, suffix: "+", label: "Cow Breeds Protected" },
  { value: 3000, suffix: "+", label: "Sheep Sold to Date" },
];

export function CounterStats() {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16 md:mt-20 pt-12 md:pt-16 border-t"
      style={{ borderColor: "rgba(24,58,36,0.1)" }}
    >
      {STATS.map((stat, i) => (
        <div key={i} data-reveal>
          <Counter {...stat} />
        </div>
      ))}
    </div>
  );
}
