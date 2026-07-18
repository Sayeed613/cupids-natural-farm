import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Card data ── */
const CARDS = [
  {
    title: "Organic Agriculture",
    subtitle: "Rooted in Wisdom",
    description:
      "Organic cultivation, crop rotation, and no-till farming to build healthy soil. Every seed is planted with intention. We practice organic cultivation, crop rotation, and no-till farming to build healthy soil. Every seed is planted with intention — from heirloom vegetables to medicinal herbs — grown without chemicals, watered by conservation, and harvested by hand.",
  },
  {
    title: "Animal Care & Welfare",
    subtitle: "Compassion in Action",
    description:
      "Indigenous cows, goats, poultry, and horses roam freely in spacious pastures. Ethical husbandry rooted in Ayurvedic principles — natural feed, clean water, and veterinary care that respects the animal's whole being.",
  },
  {
    title: "Natural Living",
    subtitle: "Simple Wisdom",
    description:
      "Farm-to-table meals and workshops on sustainable living. Reconnect with the rhythms of nature. Live simply. Eat purely. Breathe deeply. Every experience at Cupid's is designed to reconnect you with the rhythms of nature.",
  },
  {
    title: "Conservation",
    subtitle: "Protecting the Land",
    description:
      "Water conservation, native tree planting, and biodiversity corridors ensure the land thrives for generations to come. We believe in leaving the earth richer than we found it.",
  },
  {
    title: "Community Engagement",
    subtitle: "Growing Together",
    description:
      "Farm visits, volunteer days, and educational programs share the knowledge of sustainable living with our community. We host farm visits, volunteer days, and educational programs to share the knowledge of sustainable living.",
  },
  {
    title: "Farm-to-Table",
    subtitle: "Pure Nourishment",
    description:
      "From our fields to your plate — pure, chemical-free produce, dairy, and eggs. Seasonal harvests delivered with love. Every tree planted, every animal sheltered, every crop harvested without chemicals.",
  },
];

/* ══════════════════════════════════════════════════════════════
   WhatWeDo — Aceternity UI-style FAQ Grid
   ══════════════════════════════════════════════════════════════ */
export function WhatWeDo() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="what-we-do"
      data-header-theme="light"
      className="relative w-full py-20 md:py-28 overflow-x-hidden"
      style={{ backgroundColor: "var(--color-warm-cream)" }}
    >
      {/* ── Subtle background grid pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-16 relative z-10">
        {/* ── Heading ── */}
        <div className="max-w-2xl mb-12 md:mb-16">
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
            Every practice at Cupid's Natural Farm is rooted in respect for the
            land, the animals, and the community that sustains us.
          </p>
        </div>

        {/* ── FAQ Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-0">
          {CARDS.map((card, i) => {
            const isOpen = openId === i;
            return (
              <div
                key={i}
                className="border-b py-5 md:py-6"
                style={{ borderColor: "rgba(24, 58, 36, 0.1)" }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-start justify-between text-left bg-transparent border-0 cursor-pointer p-0 appearance-none group"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1 pr-6">
                    <span
                      className="text-[10px] md:text-xs tracking-[0.2em] uppercase block mb-1.5"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {card.subtitle}
                    </span>
                    <h3
                      className="font-serif text-base md:text-lg lg:text-xl leading-[1.3] transition-colors duration-300"
                      style={{
                        color: isOpen
                          ? "var(--color-primary)"
                          : "var(--color-text)",
                      }}
                    >
                      {card.title}
                    </h3>
                  </div>

                  {/* ── Plus / Minus icon ── */}
                  <div
                    className="shrink-0 mt-1 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300"
                    style={{
                      backgroundColor: isOpen
                        ? "var(--color-primary)"
                        : "var(--color-pale-sage)",
                    }}
                  >
                    <motion.svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <line
                        x1="6"
                        y1="0"
                        x2="6"
                        y2="12"
                        stroke={isOpen ? "#fff" : "#183A24"}
                        strokeWidth="1.5"
                      />
                      <line
                        x1="0"
                        y1="6"
                        x2="12"
                        y2="6"
                        stroke={isOpen ? "#fff" : "#183A24"}
                        strokeWidth="1.5"
                      />
                    </motion.svg>
                  </div>
                </button>

                {/* ── Animated answer ── */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 md:pt-4 pb-1">
                        <div
                          className="w-8 h-px mb-3"
                          style={{
                            backgroundColor: "var(--color-muted-brown)",
                          }}
                        />
                        <p
                          className="text-xs md:text-sm leading-[1.7] max-w-lg"
                          style={{ color: "var(--color-text)", opacity: 0.75 }}
                        >
                          {card.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
