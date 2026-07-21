import { useCallback, useRef } from "react";

/**
 * useTilt — Applies a 3D perspective tilt that follows the cursor.
 *
 * @param {number} maxTilt - Maximum rotation in degrees (default 8).
 *
 * Usage:
 *   const tiltRef = useTilt(10);
 *   <div ref={tiltRef}> ... </div>
 */
export function useTilt(maxTilt = 8) {
  const ref = useRef(null);

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotateX = ((y - midY) / midY) * -maxTilt;
      const rotateY = ((x - midX) / midX) * maxTilt;
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    },
    [maxTilt]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  const attach = useCallback(
    (el) => {
      if (ref.current) {
        ref.current.removeEventListener("mousemove", onMove);
        ref.current.removeEventListener("mouseleave", onLeave);
      }
      ref.current = el;
      if (el) {
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
      }
    },
    [onMove, onLeave]
  );

  return attach;
}
