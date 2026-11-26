"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import "./paper-hero.css";

/**
 * Playful "photos through paper" hero: real portraits sit in torn holes in a paper wall.
 * The big hole tears through Deep's moods (click / Enter / on its own); holes drift at
 * different depths with the pointer and scroll.
 */
const MOODS = [
  { src: "/paper/p0.webp", note: "let's build something" }, // 0 green, finger guns
  { src: "/paper/p1.webp", note: "deploying on a Friday" }, // 1 red, sunglasses
  { src: "/paper/p2.webp", note: "thinking about your API…" }, // 2 yellow, thinking
  { src: "/paper/p3.webp", note: "all tests green!" }, // 3 stripes, big smile
  { src: "/paper/p4.webp", note: "ship it!" }, // 4 orange, thumbs up
  { src: "/paper/p5.webp", note: "fuelled by boba" }, // 5 blue, boba
  { src: "/paper/p6.webp", note: "hi, I'm Deep!" }, // 6 purple, waving
];
const ORDER = [6, 4, 0, 3, 2, 5, 1];
const SMALL: { cls: string; i: number; depth: number; href?: string; go?: string }[] = [
  { cls: "s1", i: 3, depth: 0.9, href: "#projects", go: "projects" }, // all tests green -> Projects
  { cls: "s2", i: 2, depth: 0.7 },
  { cls: "s3", i: 4, depth: 0.6 },
  { cls: "s4", i: 1, depth: 1, href: "#skills", go: "tech stack" }, // sunglasses -> Tech Stack
];
const CHIP_COLS = ["--ph-green", "--ph-red", "--ph-yellow", "--ph-orange", "--ph-blue", "--ph-purple", "--ph-pink", "--ph-teal"];
const CHIP_ROT = [-5, 3, -2, 6, -4, 2, -6, 4];

type Vars = CSSProperties & Record<`--${string}`, string | number>;

export default function PaperHero() {
  const wallRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0);
  const [phase, setPhase] = useState<"idle" | "closing" | "opening">("idle");
  const busy = useRef(false);
  const hovering = useRef(false);

  const nextMood = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPos((p) => (p + 1) % ORDER.length);
      busy.current = false;
      return;
    }
    setPhase("closing");
    window.setTimeout(() => {
      setPos((p) => (p + 1) % ORDER.length);
      setPhase("opening");
      window.setTimeout(() => {
        setPhase("idle");
        busy.current = false;
      }, 620);
    }, 330);
  }, []);

  // preload, gentle auto-cycle, pointer + scroll depth
  useEffect(() => {
    MOODS.forEach((m) => {
      const im = new Image();
      im.src = m.src;
    });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const wall = wallRef.current;
    const holes = wall ? Array.from(wall.querySelectorAll<HTMLElement>(".ph-hole")) : [];
    let mx = 0, my = 0, sx = 0, sy = 0, raf = 0;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    const loop = () => {
      sx += (mx - sx) * 0.08;
      sy += (my - sy) * 0.08;
      const top = wall ? wall.getBoundingClientRect().top : 0;
      const off = Math.min(0, top - 64); // scroll distance past the header
      for (const h of holes) {
        const d = Number(h.dataset.depth || 0.5);
        h.style.setProperty("--px", (sx * d * 36).toFixed(2));
        h.style.setProperty("--py", (sy * d * 26).toFixed(2));
        h.style.setProperty("--sy", (off * d * 0.22).toFixed(2));
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    const timer = window.setInterval(() => {
      const r = wall?.getBoundingClientRect();
      const inView = r && r.bottom > 0 && r.top < window.innerHeight;
      if (!hovering.current && !document.hidden && inView) nextMood();
    }, 4200);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(timer);
      window.removeEventListener("pointermove", onMove);
    };
  }, [nextMood]);

  const main = MOODS[ORDER[pos]];
  let k = 0;

  return (
    <section id="hello" className="paper-hero" aria-label="Deep Shah, software engineer">
      <div className="ph-copy">
        <div className="ph-eyebrow">Software engineer · Java · Spring Boot</div>
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
        <p className="ph-tag">I build backends that stay calm when the traffic doesn’t.</p>
        <div className="ph-cta">
          <a className="ph-btn primary" href="#projects">See my work →</a>
          <a className="ph-btn" href="#contact">Say hello</a>
        </div>
      </div>

      <div className="ph-wall" ref={wallRef}>
        <svg className="ph-doodle" style={{ left: "30%", top: "6%", width: 46 }} viewBox="0 0 50 50" aria-hidden="true">
          <path stroke="#f2b929" d="M25 4 L30 19 L46 19 L33 29 L38 45 L25 35 L12 45 L17 29 L4 19 L20 19 Z" />
        </svg>
        <svg className="ph-doodle" style={{ left: "40%", top: "90%", width: 90 }} viewBox="0 0 100 30" aria-hidden="true">
          <path stroke="#1f9e9e" d="M3 15 Q 15 2, 27 15 T 51 15 T 75 15 T 97 15" />
        </svg>
        <svg className="ph-doodle" style={{ left: "24%", top: "84%", width: 44 }} viewBox="0 0 50 60" aria-hidden="true">
          <path stroke="#c8402f" d="M18 5 Q 6 8, 8 20 Q 9 28, 3 30 Q 9 32, 8 40 Q 6 52, 18 55 M32 5 Q 44 8, 42 20 Q 41 28, 47 30 Q 41 32, 42 40 Q 44 52, 32 55" />
        </svg>
        <svg className="ph-doodle" style={{ left: "70%", top: "40%", width: 34 }} viewBox="0 0 40 40" aria-hidden="true">
          <path stroke="#6a3fb5" d="M20 3 V37 M3 20 H37 M8 8 L32 32 M32 8 L8 32" />
        </svg>

        {SMALL.map((s) => {
          const inner = (
            <>
              <span className="ph-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={MOODS[s.i].src} alt="" draggable={false} />
              </span>
              <span className="ph-note">
                {MOODS[s.i].note}
                {s.go && <small className="ph-go">→ {s.go}</small>}
              </span>
            </>
          );
          return s.href ? (
            <a key={s.cls} href={s.href} className={`ph-hole ph-s ph-link ${s.cls}`} data-depth={s.depth} aria-label={`Go to ${s.go}`}>
              {inner}
            </a>
          ) : (
            <figure key={s.cls} className={`ph-hole ph-s ${s.cls}`} data-depth={s.depth}>
              {inner}
            </figure>
          );
        })}

        <figure
          className={`ph-hole ph-main ${phase === "closing" ? "closing" : phase === "opening" ? "opening" : ""}`}
          data-depth={0.35}
          role="button"
          tabIndex={0}
          aria-label="Change Deep's mood"
          onClick={nextMood}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              nextMood();
            }
          }}
          onPointerEnter={() => (hovering.current = true)}
          onPointerLeave={() => (hovering.current = false)}
        >
          <div className="ph-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={main.src} alt={`Deep Shah: ${main.note}`} draggable={false} />
          </div>
          <figcaption className="ph-note">
            <svg viewBox="0 0 44 40" aria-hidden="true">
              <path d="M42 4 C 26 4, 12 12, 6 32 M6 32 L 2 22 M6 32 L 15 27" />
            </svg>
            <span>{main.note}</span>
          </figcaption>
          <div className="ph-hint">click me · change the mood</div>
        </figure>
      </div>
    </section>
  );
}
