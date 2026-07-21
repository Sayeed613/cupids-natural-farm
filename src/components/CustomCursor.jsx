import { useEffect, useRef, useCallback, useState } from "react";

/* ══════════════════════════════════════════════════════════════
   🌸 Meadow Sprout Cursor
   ──────────────────────────────────────────────────────────
   The cursor grows a tiny wildflower meadow as you move.
   
   ◇ Seed SVG cursor (set in globals.css)
   ◇ Trail — wildflowers bloom where you've been
              (rust daisies, amber cups, ochre spikes, ember stars, crimson poppies, bronze bells)
   ◇ Grass — tiny blades sway along the path
   ◇ Glow — soft firefly lights float when idle
   
   Every flower is unique — different species, sizes, colors.
   No two are ever the same.
   ══════════════════════════════════════════════════════════════ */

/* ── Flower species — Autumn Harvest ── */
const FLORA = [
  { petals: 8, colors: ["#D2691E", "#CD5C5C"], ctr: "#8B4513", size: 5, name: "rust-daisy" },
  { petals: 5, colors: ["#FFBF00", "#FF8C00"], ctr: "#B8860B", size: 4, name: "amber-cup" },
  { petals: 6, colors: ["#CC7722", "#B87333"], ctr: "#6B3A2E", size: 3, name: "ochre-spike" },
  { petals: 7, colors: ["#CC5500", "#B84D00"], ctr: "#5C2100", size: 4, name: "ember-star" },
  { petals: 4, colors: ["#8B0000", "#A52A2A"], ctr: "#4A0000", size: 5, name: "crimson-poppy" },
  { petals: 6, colors: ["#B87333", "#966919"], ctr: "#5C4033", size: 3, name: "bronze-bell" },
  { petals: 3, colors: ["#DAA520", "#B8860B"], ctr: "#665D1E", size: 4, name: "golden-wheat" },
  { petals: 5, colors: ["#800020", "#6B0F0F"], ctr: "#3D0000", size: 4, name: "burgundy-star" },
];

const MAX_FLOWERS = 35;
const FLOWER_LIFETIME = 360; // frames (~6s)
const SPAWN_INTERVAL = 4; // minimum frames between flowers
const MIN_SPAWN_DIST = 12; // minimum px distance to spawn a flower

/* ── Pre-create flower type palettes for speed ── */
const FLOWER_PALETTES = Array.from({ length: FLORA.length }, (_, fi) => {
  const species = FLORA[fi];
  return {
    petals: species.petals,
    colors: species.colors,
    ctr: species.ctr,
    baseSize: species.size,
  };
});

/* ── Create a single flower at (x, y) ── */
function bloom(x, y, velAngle) {
  const palette = FLOWER_PALETTES[Math.floor(Math.random() * FLOWER_PALETTES.length)];
  const petalSize = palette.baseSize * (0.7 + Math.random() * 0.6);
  const stemH = petalSize * (2 + Math.random() * 2);
  const colorIdx = Math.floor(Math.random() * palette.colors.length);
  return {
    x,
    y,
    stemH,
    petalSize,
    petalCount: palette.petals,
    petalColor: palette.colors[colorIdx],
    centerColor: palette.ctr,
    phase: Math.random() * Math.PI * 2,   // sway phase
    swaySpeed: 0.02 + Math.random() * 0.03,
    life: FLOWER_LIFETIME,
    maxLife: FLOWER_LIFETIME,
    born: performance.now(),
    lean: (Math.random() - 0.5) * 0.3,    // subtle lean direction
    velAngle,                               // direction mouse was moving
  };
}

/* ── Grass blade ── */
function grassBlade(x, y) {
  return {
    x, y,
    h: 6 + Math.random() * 8,
    lean: (Math.random() - 0.5) * 0.4,
    phase: Math.random() * Math.PI * 2,
    speed: 0.015 + Math.random() * 0.02,
    life: FLOWER_LIFETIME * 0.7,
    maxLife: FLOWER_LIFETIME * 0.7,
  };
}

