"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { motionTokens } from "@/lib/motion";
import { useMotionPreferences } from "./MotionProvider";

const HOLD_MS = 5200;

type Props = {
  className?: string;
  staticLine: string;
  cyclingLines: string[];
};

export function HeroSolariTitle({ className, staticLine, cyclingLines }: Props) {
  const { prefersReducedMotion } = useMotionPreferences();
  const safeCyclingLines = useMemo(
    () => (cyclingLines.length > 0 ? cyclingLines : [""]),
    [cyclingLines],
  );
  const cyclingKey = safeCyclingLines.join("\u001f");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
  }, [cyclingKey]);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || safeCyclingLines.length < 2) {
      return;
    }

    const intervalId = setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % safeCyclingLines.length);
    }, HOLD_MS);

    return () => clearInterval(intervalId);
  }, [cyclingKey, isPaused, prefersReducedMotion, safeCyclingLines.length]);

  if (prefersReducedMotion) {
    return (
      <h1 className={className}>
        <span style={{ display: "block" }}>
          <span className="text-reveal-line">{staticLine}</span>
        </span>
        <span style={{ display: "block" }}>
          <span className="text-reveal-line">{safeCyclingLines[0]}</span>
        </span>
      </h1>
    );
  }

  const entryT = {
    duration: motionTokens.duration.text,
    ease: motionTokens.ease.standard,
  };

  const cyclingT = {
    duration: 0.7,
    ease: motionTokens.ease.standard,
  };

  return (
    <h1
      aria-label={`${staticLine} ${safeCyclingLines[activeIndex]}`}
      className={className}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <span className="text-reveal-mask" style={{ display: "block" }}>
        <motion.span
          animate={{ y: 0 }}
          className="text-reveal-line"
          initial={{ y: "110%" }}
          style={{ display: "block" }}
          transition={entryT}
        >
          {staticLine}
        </motion.span>
      </span>
      <span className="text-reveal-mask" style={{ display: "block" }}>
        <motion.span
          animate={{ y: 0 }}
          className="text-reveal-line"
          initial={{ y: "110%" }}
          style={{
            display: "grid",
            minWidth: 0,
          }}
          transition={{ ...entryT, delay: 0.08 }}
        >
          {safeCyclingLines.map((line, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.span
                aria-hidden="true"
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : "0.18em",
                }}
                className="hero__title-cycle-line"
                initial={false}
                key={line}
                style={{
                  // Each variant occupies the same CSS grid cell. Because none of
                  // them are absolutely positioned, the browser reserves the
                  // maximum width/height needed by the longest/wrapping string,
                  // while opacity handles the visual swap in-place. This prevents
                  // hero title reflow and avoids animation-driven CLS.
                  gridArea: "1 / 1",
                  minWidth: 0,
                  pointerEvents: isActive ? "auto" : "none",
                }}
                transition={cyclingT}
              >
                {line}
              </motion.span>
            );
          })}
        </motion.span>
      </span>
    </h1>
  );
}
