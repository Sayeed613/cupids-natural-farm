import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════════
   MEDIA FILES — actual images & videos from public/images/gallery
   ══════════════════════════════════════════════════════════════ */

const IMAGE_FILES = [
  "482193291_1057140309791879_6565871200527277080_n.jpg",
  "agriculture-1.jpg",
  "bannur-1.jpg",
  "bannur.jpg",
  "bufflo.jpg",
  "farm-2.jpg",
  "farm.png",
  "fruits-1.jpg",
  "fruits-2.jpg",
  "fruits.jpg",
  "goatscow.webp",
  "gotts.jpg",
  "hen-2.jpg",
  "hen-family.jpg",
  "hen-shed-2.jpg",
  "hen-shed.webp",
  "hens-1.jpg",
  "hens-3.jpg",
  "home.png",
  "home.webp",
  "nel-2.jpg",
  "nel.jpg",
  "ox-sheed-1.jpg",
  "ox-sheed-2.jpg",
  "ox-sheed-3.jpg",
  "ox-sheed-4.jpg",
  "ox.jpg",
  "road.webp",
  "s.jpg",
  "turkey.jpg",
  "unnamed (1).webp",
  "unnamed (14).webp",
  "unnamed (15).webp",
  "unnamed (2).webp",
  "unnamed (20).webp",
  "unnamed (3).webp",
  "unnamed (4).webp",
  "unnamed (5).webp",
  "unnamed (6).webp",
  "unnamed (7).webp",
  "unnamed (9).webp",
];

const VIDEO_FILES = [
  "AQM2FKPgqQ_Zv2_pnareoVyDi-ybmHfxsrc-hAktVX7-ROcuTBYXNUP82RV0w5YmmPhGKQotR9iy3CvQdxRqkmqYAk_ARqtg8YguuNLD24WO7g.mp4",
  "AQM2VLO-215svwRZ6twn0PuTiNnYhIJzDMsz7pO2_1bgfd_FOQ_Rp4QQW0er6MapKv6VkzoHrIRXdZu6McVzWpsIUv3l-QEFwzhc2gPnIhamXg.mp4",
  "AQMBfssUEqth2xRnzp3NUW4lm4rjBD_hFQ_19Wy4u7Pf8-ngXxz3QpJ8lE5mpqGAo4floMZ5BL2h-fVH-hy3EQ-jPp-zglvBk3w.mp4",
  "AQM_tDN4p7CGKvzdYe7AuewXc0U1zCyl_RYkpKK3qv0LanFX9koQYOIg3C5sqtIo9JPZU3Z0g9wWxoHRI87qiqEwiTbeUjuLug4oxNMtfl8i5Q.mp4",
  "AQN6nuCZcrPYDO81DqqOzzVAztL3G3MmHcLhVtwxgmnJuBUUUhFqvSF9qHeVh_chlST3G4SCEaYxn136JW7zxgW6JRMgxQUWNffQLGwpasdWw.mp4",
  "AQNnT8wleb1C9iUx4lYCfTppevZtNz-mTpiMOfvXluQkCghMSqUyQQB-66JxLqp3P_a5ti6Qs5syFWz53rW3UxYUl0KPHLVHxXWI-e8psknmaw.mp4",
  "AQNplH7ZL6Qj-2IzLsYxF-_QAkAH39qgYPu_RBgAGyjxt3aqQcgV1m5lFq-XJCEmxnbciGumIFHlosuGHtCFQ2NerzEBuTf8llm8j7rTfN1fpg.mp4",
  "AQOiDkGdl6Qhly5EKJJb3K6e044yJ9XJ4nrBh4JXuOerINSUYvp9QInp9PnvxhPq--BarSrfK-Xbz2V60eQ6ulIBI8veaYuuTxo.mp4",
  "AQOqDQE_b-tYZ1SGvQzWjrqio2Tq44GIBHHb6tlqiIJMZgkdPmpO8RNkL38zg8fhdVUk6lyXGyugt_dYHI8M8N7YfiWp85GNi50.mp4",
];

