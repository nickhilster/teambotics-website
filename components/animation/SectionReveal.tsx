"use client";

import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotionPreferences } from "./MotionProvider";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function SectionReveal({
  children,
  className,
  delay = 0,
}: SectionRevealProps) {
  const { prefersReducedMotion } = useMotionPreferences();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        delay,
        duration: motionTokens.duration.reveal,
        ease: motionTokens.ease.standard,
      }}
    >
      {children}
    </motion.div>
  );
}
