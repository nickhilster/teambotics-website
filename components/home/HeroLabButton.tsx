"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const QUOTE =
  "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.";

const REVEAL_DURATION_MS = 30_000;

export function HeroLabButton() {
  const [quoteVisible, setQuoteVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearHideTimer();
    };
  }, []);

  const handleClick = () => {
    if (quoteVisible) {
      clearHideTimer();
      setQuoteVisible(false);
      return;
    }

    setQuoteVisible(true);
    clearHideTimer();
    timeoutRef.current = setTimeout(() => {
      setQuoteVisible(false);
      timeoutRef.current = null;
    }, REVEAL_DURATION_MS);
  };

  return (
    <div className={`hero-lab${quoteVisible ? " hero-lab--quote-visible" : ""}`}>
      <div
        aria-hidden={!quoteVisible}
        className={`hero-easter-stage${quoteVisible ? " hero-easter-stage--visible" : ""}`}
      >
        <div className="hero-easter-quote">
          <p className="hero-easter-quote__text">
            {QUOTE} — Maya Angelou
          </p>
        </div>
      </div>

      <motion.button
        aria-label="Applied AI Systems Lab"
        aria-pressed={quoteVisible}
        className={`hero-pill hero-pill--button${quoteVisible ? " hero-pill--button-active" : ""}`}
        onClick={handleClick}
        type="button"
        whileTap={{ scale: 0.985, y: 1 }}
      >
        <span className="hero-pill__dot hero-pill__dot--interactive">
          <span className="hero-pill__dot-core" />
        </span>
        APPLIED AI SYSTEMS LAB
      </motion.button>
    </div>
  );
}
