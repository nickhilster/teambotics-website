"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { motionTokens } from "@/lib/motion";
import { useMotionPreferences } from "./MotionProvider";

const FLIP_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.,";
const STEPS = 4;
const STEP_MS = 65;
const CHAR_STAGGER_MS = 40;
const HOLD_MS = 4000;

type Props = {
  className?: string;
  staticLine: string;
  cyclingLines: string[];
};

export function HeroSolariTitle({ className, staticLine, cyclingLines }: Props) {
  const { prefersReducedMotion } = useMotionPreferences();
  const [display, setDisplay] = useState(cyclingLines[0] ?? "");
  const displayRef = useRef(cyclingLines[0] ?? "");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function scrambleTo(target: string) {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    const maxLen = Math.max(displayRef.current.length, target.length);

    for (let i = 0; i < maxLen; i++) {
      const targetChar = i < target.length ? target[i] : " ";
      const totalSteps = targetChar.trim() === "" ? 0 : STEPS;

      for (let step = 0; step <= totalSteps; step++) {
        const delay = i * CHAR_STAGGER_MS + step * STEP_MS;
        const isLast = step === totalSteps;
        const pos = i;

        timersRef.current.push(
          setTimeout(() => {
            const ch = isLast
              ? targetChar
              : FLIP_CHARS[Math.floor(Math.random() * FLIP_CHARS.length)];
            const padded = displayRef.current.padEnd(maxLen, " ");
            displayRef.current = padded.slice(0, pos) + ch + padded.slice(pos + 1);
            setDisplay(displayRef.current);
          }, delay)
        );
      }
    }

    // Guarantee exact final state
    timersRef.current.push(
      setTimeout(() => {
        displayRef.current = target;
        setDisplay(target);
      }, maxLen * CHAR_STAGGER_MS + STEPS * STEP_MS + 100)
    );
  }

  useEffect(() => {
    if (prefersReducedMotion || cyclingLines.length < 2) return;

    const entrySettleMs = motionTokens.duration.text * 1000 + 300;
    let phraseIndex = 0;
    let intervalId: ReturnType<typeof setInterval>;

    const startTimer = setTimeout(() => {
      intervalId = setInterval(() => {
        phraseIndex = (phraseIndex + 1) % cyclingLines.length;
        scrambleTo(cyclingLines[phraseIndex]);
      }, HOLD_MS);
    }, entrySettleMs + HOLD_MS);

    return () => {
      clearTimeout(startTimer);
      clearInterval(intervalId);
      timersRef.current.forEach(clearTimeout);
    };
  }, [prefersReducedMotion, cyclingLines]);

  if (prefersReducedMotion) {
    return (
      <h1 className={className}>
        <span style={{ display: "block" }}>
          <span className="text-reveal-line">{staticLine}</span>
        </span>
        <span style={{ display: "block" }}>
          <span className="text-reveal-line">{cyclingLines[0]}</span>
        </span>
      </h1>
    );
  }

  const entryT = {
    duration: motionTokens.duration.text,
    ease: motionTokens.ease.standard,
  };

  return (
    <h1 className={className}>
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
          style={{ display: "block" }}
          transition={{ ...entryT, delay: 0.08 }}
        >
          {display}
        </motion.span>
      </span>
    </h1>
  );
}
