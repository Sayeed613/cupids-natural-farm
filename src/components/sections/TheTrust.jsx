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
            The Cupid's Goshala Trust stands at the heart of our mission — a
            dedicated sanctuary for indigenous cattle breeds that have been
            companions to Indian agriculture for millennia. Our goshala is
            more than a shelter; it is a living bank of genetic heritage,
            preserving the resilience and wisdom of native breeds.
          </p>
          <p
            data-reveal
            className="text-sm md:text-base leading-relaxed mb-4"
            style={{ color: "var(--color-text)" }}
          >
            Every animal under our care receives traditional nourishing
            practices rooted in Ayurveda and modern veterinary science. We
            believe that when we care for the cow, we care for the land —
            because a healthy goshala means fertile soil, enriched
            biodiversity, and a sustainable future for generations to come.
          </p>
          <p
            data-reveal
            className="text-sm md:text-base leading-relaxed"
            style={{ color: "var(--color-text)" }}
          >
            Through the Trust, we invite you to be part of this living
            legacy — supporting the conservation of native breeds,
            promoting ethical animal husbandry, and nurturing a future
            where tradition and progress walk hand in hand.
          </p>
        </div>
      </div>
    </div>
  );
}
