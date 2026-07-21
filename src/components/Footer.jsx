import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { scrollToSection } from "@/lib/utils";

/* ── Data ── */

const FOOTER_LINKS = [
  { label: "Home",             sectionId: "home" },
  { label: "Our Story",        sectionId: "our-story" },
  { label: "The Trust",        sectionId: "the-trust" },
  { label: "What We Do",       sectionId: "what-we-do" },
  { label: "Our Farm",         sectionId: "our-farm" },
  { label: "Life at the Farm", sectionId: "life-at-the-farm" },
  { label: "Behind Cupid's",   sectionId: "behind-cupids" },
  { label: "Contact",          sectionId: "contact" },
];

const SOCIAL_LINKS = [
  { label: "Facebook",  href: "https://www.facebook.com/cupids4777/" },
];

const CONTACT_INFO = [
  { label: "Email", value: "cupidsnaturalfarm@gmail.com", href: "mailto:cupidsnaturalfarm@gmail.com" },
  { label: "Phone", value: "+91 63648-85653" },
  { label: "Location", value: "Cupid's Natural Farm\nKonganahalli Village, Hosur Hobli\nGowribidnur Taluk, Chikkaballapura Dist.\nKarnataka, India" },
];

/* ── Helper components ── */

function FooterSection({ title, children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {title && (
        <span
          className="block text-[11px] tracking-[0.18em] uppercase mb-5 font-medium"
          style={{ color: "rgba(24,58,36,0.8)" }}
        >
          {title}
        </span>
      )}
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Footer — Aceternity UI-style 4-grid simple footer
   ══════════════════════════════════════════════════════════════ */
export function Footer() {
  const footerRef = useRef(null);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"

    >
      {/* ── Full background image ── */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(/images/contact/contact.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* ── Light white overlay for readability ── */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor: "rgba(255,255,255,0.55)" }}
      />

      {/* ── Top accent bar ── */}
      <div
        className="h-[2px] w-full relative z-10"
        style={{ backgroundColor: "var(--color-primary)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:py-24">
        {/* ── 4-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Column 1 — Brand */}
          <FooterSection title="" delay={0}>
            <button
              onClick={() => scrollToSection("home")}
              className="inline-flex items-center gap-2.5 bg-transparent border-0 cursor-pointer p-0 text-left mb-4 group"
              style={{ color: "var(--color-text)" }}
            >
              <div className="h-10 w-10 rounded-full bg-black/10 flex items-center justify-center shrink-0">
                <img
                  src="/images/logo/image.png"
                  alt=""
                  className="h-5 w-auto transition-transform duration-300 group-hover:scale-105"
                  draggable={false}
                />
              </div>
              <span className="text-left leading-tight">
                <span
                  className="block text-sm tracking-[0.1em] uppercase font-medium"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Cupid's
                </span>
                <span className="block text-[10px] tracking-[0.12em] uppercase" style={{ opacity: 0.5, color: "var(--color-text)" }}>
                  Natural Farm
                </span>
              </span>
            </button>
            <p
              className="text-xs leading-relaxed max-w-xs"
              style={{ color: "rgba(24,58,36,0.8)" }}
            >
              An integrated natural farm rooted in Karnataka's soil.
              The Cupid's Goshala Trust preserves indigenous cattle
              breeds alongside Elaga sheep, goats, and free-range
              poultry through ethical, chemical-free practices.
            </p>
          </FooterSection>

          {/* Column 2 — Explore */}
          <FooterSection title="Explore" delay={0.1}>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.sectionId}>
                  <button
                    onClick={() => scrollToSection(link.sectionId)}
                    className="text-sm bg-transparent border-0 cursor-pointer p-0
                               transition-all duration-300 ease-out
                               hover:translate-x-1"
                    style={{ color: "rgba(24,58,36,0.85)" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Column 3 — Contact */}
          <FooterSection title="Contact" delay={0.2}>
            <ul className="space-y-3.5">
              {CONTACT_INFO.map((item, i) => (
                <li key={i}>
                  <span
                    className="block text-[10px] tracking-[0.12em] uppercase mb-0.5"
                    style={{ color: "rgba(24,58,36,0.65)" }}
                  >
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm transition-opacity duration-300 hover:opacity-70"
                      style={{ color: "var(--color-text)", textDecoration: "none" }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span
                      className="text-sm whitespace-pre-line"
                      style={{ color: "var(--color-text)" }}
                    >
                      {item.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Column 4 — Connect */}
          <FooterSection title="Connect" delay={0.3}>
            <ul className="space-y-2.5">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm inline-flex items-center gap-1.5
                               transition-all duration-300 ease-out
                               hover:translate-x-1"
                    style={{ color: "rgba(24,58,36,0.85)", textDecoration: "none" }}
                  >
                    {link.label}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="opacity-40"
                    >
                      <path
                        d="M1 11L11 1M11 1H4M11 1V8"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </FooterSection>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t"
          style={{ borderColor: "rgba(24,58,36,0.1)" }}
        >
          <p
            className="text-[11px] tracking-[0.03em]"
            style={{  color: "rgba(24,58,36,0.8)" }}
          >
            &copy; {new Date().getFullYear()} Cupid's Natural Farm. All rights reserved.
          </p>
          <p
            className="text-[11px] tracking-[0.03em] text-bold"
            style={{  color: "rgba(24,58,36,0.8)" }}
          >
            Crafted with care, rooted in tradition.
          </p>
        </div>
      </div>
    </footer>
  );
}
