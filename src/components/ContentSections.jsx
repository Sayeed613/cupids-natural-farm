import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Section data ── */

const SECTIONS = [
  {
    id: "agriculture",
    headingTag: "01",
    heading: "Agriculture<br/>Rooted in Wisdom",
    image: "/images/agriculture/image.png",
    layout: "overlay",
    description:
      "Our farming methods honour the land that sustains us. We practice organic cultivation, crop rotation, and no-till farming to build healthy soil. Every seed is planted with intention — from heirloom vegetables to medicinal herbs — grown without chemicals, watered by conservation, and harvested by hand.",
  },
  {
    id: "animals",
    headingTag: "02",
    heading: "Animals<br/>Compassion in Every Creature",
    image: "/images/animals/image.png",
    layout: "overlay",
    description:
      "Every animal at Cupid's Natural Farm is treated with dignity and care. Our indigenous Gir cows, goats, poultry, and working horses roam freely in spacious pastures. We practice ethical animal husbandry rooted in Ayurvedic principles — natural feed, clean water, and veterinary care that respects the animal's whole being.",
  },
  {
    id: "natural-living",
    headingTag: "03",
    heading: "Natural Living<br/>A Return to Simple Wisdom",
    image: "/images/natural-living/image.png",
    layout: "overlay",
    description:
      "We believe the farm is a classroom for a better way of life. From farm-to-table meals made with our own produce to workshops on sustainable living, every experience at Cupid's is designed to reconnect you with the rhythms of nature. Live simply. Eat purely. Breathe deeply.",
  },
];

/* ── Constants ──
 *
 *  Flow (fully sequential — one card finishes before next starts):
 *    C1 HOLD  →  C1 SLIDE OUT  →  C2 SLIDE IN  →  C2 HOLD  →  C2 SLIDE OUT  →  C3 SLIDE IN  →  C3 HOLD  →  unpin
 *
 *  Total timeline = 30 + 28 + 28 + 30 + 28 + 28 + 30 = 202 units
 *  TOTAL_SCROLL = 320vh  →  ~1.58 vh per unit
 * ── */
const TOTAL_SCROLL = 320;
const C1_HOLD = 30;
const SLIDE_OUT = 28;
const SLIDE_IN = 28;
const C2_HOLD = 30;
const _C3_HOLD = 30; // hold duration for card 3 (prefix _ to denote intentionally unused in JS, referenced in comment)

