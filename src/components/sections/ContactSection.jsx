import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Farm location — Konganahalli Village, Gowribidnur Taluk, Chikkaballapura Dist. ── */
const FARM_COORDS = { lat: 13.513558, lng: 77.42592 };
const GOOGLE_MAPS_URL = `https://www.google.com/maps?q=${FARM_COORDS.lat},${FARM_COORDS.lng}`;

/* ── Legend ── */
const LEGEND_ITEMS = [
  { icon: "📍", label: "Farm Location" },
  { icon: "🌾", label: "Organic Fields" },
  { icon: "🌿", label: "Orchard" },
  { icon: "🐄", label: "Goshala" },
  { icon: "🅿️", label: "Parking" },
  { icon: "💧", label: "Pond" },
];

function Legend({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, delay: 1.4 }}
      className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 px-1"
    >
      {LEGEND_ITEMS.map((item) => (
        <span
          key={item.label}
          className="inline-flex items-center gap-1 text-[10px]"
          style={{ color: "var(--color-text)", opacity: 0.6 }}
        >
          <span className="text-xs">{item.icon}</span>
          {item.label}
        </span>
      ))}
    </motion.div>
  );
}

/* ── Illustrated Farm Map SVG ── */
function FarmMapSVG() {
  return (
    <svg
      viewBox="0 0 500 375"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* ── Background ── */}
      <rect width="500" height="375" fill="#F5F0E8" rx="12" />

      {/* ── Sky area (top) ── */}
      <rect x="0" y="0" width="500" height="50" fill="#E8F0F5" />

      {/* ── Main field ── */}
      <ellipse cx="250" cy="230" rx="220" ry="130" fill="#DCE8C8" />

      {/* ── Organic Fields (checkered pattern in center-right) ── */}
      <rect x="220" y="140" width="140" height="100" rx="4" fill="#C5D9A0" />
      <rect x="220" y="140" width="70" height="50" rx="2" fill="#B8CF8A" />
      <rect x="290" y="190" width="70" height="50" rx="2" fill="#B8CF8A" />
      <line x1="290" y1="140" x2="290" y2="240" stroke="#DCE8C8" strokeWidth="1" />
      <line x1="220" y1="190" x2="360" y2="190" stroke="#DCE8C8" strokeWidth="1" />

      {/* ── Orchard (top right) ── */}
      <circle cx="380" cy="110" r="8" fill="#7CB342" />
      <circle cx="400" cy="95" r="7" fill="#689F38" />
      <circle cx="415" cy="115" r="9" fill="#7CB342" />
      <circle cx="390" cy="130" r="6" fill="#8BC34A" />
      <circle cx="410" cy="140" r="7" fill="#689F38" />
      {/* Tree trunks */}
      <line x1="380" y1="118" x2="380" y2="128" stroke="#8D6E63" strokeWidth="2" />
      <line x1="400" y1="102" x2="400" y2="112" stroke="#8D6E63" strokeWidth="2" />
      <line x1="415" y1="124" x2="415" y2="134" stroke="#8D6E63" strokeWidth="2" />
      <line x1="390" y1="136" x2="390" y2="146" stroke="#8D6E63" strokeWidth="2" />
      <line x1="410" y1="147" x2="410" y2="157" stroke="#8D6E63" strokeWidth="2" />

      {/* ── Goshala (top left) ── */}
      <rect x="60" y="80" width="60" height="45" rx="4" fill="#D7CCC8" stroke="#A1887F" strokeWidth="1.5" />
      {/* Goshala roof */}
      <polygon points="55,85 90,55 125,85" fill="#8D6E63" />
      {/* Goshala door */}
      <rect x="80" y="100" width="18" height="25" rx="2" fill="#5D4037" />
      {/* Cow indicator */}
      <circle cx="70" cy="108" r="5" fill="#EFEBE9" stroke="#BCAAA4" strokeWidth="1" />
      <circle cx="105" cy="112" r="4" fill="#EFEBE9" stroke="#BCAAA4" strokeWidth="1" />

      {/* ── Pond (center left) ── */}
      <ellipse cx="130" cy="200" rx="45" ry="25" fill="#B3D4E0" />
      <ellipse cx="130" cy="198" rx="35" ry="18" fill="#C5E1EE" />
      {/* Water ripples */}
      <path d="M115 195 Q120 192 125 195" stroke="#E3F2F9" strokeWidth="1" fill="none" />
      <path d="M130 202 Q135 199 140 202" stroke="#E3F2F9" strokeWidth="1" fill="none" />

      {/* ── Tractor (on field path) ── */}
      <rect x="180" y="245" width="28" height="14" rx="3" fill="#5D4037" />
      <circle cx="188" cy="262" r="5" fill="#3E2723" />
      <circle cx="200" cy="262" r="5" fill="#3E2723" />
      <rect x="195" y="245" width="8" height="8" rx="1" fill="#D7CCC8" />

      {/* ── Roads / Paths ── */}
      {/* Main road from entrance */}
      <path d="M250 370 L250 310 L180 260 Q150 240 130 200" stroke="#C9B99A" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M250 310 L320 240 Q350 210 380 130" stroke="#C9B99A" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Path to Goshala */}
      <path d="M130 200 Q100 160 90 125" stroke="#C9B99A" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Path to parking */}
      <path d="M250 340 L200 340 Q160 340 140 320" stroke="#C9B99A" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* ── Visitor Parking (bottom left) ── */}
      <rect x="80" y="305" width="55" height="35" rx="4" fill="#D7CCC8" stroke="#BCAAA4" strokeWidth="1" />
      <text x="90" y="322" fontSize="6" fill="#5D4037" fontFamily="sans-serif" fontWeight="bold">P</text>
      {/* Parking lines */}
      <line x1="105" y1="305" x2="105" y2="320" stroke="#BCAAA4" strokeWidth="0.8" />
      <line x1="115" y1="305" x2="115" y2="320" stroke="#BCAAA4" strokeWidth="0.8" />
      <line x1="125" y1="305" x2="125" y2="320" stroke="#BCAAA4" strokeWidth="0.8" />

      {/* ── Farm Entrance (bottom center) ── */}
      <rect x="230" y="325" width="40" height="35" rx="6" fill="#A1887F" stroke="#8D6E63" strokeWidth="1.5" />
      {/* Gate */}
      <rect x="238" y="332" width="10" height="20" rx="2" fill="#EFEBE9" />
      <rect x="252" y="332" width="10" height="20" rx="2" fill="#EFEBE9" />
      {/* Entrance arch */}
      <path d="M235 325 Q250 310 265 325" stroke="#8D6E63" strokeWidth="2" fill="none" />

      {/* ── Reception (near entrance) ── */}
      <rect x="290" y="300" width="28" height="22" rx="3" fill="#D7CCC8" stroke="#BCAAA4" strokeWidth="1" />
      <rect x="296" y="304" width="8" height="10" rx="1" fill="#8D6E63" />

      {/* ── Hills / Background ── */}
      <path d="M0 80 Q100 30 200 60 Q300 20 400 55 Q450 35 500 60 L500 80 Z" fill="#D4E4B8" opacity="0.5" />
      <path d="M0 65 Q80 15 180 50 Q280 10 380 45 Q450 25 500 50 L500 65 Z" fill="#C5D9A0" opacity="0.4" />

      {/* ── Clouds ── */}
      <ellipse cx="80" cy="20" rx="35" ry="10" fill="white" opacity="0.6" />
      <ellipse cx="95" cy="18" rx="25" ry="8" fill="white" opacity="0.7" />
      <ellipse cx="350" cy="30" rx="40" ry="10" fill="white" opacity="0.5" />
      <ellipse cx="365" cy="28" rx="30" ry="8" fill="white" opacity="0.6" />

      {/* ── Trees / Scattered vegetation ── */}
      <circle cx="40" cy="155" r="6" fill="#7CB342" />
      <circle cx="50" cy="148" r="5" fill="#689F38" />
      <circle cx="55" cy="160" r="4" fill="#8BC34A" />
      <circle cx="440" cy="200" r="7" fill="#7CB342" />
      <circle cx="455" cy="195" r="5" fill="#689F38" />
      <circle cx="300" cy="270" r="4" fill="#7CB342" />
      <circle cx="420" cy="250" r="5" fill="#8BC34A" />
      <circle cx="155" cy="135" r="4" fill="#7CB342" />

      {/* ── Cows grazing ── */}
      <g transform="translate(160, 180)">
        <ellipse cx="0" cy="0" rx="6" ry="3.5" fill="#EFEBE9" stroke="#BCAAA4" strokeWidth="0.5" />
        <ellipse cx="-5" cy="-3" rx="3.5" ry="3" fill="#EFEBE9" stroke="#BCAAA4" strokeWidth="0.5" />
        <circle cx="-5" cy="-4" r="1" fill="#5D4037" />
      </g>
      <g transform="translate(340, 165)">
        <ellipse cx="0" cy="0" rx="5" ry="3" fill="#D7CCC8" stroke="#BCAAA4" strokeWidth="0.5" />
        <ellipse cx="-4" cy="-2.5" rx="3" ry="2.5" fill="#D7CCC8" stroke="#BCAAA4" strokeWidth="0.5" />
        <circle cx="-4" cy="-3.5" r="0.8" fill="#5D4037" />
      </g>

      {/* ── Main Location Pin ── */}
      <g transform="translate(250, 265)">
        {/* Pin shadow */}
        <ellipse cx="0" cy="16" rx="6" ry="3" fill="rgba(0,0,0,0.08)" />
        {/* Pin body */}
        <path d="M0-12 C-6-12 -10-7 -10-3 C-10 2 0 12 0 12 C0 12 10 2 10-3 C10-7 6-12 0-12Z" fill="#183A24" />
        {/* Pin highlight */}
        <path d="M0-10 C-5-10 -8-6 -8-3 C-8 1 0 9 0 9 C0 9 8 1 8-3 C8-6 5-10 0-10Z" fill="rgba(255,255,255,0.15)" />
        {/* Pin center dot */}
        <circle cx="0" cy="-3" r="3" fill="#F5F0E8" />
        {/* Ripple animation */}
        <circle cx="0" cy="-3" r="5" fill="none" stroke="#183A24" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="5;12" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* ── Labels ── */}
      <text x="250" y="295" fontSize="9" fill="#183A24" fontFamily="Georgia, serif" textAnchor="middle" fontWeight="bold">Cupid's Natural Farm</text>
      <text x="90" y="77" fontSize="7" fill="#5D4037" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Goshala</text>
      <text x="400" y="102" fontSize="7" fill="#33691E" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Orchard</text>
      <text x="295" y="137" fontSize="7" fill="#33691E" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Organic Fields</text>
      <text x="130" y="178" fontSize="7" fill="#1565C0" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Pond</text>
      <text x="108" y="348" fontSize="7" fill="#5D4037" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Parking</text>
      <text x="304" y="332" fontSize="6" fill="#5D4037" fontFamily="sans-serif" textAnchor="middle">Reception</text>

      {/* ── Dot markers for each location ── */}
      <circle cx="90" cy="100" r="3" fill="#183A24" />
      <circle cx="400" cy="110" r="3" fill="#183A24" />
      <circle cx="295" cy="170" r="3" fill="#183A24" />
      <circle cx="130" cy="190" r="3" fill="#183A24" />
      <circle cx="108" cy="325" r="3" fill="#183A24" />
      <circle cx="304" cy="315" r="3" fill="#183A24" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   ContactSection — Left text + right illustrated farm map
   ══════════════════════════════════════════════════════════════ */
