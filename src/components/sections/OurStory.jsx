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
              A Vision Born of
              <br />
              Reverence for All Life
            </h2>
            <p
              data-reveal
              className="text-sm md:text-base leading-relaxed mb-4"
              style={{ color: "var(--color-text)" }}
            >
              Cupid's Natural Farm was born from a simple yet profound
              belief — that protecting India's indigenous cattle is not
              just an act of conservation, but an act of reverence for the
              land, its history, and its people. Founded in 2013 by
              Inayathulla Khan and Sushma Ferdous, the farm is home to
              the Cupid's Goshala Trust, a sanctuary preserving eight
              native Desi cattle breeds — <strong>Hallikar, Amritmahal,
              Khillar, Malnad Gidda, Deoni, Kapila, Vechur, and
              Punganur</strong> — in the heart of rural Karnataka.
            </p>
            <p
              data-reveal
              className="text-sm md:text-base leading-relaxed"
              style={{ color: "var(--color-text)" }}
            >
              Today, the farm operates as an integrated natural farming
              ecosystem — <strong>sheep, goats, cows, poultry, and fish</strong>
              co-existing in a closed-loop system. Our primary sheep breed is
              the <strong>Elaga (Yelaga / Aminigadu)</strong>, a large,
              heavy breed from North Karnataka that can reach 100+ kg. We
              run a 100-day cycle, buying lambs at 13-15 kg and raising them
              to 40-42 kg using a scientific <strong>TMR (Total Mixed
              Ration)</strong> feeding system in partnership with Fertile
              Green Company.
            </p>
            <p
              data-reveal
              className="text-sm md:text-base leading-relaxed"
              style={{ color: "var(--color-text)" }}
            >
              What makes our story unique is the spirit behind it — a
              Muslim family dedicated to the protection of the cow, an animal
              deeply revered in Indian culture. This is not a political
              statement; it is a testament to the belief that compassion
              transcends boundaries. Here, tradition meets purpose, and
              every seed planted and every animal cared for is guided by
              a deep respect for nature's sacred rhythms.
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
