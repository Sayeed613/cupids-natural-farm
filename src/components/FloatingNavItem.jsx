import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { CloudShape } from "./CloudShape";

/**
 * FloatingNavItem — A motion-button that:
 *   - Enters with CSS opacity/transform transition
 *   - Floats continuously via framer-motion y keyframes
 *   - Renders its label inside a CloudShape (cloud PNG image)
 *   - Scales on hover
 *
 * Props:
 *   label, onClick, entranceDelay, floatDuration, floatDelay
 *   imageSrc — Path to cloud PNG
 *   width, className, style
 */
export function FloatingNavItem({
  label,
  onClick,
  entranceDelay = 0,
  floatDuration = 8,
  floatDelay = 0,
  imageSrc = "",
  width = "auto",
  className = "",
  style = {},
}) {
  const controls = useAnimation();
  const [visible, setVisible] = useState(false);

  /* ── Entrance → float ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setVisible(true);
      controls.set({ y: 0 });
      return;
    }

    const timer = setTimeout(() => setVisible(true), entranceDelay * 1000);
    const floatTimer = setTimeout(() => {
      controls.start({
        y: [-5, 0, 5, 0],
        transition: {
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
          times: [0, 0.33, 0.67, 1],
        },
      });
    }, entranceDelay * 1000 + 600);

    return () => {
      clearTimeout(timer);
      clearTimeout(floatTimer);
      controls.stop();
    };
  }, [controls, entranceDelay, floatDuration, floatDelay]);

  return (
    <motion.button
      onClick={onClick}
      animate={controls}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      className={`
        cursor-pointer border-0 bg-transparent p-0 appearance-none
        outline-none focus-visible:outline-2 focus-visible:outline-offset-4
        focus-visible:outline-[#0B6B43]
        transition-[opacity,transform] duration-500 ease-out
        ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}
        ${className}
      `}
      style={{ ...style }}
    >
      <CloudShape imageSrc={imageSrc} width={width}>
        {label}
      </CloudShape>
    </motion.button>
  );
}
