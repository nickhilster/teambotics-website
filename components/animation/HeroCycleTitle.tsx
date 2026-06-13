"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotionPreferences } from "./MotionProvider";

type HeroCycleTitleProps = {
  className?: string;
  phrases: [string, string];
};

const HOLD_MS = 4000;
const FADE_S = 0.6;

export function HeroCycleTitle({ className, phrases }: HeroCycleTitleProps) {
  const { prefersReducedMotion } = useMotionPreferences();
  const [index, setIndex] = useState(0);
  const cyclingRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const entrySettleMs = motionTokens.duration.text * 1000 + 300;
    let interval: ReturnType<typeof setInterval>;

    const startTimer = setTimeout(() => {
      cyclingRef.current = true;
      setIndex(1);
      interval = setInterval(() => {
        setIndex((i) => (i + 1) % 2);
      }, HOLD_MS);
    }, entrySettleMs + HOLD_MS);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <h1 className={className}>
        <span className="text-reveal-line">{phrases[0]}</span>
      </h1>
    );
  }

  return (
    <h1 className={className}>
      <span className="text-reveal-mask" style={{ display: "block" }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            animate={{ y: 0, opacity: 1 }}
            className="text-reveal-line"
            exit={{ opacity: 0, transition: { duration: FADE_S * 0.55, ease: "easeIn" } }}
            initial={cyclingRef.current ? { opacity: 0 } : { y: "110%", opacity: 0 }}
            style={{ display: "block" }}
            transition={
              cyclingRef.current
                ? { duration: FADE_S, ease: "easeOut" }
                : {
                    duration: motionTokens.duration.text,
                    ease: motionTokens.ease.standard,
                  }
            }
          >
            {phrases[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}
