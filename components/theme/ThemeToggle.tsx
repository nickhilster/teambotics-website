"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle color theme"
      className="theme-toggle"
      onClick={toggleTheme}
      type="button"
    >
      <Moon aria-hidden="true" className="theme-toggle__icon theme-toggle__icon--moon" size={17} strokeWidth={1.8} />
      <Sun aria-hidden="true" className="theme-toggle__icon theme-toggle__icon--sun" size={17} strokeWidth={1.8} />
    </button>
  );
}
