/**
 * OurStory — Text left, image right.
 * Accepts forwarded refs for GSAP scroll animations.
 */
export function OurStory({ sectionRef, imageRef }) {
  return (
    <div
      id="our-story"
      ref={sectionRef}
      className="min-h-screen flex items-center px-6 md:px-16 py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <span
              data-reveal
              className="text-[10px] md:text-xs tracking-[0.2em] uppercase block mb-4"
              style={{ color: "var(--color-muted-brown)" }}
            >
              Our Story
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
              Rooted in Tradition,
              <br />
              Growing with Purpose
            </h2>
            <p
              data-reveal
              className="text-sm md:text-base leading-relaxed mb-4"
              style={{ color: "var(--color-text)" }}
            >
              Cupid's Natural Farm began as a vision — to create a
              sanctuary where the wisdom of generations meets the promise
              of tomorrow. Nestled in the heart of fertile landscapes, our
              farm is a living testament to the harmony between people,
              animals, and the land they share.
            </p>
            <p
              data-reveal
              className="text-sm md:text-base leading-relaxed"
              style={{ color: "var(--color-text)" }}
            >
              Every seed planted, every animal cared for, and every
              practice we follow is guided by a deep respect for nature's
              rhythms. We believe that true nourishment comes not just from
              what we grow, but from how we grow it.
            </p>
          </div>

          <div ref={imageRef} className="relative">
            <div className="w-full rounded-[20px] overflow-hidden">
              <img
                src="/images/our-story/image.png"
                alt="Our Story — Cupid's Natural Farm"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-20"
              style={{ backgroundColor: "var(--color-harvest-yellow)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
