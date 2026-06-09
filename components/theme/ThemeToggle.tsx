"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={theme !== null ? isDark : undefined}
      className="theme-toggle"
      onClick={toggleTheme}
      type="button"
    >
      <Moon aria-hidden="true" className="theme-toggle__icon theme-toggle__icon--moon" size={17} strokeWidth={1.8} />
      <Sun aria-hidden="true" className="theme-toggle__icon theme-toggle__icon--sun" size={17} strokeWidth={1.8} />
    </button>
  );
}
