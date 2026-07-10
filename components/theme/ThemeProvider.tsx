"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme | null;
  toggleTheme: () => void;
};

const STORAGE_KEY = "teambotics-theme";

const ThemeContext = createContext<ThemeContextValue>({
  theme: null,
  toggleTheme: () => {},
});

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // null = not yet resolved client-side (safe for SSR / hydration)
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Compute the theme ourselves rather than trusting <html> already
    // reflects it — the root beforeInteractive script never runs on routes
    // Next renders through the client-side not-found/error boundary.
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    const initial: Theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : getSystemTheme();
    applyTheme(initial);
    setTheme(initial);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      const storedTheme = window.localStorage.getItem(STORAGE_KEY);
      if (storedTheme === "light" || storedTheme === "dark") {
        return;
      }
      const next = getSystemTheme();
      applyTheme(next);
      setTheme(next);
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () => {
        const current: Theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
        const next: Theme = current === "dark" ? "light" : "dark";
        window.localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
        setTheme(next);
      },
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
