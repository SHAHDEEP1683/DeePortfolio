"use client";

import { useEffect, useRef } from "react";
import { MARKUP, initLaptopHero } from "./engine";
import "./laptop-hero.css";

/**
 * Full-width hero section that sits below the intro.
 * Scrolling into it plays the camera dive into the laptop; scrolling back up reverses it.
 */
export default function LaptopHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return initLaptopHero(ref.current);
  }, []);

  return (
    <section
      id="laptop"
      ref={ref}
      className="lh"
      aria-label="Deep Shah, software engineer"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: MARKUP }}
    />
  );
}
