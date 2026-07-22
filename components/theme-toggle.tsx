"use client";

import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-sm border border-foreground/20 px-2.5 py-1 text-xs tracking-wide uppercase transition-colors hover:bg-foreground hover:text-background"
      aria-label={
        theme === "light" ? "Switch to dark theme" : "Switch to light theme"
      }
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