export function ContactSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const inView = useInView(contentRef, { once: true, margin: "-60px" });

  const openGoogleMaps = () => {
    window.open(GOOGLE_MAPS_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      data-header-theme="light"
      className="relative min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--color-warm-cream)" }}
    >
      {/* ── Content wrapper: left text + right map ── */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
      >
        {/* ── LEFT: Text content ── */}
        <div className="text-left">
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[10px] md:text-xs tracking-[0.2em] uppercase block mb-4"
            style={{ color: "var(--color-muted-brown)" }}
          >
            Contact
          </motion.span>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
            className="font-serif leading-[1.1] mb-4"
            style={{
              color: "var(--color-text)",
              fontSize: "clamp(1.8rem, 3.5vw + 0.5rem, 3.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            Visit the Farm,
            <br />
            <span style={{ color: "var(--color-primary)" }}>Let's Connect</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-sm md:text-base leading-relaxed max-w-md mb-8"
            style={{ color: "var(--color-text)", opacity: 0.8 }}
          >
            We'd love to welcome you to Cupid's Natural Farm. Whether you'd like
            to schedule a visit, inquire about our produce, or learn more about
            the Goshala Trust — reach out and we'll respond as soon as we can.
          </motion.p>

          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            className="flex flex-wrap gap-6"
          >
            <a
              href="mailto:cupidsnaturalfarm@gmail.com"
              className="inline-flex items-center gap-2 text-xs transition-opacity duration-300 hover:opacity-70"
              style={{ color: "var(--color-primary)", textDecoration: "none" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M1 3.5L7 8.5L13 3.5" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
              cupidsnaturalfarm@gmail.com
            </a>
            <button
              onClick={openGoogleMaps}
              className="inline-flex items-center gap-2 text-xs bg-transparent border-0 cursor-pointer p-0 transition-opacity duration-300 hover:opacity-70 text-left"
              style={{ color: "var(--color-primary)", opacity: 1 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1C4.2 1 2 3.2 2 6c0 3.5 5 7 5 7s5-3.5 5-7c0-2.8-2.2-5-5-5z" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="7" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
              <span className="whitespace-pre-line">Konganahalli Village,
Gowribidnur, Chikkaballapura</span>
            </button>
          </motion.div>
        </div>

        {/* ── RIGHT: Illustrated Farm Map Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={
            inView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 40, scale: 0.95 }
          }
          transition={{
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.45,
          }}
          className="rounded-2xl overflow-hidden shadow-lg w-full cursor-pointer group"
          style={{ backgroundColor: "var(--color-soft-white)" }}
          onClick={openGoogleMaps}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openGoogleMaps(); }}
          aria-label="Open farm location in Google Maps"
        >
          {/* ── Map container ── */}
          <div className="aspect-[4/3] w-full relative overflow-hidden">
            {/* Illustrated SVG map */}
            <FarmMapSVG />

            {/* Hover overlay — "Open in Google Maps" */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: "rgba(24,58,38,0.7)" }}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1C4.2 1 2 3.2 2 6c0 3.5 5 7 5 7s5-3.5 5-7c0-2.8-2.2-5-5-5z" fill="white"/>
                  <circle cx="7" cy="5.5" r="1.5" fill="#183A24"/>
                </svg>
                <span className="text-xs text-white font-medium tracking-wider">Open in Google Maps</span>
              </div>
            </div>
          </div>

          {/* ── Legend ── */}
          <div className="px-4 md:px-5 pb-4 md:pb-5">
            <Legend inView={inView} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}