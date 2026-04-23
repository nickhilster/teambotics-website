"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { useMotionPreferences } from "./MotionProvider";

type TrailPoint = {
  id: number;
  x: number;
  y: number;
};

type TouchPulse = {
  id: number;
  x: number;
  y: number;
};

export function InteractionLayer() {
  const { hasFinePointer, prefersReducedMotion } = useMotionPreferences();
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [touchPulses, setTouchPulses] = useState<TouchPulse[]>([]);
  const trailId = useRef(0);
  const pulseId = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion || !hasFinePointer) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const pushTrail = (event: PointerEvent) => {
      const id = trailId.current++;
      setTrail((points) => [...points.slice(-10), { id, x: event.clientX, y: event.clientY }]);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setTrail((points) => points.slice(-4));
      }, 48);

      window.setTimeout(() => {
        setTrail((points) => points.filter((point) => point.id !== id));
      }, 520);
    };

    window.addEventListener("pointermove", pushTrail, { passive: true });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener("pointermove", pushTrail);
    };
  }, [hasFinePointer, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const pushPulse = (event: TouchEvent) => {
      const touch = event.touches[0] ?? event.changedTouches[0];
      if (!touch) {
        return;
      }

      const id = pulseId.current++;
      setTouchPulses((pulses) => [...pulses, { id, x: touch.clientX, y: touch.clientY }]);

      window.setTimeout(() => {
        setTouchPulses((pulses) => pulses.filter((pulse) => pulse.id !== id));
      }, 720);
    };

    window.addEventListener("touchstart", pushPulse, { passive: true });

    return () => window.removeEventListener("touchstart", pushPulse);
  }, [prefersReducedMotion]);

  return (
    <div aria-hidden="true" className="interaction-layer">
      {trail.map((point, index) => (
        !prefersReducedMotion && hasFinePointer ? <span
          className="cursor-trail-dot"
          key={point.id}
          style={
            {
              "--trail-delay": `${index * 28}ms`,
              left: point.x,
              top: point.y,
            } as CSSProperties
          }
        /> : null
      ))}
      {touchPulses.map((pulse) => (
        !prefersReducedMotion ? <span
          className="touch-pulse"
          key={pulse.id}
          style={{ left: pulse.x, top: pulse.y }}
        /> : null
      ))}
    </div>
  );
}
