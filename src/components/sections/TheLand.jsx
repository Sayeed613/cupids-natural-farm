/**
 * TheLand — Text centered at top, image full-width below.
 * Accepts forwarded refs for GSAP scroll animations.
 */
export function TheLand({ sectionRef, imageRef }) {
  return (
    <div
      id="the-land"
      ref={sectionRef}
      className="min-h-screen px-6 md:px-16 py-20 md:py-28"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Text content — full width, above image */}
        <div className="text-center mb-12 md:mb-16">
          <span
            data-reveal
            className="text-[10px] md:text-xs tracking-[0.2em] uppercase block mb-4"
            style={{ color: "var(--color-muted-brown)" }}
          >
            The Land
          </span>
          <h2
            data-reveal
            className="font-serif leading-[1.1] mb-6 max-w-3xl mx-auto"
            style={{
              color: "var(--color-text)",
              fontSize: "clamp(2rem, 4vw + 0.5rem, 4rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            Where the Earth
            <br />
            Tells Its Story
          </h2>
          <p
            data-reveal
            className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-4"
            style={{ color: "var(--color-text)" }}
          >
            Our land spans acres of thoughtfully preserved terrain —
            open pastures, gentle slopes, and shaded groves that have
            been cared for across seasons. Every inch of this landscape
            has been nurtured with the belief that healthy soil grows
            more than just crops.
          </p>
          <p
            data-reveal
            className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--color-text)" }}
          >
            Here, regenerative practices restore the earth's vitality.
            Native grasses sway alongside grazing paths. Pollinators find
            refuge in flowering borders. The land is not just our
            workplace — it is our partner, our teacher, and our legacy.
          </p>
        </div>

        {/* Image — below text, full width */}
        <div ref={imageRef} className="relative">
          <div className="w-full rounded-[20px] overflow-hidden">              <img
                src="/images/the-land/image.png"
                alt="The Land — Cupid's Natural Farm"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
            />
          </div>
          <div
            className="absolute -top-4 -right-4 w-32 h-32 rounded-full opacity-10"
            style={{ backgroundColor: "var(--color-olive-green)" }}
          />
        </div>
      </div>
    </div>
  );
}
