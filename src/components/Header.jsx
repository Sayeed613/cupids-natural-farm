import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Header — fixed top bar.
 *   On hero: transparent with white text.
 *   On sections with data-header-theme="light": solid warm-cream + green text.
 *   On sections with data-header-theme="dark": transparent + white text.
 *   When nav is open: X icon uses primary green so it's visible on the overlay.
 *   Enters with fade + slide-down after 1s.
 *
 * Props:
 *   isNavOpen   — overlay state
 *   onToggleNav — toggle callback
 */
export function Header({ isNavOpen, onToggleNav }) {
  const [entered, setEntered] = useState(false);
  const [theme, setTheme] = useState("dark"); // "dark" | "light"

  /* ── Entrance animation at 1s ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setEntered(true);
      return;
    }
    const timer = setTimeout(() => setEntered(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  /* ── Section-aware header theme via ScrollTrigger ── */
  useEffect(() => {
    const triggers = [];

    const sections = document.querySelectorAll("[data-header-theme]");
    sections.forEach((section) => {
      const t = section.dataset.headerTheme; // "light" | "dark"
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        onEnter: () => setTheme(t),
        onEnterBack: () => setTheme(t),
      });
      triggers.push(st);
    });

    if (sections.length > 0) {
      setTheme(sections[0].dataset.headerTheme || "dark");
    }

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  /* ── Derived colors ── */
  const isDark = theme === "dark";

  const headerBg = isDark ? "transparent" : "var(--color-warm-cream)";
  const textColor = isDark
    ? "var(--color-cloud-white)"
    : "var(--color-primary)";
  // When nav is open, force X to primary green so it's visible on the overlay bg
  const lineColor = isNavOpen
    ? "var(--color-primary)"
    : isDark
    ? "var(--color-cloud-white)"
    : "var(--color-primary)";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between
                 px-6 md:px-10 h-16 md:h-16 select-none
                 transition-[background-color,opacity,transform] duration-500 ease-out"
      style={{
        backgroundColor: headerBg,
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(-20px)",
      }}
    >
      {/* ── Logo ── */}
      <button
        onClick={() => {
          if (window.__lenis) {
            window.__lenis.scrollTo(0);
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className="inline-flex items-center gap-2
                   no-underline bg-transparent border-0
                   cursor-pointer appearance-none
                   transition-colors duration-500 ease-out"
        style={{ color: isNavOpen ? "var(--color-primary)" : textColor }}
      >
        <img
          src="/images/logo/image.png"
          alt=""
          className="h-8 md:h-10 w-auto"
          draggable={false}
        />
        <span className="text-left leading-tight">
          <span className="block text-sm md:text-lg tracking-[0.1em] uppercase font-medium">
            Cupid's
          </span>
          <span className="block text-[11px] md:text-sm tracking-[0.12em] uppercase font-medium opacity-70">
            Natural Farm
          </span>
        </span>
      </button>

      {/* ── Hamburger / X toggle ── */}
      <button
        onClick={onToggleNav}
        className="w-11 h-11 flex flex-col items-center justify-center"
        aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isNavOpen}
      >
        <span
          className="block w-[22px] h-[1.5px] rounded-full
                     transition-all duration-300 ease-out origin-center"
          style={{
            backgroundColor: lineColor,
            translate: isNavOpen ? "0 3.5px" : "0 0",
            rotate: isNavOpen ? "45deg" : "0deg",
          }}
        />
        <span
          className="block w-[22px] h-[1.5px] rounded-full mt-[5px]
                     transition-all duration-300 ease-out origin-center"
          style={{
            backgroundColor: lineColor,
            translate: isNavOpen ? "0 -3.5px" : "0 0",
            rotate: isNavOpen ? "-45deg" : "0deg",
          }}
        />
      </button>
    </header>
  );
}
