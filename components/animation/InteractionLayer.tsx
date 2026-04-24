"use client";

import { useEffect, useRef } from "react";
import { useMotionPreferences } from "./MotionProvider";

const FINE_POINTER_MQ = "(hover: hover) and (pointer: fine)";

// Diver SVG nose tip = cursor hotspot, at SVG coords (5, 13).
// All positioning is done in JS so the CSS translate stays simple.
const NOSE_X = 5;
const NOSE_Y = 13;

// Regulator mouthpiece offset from nose (where bubbles spawn).
const MOUTH_DX = 6;
const MOUTH_DY = 10;

export function InteractionLayer() {
  const { prefersReducedMotion } = useMotionPreferences();
  const cursorRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const trailId = useRef(0);
  const pointerPos = useRef({ active: false, x: 0, y: 0 });
  const timeouts = useRef<number[]>([]);

  // Bubble interval — depends only on prefersReducedMotion.
  // We check matchMedia directly inside rather than pulling hasFinePointer
  // from context, so this effect never re-mounts due to a false→true hydration
  // state transition tearing down the interval.
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!window.matchMedia(FINE_POINTER_MQ).matches) return;

    const cursor = cursorRef.current;
    const layer = layerRef.current;
    if (!cursor || !layer) return;

    const spawnBubble = () => {
      const { active, x, y } = pointerPos.current;
      if (!active) return;

      const id = trailId.current++;
      const bx = x + MOUTH_DX + (Math.random() - 0.5) * 6;
      const by = y + MOUTH_DY + (Math.random() - 0.5) * 5;
      const rise = 56 + Math.random() * 80;
      const duration = 1640 + Math.random() * 1040;

      const el = document.createElement("span");
      el.className = "cursor-bubble";
      el.style.setProperty("--bubble-x", `${bx}px`);
      el.style.setProperty("--bubble-y", `${by}px`);
      el.style.setProperty("--bubble-drift", `${-14 + Math.random() * 28}px`);
      el.style.setProperty("--bubble-duration", `${duration}ms`);
      el.style.setProperty("--bubble-rise-mid", `${rise * 0.52}px`);
      el.style.setProperty("--bubble-rise", `${rise}px`);
      el.style.setProperty("--bubble-size", `${4 + Math.random() * 10}px`);
      el.style.setProperty("--bubble-wobble", `${id % 2 === 0 ? 5 : -5}px`);
      layer.appendChild(el);

      const tid = window.setTimeout(() => el.remove(), 2800);
      timeouts.current.push(tid);
    };

    const onMove = (e: PointerEvent) => {
      pointerPos.current = { active: true, x: e.clientX, y: e.clientY };
      // Direct DOM update — no React re-render on every mousemove
      cursor.style.setProperty("--cursor-x", `${e.clientX - NOSE_X}px`);
      cursor.style.setProperty("--cursor-y", `${e.clientY - NOSE_Y}px`);
      cursor.style.setProperty("--cursor-opacity", "1");
    };

    const onLeave = () => {
      pointerPos.current.active = false;
      cursor.style.setProperty("--cursor-opacity", "0");
    };

    const intervalId = window.setInterval(spawnBubble, 100);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    window.addEventListener("blur", onLeave, { passive: true });

    return () => {
      window.clearInterval(intervalId);
      for (const tid of timeouts.current) window.clearTimeout(tid);
      timeouts.current = [];
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const layer = layerRef.current;
    if (!layer) return;

    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0] ?? e.changedTouches[0];
      if (!touch) return;
      const el = document.createElement("span");
      el.className = "touch-pulse";
      el.style.setProperty("--bubble-x", `${touch.clientX}px`);
      el.style.setProperty("--bubble-y", `${touch.clientY}px`);
      layer.appendChild(el);
      window.setTimeout(() => el.remove(), 720);
    };

    window.addEventListener("touchstart", onTouch, { passive: true });
    return () => window.removeEventListener("touchstart", onTouch);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div aria-hidden="true" className="interaction-layer">
      {/* Bubble / pulse DOM nodes injected imperatively into this div */}
      <div ref={layerRef} />

      {/* Scuba diver cursor — side profile, head faces left (direction of travel) */}
      <div className="scuba-cursor" ref={cursorRef}>
        <svg
          className="scuba-diver"
          width="84"
          height="28"
          viewBox="0 0 84 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ── Tank (on back = top when horizontal) ── */}
          <rect x="44" y="2" width="14" height="9" rx="4" fill="#5eaee8" stroke="#2a6aae" strokeWidth="1" />
          {/* Valve nub on left end of tank */}
          <rect x="44" y="4" width="3" height="5" rx="1" fill="#2a6aae" />

          {/* ── Regulator hose: tank → mouthpiece ── */}
          <path
            d="M46 8 C40 8 26 8 12 22"
            stroke="#2a6aae"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Mouthpiece — bubble origin point */}
          <circle cx="11" cy="23" r="2.5" fill="#2a6aae" />

          {/* ── Body / wetsuit ── */}
          <rect x="23" y="9" width="33" height="11" rx="5" fill="#1a3a5c" />
          {/* Wetsuit centre stripe */}
          <rect x="26" y="11" width="20" height="4" rx="2" fill="#254d7a" opacity="0.55" />

          {/* ── Head ── */}
          <circle cx="15" cy="13" r="10" fill="#f5c98a" />

          {/* Diving mask (front half of head) */}
          <rect x="7" y="9" width="13" height="8" rx="3" fill="#a8d8f0" opacity="0.82" stroke="#1a3a5c" strokeWidth="0.9" />
          {/* Mask lens glare */}
          <rect x="9" y="11" width="4" height="3" rx="1" fill="white" opacity="0.55" />
          {/* Mask strap from back of mask to back of head */}
          <path d="M20 10 Q24 8 26 11" stroke="#1a3a5c" strokeWidth="1.2" fill="none" />

          {/* ── Forward arm (reaching left — leading edge) ── */}
          <path d="M24 14 Q15 16 6 16" stroke="#1a3a5c" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="6" cy="16" r="3" fill="#f5c98a" />

          {/* ── Rear arm (tucked, right side) ── */}
          <path d="M51 12 Q56 10 60 13" stroke="#1a3a5c" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <circle cx="60" cy="13" r="2.5" fill="#f5c98a" />

          {/* ── Flutter-kick fins ── */}
          <g className="scuba-leg scuba-leg--top">
            <rect x="55" y="8" width="12" height="4.5" rx="2.5" fill="#1a3a5c" />
            <ellipse cx="71" cy="10" rx="9" ry="3.5" fill="#f5a623" />
          </g>
          <g className="scuba-leg scuba-leg--bottom">
            <rect x="55" y="17" width="12" height="4.5" rx="2.5" fill="#1a3a5c" />
            <ellipse cx="71" cy="19.5" rx="9" ry="3.5" fill="#f5a623" />
          </g>
        </svg>
      </div>
    </div>
  );
}
