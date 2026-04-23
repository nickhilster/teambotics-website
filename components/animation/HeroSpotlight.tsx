"use client";

import { useEffect, useRef } from "react";
import { useMotionPreferences } from "./MotionProvider";

export function HeroSpotlight() {
  const { prefersReducedMotion } = useMotionPreferences();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion) {
      return;
    }

    let frame = 0;
    let nextX = 50;
    let nextY = 38;

    const commit = () => {
      root.style.setProperty("--spotlight-x", `${nextX}%`);
      root.style.setProperty("--spotlight-y", `${nextY}%`);
      frame = 0;
    };

    const queueCommit = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(commit);
    };

    const updatePoint = (clientX: number, clientY: number) => {
      const bounds = root.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) {
        return;
      }

      nextX = ((clientX - bounds.left) / bounds.width) * 100;
      nextY = ((clientY - bounds.top) / bounds.height) * 100;
      queueCommit();
    };

    const activate = () => {
      root.dataset.active = "true";
    };

    const reset = () => {
      root.dataset.active = "false";
      nextX = 50;
      nextY = 38;
      queueCommit();
    };

    const handlePointerMove = (event: PointerEvent) => {
      activate();
      updatePoint(event.clientX, event.clientY);
    };

    const handleTouch = (event: TouchEvent) => {
      const touch = event.touches[0] ?? event.changedTouches[0];
      if (!touch) {
        return;
      }

      activate();
      updatePoint(touch.clientX, touch.clientY);
    };

    root.addEventListener("pointermove", handlePointerMove, { passive: true });
    root.addEventListener("pointerenter", activate, { passive: true });
    root.addEventListener("pointerleave", reset, { passive: true });
    root.addEventListener("touchstart", handleTouch, { passive: true });
    root.addEventListener("touchmove", handleTouch, { passive: true });
    root.addEventListener("touchend", reset, { passive: true });

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      root.removeEventListener("pointermove", handlePointerMove);
      root.removeEventListener("pointerenter", activate);
      root.removeEventListener("pointerleave", reset);
      root.removeEventListener("touchstart", handleTouch);
      root.removeEventListener("touchmove", handleTouch);
      root.removeEventListener("touchend", reset);
    };
  }, [prefersReducedMotion]);

  return <div aria-hidden="true" className="hero-spotlight" data-active="false" ref={rootRef} />;
}
