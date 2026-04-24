"use client";

import { useEffect, useRef } from "react";
import { useMotionPreferences } from "./MotionProvider";

export function HeroSpotlight() {
  const { prefersReducedMotion } = useMotionPreferences();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const hero = root?.closest<HTMLElement>(".hero");
    if (!root || !hero || prefersReducedMotion) {
      return;
    }

    let frame = 0;
    let nextX = 50;
    let nextY = 38;

    const commit = () => {
      hero.style.setProperty("--spotlight-x", `${nextX}%`);
      hero.style.setProperty("--spotlight-y", `${nextY}%`);
      frame = 0;
    };

    const queueCommit = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(commit);
    };

    const updatePoint = (clientX: number, clientY: number) => {
      const bounds = hero.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) {
        return;
      }

      nextX = ((clientX - bounds.left) / bounds.width) * 100;
      nextY = ((clientY - bounds.top) / bounds.height) * 100;
      queueCommit();
    };

    const isInsideHero = (clientX: number, clientY: number) => {
      const bounds = hero.getBoundingClientRect();

      return (
        clientX >= bounds.left &&
        clientX <= bounds.right &&
        clientY >= bounds.top &&
        clientY <= bounds.bottom
      );
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
      if (!isInsideHero(event.clientX, event.clientY)) {
        reset();
        return;
      }

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

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("touchend", reset, { passive: true });

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("touchend", reset);
    };
  }, [prefersReducedMotion]);

  return <div aria-hidden="true" className="hero-spotlight" data-active="false" ref={rootRef} />;
}
