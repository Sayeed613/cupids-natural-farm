import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { OurStory } from "./sections/OurStory";
import { TheLand  } from "./sections/TheLand";
import { TheTrust } from "./sections/TheTrust";
import { useParallax } from "../hooks/use-parallax";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════
   Journey — "Our Story" → "The Land" → "The Trust"
   SVG snake scroll-draw continues through all three
   ═══════════════════════════════════════════════════════ */

/* ── Path sweeps right, wraps around the "Our Story" image,
      then S-curves through "The Land" and into "The Trust" ── */
const PATH_D =
  "M200 180 " +
  "C250 280 900 220 950 400 " +
  "C1000 580 1020 760 850 830 " +
  "C680 900 420 840 360 700 " +
  "C300 560 220 600 180 780 " +
  "C140 960 900 1050 950 1350 " +
  "C1000 1650 300 1800 250 2100 " +
  "C200 2400 800 2600 900 2950 " +
  /* ── Through The Trust ── */
  "C1000 3300 200 3500 250 3850 " +
  "C300 4200 900 4300 850 4500 " +
  /* ── Bottom flourish curve ── */
  "C750 4650 250 4750 550 4950";

export function Journey() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const markerRef = useRef(null);
  const stRef = useRef(null);

  /* ── Section refs ── */
  const storySectionRef = useRef(null);
  const storyImageRef   = useParallax(0.25); // subtle parallax
  const storyTlRef      = useRef(null);

  const landSectionRef = useRef(null);
  const landImageRef   = useParallax(0.25); // subtle parallax
  const landTlRef      = useRef(null);

  const trustSectionRef = useRef(null);
  const trustTlRef      = useRef(null);

  /* ── Section entrance animations (scrub-synced to scroll) ── */
  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function setupReveal(sectionEl, imageEl, localTlRef) {
      const items = sectionEl.querySelectorAll("[data-reveal]");
      if (!items.length) return;

      if (localTlRef.current) {
        localTlRef.current.scrollTrigger?.kill();
        localTlRef.current.kill();
      }

      if (prefersReduced) {
        gsap.set(items, { opacity: 1, y: 0 });
        if (imageEl) gsap.set(imageEl, { opacity: 1, y: 0, scale: 1 });
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

      if (imageEl) {
        tl.fromTo(
          imageEl,
          { y: 50, scale: 0.97 },
          {
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.15"
        );
        // Image is fully visible by default (no opacity animation)
      }

      localTlRef.current = tl;
    }

    if (storySectionRef.current)
      setupReveal(storySectionRef.current, storyImageRef.current, storyTlRef);
    if (landSectionRef.current)
      setupReveal(landSectionRef.current, landImageRef.current, landTlRef);
    if (trustSectionRef.current)
      setupReveal(trustSectionRef.current, null, trustTlRef);

    ScrollTrigger.refresh();

    return () => {
      [storyTlRef, landTlRef, trustTlRef].forEach((ref) => {
        if (ref.current) {
          ref.current.scrollTrigger?.kill();
          ref.current.kill();
          ref.current = null;
        }
      });
    };
  }, []);

  /* ── Path draw — per-section synced (not linear) ── */
  useLayoutEffect(() => {
    const pathEl = pathRef.current;
    const markerEl = markerRef.current;
    if (!pathEl) return;

    if (stRef.current) {
      stRef.current.kill();
      stRef.current = null;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const length = pathEl.getTotalLength();

    if (prefersReduced) {
      gsap.set(pathEl, { strokeDasharray: "none", strokeDashoffset: 0 });
      if (markerEl) {
        const end = pathEl.getPointAtLength(length);
        gsap.set(markerEl, { attr: { cx: end.x, cy: end.y } });
      }
      return;
    }

    gsap.set(pathEl, { strokeDasharray: length, strokeDashoffset: length });
    if (markerEl) {
      const start = pathEl.getPointAtLength(0);
      gsap.set(markerEl, { attr: { cx: start.x, cy: start.y }, opacity: 0 });
    }

    /* ── Section → path segment mapping ── */
    const PATH_SEGMENTS = [
      { ref: storySectionRef, pathStart: 0,     pathEnd: 0.35 },  // wrap-around Our Story
      { ref: landSectionRef,  pathStart: 0.35,  pathEnd: 0.65 },  // through The Land
      { ref: trustSectionRef, pathStart: 0.65,  pathEnd: 1.0  },  // through The Trust + bottom curve
    ];

    function calcAndDraw() {
      const journeyEl = sectionRef.current;
      if (!journeyEl || !pathEl) return;

      const journeyTop   = journeyEl.offsetTop;
      const journeyH     = journeyEl.offsetHeight;
      const vh           = window.innerHeight;
      const totalScroll  = journeyH + vh; // pixels between start & end
      if (totalScroll <= 0) return;

      const scrollY       = window.scrollY;
      const scrollStart   = journeyTop - vh;
      const journeyProgr  = (scrollY - scrollStart) / totalScroll;

      /* Build per-section scroll ranges */
      const ranges = PATH_SEGMENTS.map((seg) => {
        const el = seg.ref.current;
        const offsetTop = el ? el.offsetTop : 0;
        const h         = el ? el.offsetHeight : vh;
        return {
          scrollStart: offsetTop / totalScroll,
          scrollEnd:   (offsetTop + h) / totalScroll,
          pathStart:   seg.pathStart,
          pathEnd:     seg.pathEnd,
        };
      });

      /* Find which section we're in and map to its path segment */
      let pathProgress = 0;
      for (const r of ranges) {
        if (journeyProgr <= r.scrollEnd) {
          if (journeyProgr <= r.scrollStart) break; // before this section → freeze previous
          const p = (journeyProgr - r.scrollStart) / (r.scrollEnd - r.scrollStart);
          pathProgress = r.pathStart + p * (r.pathEnd - r.pathStart);
          break;
        }
        pathProgress = r.pathEnd; // past this section
      }

      pathProgress = Math.max(0, Math.min(1, pathProgress));

      const draw = length * pathProgress;
      gsap.set(pathEl, { strokeDashoffset: length - draw });

      if (markerEl) {
        const pt = pathEl.getPointAtLength(draw);
        gsap.set(markerEl, {
          attr: { cx: pt.x, cy: pt.y },
          opacity: pathProgress > 0.005 && pathProgress < 0.995 ? 1 : 0,
        });
      }
    }

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
      invalidateOnRefresh: true,
      onRefresh: calcAndDraw,
      onUpdate: calcAndDraw,
    });

    stRef.current = st;
    ScrollTrigger.refresh();

    return () => {
      st.kill();
      stRef.current = null;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      className="relative pb-24 md:pb-36 lg:pb-48"
      style={{ backgroundColor: "var(--color-warm-cream)" }}
    >
      {/* ═══ Path layer — stretches with section height ═══ */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 5000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#AFC8A3" />
            <stop offset="100%" stopColor="#4D8A4F" />
          </linearGradient>
          <filter id="markerShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Background path (always visible) */}
        <path
          d={PATH_D}
          fill="none"
          stroke="var(--color-pale-sage)"
          strokeWidth={300}
          strokeDasharray="2 16"
          strokeLinecap="round"
          opacity={0.35}
        />

        {/* Animated path (draws on scroll) */}
        <path
          ref={pathRef}
          d={PATH_D}
          fill="none"
          stroke="url(#roadGradient)"
          strokeWidth={500}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Position marker */}
        <circle
          ref={markerRef}
          r="10"
          fill="var(--color-harvest-yellow)"
          filter="url(#markerShadow)"
        />
      </svg>

      {/* ═══ Content ═══ */}
      <div className="relative z-10">
        <OurStory sectionRef={storySectionRef} imageRef={storyImageRef} />

        {/* Gap between sections */}

        <TheLand sectionRef={landSectionRef} imageRef={landImageRef} />

        {/* Gap between sections */}

        <TheTrust sectionRef={trustSectionRef} />

      </div>
    </section>
  );
}
