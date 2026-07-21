import { CounterStats } from "../CounterStats";

/**
 * TheTrust — Text-only section (no image).
 * Accepts forwarded ref for GSAP scroll animations.
 */
export function TheTrust({ sectionRef }) {
  return (
    <div
      id="the-trust"
      ref={sectionRef}
      className="min-h-screen flex items-center px-6 md:px-16 py-20 md:py-28"
    >
      <div className="max-w-4xl mx-auto w-full relative">
        <div className="max-w-3xl">
          <span
            data-reveal
            className="text-[10px] md:text-xs tracking-[0.2em] uppercase block mb-4"
            style={{ color: "var(--color-muted-brown)" }}
          >
            The Trust
          </span>
          <h2
            data-reveal
            className="font-serif leading-[1.1] mb-6"
            style={{
              color: "var(--color-text)",
              fontSize: "clamp(2rem, 4vw + 0.5rem, 4rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            Cupid's Goshala Trust
            <br />
            <span style={{ color: "var(--color-primary)", fontSize: "clamp(1rem, 2vw + 0.25rem, 1.5rem)" }}>
              Preserving Heritage, Protecting Life
            </span>
          </h2>
          <p
            data-reveal
            className="text-sm md:text-base leading-relaxed mb-4"
            style={{ color: "var(--color-text)" }}
          >
            The Cupid's Goshala Trust is the soul of everything we do.
            Established alongside the farm in 2013, the Trust is a
            dedicated sanctuary for eight indigenous Desi cattle breeds
            — <strong>Hallikar, Amritmahal, Khillar, Malnad Gidda,
            Deoni, Kapila, Vechur, and Punganur</strong> — the living
            genetic heritage of Indian agriculture. Our goshala shelters
            <strong>20–50 cows</strong> at any time, and is more than a
            shelter; it is a genetic bank, a classroom, and a promise to
            future generations.
          </p>
          <p
            data-reveal
            className="text-sm md:text-base leading-relaxed mb-4"
            style={{ color: "var(--color-text)" }}
          >
            Every animal in our care receives a blend of traditional
            Ayurvedic wisdom and modern veterinary science — natural
            feed grown on our own land, clean water, spacious shelters,
            and compassionate handling that respects the animal's whole
            being. Our belief is simple: when we care for the cow, we
            care for the land. A healthy goshala means fertile soil,
            enriched biodiversity, and a sustainable future.
          </p>            <p
            data-reveal
            className="text-sm md:text-base leading-relaxed mb-4"
            style={{ color: "var(--color-text)" }}
          >
            Beyond cattle, our Trust extends its mission to <strong>Elaga
            (Yelaga / Aminigadu) sheep</strong> — a large, heavy breed from
            North Karnataka that reaches 100+ kg — alongside <strong>Bannur
            sheep, 700–800 goats</strong> across multiple native breeds
            including Yelga, Tanguri, Bannur, and Nati, and <strong>~500
            native Desi chickens</strong> in a free-range system. All raised
            with the same ethical Ayurvedic principles. We are proud
            members of the Karnataka Poultry Farmers & Breeders
            Association (KPFBA), connecting our work to a broader
            community of responsible farmers across the state.
          </p>
          <p
            data-reveal
            className="text-sm md:text-base leading-relaxed"
            style={{ color: "var(--color-text)" }}
          >
            Through the Trust, we invite you to be part of this living
            legacy — supporting the conservation of native breeds,
            promoting ethical animal husbandry, and nurturing a future
            where tradition and progress walk hand in hand. Follow our
            journey on social media to see the animals, the land, and
            the daily rhythms of life at Cupid's.
          </p>
        </div>

        {/* ── Animated Stats Counters ── */}
        <CounterStats />
      </div>
    </div>
  );
}
