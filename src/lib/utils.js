/**
 * Utility to merge Tailwind class names.
 * Simple alternative to clsx + tailwind-merge.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Smooth-scroll to a section by its element id.
 * Uses Lenis if available, falls back to native smooth scrolling.
 */
export function scrollToSection(sectionId) {
  requestAnimationFrame(() => {
    const lenis = window.__lenis;

    if (sectionId === "home") {
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const el = document.getElementById(sectionId);
    if (!el) return;

    if (lenis) {
      lenis.scrollTo(el);
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}
