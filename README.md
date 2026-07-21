# 🌿 Cupid's Natural Farm

A modern single-page experience for Cupid's Natural Farm, highlighting the farm's story, land, animals, trust, and contact information.

## Overview

This project is a React + Vite website designed to present the farm as a warm, immersive experience with animated sections, a floating navigation overlay, and a gallery-focused storytelling layout.

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS v4
- Framer Motion
- GSAP + ScrollTrigger
- Lenis
- Oxlint

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Install and run

```bash
npm install
npm run dev
```

### Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
  App.jsx
  main.jsx
  components/
  hooks/
  lib/
  styles/
public/
  images/
```

## Favicon

The site favicon uses the logo image from the public images folder, using the preferred asset without the cream/white background.

---

## 📊 Performance Report

### Bundle Composition (Production Build)

| Chunk | Raw Size | Gzipped | Type |
|------|---------|---------|------|
| `index.js` (Main Entry) | 216.53 kB | 67.93 kB | Critical — loaded on first visit |
| `vendor-framer.js` | 138.34 kB | 45.35 kB | Critical — framer-motion library |
| `vendor-gsap.js` | 112.81 kB | 44.34 kB | Critical — GSAP animation library |
| `vendor-lenis.js` | 18.30 kB | 5.28 kB | Critical — smooth scroll library |
| `index.css` | 33.83 kB | 7.22 kB | Critical — Tailwind styles |
| **Total Initial Load** | **~520 kB** | **~168 kB** | — |
| `Journey.js` (lazy) | 14.75 kB | 5.18 kB | Lazy-loaded below the fold |
| `ContactSection.js` (lazy) | 13.29 kB | 3.75 kB | Lazy-loaded below the fold |
| `OurAnimals.js` (lazy) | 9.51 kB | 4.14 kB | Lazy-loaded below the fold |
| `WhatWeDo.js` (lazy) | 7.21 kB | 3.18 kB | Lazy-loaded below the fold |
| `ContentSections.js` (lazy) | 6.99 kB | 2.60 kB | Lazy-loaded below the fold |
| `OwnerDetails.js` (lazy) | 5.43 kB | 2.28 kB | Lazy-loaded below the fold |
| `Footer.js` (lazy) | 5.41 kB | 1.97 kB | Lazy-loaded below the fold |

### Code Splitting Strategy

- **Vendor chunking**: `framer-motion`, `gsap`, and `lenis` are split into separate cacheable chunks. Returning visitors only re-download changed chunks.
- **Lazy loading**: All sections below the fold (Journey, WhatWeDo, Gallery, LifeAtTheFarm, OwnerDetails, Contact, Footer) use `React.lazy()` + `Suspense`. They load independently when the browser is idle or when the user scrolls near them.
- **HTTP/2 friendly**: Multiple smaller chunks load in parallel rather than one monolithic bundle.

### Browser Performance (Chrome DevTools)

| Metric | Desktop | Mobile (375×812) |
|--------|---------|------------------|
| First Contentful Paint (FCP) | ~448 ms | ~450–550 ms |
| Network Requests | ~15–18 | ~15–18 |
| Console Errors | None | None |
| Asset Caching | 304 (cached) | 304 (cached) |
| Lazy Sections Load | On scroll / idle | On scroll / idle |

### Optimization Techniques Used

1. **Manual vendor chunking** via `vite.config.js` `manualChunks` function
2. **React.lazy() code splitting** for 7 of 11 page sections
3. **GVideo preload** — hero video uses `preload="auto"` with fade-in on loaded data
4. **Image lazy loading** — all gallery images use `loading="lazy"` and `decoding="async"`
5. **Reduced motion support** — respects `prefers-reduced-motion: reduce` to skip all animations
6. **Dark scrim overlay** on hero — avoids needing a heavy image filter or backdrop-blur
7. **Minimal dependencies** — only React 19, framer-motion, GSAP, Lenis, and Tailwind CSS

### Improvement Roadmap

| Area | Potential Gain |
|------|---------------|
| Dynamic GSAP import (lazy-load GSAP-dependent sections only) | ~44 kB gzip saved on initial load |
| Replace framer-motion Hero scroll with intersection observer | ~45 kB gzip saved on initial load |
| WebP/AVIF image formats for gallery | Reduced image transfer |
| Preload hero video as a poster image | Faster perceived load |

---

*Generated from production build on commit [`f436342`](https://github.com/Sayeed613/cupids-natural-farm/tree/f436342).*