/* ── Fixed video positions — videos always appear at these spots ── */
const VIDEO_POSITIONS = new Set([5, 10, 16, 21, 26, 31, 36, 42, 47]);

/* ── Build media array (images + videos at fixed positions) ── */
function buildMedia() {
  const result = [];
  let imgIdx = 0;
  let vidIdx = 0;
  const total = IMAGE_FILES.length + VIDEO_FILES.length;

  for (let i = 0; i < total; i++) {
    if (VIDEO_POSITIONS.has(i) && vidIdx < VIDEO_FILES.length) {
      result.push({ type: "video", file: VIDEO_FILES[vidIdx++] });
    } else {
      result.push({ type: "image", file: IMAGE_FILES[imgIdx++ % IMAGE_FILES.length] });
    }
  }
  return result;
}

/* ── Layout pattern: 22 items, 4-column masonry ──
 *   s = col-span-1 (small square)
 *   m = col-span-2 (medium landscape)
 *   l = col-span-4 (full-width banner)
 * Each has an entrance direction for GSAP stagger.
 */
const LAYOUT = [
  // Row 1
  { size: "s", dir: "up" },
  { size: "m", dir: "left" },
  { size: "s", dir: "right" },
  // Row 2
  { size: "m", dir: "down" },
  { size: "m", dir: "up" },
  // Row 3
  { size: "s", dir: "left" },
  { size: "s", dir: "right" },
  { size: "s", dir: "up" },
  { size: "s", dir: "down" },
  // Row 4
  { size: "m", dir: "left" },
  { size: "s", dir: "right" },
  { size: "s", dir: "up" },
  // Row 5 — full-width banner
  { size: "l", dir: "down" },
  // Row 6
  { size: "s", dir: "up" },
  { size: "m", dir: "left" },
  { size: "s", dir: "right" },
  // Row 7
  { size: "s", dir: "down" },
  { size: "s", dir: "up" },
  { size: "s", dir: "left" },
  { size: "s", dir: "right" },
  // Row 8
  { size: "m", dir: "up" },
  { size: "m", dir: "down" },
];

/* ── Merge shuffled media into layout pattern ── */
const MEDIA = buildMedia();
const GALLERY = Array.from({ length: MEDIA.length }, (_, i) => ({
  ...MEDIA[i],
  ...LAYOUT[i % LAYOUT.length],
  id: i + 1,
}));

/* ══════════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════════ */

function spanStr(size) {
  switch (size) {
    case "s":
      return "col-span-1";
    case "m":
      return "col-span-2";
    case "l":
      return "col-span-2 md:col-span-4";
    default:
      return "col-span-1";
  }
}

function ratioStr(size) {
  switch (size) {
    case "s":
      return "1 / 1";
    case "m":
      return "4 / 3";
    case "l":
      return "21 / 9";
    default:
      return "1 / 1";
  }
}

function entranceTransform(dir) {
  switch (dir) {
    case "left":
      return { x: -120, y: 0, rotation: -6, scale: 0.85 };
    case "right":
      return { x: 120, y: 0, rotation: 6, scale: 0.85 };
    case "down":
      return { x: 0, y: 120, rotation: 4, scale: 0.85 };
    case "up":
    default:
      return { x: 0, y: -120, rotation: -4, scale: 0.85 };
  }
}

const GRADIENTS = [
  "#AFC8A3",
  "#DCE8DD",
  "#F7F7F2",
  "#C6C33B",
  "#4D8A4F",
  "#7B6548",
  "#D7D150",
  "#2C6A45",
];

/* ══════════════════════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════════════════════ */

/**
 * GalleryOurFarm — 4-column masonry grid using real farm photos & videos.
 * Images and videos are shuffled randomly on each build.
 * Videos play muted + loop, same scroll-reveal as images.
 */