export default function LifeAtTheFarm() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(cardsRef.current, { yPercent: 0, scale: 1, rotation: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const card1 = cardsRef.current[0];
      const card2 = cardsRef.current[1];
      const card3 = cardsRef.current[2];

      gsap.set(card1, { yPercent: 0, scale: 1, rotation: 0 });
      gsap.set(card2, { yPercent: 100, scale: 1, rotation: 0 });
      gsap.set(card3, { yPercent: 100, scale: 1, rotation: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${TOTAL_SCROLL}vh`,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      // --- Timeline positions (fully sequential) ---
      // Each phase completes entirely before the next begins
      const C1_SLIDE_OUT = C1_HOLD;
      const C2_SLIDE_IN  = C1_SLIDE_OUT + SLIDE_OUT;
      const C2_SLIDE_OUT = C2_SLIDE_IN + SLIDE_IN + C2_HOLD;
      const C3_SLIDE_IN  = C2_SLIDE_OUT + SLIDE_OUT;
      // Total: TIMELINE_TOTAL = C3_SLIDE_IN + SLIDE_IN + C3_HOLD
      // Timeline ends at C3_SLIDE_IN + SLIDE_IN + C3_HOLD = 200

      const card1Text = card1 && card1.querySelector('[data-text]');
      const card2Text = card2 && card2.querySelector('[data-text]');
      const card3Text = card3 && card3.querySelector('[data-text]');

      // ── Card 1: initial text nudge (subtle reveal) ──
      if (card1Text) {
        gsap.set(card1Text, { opacity: 1, y: 8 });
        tl.fromTo(
          card1Text, { y: 8 }, { y: 0, duration: 6, ease: "power2.out" }, 3
        );
      }

      // ── Card 1 SLIDES OUT ─────────────────────────────────────
      tl.to(card1, {
        yPercent: -24,
        opacity: 0.15,
        duration: SLIDE_OUT,
        ease: "power2.in",
      }, C1_SLIDE_OUT);

      if (card1Text) {
        tl.to(card1Text, {
          opacity: 0,
          y: -14,
          duration: SLIDE_OUT * 0.6,
          ease: "power2.in",
        }, C1_SLIDE_OUT);
      }

      // ── Card 2 SLIDES IN ──────────────────────────────────────
      tl.to(card2, {
        yPercent: 0,
        duration: SLIDE_IN,
        ease: "power2.out",
      }, C2_SLIDE_IN);

      // Card 2 text fades in after card settles
      if (card2Text) {
        gsap.set(card2Text, { opacity: 0, y: 24 });
        tl.fromTo(card2Text, { opacity: 0, y: 24 }, {
          opacity: 1,
          y: 0,
          duration: 18,
          ease: "power2.out",
        }, C2_SLIDE_IN + 6);
      }

      // ── Card 2 SLIDES OUT ─────────────────────────────────────
      tl.to(card2, {
        yPercent: -24,
        opacity: 0.15,
        duration: SLIDE_OUT,
        ease: "power2.in",
      }, C2_SLIDE_OUT);

      if (card2Text) {
        tl.to(card2Text, {
          opacity: 0,
          y: -14,
          duration: SLIDE_OUT * 0.6,
          ease: "power2.in",
        }, C2_SLIDE_OUT);
      }

      // ── Card 3 SLIDES IN ──────────────────────────────────────
      tl.to(card3, {
        yPercent: 0,
        duration: SLIDE_IN,
        ease: "power2.out",
      }, C3_SLIDE_IN);

      if (card3Text) {
        gsap.set(card3Text, { opacity: 0, y: 24 });
        tl.fromTo(card3Text, { opacity: 0, y: 24 }, {
          opacity: 1,
          y: 0,
          duration: 18,
          ease: "power2.out",
        }, C3_SLIDE_IN + 6);
      }
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="life-at-the-farm"
      data-header-theme="light"
      style={{
        height: `${TOTAL_SCROLL}vh`,
        backgroundColor: "var(--color-warm-cream)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: "70px",
          height: "calc(100vh - 70px)",
          overflow: "hidden",
        }}
      >
        {SECTIONS.map((sec, secIdx) => (
          <div
            key={sec.id}
            id={sec.id}
            ref={(el) => (cardsRef.current[secIdx] = el)}
            style={{
              position: "absolute",
              inset: "5%",
              zIndex: secIdx + 1,
              backgroundColor: "var(--color-warm-cream)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
              transformOrigin: "center center",
              overflow: "hidden",
            }}
          >
            {sec.layout === "overlay" ? (
              <div className="h-full w-full flex flex-col-reverse md:flex-row">
                {/* ── Text: bottom on mobile / left on desktop — no container, clean text ── */}
                <div
                  data-text
                  className="flex-1 flex items-center px-6 md:px-12 lg:px-16 xl:px-20 py-10 md:py-16"
                >
                  <div className="w-full max-w-xl lg:max-w-2xl">
                    {/* Small uppercase section number */}
                    <span
                      className="text-[10px] md:text-xs tracking-[0.28em] uppercase block mb-3 md:mb-5"
                      style={{ color: "#1F3A2D", letterSpacing: "0.28em" }}
                    >
                      {sec.headingTag}
                    </span>

                    {/* Large elegant serif headline */}
                    <h2
                      className="font-serif leading-[1.15] mb-4 md:mb-6"
                      style={{
                        color: "#1F3A2D",
                        fontSize: "clamp(1.4rem, 2.5vw + 0.5rem, 3.8rem)",
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                      }}
                      dangerouslySetInnerHTML={{ __html: sec.heading }}
                    />

                    {/* Thin divider line */}
                    <div
                      className="w-10 md:w-12 h-px mb-4 md:mb-6"
                      style={{ backgroundColor: "#7B8A5E" }}
                    />

                    {/* Supporting paragraph */}
                    <p
                      className="text-xs md:text-base leading-[1.6] md:leading-[1.8] max-w-lg lg:max-w-xl"
                      style={{ color: "#1F3A2D", opacity: 0.8 }}
                    >
                      {sec.description}
                    </p>
                  </div>
                </div>

                {/* ── Image: top on mobile / right on desktop ── */}
                <div
                  className="flex-1  min-h-[40vh] md:min-h-full"
                  style={{
                    backgroundImage: `url(${sec.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>
            ) : sec.image ? (
              <div className="h-full flex ">
                <div className="w-full md:w-1/2 h-[40vh] md:h-full overflow-hidden shrink-0">
                  <img
                    src={sec.image}
                    alt={sec.headingTag}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex-1 flex items-center px-8 md:px-14 lg:px-20 py-10">
                  <div className="w-full max-w-lg" data-text>
                    <span
                      className="text-[10px] md:text-xs tracking-[0.25em] uppercase block mb-4"
                      style={{ color: "var(--color-muted-brown)" }}
                    >
                      {sec.headingTag}
                    </span>
                    <h2
                      className="font-serif leading-[1.1] mb-6"
                      style={{
                        color: "var(--color-text)",
                        fontSize: "clamp(2rem, 4vw + 0.5rem, 4rem)",
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                      }}
                      dangerouslySetInnerHTML={{ __html: sec.heading }}
                    />
                    <div
                      className="w-14 h-px mb-6"
                      style={{ backgroundColor: "var(--color-muted-brown)" }}
                    />
                    <p
                      className="text-sm md:text-base leading-[0.7]"
                      style={{ color: "var(--color-text)", opacity: 0.75 }}
                    >
                      {sec.description}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center px-8 md:px-20 lg:px-32">
                <div className="w-full max-w-4xl mx-auto text-center lg:text-left" data-text>
                  <span
                    className="text-[10px] md:text-xs tracking-[0.25em] uppercase block mb-4 md:mb-5"
                    style={{ color: "var(--color-muted-brown)" }}
                  >
                    {sec.headingTag}
                  </span>
                  <h2
                    className="font-serif leading-[1.1] mb-6 md:mb-8"
                    style={{
                      color: "var(--color-text)",
                      fontSize: "clamp(2.4rem, 5vw + 0.5rem, 5rem)",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                    }}
                    dangerouslySetInnerHTML={{ __html: sec.heading }}
                  />
                  <div
                    className="w-16 md:w-20 h-px mx-auto lg:mx-0 mb-6 md:mb-8"
                    style={{ backgroundColor: "var(--color-muted-brown)" }}
                  />
                  <p
                    className="text-sm md:text-base lg:text-lg leading-[1.7] max-w-2xl mx-auto lg:mx-0"
                    style={{ color: "var(--color-text)", opacity: 0.75 }}
                  >
                    {sec.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
