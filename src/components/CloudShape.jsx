/**
 * CloudShape — Renders a cloud PNG image with nav text centered on top.
 *
 * Props:
 *   children  — Text content centered on the cloud
 *   imageSrc  — Path to the cloud PNG
 *   width     — CSS width
 *   className — Extra classes
 *   style     — Extra inline styles
 */
export function CloudShape({
  children,
  imageSrc = "",
  width = "auto",
  className = "",
  style = {},
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        width,
        filter:
          "drop-shadow(0 8px 18px rgba(0,0,0,.06)) drop-shadow(0 3px 6px rgba(0,0,0,.04))",
        ...style,
      }}
    >
      {/* ── Cloud image ── */}
      <img
        src={imageSrc}
        alt=""
        className="w-full h-auto pointer-events-none select-none"
        draggable={false}
        style={{ display: "block" }}
      />

      {/* ── Text centered on the cloud ── */}
      <span
        className="absolute inset-0 z-10 flex items-center justify-center text-center"
        style={{
          color: "var(--color-primary)",
          fontSize: "clamp(1.1rem, 2vw + 0.5rem, 1.8rem)",
          fontWeight: 700,
          fontFamily: "serif",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
          padding: "0 8%",
        }}
      >
        {children}
      </span>
    </div>
  );
}
