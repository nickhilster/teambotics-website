"use client";

import { createContext, useContext, useEffect, useMemo } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  toggleTheme: () => void;
};

const STORAGE_KEY = "teambotics-theme";

const ThemeContext = createContext<ThemeContextValue>({
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
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      const storedTheme = window.localStorage.getItem(STORAGE_KEY);
      if (storedTheme === "light" || storedTheme === "dark") {
        return;
      }

      applyTheme(getSystemTheme());
    };

    mediaQuery.addEventListener("change", handleSystemChange);

    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      toggleTheme: () => {
        const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";

        window.localStorage.setItem(STORAGE_KEY, nextTheme);
        applyTheme(nextTheme);
      },
    }),
    [],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
