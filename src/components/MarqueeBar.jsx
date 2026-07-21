/**
 * MarqueeBar — Infinite scrolling marquee with diagonal tilt.
 *
 * - Skewed so the right side sits higher than the left
 * - No edge fade mask (user removed the "white shadow")
 * - Seamless looping with duplicated keyword list
 */
const KEYWORDS = [
  "Elaga Sheep",
  "Goshala Trust",
  "TMR Feeding",
  "Ayurvedic",
  "Integrated Farm",
  "Free-Range Poultry",
  "Chemical-Free",
  "KPFBA",
  "Desi Cows",
  "Fertile Green",
];

export function MarqueeBar() {
  const items = [...KEYWORDS, ...KEYWORDS]; // duplicated for seamless loop

  return (
    <div
      className="relative w-full overflow-hidden py-5 md:py-6 -my-2"
      style={{
        backgroundColor: "var(--color-primary)",
        transform: "skewY(-2deg)",
      }}
    >
      <div
        className="flex gap-12 md:gap-16 animate-marquee"
        style={{ width: "max-content", transform: "skewY(2deg)" }}
      >
        {items.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="text-xs md:text-sm tracking-[0.15em] uppercase whitespace-nowrap font-medium"
            style={{ color: "var(--color-cloud-white)", opacity: 0.7 }}
          >
            {word}
            <span
              className="inline-block mx-6 md:mx-10"
              style={{ color: "var(--color-harvest-yellow)" }}
            >
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