/* ── Ambient firefly (for idle state) ── */
function ambientFirefly() {
  const vw = window.innerWidth || 1920;
  const vh = window.innerHeight || 1080;
  return {
    x: Math.random() * vw,
    y: Math.random() * vh,
    size: 1.5 + Math.random() * 2,
    speed: 0.2 + Math.random() * 0.3,
    angle: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.04,
    pulseOffset: Math.random() * Math.PI * 2,
  };
}

/**
 * CustomCursor — The Meadow Sprout.
 *
 * A one-of-a-kind cursor that grows wildflowers as you move.
 * Each flower is individually drawn with petals, stem, and center.
 * Grass sways at your passing. Fireflies glow when you rest.
 */
export function CustomCursor() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const lastPosRef = useRef({ x: 0, y: 0 });
  const [alive, setAlive] = useState(false);
  const aliveRef = useRef(false);
  const timeoutRef = useRef(null);
  const flowersRef = useRef([]);
  const grassRef = useRef([]);
  const firefliesRef = useRef([]);
  const frameRef = useRef(0);
  const spawnCooldownRef = useRef(0);
  const firstMoveRef = useRef(true);
  const bloomTimeoutRef = useRef(null);

  /* ── Mouse ── */
  const onMove = useCallback((e) => {
    const x = e.clientX;
    const y = e.clientY;
    const lp = lastPosRef.current;
    posRef.current = { x, y };

    if (!aliveRef.current) {
      aliveRef.current = true;
      setAlive(true);
    }

    /* Spawn flowers along the path (skip first move) */
    if (firstMoveRef.current) {
      firstMoveRef.current = false;
      lp.x = x;
      lp.y = y;
    } else {
      const dx = x - lp.x;
      const dy = y - lp.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      if (dist >= MIN_SPAWN_DIST && spawnCooldownRef.current <= 0) {
        /* Spawn a flower halfway along the path */
        const fx = lp.x + dx * 0.5;
        const fy = lp.y + dy * 0.5;
        const f = flowersRef.current;
        if (f.length < MAX_FLOWERS) {
          f.push(bloom(fx, fy, angle));
        }
        /* Also a grass blade */
        const g = grassRef.current;
        if (g.length < MAX_FLOWERS * 0.6) {
          g.push(grassBlade(fx + (Math.random() - 0.5) * 8, fy + (Math.random() - 0.5) * 4));
        }
        spawnCooldownRef.current = SPAWN_INTERVAL;
      }
      lp.x = x;
      lp.y = y;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      aliveRef.current = false;
      setAlive(false);
    }, 4000);
  }, []);

  const onLeave = useCallback(() => {
    aliveRef.current = false;
    setAlive(false);
  }, []);

  /* ── Hover: bloom burst ── */
  const enlarge = useCallback(() => {
    if (bloomTimeoutRef.current) clearTimeout(bloomTimeoutRef.current);
    bloomTimeoutRef.current = setTimeout(() => {
      bloomTimeoutRef.current = null;
      if (aliveRef.current) {
        const p = posRef.current;
        const f = flowersRef.current;
        for (let i = 0; i < 3; i++) {
          if (f.length < MAX_FLOWERS) {
            const fx = p.x + (Math.random() - 0.5) * 25;
            const fy = p.y + (Math.random() - 0.5) * 15;
            f.push(bloom(fx, fy, Math.random() * Math.PI * 2));
          }
        }
      }
    }, 150);
  }, []);
  const shrink = useCallback(() => {
    if (bloomTimeoutRef.current) {
      clearTimeout(bloomTimeoutRef.current);
      bloomTimeoutRef.current = null;
    }
  }, []);

  /* ── Main effect ── */
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", enlarge);
      el.addEventListener("mouseleave", shrink);
    });

    /* Idle fireflies */
    for (let i = 0; i < 12; i++) firefliesRef.current.push(ambientFirefly());

    /* ── RAF ── */
    function tick() {
      const f = frameRef.current++;
      const p = posRef.current;

      /* Cooldown */
      if (spawnCooldownRef.current > 0) spawnCooldownRef.current--;

      /* ── Clear ── */
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* ── Draw fireflies (idle glow) ── */
      const flies = firefliesRef.current;
      for (let i = 0; i < flies.length; i++) {
        const fl = flies[i];
        fl.x += Math.cos(fl.angle) * fl.speed;
        fl.y += Math.sin(fl.angle) * fl.speed;
        fl.angle += (Math.random() - 0.5) * 0.1;
        /* Wrap around */
        if (fl.x < -50) fl.x = canvas.width + 50;
        if (fl.x > canvas.width + 50) fl.x = -50;
        if (fl.y < -50) fl.y = canvas.height + 50;
        if (fl.y > canvas.height + 50) fl.y = -50;

        const pulse = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(f * fl.pulseSpeed + fl.pulseOffset));
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = pulse * 0.25;
        const grad = ctx.createRadialGradient(fl.x, fl.y, 0, fl.x, fl.y, fl.size * 6);
        grad.addColorStop(0, "rgba(255, 235, 160, 1)");
        grad.addColorStop(0.5, "rgba(255, 215, 0, 0.2)");
        grad.addColorStop(1, "rgba(255, 215, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(fl.x, fl.y, fl.size * 6, 0, Math.PI * 2);
        ctx.fill();
      }

      /* ── Draw grass ── */
      const grass = grassRef.current;
      for (let i = grass.length - 1; i >= 0; i--) {
        const g = grass[i];
        g.life--;
        if (g.life <= 0) { grass.splice(i, 1); continue; }
        const t = g.life / g.maxLife;
        const sway = Math.sin(f * g.speed + g.phase) * 1.5;
        ctx.globalAlpha = t * 0.5;
        ctx.strokeStyle = "#6B9B5A";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(g.x, g.y);
        ctx.quadraticCurveTo(g.x + sway + g.lean * 5, g.y - g.h * 0.6, g.x + sway * 0.5 + g.lean * 3, g.y - g.h);
        ctx.stroke();
      }

      /* ── Draw flowers ── */
      const flowers = flowersRef.current;
      for (let i = flowers.length - 1; i >= 0; i--) {
        const fl = flowers[i];
        fl.life--;
        if (fl.life <= 0) { flowers.splice(i, 1); continue; }
        const t = fl.life / fl.maxLife; // 1 → 0
        const sway = Math.sin(f * fl.swaySpeed + fl.phase) * 1.5;
        const opacity = t < 0.2 ? t / 0.2 : Math.min(1, (1 - t) * 5);

        /* Stem */
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = opacity * 0.6;
        ctx.strokeStyle = "#5D8A4F";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(fl.x, fl.y);
        const tipX = fl.x + sway + fl.lean * 3;
        const tipY = fl.y - fl.stemH;
        ctx.quadraticCurveTo(
          fl.x + (sway + fl.lean * 3) * 0.5,
          fl.y - fl.stemH * 0.5,
          tipX, tipY
        );
        ctx.stroke();

        /* Petals — soft circles for performance + meadow feel */
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = opacity * 0.65;
        const pSize = fl.petalSize * (1 - (1 - t) * 0.2);
        for (let j = 0; j < fl.petalCount; j++) {
          const a = (j / fl.petalCount) * Math.PI * 2 + sway * 0.05;
          const px = tipX + Math.cos(a) * pSize;
          const py = tipY + Math.sin(a) * pSize;
          ctx.fillStyle = fl.petalColor;
          ctx.beginPath();
          ctx.arc(px, py, pSize * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }

        /* Center */
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = opacity * 0.9;
        ctx.fillStyle = fl.centerColor;
        ctx.beginPath();
        ctx.arc(tipX, tipY, pSize * 0.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", enlarge);
        el.removeEventListener("mouseleave", shrink);
      });
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (bloomTimeoutRef.current) {
        clearTimeout(bloomTimeoutRef.current);
        bloomTimeoutRef.current = null;
      }
      flowersRef.current = [];
      grassRef.current = [];
      firefliesRef.current = [];
    };
  }, [onMove, onLeave, enlarge, shrink]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99996]"
        style={{ display: "block", opacity: alive ? 1 : 0, transition: "opacity 0.3s" }}
      />
    </>
  );
}
