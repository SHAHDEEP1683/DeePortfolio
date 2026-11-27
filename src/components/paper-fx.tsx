"use client";

import { useEffect } from "react";

/**
 * Page-wide paper animations, driven from one place:
 * - section headings and timeline entries get `is-in` the first time they scroll into view
 *   (headings slide in like a cut strip, the highlighter swipes across, timeline cards get their tape);
 * - each `.exp-timeline` gets `--draw` (0..1), so the orange pen line follows the scroll.
 * The hidden "before" states only apply under `html.fx`, which is set here, so without JS
 * (or with reduced motion) everything is simply visible.
 */
export default function PaperFx() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("fx");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    // Observe everything that is not revealed yet. Re-run whenever React swaps DOM nodes (a section
    // re-mounting, hot reload), otherwise a new heading would stay hidden because nobody watches it.
    const REVEAL = "main > section h2.font-headline:not(.is-in), .exp-item:not(.is-in)";
    const watched = new WeakSet<Element>();
    const scan = () =>
      document.querySelectorAll(REVEAL).forEach((el) => {
        if (watched.has(el)) return;
        watched.add(el);
        io.observe(el);
      });
    scan();
    const mo = new MutationObserver(() => scan());
    const main = document.querySelector("main");
    if (main) mo.observe(main, { childList: true, subtree: true });

    // pen line: how far the reading line (65% down the viewport) has travelled through each timeline
    let raf = 0;
    const draw = () => {
      raf = 0;
      const y = window.innerHeight * 0.65;
      for (const el of document.querySelectorAll<HTMLElement>(".exp-timeline")) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (y - r.top) / Math.max(1, r.height)));
        el.style.setProperty("--draw", p.toFixed(3));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.classList.remove("fx");
    };
  }, []);

  return null;
}
