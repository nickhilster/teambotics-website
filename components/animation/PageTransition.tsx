"use client";

import { AnimatePresence, motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        initial={false}
        transition={{
          duration: motionTokens.duration.page,
          ease: motionTokens.ease.standard,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
