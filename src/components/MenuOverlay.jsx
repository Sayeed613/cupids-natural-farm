import { useRef, useEffect, useState, useCallback } from "react";
import { FloatingNavItem } from "./FloatingNavItem";
import { scrollToSection } from "@/lib/utils";

/* ── 7 cloud image paths ── */
const CLOUD_IMAGES = [
  "/images/header/clouds/cloud (1).png",
  "/images/header/clouds/cloud (2).png",
  "/images/header/clouds/cloud (3).png",
  "/images/header/clouds/cloud (4).png",
  "/images/header/clouds/cloud (5).png",
  "/images/header/clouds/cloud (6).png",
  "/images/header/clouds/cloud (7).png",
];

/* ── Desktop: scattered positions (x%, y% within sky area) ── */
/* ── Desktop: scattered positions — slightly adjusted for XL clouds ── */
const DESKTOP_POS = [
  { x: 40, y: 2 },   // Home
  { x: 0,  y: 18 },  // Our Story
  { x: 58, y: 10 },  // The Trust
  { x: 26, y: 32 },  // What We Do
  { x: 50, y: 28 },  // Our Farm
  { x: 10, y: 50 },  // Life at the Farm
  { x: 66, y: 48 },  // Behind Cupid's
  { x: 34, y: 46 },  // Contact
  { x: 54, y: 50 },  // (extra space)
  { x: 8,  y: 42 },  // (extra space)
];

/* ── Mobile: scattered positions for L clouds ── */
const MOBILE_POS = [
  { x: 8,  y: 2 },   // Home
  { x: 38, y: 5 },   // Our Story
  { x: 1,  y: 16 },  // The Trust
  { x: 42, y: 22 },  // What We Do
  { x: 4,  y: 34 },  // Our Farm
  { x: 36, y: 40 },  // Life at the Farm
  { x: 10, y: 52 },  // Behind Cupid's
  { x: 1,  y: 62 },  // Contact
  { x: 42, y: 56 },  // (extra space)
  { x: 20, y: 70 },  // (extra space)
];

/* ── Desktop widths (px) — XL clouds ── */
const DESKTOP_W = [
  "300px", "290px", "330px", "300px",
  "290px", "340px", "270px", "310px", "320px", "280px",
];

/* ── Mobile widths (px) — L clouds ── */
const MOBILE_W = [
  "210px", "200px", "220px", "210px",
  "200px", "230px", "195px", "215px", "220px", "190px",
];

/* ── Float timing ── */
const FLOAT_DUR = [8, 10, 12, 9, 11, 8.5, 10.5, 9.5, 11.5, 10];
const FLOAT_DEL = [0, 0.8, 1.6, 0.4, 1.2, 2.0, 0.6, 1.4, 0.2, 1.0];

/* ═══════════════════════════════════════════════════════
   MenuOverlay
   ═══════════════════════════════════════════════════════ */
export function MenuOverlay({ isOpen, onClose, items = [] }) {
  const wrapperRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) setMounted(true);
    else {
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!mounted || !isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [mounted, isOpen, onClose]);

  const handleNavClick = useCallback(
    (sectionId) => {
      onClose?.();
      scrollToSection(sectionId);
    },
    [onClose]
  );

  if (!mounted) return null;

  return (
    <div
      ref={wrapperRef}
      className={`fixed inset-0 z-40 transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div
        className="absolute inset-0 flex flex-col"
        style={{ backgroundColor: "var(--color-warm-cream)" }}
      >
        {/* ── Bottom background image ── */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            backgroundImage: "url(/images/header/bottom-img.png)",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            aspectRatio: "1717/293",
            width: "100%",
          }}
        />

        {/* ═══ Top bar — close X only (logo lives in Header) ═══ */}
        <div
          className="relative z-20 flex items-center justify-end
                     pr-6 md:pr-10 h-16 md:h-20 shrink-0"
        >
          <button
            onClick={onClose}
            className="w-11 h-11 flex flex-col items-center justify-center"
            aria-label="Close navigation"
          >
            <span
              className="block w-[22px] h-[1.5px] rounded-full"
              style={{
                backgroundColor: "var(--color-primary)",
                transform: "translateY(3.5px) rotate(45deg)",
              }}
            />
            <span
              className="block w-[22px] h-[1.5px] rounded-full"
              style={{
                backgroundColor: "var(--color-primary)",
                transform: "translateY(-3.5px) rotate(-45deg)",
              }}
            />
          </button>
        </div>

        {/* ═══ Sky area: floating cloud images ═══ */}
        <div className="relative z-10 flex-1 min-h-0">
          {/* ── Desktop ── */}
          <div className="hidden md:block absolute inset-0">
            {items.map((item, i) => {
              const pos = DESKTOP_POS[i % DESKTOP_POS.length];
              return (                  <div
                    key={item.sectionId}
                    className="absolute"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  >
                    <FloatingNavItem
                      label={item.label}
                      onClick={() => handleNavClick(item.sectionId)}
                      entranceDelay={0.1 + i * 0.07}
                      floatDuration={FLOAT_DUR[i % FLOAT_DUR.length]}
                      floatDelay={FLOAT_DEL[i % FLOAT_DEL.length]}
                      imageSrc={CLOUD_IMAGES[i % CLOUD_IMAGES.length]}
                      width={DESKTOP_W[i % DESKTOP_W.length]}
                    />
                  </div>
              );
            })}
          </div>

          {/* ── Mobile/tablet ── */}
          <div className="md:hidden absolute inset-0">
            {items.map((item, i) => {
              const pos = MOBILE_POS[i % MOBILE_POS.length];
              return (                  <div
                    key={item.sectionId}
                    className="absolute"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  >
                    <FloatingNavItem
                      label={item.label}
                      onClick={() => handleNavClick(item.sectionId)}
                      entranceDelay={0.05 + i * 0.05}
                      floatDuration={FLOAT_DUR[i % FLOAT_DUR.length]}
                      floatDelay={FLOAT_DEL[i % FLOAT_DEL.length]}
                      imageSrc={CLOUD_IMAGES[i % CLOUD_IMAGES.length]}
                      width={MOBILE_W[i % MOBILE_W.length]}
                    />
                  </div>
              );
            })}
          </div>
        </div>

        {/* ═══ Bottom bar ═══ */}
        <div
          className="relative z-20 flex flex-col justify-center
                     px-6 md:pl-[25%] md:pr-10 h-20 md:h-24 shrink-0"
        >
          <span
            className="text-[10px] md:text-xs tracking-[0.15em] uppercase"
            style={{ color: "var(--color-muted-brown)" }}
          >
            Get in Touch
          </span>
          <span
            className="text-xs md:text-sm tracking-[0.05em] font-semibold mt-0.5"
            style={{ color: "var(--color-text)" }}
          >
            cupidsnaturalfarm@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
}
