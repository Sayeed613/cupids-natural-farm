import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * PageLoader — Full-screen preloader inspired by CodeGrid's GSAP animation style.
 *
 * Props:
 *   videoLoaded  — boolean, set to true when the hero video can play through
 *   onReady      — callback invoked AFTER the exit animation completes
 */
export function PageLoader({ videoLoaded, onReady }) {
  const loaderRef = useRef(null);
  const overlayRef = useRef(null);
  const svgRef = useRef(null);
  const stemRef = useRef(null);
  const leafLRef = useRef(null);
  const leafRRef = useRef(null);
  const leafTRef = useRef(null);
  const taglineRef = useRef(null);
  const titleRef = useRef(null);
  const progressTrackRef = useRef(null);
  const progressBarRef = useRef(null);
  const contentRef = useRef(null);
  const exitDone = useRef(false);
  const exitTl = useRef(null);
  const breathTl = useRef(null);
  const [entryComplete, setEntryComplete] = useState(false);
  const [timeoutFired, setTimeoutFired] = useState(false);
  const [forceExit, setForceExit] = useState(false); // final safety net

  /* ── Entry animation — fully completes before exit can start ── */
  useEffect(() => {
    if (exitDone.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          setEntryComplete(true);
        },
      });

      // 1. Draw stem
      const stem = stemRef.current;
      if (stem) {
        const len = stem.getTotalLength();
        gsap.set(stem, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
        tl.to(stem, { strokeDashoffset: 0, duration: 1.0 }, 0.3);
      }

      // 2. Draw leaves sequentially
      [leafLRef, leafRRef, leafTRef].forEach((ref, i) => {
        const el = ref.current;
        if (!el) return;
        const len = el.getTotalLength();
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
        tl.to(el, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" }, 0.8 + i * 0.25);
      });

      // 3. Tagline fade-up
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.6
      );

      // 4. Title stagger — each word fades up
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll("[data-word]");
        tl.fromTo(
          words,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" },
          1.9
        );
      }

      // 5. Progress bar reaches 40% after entry settles
      tl.to(
        progressBarRef.current,
        { width: "40%", duration: 1.2, ease: "power1.inOut" },
        2.6
      );
    });

    return () => ctx.revert();
  }, []);

  /* ── Hard timeout: force timeoutFired after 4s even if video never loads ── */
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutFired(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  /* ── Absolute safety net: force exit after 8s regardless of any state ── */
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceExit(true);
      // Also directly dismiss the loader as a last-resort bypass
      // in case the exit animation mechanism gets stuck (e.g., StrictMode
      // double-invocation of effects killing the GSAP timeline)
      onReady?.();
    }, 8000);
    return () => clearTimeout(timer);
  }, [onReady]);

  /* ── Exit animation — starts when entry done AND (video loaded OR timeout OR force exit) ── */
  useEffect(() => {
    if (exitDone.current) return;
    if (!videoLoaded && !timeoutFired && !forceExit) return;
    if (!entryComplete) {
      // If force exit triggered but entry hasn't completed, just skip loader entirely
      if (forceExit) {
        onReady?.();
        return;
      }
      return;
    }

    // Kill breathing before exit starts
    breathTl.current?.kill();
    breathTl.current = null;

    exitDone.current = true;

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => onReady?.(),
    });

    // 1. Quickly fill progress bar
    tl.to(progressBarRef.current, { width: "100%", duration: 0.35, ease: "power2.out" });

    // 2. Brief hold + content begins fading up
    tl.to(
      contentRef.current,
      { opacity: 0, y: -24, duration: 0.4, ease: "power2.in" },
      "-=0.1"
    );

    // 3. Subtle overlay flash (white/natural green)
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 0.85, duration: 0.2 },
      "-=0.15"
    );

    // 4. Smooth overlay flash passes
    tl.to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.1");

    // 5. Entire loader slides up elegantly — the CodeGrid signature move
    tl.to(loaderRef.current, { y: "-100%", duration: 1.0, ease: "power4.inOut" }, "-=0.2");

    exitTl.current = tl;

    return () => {
      exitTl.current?.kill();
      exitTl.current = null;
      exitDone.current = false; // Allow effect to re-create timeline if cleaned up (StrictMode safety)
    };
  }, [videoLoaded, onReady, entryComplete, timeoutFired, forceExit]);

  /* ── Breathing animation — gentle pulse while waiting for video ── */
  useEffect(() => {
    if (!entryComplete) return;
    if (exitDone.current) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Plant sways first — the visual anchor
    if (svgRef.current) {
      tl.to(svgRef.current, { scale: 1.03, duration: 2.6 }, 0);
    }

    // Tagline breathes slightly behind the plant
    if (taglineRef.current) {
      tl.to(taglineRef.current, { opacity: 0.6, duration: 2.6 }, 0.9);
    }

    // Progress bar trails behind, completing the ripple
    if (progressBarRef.current) {
      tl.to(progressBarRef.current, { width: "45%", duration: 2.6 }, 1.8);
    }

    breathTl.current = tl;

    return () => {
      tl.kill();
      breathTl.current = null;
    };
  }, [entryComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--color-warm-cream)" }}
    >
      {/* ── Content ── */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* ═══ Botanical SVG ═══ */}
        <svg
          ref={svgRef}
          width="64"
          height="88"
          viewBox="0 0 64 88"
          fill="none"
          className="mb-6"
          aria-hidden="true"
        >
          {/* Stem */}
          <path
            ref={stemRef}
            d="M32 82 C32 68 33 50 33 35 C33 25 32 18 32 12"
            stroke="var(--color-primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0"
          />

          {/* Left leaf */}
          <path
            ref={leafLRef}
            d="M33 60 C14 55 4 46 4 38 C4 32 14 30 33 35"
            stroke="var(--color-primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0"
          />

          {/* Right leaf */}
          <path
            ref={leafRRef}
            d="M33 45 C50 40 58 32 58 25 C58 20 50 18 33 24"
            stroke="var(--color-primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0"
          />

          {/* Top leaf (small) */}
          <path
            ref={leafTRef}
            d="M33 30 C26 27 22 22 22 18 C22 15 26 14 33 17"
            stroke="var(--color-primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0"
          />
        </svg>

        {/* ═══ Tagline ═══ */}
        <p
          ref={taglineRef}
          className="text-xs tracking-[0.25em] uppercase mb-2"
          style={{ color: "var(--color-muted-brown)", letterSpacing: "0.25em", opacity: 0 }}
        >
          Welcome to
        </p>

        {/* ═══ Title — word-by-word stagger ═══ */}
        <h1
          ref={titleRef}
          className="font-serif leading-[1.15]"
          style={{
            color: "var(--color-text)",
            fontSize: "clamp(1.6rem, 3.5vw, 3.2rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
          }}
        >
          <span data-word className="inline-block mr-[0.25em]" style={{ opacity: 0 }}>
            Cupid&rsquo;s
          </span>
          <span data-word className="inline-block mr-[0.25em]" style={{ opacity: 0 }}>
            Natural
          </span>
          <span data-word className="inline-block" style={{ opacity: 0 }}>
            Farm
          </span>
        </h1>

        {/* ═══ Decorative divider ═══ */}
        <div
          className="w-10 h-px mt-5 mb-5"
          style={{ backgroundColor: "var(--color-pale-sage)" }}
        />

        {/* ═══ Progress ═══ */}
        <div
          ref={progressTrackRef}
          className="w-40 h-px overflow-hidden rounded-full"
          style={{ backgroundColor: "var(--color-pale-sage)" }}
        >
          <div
            ref={progressBarRef}
            className="h-full w-0 rounded-full"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
        </div>
      </div>

      {/* ── Overlay layer for exit transition ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: "var(--color-primary)",
          opacity: 0,
        }}
      />
    </div>
  );
}
