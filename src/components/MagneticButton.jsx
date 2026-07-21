import { useRef, useCallback } from "react";

/**
 * MagneticButton — Wraps children so they subtly follow the cursor on hover.
 * Usage: <MagneticButton><button>Click me</button></MagneticButton>
 */
export function MagneticButton({ children, strength = 0.3, className = "", ...props }) {
  const elRef = useRef(null);

  const onMove = useCallback(
    (e) => {
      const el = elRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    const el = elRef.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  return (
    <div
      ref={elRef}
      className={`magnetic-btn ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        display: "inline-block",
        transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        willChange: "transform",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
