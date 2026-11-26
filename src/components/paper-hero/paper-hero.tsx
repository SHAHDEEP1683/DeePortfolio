"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import "./paper-hero.css";

/**
 * Paper hero.
 * Left: cut-paper name, script line, tagline and taped buttons.
 * Right (editorial): one large torn-paper portrait with a "Fig. 1" caption; hover swaps to the
 * waving photo, and the portrait drifts slightly with the pointer for depth.
 */
const CHIP_COLS = ["--ph-green", "--ph-red", "--ph-yellow", "--ph-orange", "--ph-blue", "--ph-purple", "--ph-pink", "--ph-teal"];
const CHIP_ROT = [-5, 3, -2, 6, -4, 2, -6, 4];

type Vars = CSSProperties & Record<`--${string}`, string | number>;

export default function PaperHero() {
  const figRef = useRef<HTMLElement>(null);

  // gentle pointer depth on the portrait
  useEffect(() => {
    const fig = figRef.current;
    if (!fig || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let mx = 0, my = 0, sx = 0, sy = 0, raf = 0;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    const loop = () => {
      sx += (mx - sx) * 0.07;
      sy += (my - sy) * 0.07;
      fig.style.setProperty("--px", (sx * 18).toFixed(2));
      fig.style.setProperty("--py", (sy * 14).toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  let k = 0;

  return (
    <section id="hello" className="paper-hero" aria-label="Deep Shah, software engineer">
      <div className="ph-copy">
        <h1 className="ph-name" aria-label="Deep Shah">
          {["DEEP", "SHAH"].map((word) => (
            <span className="ph-word" aria-hidden="true" key={word}>
              {word.split("").map((ch) => {
                const n = k++;
                const col = CHIP_COLS[n % 8];
                const style: Vars = {
                  "--c": `var(${col})`,
                  "--r": `${CHIP_ROT[n % 8]}deg`,
                  "--d": `${0.08 * n + 0.1}s`,
                  "--y": `${n % 2 ? 4 : -3}px`,
                };
                return (
                  <span key={n} className={`ph-chip${col === "--ph-yellow" ? " dark" : ""}`} style={style}>
                    {ch}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>
        <span className="ph-script">
          writes calm backends
          <svg viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true">
            <path d="M4 10 C 60 2, 110 14, 160 8 S 250 4, 296 9" />
          </svg>
        </span>
        <div className="ph-cta">
          <a className="ph-btn primary" href="#projects">See my work →</a>
          <a className="ph-btn" href="#contact">Say hello</a>
        </div>
      </div>

      <div className="ph-wall">
        <figure className="ph-fig" ref={figRef}>
          <div className="ph-swap">
            <span className="ph-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/paper/p3.webp" alt="Deep Shah smiling through a torn paper hole" draggable={false} />
            </span>
            <span className="ph-tile alt" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/paper/p6.webp" alt="" draggable={false} />
            </span>
          </div>
          <p className="ph-tag ph-under">
            I build backends that <mark className="ph-mark">stay calm</mark> when the traffic doesn’t.
          </p>
        </figure>
      </div>
    </section>
  );
}
