import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * OwnerDetails — Behind Cupid's: farm owner info with photo.
 */
export function OwnerDetails() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const items = sectionEl.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: "top 85%",
        end: "bottom 25%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
      }
    );

    ScrollTrigger.refresh();
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="behind-cupids"
      data-header-theme="light"
      className="relative"
      style={{ backgroundColor: "var(--color-soft-white)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-20 md:py-32">
        <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-center">
          {/* ── Photo ── */}
          <div className="md:col-span-2" data-reveal>
            <div className="relative">
              <div
                className="w-full aspect-[3/4] rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "var(--color-pale-sage)",
                }}
              >
                <img
                  src="/images/owner/image.jfif"
                  alt="Inayathulla Khan & Sushma Ferdous — Founders, Cupid's Natural Farm"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {/* Decorative accent */}
              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-15 pointer-events-none"
                style={{ backgroundColor: "var(--color-harvest-yellow)" }}
              />
            </div>
          </div>

          {/* ── Bio ── */}
          <div className="md:col-span-3" data-reveal>
            <span
              className="text-[10px] md:text-xs tracking-[0.2em] uppercase block mb-4"
              style={{ color: "var(--color-muted-brown)" }}
            >
              Behind Cupid's
            </span>
            <h2
              className="font-serif leading-[1.1] mb-6"
              style={{
                color: "var(--color-text)",
                fontSize: "clamp(1.8rem, 3.5vw + 0.5rem, 3.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              Inayathulla Khan
              <br />
              <span style={{ color: "var(--color-primary)", fontSize: "clamp(1rem, 1.5vw + 0.25rem, 1.3rem)" }}>
                Founder, Cupid's Natural Farm & Goshala Trust
              </span>
            </h2>
            <div className="w-14 h-px mb-6" style={{ backgroundColor: "var(--color-muted-brown)" }} />
            <div className="space-y-4 text-sm md:text-base leading-relaxed" style={{ color: "var(--color-text)", opacity: 0.8 }}>
              <p data-reveal>
                Established in <strong>2013</strong>, Cupid's Natural Farm is a{" "}
                <strong>4-acre integrated natural farm</strong> founded by{" "}
                <strong>Inayathulla Khan</strong> — fondly known as{" "}
                <strong>Cupid's Khan</strong> — along with{" "}
                <strong>Sushma Ferdous</strong>. What began with a passion
                for animals and just <strong>10 sheep lambs</strong> has grown
                into a thriving ecosystem of <strong>eight indigenous cow
                breeds, Elaga sheep, 700–800 goats, ~500 free-range native
                chickens, and fish</strong> — all managed through
                integrated, chemical-free farming.
              </p>
              <p data-reveal>
                What sets Cupid's apart is the story behind it. Inayathulla,
                a Muslim farmer, established the Cupid's Goshala Trust to
                protect the Desi cow — an animal deeply revered in Hindu
                tradition. This act of cross-cultural compassion has drawn
                attention across India, including a feature by the{" "}
                <strong>My Nature India Foundation</strong>. It is a living
                example that care for the land and its creatures transcends
                all boundaries.
              </p>
              <p data-reveal>
                Every animal at the farm receives traditional Ayurvedic care
                combined with modern veterinary science. Our sheep are housed
                in an innovative <strong>elevated slatted-floor shed</strong>
                (34 × 100 ft, capacity 450–500 animals), designed by
                Inayathulla himself to reduce labour and keep animals healthy.
                We use a scientific <strong>TMR (Total Mixed Ration)</strong>
                feeding system in partnership with <strong>Fertile Green
                Company</strong>, achieving 6–7 kg monthly growth per sheep
                with 18–25% profit margins.
              </p>
              <p data-reveal>
                In two years, the farm has raised and sold over
                <strong>3,000 sheep</strong>, and operates a free-range
                native poultry unit producing ~500 chickens with a 7:1
                breeding ratio and incubator-based hatching. Inayathulla
                is an active member of the{" "}
                <strong>Karnataka Poultry Farmers & Breeders Association
                (KPFBA)</strong>, sharing practical knowledge on low-cost
                shed construction and ethical animal husbandry with farmers
                across the state.
              </p>
            </div>

            {/* ── Signature / quote ── */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--color-pale-sage)" }}>
              <p
                className="font-serif text-lg md:text-xl leading-relaxed italic"
                style={{ color: "var(--color-primary)" }}
              >
                "The land does not belong to us — we belong to the land."
              </p>
              <p
                className="text-xs md:text-sm mt-2 tracking-[0.05em]"
                style={{ color: "var(--color-muted-brown)" }}
              >
                — Inayathulla Khan & Sushma Ferdous, Cupid's Natural Farm
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
