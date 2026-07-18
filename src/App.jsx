import { useState, useEffect, useRef, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { Header } from "./components/Header";
import { MenuOverlay } from "./components/MenuOverlay";
import { Hero } from "./components/Hero";
import { PageLoader } from "./components/PageLoader";
import { Journey } from "./components/Journey";
import { GalleryOurFarm } from "./components/sections/OurAnimals";
import LifeAtTheFarm from "./components/ContentSections";
import { OwnerDetails } from "./components/sections/OwnerDetails";
import { WhatWeDo } from "./components/sections/WhatWeDo";
import { ContactSection } from "./components/sections/ContactSection";
import { Footer } from "./components/Footer";
import { scrollToSection } from "./lib/utils";

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
        <Routes>
          <Route
            path="/"
            element={
              <Hero
                onCtaClick={handleCtaClick}
                heroRef={heroRef}
                scrollProgress={heroOpacity}
                scrollTranslateY={heroTranslateY}
                onVideoLoaded={handleVideoLoaded}
                showContent={loaderDone}
              />
            }
          />
        </Routes>

        {/* ── Journey: Our Story → SVG scroll-draw → The Land → The Trust ── */}
        <Journey />

        {/* ── What We Do — cards carousel ── */}
        <WhatWeDo />

        {/* ── Gallery — Our Farm ── */}
        <GalleryOurFarm />

        {/* ── Life at the Farm (3 cards) ── */}
        <LifeAtTheFarm />

        {/* ── Behind Cupid's ── */}
        <OwnerDetails />

        {/* ── Contact ── */}
        <ContactSection />
      </main>

      {/* ── Footer ── */}
      <Footer />

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
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
