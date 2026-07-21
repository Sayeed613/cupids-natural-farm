import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ── */
const ITEMS = [
  {
    icon: "🐄",
    title: "Goshala & Cattle Conservation",
    subtitle: "Protecting Heritage Breeds",
    description:
      "At the heart of our farm is the Cupid's Goshala Trust — a sanctuary for eight indigenous Desi cattle breeds: Hallikar, Amritmahal, Khillar, Malnad Gidda, Deoni, Kapila, Vechur, and Punganur. Our 20–50 cows receive Ayurvedic care, natural feed grown on our land, and spacious shelter. Preserving native breeds is preserving India's agricultural soul.",
    color: "#4D8A4F",
  },
  {
    icon: "🌾",
    title: "Integrated Farming System",
    subtitle: "Closed-Loop Ecosystem",
    description:
      "Our farm operates as a complete integrated system — sheep, goats, cows, poultry, and fish co-exist in a closed loop. We grow ragi, jowar, and nagali millets alongside seasonal vegetables, fodder crops, and fruit trees (mango, coconut, banana). Manure from the elevated sheep shed is collected monthly, processed into organic fertilizer, and sold or used on the farm.",
    color: "#7B6548",
  },
  {
    icon: "🐑",
    title: "Elaga Sheep, Goats & Poultry",
    subtitle: "Commercial-Scale Ethical Farming",
    description:
      "Our primary sheep breed is the Elaga (Yelaga/Aminigadu) — a heavy North Karnataka breed reaching 100+ kg. We run 200–220 sheep on a 100-day cycle in an elevated slatted-floor shed (34×100 ft, capacity 450–500). Using TMR feed from Fertile Green Company, lambs grow from 15 kg to 42 kg in 100 days with 6–7 kg monthly growth. We also rear 700–800 goats and ~500 free-range native chickens with incubator hatching. Proud KPFBA members.",
    color: "#2C6A45",
  },
  {
    icon: "🌍",
    title: "Regenerative Land Stewardship",
    subtitle: "Healing the Soil",
    description:
      "Water conservation, native tree planting, rotational grazing, and composting ensure our land grows richer with each passing season. We grow ragi, jowar, and nagali millets that build soil health while providing nourishing food. We believe in leaving the earth healthier than we found it.",
    color: "#AFC8A3",
  },
  {
    icon: "📱",
    title: "Knowledge Sharing & Outreach",
    subtitle: "Inspiring Change Together",
    description:
      "We share our farming journey through social media, offering practical insights on low-cost shed construction, animal care, and sustainable practices. Our mission is to prove that ethical farming is accessible to everyone — rural or urban.",
    color: "#D7D150",
  },
  {
    icon: "❤️",
    title: "Compassion as Foundation",
    subtitle: "Beyond Boundaries",
    description:
      "Our farm is a living example of compassion that transcends culture and creed. A Muslim family caring for the sacred cow — not as a statement, but as a natural expression of the belief that all life deserves dignity, respect, and protection.",
    color: "#C6C33B",
  },
];

/* ══════════════════════════════════════════════════════════════
   WhatWeDo — Editorial full-width feature panels
   
   ◇ Numbered panels (01–06) with large decorative numerals
   ◇ Alternating warm bg / white bg
   ◇ Colored left accent bar + icon
   ◇ Scroll-triggered GSAP clip-path reveal
   ◇ Each panel slides in from below with stretch
   ══════════════════════════════════════════════════════════════ */
export function WhatWeDo() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const panels = section.querySelectorAll("[data-wwd-panel]");
    if (!panels.length) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(panels, { opacity: 1, y: 0, clipPath: "inset(0%)" });
      return;
    }

    const ctx = gsap.context(() => {
      /* Initial state: hidden below + clipped */
      gsap.set(panels, {
        opacity: 0,
        y: 60,
        clipPath: "inset(0% 0% 100% 0%)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 10%",
          scrub: 1.6,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(panels, {
        opacity: 1,
        y: 0,
        clipPath: "inset(0%)",
        duration: 1,
        stagger: 0.15,
      });
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      data-header-theme="light"
      className="relative w-full overflow-hidden py-20 md:py-28"
      style={{ backgroundColor: "var(--color-warm-cream)" }}
    >
      {/* ── Decorative background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.015]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="wwd-lines"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wwd-lines)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-16 relative z-10">
        {/* ── Heading ── */}
        <div className="max-w-2xl mb-14 md:mb-20">
          <span
            className="text-[10px] md:text-xs tracking-[0.2em] uppercase block mb-4"
            style={{ color: "var(--color-muted-brown)" }}
          >
            What We Do
          </span>
          <h2
            className="font-serif leading-[1.1] mb-4"
            style={{
              color: "var(--color-text)",
              fontSize: "clamp(2rem, 4vw + 0.5rem, 4rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            Our Practices,
            <br />
            Our Purpose
          </h2>
          <p
            className="text-sm md:text-base leading-relaxed max-w-lg"
            style={{ color: "var(--color-text)", opacity: 0.7 }}
          >
            Every practice at Cupid&rsquo;s Natural Farm flows from one
            conviction — that true sustainability begins with compassion
            for the land, the animals, and the heritage that sustains us.
          </p>
        </div>

        {/* ── Editorial feature panels ── */}
        <div className="space-y-4 md:space-y-6">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              data-wwd-panel
              className="group relative overflow-hidden rounded-2xl
                         transition-shadow duration-500 ease-out
                         hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
              style={{
                backgroundColor: i % 2 === 0
                  ? "var(--color-soft-white)"
                  : "rgba(255,255,255,0.5)",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.03)",
              }}
            >
              <div className="relative z-10 flex flex-col md:flex-row gap-5 p-6 md:p-8 lg:p-10">
                {/* ── Left: Number + Icon ── */}
                <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-2 md:min-w-[80px]">
                  {/* Large decorative number */}
                  <span
                    className="font-serif text-4xl md:text-5xl lg:text-6xl leading-none
                               transition-colors duration-500"
                    style={{
                      color: item.color,
                      opacity: 0.15,
                      fontFamily: "Georgia, serif",
                      fontWeight: 400,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Icon */}
                  <div
                    className="w-12 h-12 md:w-10 md:h-10 rounded-xl
                               flex items-center justify-center text-xl md:text-lg
                               transition-all duration-500 ease-out
                               group-hover:scale-110 group-hover:-rotate-3"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    {item.icon}
                  </div>
                </div>

                {/* ── Right: Content ── */}
                <div className="flex-1 min-w-0">
                  <span
                    className="text-[10px] md:text-xs tracking-[0.2em] uppercase block mb-1
                               transition-colors duration-500"
                    style={{ color: item.color }}
                  >
                    {item.subtitle}
                  </span>

                  <h3
                    className="font-serif text-lg md:text-xl lg:text-2xl leading-[1.3] mb-3"
                    style={{
                      color: "var(--color-text)",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {item.title}
                  </h3>

                  <div className="w-8 h-px mb-3 transition-all duration-500 group-hover:w-12"
                    style={{ backgroundColor: item.color, opacity: 0.3 }}
                  />

                  <p
                    className="text-xs md:text-sm leading-relaxed"
                    style={{ color: "var(--color-text)", opacity: 0.7 }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>

              {/* ── Left accent bar ── */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-500
                           group-hover:w-1.5"
                style={{ backgroundColor: item.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
