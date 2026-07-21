import { useEffect, useRef } from "react";

/**
 * ScrollProgress — Thin line at the top of the viewport
 * that fills from 0 to 100% as the user scrolls the page.
 */
export function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9997] h-[2px] pointer-events-none"
      style={{ backgroundColor: "rgba(24,58,36,0.08)" }}
    >
      <div
        ref={barRef}
        className="h-full transition-[width] duration-100 ease-out"
        style={{
          width: "0%",
          backgroundColor: "var(--color-primary)",
        }}
      />
    </div>
  );
}
