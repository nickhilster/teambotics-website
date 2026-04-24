"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

type MotionContextValue = {
  hasFinePointer: boolean;
  prefersReducedMotion: boolean;
};

const MotionContext = createContext<MotionContextValue>({
  hasFinePointer: false,
  prefersReducedMotion: false,
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [hasFinePointer, setHasFinePointer] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointer = () => setHasFinePointer(mediaQuery.matches);

    updatePointer();
    mediaQuery.addEventListener("change", updatePointer);

    return () => mediaQuery.removeEventListener("change", updatePointer);
  }, []);

  const value = useMemo(
    () => ({ hasFinePointer, prefersReducedMotion }),
    [hasFinePointer, prefersReducedMotion],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotionPreferences() {
  return useContext(MotionContext);
}
