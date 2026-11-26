"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Two-option theme switch for the navbar.
 * Light = the paper look that matches the hero, Dark = the original dark design.
 */
export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = mounted ? resolvedTheme : undefined;

  return (
    <div className="theme-switch" role="radiogroup" aria-label="Theme">
      <button
        type="button"
        role="radio"
        aria-checked={current === "light"}
        className={current === "light" ? "is-on" : ""}
        onClick={() => setTheme("light")}
      >
        <Sun className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Light</span>
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={current === "dark"}
        className={current === "dark" ? "is-on" : ""}
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Dark</span>
      </button>
    </div>
  );
}
