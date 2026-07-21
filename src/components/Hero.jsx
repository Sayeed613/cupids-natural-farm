import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { Fireflies } from "./Fireflies";
import { TextReveal } from "./TextReveal";

/* ── Content ── */
const TAGLINE = "Cupid's Natural Farm";
const HEADLINE =
  "A Sanctuary for Heritage, Rooted in the Soil of Karnataka";
const DESCRIPTION =
  "Established in 2013 on four acres in Gowribidnur, the Cupid's Goshala Trust protects eight indigenous cow breeds — Hallikar, Amritmahal, Khillar, Malnad Gidda, Deoni, Kapila, Vechur, and Punganur — alongside Elaga sheep, 700+ goats, and native chickens through integrated, chemical-free farming.";
const CTA = "Read Our Story";

/**
 * Hero — Fullscreen cinematic video hero.
 *
 * Props:
 *   onCtaClick      — callback for the CTA button
 *   heroRef         — forwarded ref to the hero section (for scroll measurement)
 *   scrollProgress  — 0–1 value from parent controlling content fade
 *   onVideoLoaded   — called when the hero video can play through
 *   showContent     — when true, hero content mounts & entrance animations play
 */
export function Hero({ onCtaClick, heroRef, scrollProgress, scrollTranslateY, onVideoLoaded, showContent = false }) {
  const videoRef = useRef(null);

  /* ── Notify parent when video is ready ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      onVideoLoaded?.();
    };

    // If already loaded enough
    if (video.readyState >= 3) {
      onVideoLoaded?.();
      return;
    }

    video.addEventListener("canplaythrough", handleCanPlay);
    // Also catch loadeddata as a backup signal
    video.addEventListener("loadeddata", handleCanPlay, { once: true });

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
    };
  }, [onVideoLoaded]);

  const prefersReduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ).current;

  return (
    <section
      id="home"
      ref={heroRef}
      data-header-theme="dark"
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "var(--color-deep-landscape)" }}
    >
      {/* ── Firefly particles overlay ── */}
      <Fireflies count={20} />

      {/* ── Video background ── */}
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{ opacity: 0, transition: "opacity 1.5s ease" }}
        onLoadedData={(e) => { e.target.style.opacity = "1"; }}
      >
        <source src="/images/hero/hero-image-compressed.mp4" type="video/mp4" />
      </video>

      {/* ── Dark scrim overlay — ensures text legibility against bright video frames ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* ── Content — only mounts when loader is done, so animations start fresh ── */}
      {showContent && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: scrollProgress ?? 1,
            y: scrollTranslateY ?? 0,
          }}
        >
          <div className="text-center px-6 max-w-4xl mx-auto">
            {/* Tagline — 0.4s after reveal */}
            {!prefersReduced ? (
              <motion.p
                className="text-xs md:text-sm tracking-[0.2em] uppercase mb-4 md:mb-6"
                style={{ color: "var(--color-cloud-white)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
                }}
              >
                {TAGLINE}
              </motion.p>
            ) : (
              <p
                className="text-xs md:text-sm tracking-[0.2em] uppercase mb-4 md:mb-6"
                style={{ color: "var(--color-cloud-white)" }}
              >
                {TAGLINE}
              </p>
            )}

            {/* Headline — split-type clip-path reveal */}
            {!prefersReduced ? (
              <TextReveal
                text={HEADLINE}
                as="h1"
                delay={0.7}
                stagger={0.04}
                duration={0.6}
                className="font-serif mb-6 md:mb-8 leading-[1.1]"
                style={{
                  color: "var(--color-cloud-white)",
                  fontSize: "clamp(1.8rem, 4vw + 0.5rem, 4.5rem)",
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              />
            ) : (
              <h1
                className="font-serif mb-6 md:mb-8 leading-[1.1]"
                style={{
                  color: "var(--color-cloud-white)",
                  fontSize: "clamp(1.8rem, 4vw + 0.5rem, 4.5rem)",
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                {HEADLINE}
              </h1>
            )}

            {/* Description — 1.0s */}
            {!prefersReduced ? (
              <motion.p
                className="text-sm md:text-base max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.75)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 1.0, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
                }}
              >
                {DESCRIPTION}
              </motion.p>
            ) : (
              <p
                className="text-sm md:text-base max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                {DESCRIPTION}
              </p>
            )}

            {/* CTA — 1.4s */}
            {!prefersReduced ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: 1.4, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                }}
              >
                <MagneticButton strength={0.4}>
                  <button
                    onClick={onCtaClick}
                    className="inline-block cursor-pointer border-0 px-8 py-3 md:px-10 md:py-3.5
                               text-sm md:text-base tracking-[0.05em] font-medium
                               transition-all duration-500 ease-out
                               hover:scale-[1.04]"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-cloud-white)",
                      borderRadius: "50px",
                      boxShadow:
                        "0 4px 14px rgba(11,107,67,0.25), 0 2px 6px rgba(11,107,67,0.15)",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {CTA}
                  </button>
                </MagneticButton>
              </motion.div>
            ) : (
              <button
                onClick={onCtaClick}
                className="inline-block cursor-pointer border-0 px-8 py-3 md:px-10 md:py-3.5
                           text-sm md:text-base tracking-[0.05em] font-medium"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-cloud-white)",
                  borderRadius: "50px",
                  fontFamily: "Georgia, serif",
                }}
              >
                {CTA}
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* ── Scroll indicator — 1.7s ── */}
      {showContent && !prefersReduced && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 1.7, duration: 0.6 },
          }}
        >
          <span
            className="text-[10px] md:text-xs tracking-[0.15em] uppercase"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Scroll
          </span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            className="animate-scroll-bounce"
            style={{ opacity: 0.4 }}
          >
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="white" strokeWidth="1.5" />
            <circle cx="8" cy="8" r="2" fill="white" />
          </svg>
        </motion.div>
      )}

      {/* ── Scroll indicator — reduced motion: always visible ── */}
      {showContent && prefersReduced && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 0.4 }}
        >
          <span
            className="text-[10px] md:text-xs tracking-[0.15em] uppercase"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Scroll
          </span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" style={{ opacity: 0.4 }}>
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="white" strokeWidth="1.5" />
            <circle cx="8" cy="8" r="2" fill="white" />
          </svg>
        </div>
      )}
    </section>
  );
}
