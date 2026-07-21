import { useAmbientAudio } from "../hooks/use-ambient-audio";

/**
 * AudioToggle — Floating button in the bottom-right corner.
 * Toggles ambient nature soundscape on/off.
 * Uses Web Audio API — no external files needed.
 */
export function AudioToggle() {
  const [isPlaying, toggle] = useAmbientAudio();

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-[9996] w-11 h-11 rounded-full
                 flex items-center justify-center
                 transition-all duration-500 ease-out
                 hover:scale-110 active:scale-95"
      style={{
        backgroundColor: isPlaying
          ? "var(--color-primary)"
          : "var(--color-muted-brown)",
        boxShadow: isPlaying
          ? "0 0 20px rgba(11,107,67,0.3)"
          : "0 2px 8px rgba(0,0,0,0.1)",
      }}
      aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
      title={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
    >
      {isPlaying ? (
        /* Sound waves icon */
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-cloud-white)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 14v-4a1 1 0 0 1 1-1h2l4-5v16l-4-5H4a1 1 0 0 1-1-1z" />
          <path d="M15 8a5 5 0 0 1 0 8" opacity="0.7" />
          <path d="M17 5a8 8 0 0 1 0 14" opacity="0.4" />
        </svg>
      ) : (
        /* Muted icon */
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-cloud-white)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 14v-4a1 1 0 0 1 1-1h2l4-5v16l-4-5H4a1 1 0 0 1-1-1z" />
          <line x1="16" y1="10" x2="20" y2="14" />
          <line x1="20" y1="10" x2="16" y2="14" />
        </svg>
      )}
    </button>
  );
}
