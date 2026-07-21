import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";

import { useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { Header } from "./components/Header";
import { MenuOverlay } from "./components/MenuOverlay";
import { Hero } from "./components/Hero";
import { PageLoader } from "./components/PageLoader";
import { CustomCursor } from "./components/CustomCursor";
import { NoiseOverlay } from "./components/NoiseOverlay";
import { ScrollProgress } from "./components/ScrollProgress";
import { MarqueeBar } from "./components/MarqueeBar";
import { scrollToSection } from "./lib/utils";

/* ── Lazy-loaded sections (below the fold — split to reduce initial bundle) ── */
const Journey           = lazy(() => import("./components/Journey").then((m) => ({ default: m.Journey })));
const WhatWeDo          = lazy(() => import("./components/sections/WhatWeDo").then((m) => ({ default: m.WhatWeDo })));
const GalleryOurFarm    = lazy(() => import("./components/sections/OurAnimals").then((m) => ({ default: m.GalleryOurFarm })));
const LifeAtTheFarm     = lazy(() => import("./components/ContentSections"));
const OwnerDetails      = lazy(() => import("./components/sections/OwnerDetails").then((m) => ({ default: m.OwnerDetails })));
const ContactSection    = lazy(() => import("./components/sections/ContactSection").then((m) => ({ default: m.ContactSection })));
const Footer            = lazy(() => import("./components/Footer").then((m) => ({ default: m.Footer })));

gsap.registerPlugin(ScrollTrigger);

/* ── Nav items — sectionId scrolls to that element on the home page ── */
const NAV_ITEMS = [
  { label: "Home",             sectionId: "home" },
  { label: "Our Story",        sectionId: "our-story" },
  { label: "The Trust",        sectionId: "the-trust" },
  { label: "What We Do",       sectionId: "what-we-do" },
  { label: "Our Farm",         sectionId: "our-farm" },
  { label: "Life at the Farm", sectionId: "life-at-the-farm" },
  { label: "Behind Cupid's",   sectionId: "behind-cupids" },
  { label: "Contact",          sectionId: "contact" },
];

/* ── App shell ── */
function AppShell() {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen((v) => !v);
  const closeNav  = () => setNavOpen(false);
  const inited = useRef(false);
  const heroRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);

  /* ── Framer-motion scroll-driven hero fade ── */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroTranslateY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  /* ── Lenis smooth scroll + ScrollTrigger ── */
  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      duration: prefersReduced ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: !prefersReduced,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  const handleCtaClick = useCallback(() => {
    scrollToSection("our-story");
  }, []);

  const handleVideoLoaded = useCallback(() => setVideoLoaded(true), []);
  const handleLoaderReady = useCallback(() => setLoaderDone(true), []);

  return (
    <>
      <Header isNavOpen={navOpen} onToggleNav={toggleNav} />
      <MenuOverlay
        isOpen={navOpen}
        onClose={closeNav}
        items={NAV_ITEMS}
      />

      <main className="relative">
        <Hero
          onCtaClick={handleCtaClick}
          heroRef={heroRef}
          scrollProgress={heroOpacity}
          scrollTranslateY={heroTranslateY}
          onVideoLoaded={handleVideoLoaded}
          showContent={loaderDone}
        />

        {/* ── Journey: Our Story → SVG scroll-draw → The Land → The Trust ── */}
        <Suspense fallback={null}><Journey /></Suspense>

        {/* ── What We Do — cards carousel ── */}
        <Suspense fallback={null}><WhatWeDo /></Suspense>

        {/* ── Marquee bar between sections ── */}
        <MarqueeBar />

        {/* ── Gallery — Our Farm ── */}
        <Suspense fallback={null}><GalleryOurFarm /></Suspense>

        {/* ── Life at the Farm (3 cards) ── */}
        <Suspense fallback={null}><LifeAtTheFarm /></Suspense>

        {/* ── Behind Cupid's ── */}
        <Suspense fallback={null}><OwnerDetails /></Suspense>

        {/* ── Contact ── */}
        <Suspense fallback={null}><ContactSection /></Suspense>
      </main>

      {/* ── Global overlay elements ── */}
      <CustomCursor />
      <NoiseOverlay />
      <ScrollProgress />

      {/* ── Footer ── */}
      <Suspense fallback={null}><Footer /></Suspense>

      {/* ── Full-screen loader — shown until video is ready ── */}
      {!loaderDone && (
        <PageLoader
          videoLoaded={videoLoaded}
          onReady={handleLoaderReady}
        />
      )}
    </>
  );
}

/* ── Root ── */
export default function App() {
  return <AppShell />;
}