export function GalleryOurFarm() {
  const sectionRef = useRef(null);
  const tilesRef = useRef([]);

  /* ── GSAP scroll-reveal animation (images + video tiles) ── */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const tiles = tilesRef.current;
    if (!section || !tiles.length) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.set(tiles, { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0 });
      return;
    }

    /* ── Set initial positions ── */
    GALLERY.forEach((item, i) => {
      const el = tiles[i];
      if (!el) return;
      const t = entranceTransform(item.dir);
      gsap.set(el, {
        opacity: 0,
        x: t.x,
        y: t.y,
        scale: t.scale,
        rotation: t.rotation,
      });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "bottom 25%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      /* ── Heading fade ── */
      const heading = section.querySelector("[data-gallery-heading]");
      if (heading) {
        tl.fromTo(
          heading,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          0
        );
      }

      /* ── Staggered tile entrance ── */
      GALLERY.forEach((item, i) => {
        const el = tiles[i];
        if (!el) return;
        const t = entranceTransform(item.dir);

        tl.to(
          el,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          i * 0.05
        );
      });
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  /* ── IntersectionObserver: play videos when scrolled into view ── */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const videos = section.querySelectorAll("video[data-gallery-video]");
    if (!videos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px 100px 0px" }
    );

    videos.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="our-farm"
      data-header-theme="light"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "var(--color-warm-cream)" }}
    >
      <div className="px-6 md:px-16 py-20 md:py-28">
        {/* ── Heading ── */}
        <div data-gallery-heading className="max-w-3xl mb-12 md:mb-16">
          <span
            className="text-[10px] md:text-xs tracking-[0.2em] uppercase block mb-4"
            style={{ color: "var(--color-muted-brown)" }}
          >
            Gallery · Life at the Farm
          </span>
          <h2
            className="font-serif leading-[1.1]"
            style={{
              color: "var(--color-text)",
              fontSize: "clamp(2rem, 4vw + 0.5rem, 4rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            Through Our Lens
            <br />
            Moments from the Sanctuary
          </h2>
        </div>

        {/* ── 4-column masonry grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 lg:gap-4 auto-rows-auto">
          {GALLERY.map((media) => (
            <div
              key={media.id}
              ref={(el) => (tilesRef.current[media.id - 1] = el)}
              className={`group relative overflow-hidden will-change-transform rounded-lg md:rounded-xl ${spanStr(media.size)}`}
              style={{ aspectRatio: ratioStr(media.size) }}
            >
              {/* ── Image ── */}
              {media.type === "image" && (
                <img
                  src={`/images/gallery/${encodeURI(media.file)}`}
                  alt={`Farm gallery — ${media.id}`}
                  className="w-full h-full object-cover block transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.style.display = "none";
                    const parent = e.target.parentElement;
                    if (!parent) return;
                    const color = GRADIENTS[media.id % GRADIENTS.length];
                    parent.style.background = `linear-gradient(135deg, ${color}, ${color}dd)`;
                    parent.style.display = "flex";
                    parent.style.alignItems = "center";
                    parent.style.justifyContent = "center";
                    const label = document.createElement("span");
                    label.textContent = `📷 Photo ${String(media.id).padStart(3, "0")}`;
                    label.style.color = "#183A24";
                    label.style.fontSize = "clamp(0.75rem, 1.5vw, 1.25rem)";
                    label.style.fontFamily = "Georgia, serif";
                    label.style.opacity = "0.5";
                    label.style.transition = "opacity 0.3s ease";
                    parent.appendChild(label);

                    parent.addEventListener("mouseenter", () => {
                      label.style.opacity = "0.8";
                    });
                    parent.addEventListener("mouseleave", () => {
                      label.style.opacity = "0.5";
                    });
                  }}
                />
              )}

              {/* ── Video (muted, loop, plays on scroll into view) ── */}
              {media.type === "video" && (
                <video
                  src={`/images/gallery/videos/${encodeURI(media.file)}`}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  data-gallery-video
                  className="w-full h-full object-cover block transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                />
              )}

              {/* ── Hover vignette overlay ── */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* ── Type badge ── */}
              {media.type === "video" && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase pointer-events-none"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.45)",
                    color: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                  Video
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
