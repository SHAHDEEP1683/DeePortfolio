"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type Chip = { x: number; y: number; r: number };

/**
 * Makes every `.skill-chip` inside `ref` a paper scrap you can pick up with a mouse or pen, toss, and drop.
 * A thrown chip keeps sliding with friction, bounces off the section's edges, then lands with a small bounce.
 * Touch is left alone so the page still scrolls on phones.
 * Returns whether any chip has been moved, and `tidy()` to send them all back.
 *
 * With `onDropInCard` (the sorting game), a released chip isn't tossed: if it is over another `.skill-card`
 * the callback gets the chip's `data-skill` and the card's `data-card`, otherwise the chip springs back.
 */
export function useTossChips(
  ref: RefObject<HTMLElement | null>,
  onDropInCard?: (skill: string, card: number) => void,
) {
  const [moved, setMoved] = useState(false);
  const dropRef = useRef(onDropInCard);
  dropRef.current = onDropInCard;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const apply = (el: HTMLElement, c: Chip) => {
      el.style.setProperty("--dx", `${c.x}px`);
      el.style.setProperty("--dy", `${c.y}px`);
      el.style.setProperty("--dr", `${c.r}deg`);
    };

    /** keep the chip inside the section; returns which axes hit an edge */
    /** how much the chips are scaled down (the game shrinks the cards to fit the screen); 1 = not scaled */
    const zoomOf = (el: HTMLElement) => {
      const cols = el.closest<HTMLElement>(".skills-cols");
      return cols && cols.offsetWidth ? cols.getBoundingClientRect().width / cols.offsetWidth : 1;
    };

    // offsets (c.x / c.y) are in the chip's own CSS px; on-screen px = offset * z
    const clamp = (el: HTMLElement, c: Chip, z = 1) => {
      const box = root.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      // the chip's untransformed spot = current rect minus its current offset
      const left = r.left - c.x * z, top = r.top - c.y * z;
      const minX = (box.left - left + 4) / z, maxX = (box.right - left - r.width - 4) / z;
      const minY = (box.top - top + 4) / z, maxY = (box.bottom - top - r.height - 4) / z;
      let hitX = false, hitY = false;
      if (c.x < minX) { c.x = minX; hitX = true; } else if (c.x > maxX) { c.x = maxX; hitX = true; }
      if (c.y < minY) { c.y = minY; hitY = true; } else if (c.y > maxY) { c.y = maxY; hitY = true; }
      return { hitX, hitY };
    };

    const land = (el: HTMLElement) => {
      el.classList.remove("is-held");
      el.classList.add("is-landed");
      window.setTimeout(() => el.classList.remove("is-landed"), 450);
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch" || e.button !== 0) return;
      const el = (e.target as HTMLElement).closest<HTMLElement>(".skill-chip");
      if (!el || !root.contains(el)) return;
      e.preventDefault();
      // the chip's position lives in its CSS variables, so tidy() resetting them is picked up here
      const read = (name: string) => parseFloat(el.style.getPropertyValue(name)) || 0;
      const c: Chip = { x: read("--dx"), y: read("--dy"), r: read("--dr") };
      const z = zoomOf(el);
      const startX = e.clientX - c.x * z, startY = e.clientY - c.y * z;
      let vx = 0, vy = 0, lastX = e.clientX, lastY = e.clientY, lastT = performance.now();
      let dragging = false;

      const move = (ev: PointerEvent) => {
        if (!dragging) {
          if (Math.hypot(ev.clientX - e.clientX, ev.clientY - e.clientY) < 4) return;
          dragging = true;
          el.setPointerCapture(e.pointerId);
          el.classList.add("is-moved", "is-held");
          el.closest(".skill-card")?.classList.add("has-moved");
          setMoved(true);
        }
        const now = performance.now(), dt = Math.max(1, now - lastT);
        // px per frame, capped so a hard flick doesn't fire the chip across the whole page
        vx = Math.max(-28, Math.min(28, ((ev.clientX - lastX) / dt) * 16));
        vy = Math.max(-28, Math.min(28, ((ev.clientY - lastY) / dt) * 16));
        lastX = ev.clientX; lastY = ev.clientY; lastT = now;
        c.x = (ev.clientX - startX) / z;
        c.y = (ev.clientY - startY) / z;
        c.r = Math.max(-25, Math.min(25, vx * 1.5));
        clamp(el, c, z);
        apply(el, c);
      };

      const up = (ev: PointerEvent) => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        if (!dragging) return;
        const onDrop = dropRef.current;
        if (onDrop) {
          // sorting game: drop into the card under the pointer, or spring back home
          const card = document.elementsFromPoint(ev.clientX, ev.clientY)
            .find((n): n is HTMLElement => n instanceof HTMLElement && n.matches(".skill-card"));
          const from = el.closest<HTMLElement>(".skill-card");
          el.classList.remove("is-held");
          if (card && card !== from && card.dataset.card && el.dataset.skill) {
            onDrop(el.dataset.skill, Number(card.dataset.card)); // React re-renders the chip inside that card
          } else {
            springBack(el);
          }
          return;
        }
        if (reduced) { c.r = 0; apply(el, c); return land(el); }
        // toss: keep sliding with friction, bounce off the edges, settle at a small random tilt
        const tilt = (Math.random() - 0.5) * 14;
        const step = () => {
          vx *= 0.9; vy *= 0.9;
          c.x += vx; c.y += vy;
          const { hitX, hitY } = clamp(el, c);
          if (hitX) vx *= -0.5;
          if (hitY) vy *= -0.5;
          c.r += (tilt - c.r) * 0.2;
          apply(el, c);
          if (Math.hypot(vx, vy) > 0.4) raf = requestAnimationFrame(step);
          else land(el);
        };
        raf = requestAnimationFrame(step);
      };

      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    };

    const springBack = (el: HTMLElement) => {
      el.classList.add("is-tidying");
      el.style.setProperty("--dx", "0px");
      el.style.setProperty("--dy", "0px");
      el.style.setProperty("--dr", "0deg");
      window.setTimeout(() => {
        el.classList.remove("is-moved", "is-tidying");
        el.closest(".skill-card")?.classList.remove("has-moved");
      }, 550);
    };

    root.addEventListener("pointerdown", onDown);
    return () => {
      root.removeEventListener("pointerdown", onDown);
      cancelAnimationFrame(raf);
    };
  }, [ref]);

  const tidy = () => {
    const root = ref.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>(".skill-chip.is-moved").forEach((el) => {
      el.classList.add("is-tidying");
      el.style.setProperty("--dx", "0px");
      el.style.setProperty("--dy", "0px");
      el.style.setProperty("--dr", "0deg");
      window.setTimeout(() => {
        el.classList.remove("is-moved", "is-tidying");
        el.closest(".skill-card")?.classList.remove("has-moved");
      }, 600);
    });
    setMoved(false);
  };

  return { moved, tidy };
}
