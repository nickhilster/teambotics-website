"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { useMotionPreferences } from "./MotionProvider";

type CursorReactiveCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function CursorReactiveCard({
  children,
  className,
}: CursorReactiveCardProps) {
  const { hasFinePointer, prefersReducedMotion } = useMotionPreferences();
  const cardRef = useRef<HTMLElement | null>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowOpacity = useMotionValue(0.16);
  const background = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(74, 144, 217, ${glowOpacity}), transparent 48%)`;

  useEffect(() => {
    if (hasFinePointer || prefersReducedMotion) {
      return;
    }

    const node = cardRef.current;
    if (!node) {
      return;
    }

    let ticking = false;

    const updateFromScroll = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const centerY = rect.top + rect.height / 2;
      const progress = Math.min(Math.max(centerY / viewportHeight, 0), 1);
      const focus = 1 - Math.min(Math.abs(progress - 0.5) / 0.5, 1);

      glowX.set(50);
      glowY.set(15 + progress * 70);
      glowOpacity.set(0.08 + focus * 0.18);
      rotateX.set((0.5 - progress) * 4);
      rotateY.set(0);
      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(updateFromScroll);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [
    glowOpacity,
    glowX,
    glowY,
    hasFinePointer,
    prefersReducedMotion,
    rotateX,
    rotateY,
  ]);

  return (
    <motion.article
      ref={(node) => {
        cardRef.current = node;
      }}
      className={className}
      onHoverEnd={() => {
        rotateX.set(0);
        rotateY.set(0);
        glowOpacity.set(0.16);
      }}
      onPointerMove={(event) => {
        if (prefersReducedMotion || !hasFinePointer) {
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const offsetX = x / rect.width - 0.5;
        const offsetY = y / rect.height - 0.5;

        glowX.set((x / rect.width) * 100);
        glowY.set((y / rect.height) * 100);
        glowOpacity.set(0.18);
        rotateX.set(offsetY * -6);
        rotateY.set(offsetX * 6);
      }}
      style={{
        backgroundImage: background,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.35 }}
      whileHover={
        prefersReducedMotion || !hasFinePointer
          ? undefined
          : {
              scale: 1.018,
            }
      }
    >
      {children}
    </motion.article>
  );
}
