/**
 * ShimmerPlaceholder — CSS shimmer loading animation for images.
 * Shows a subtle pulse/shimmer while the image loads.
 * When the image loads, it fades in and the shimmer fades out.
 */
export function ShimmerPlaceholder({ className = "" }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.8s ease-in-out infinite",
        }}
      />
    </div>
  );
}
