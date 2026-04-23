"use client";

import { AnimatePresence, motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        initial={{ opacity: 0, y: 8 }}
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
