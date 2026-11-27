import type { MouseEvent } from "react";

/**
 * Click handler for the taped paper buttons ("See my work", "Say hello", "Hire Me"):
 * the tape peels off, the note swings and falls, and the page follows it to the button's #section.
 * The button gets `is-dropping`, then `is-back` while it re-sticks; the CSS for those lives in globals.css.
 */
export function dropTo(e: MouseEvent<HTMLAnchorElement>) {
  const btn = e.currentTarget;
  const hash = btn.getAttribute("href") ?? "";
  const target = hash.startsWith("#") ? document.getElementById(hash.slice(1)) : null;
  if (!target || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let new-tab clicks through
  e.preventDefault();
  const go = () => {
    history.pushState(null, "", hash);
    target.scrollIntoView({ behavior: "smooth" });
  };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return go();
  if (btn.classList.contains("is-dropping")) return;
  btn.classList.add("is-dropping");
  window.setTimeout(go, 650); // scroll once the note is falling
  window.setTimeout(() => {
    btn.classList.remove("is-dropping");
    btn.classList.add("is-back"); // stuck back on for the next visit
    window.setTimeout(() => btn.classList.remove("is-back"), 700);
  }, 1900);
}
