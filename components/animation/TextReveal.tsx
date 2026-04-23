"use client";

import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotionPreferences } from "./MotionProvider";

type TextRevealProps = {
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  lines: React.ReactNode[];
};

export function TextReveal({
  as: Component = "span",
  className,
  lines,
}: TextRevealProps) {
  const { prefersReducedMotion } = useMotionPreferences();

  if (prefersReducedMotion) {
    return (
      <Component className={className}>
        {lines.map((line, index) => (
          <span className="text-reveal-line" key={index}>
            {line}
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component className={className}>
      {lines.map((line, index) => (
        <span className="text-reveal-mask" key={index}>
          <motion.span
            animate={{ y: 0, opacity: 1 }}
            className="text-reveal-line"
            initial={{ y: "110%", opacity: 0 }}
            transition={{
              delay: index * motionTokens.stagger.tight,
              duration: motionTokens.duration.text,
              ease: motionTokens.ease.standard,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
