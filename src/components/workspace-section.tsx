"use client";

import { useEffect, useRef } from "react";
import { Armchair } from "lucide-react";

/**
 * "My Workspace": the cozy diorama shown as a 3D object.
 * Layers sit at different depths (preserve-3d), the stage tilts toward the pointer
 * (gentle idle sway when untouched), and it rises into place when scrolled into view.
 */
const chips = [
  { label: "Java", cls: "ws-chip--a", z: 140 },
  { label: "Spring Boot", cls: "ws-chip--b", z: 110 },
  { label: "Microservices", cls: "ws-chip--c", z: 170 },
  { label: "</>", cls: "ws-chip--d ws-chip--code", z: 200 },
  { label: "System Design", cls: "ws-chip--e", z: 90 },
];

const SHEET = [
  { src: "/paper/p6.webp", label: "Hello", alt: "Deep waving" },
  { src: "/paper/p2.webp", label: "Design the API", alt: "Deep thinking" },
  { src: "/paper/p4.webp", label: "Ship it", alt: "Deep giving a thumbs up" },
  { src: "/paper/p1.webp", label: "Run it in prod", alt: "Deep with sunglasses" },
];

const WorkspaceSection = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let tx = 0, ty = 0, x = 0, y = 0, gx = 50, gy = 30;
    let lastMove = -1e9, raf = 0, visible = false, t0 = performance.now();

    const onMove = (cx: number, cy: number) => {
      const r = stage.getBoundingClientRect();
      const nx = (cx - r.left) / r.width - 0.5;
      const ny = (cy - r.top) / r.height - 0.5;
      tx = Math.max(-1, Math.min(1, nx * 2));
      ty = Math.max(-1, Math.min(1, ny * 2));
      lastMove = performance.now();
    };
    const pm = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    const leave = () => { lastMove = -1e9; };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const idle = now - lastMove > 1400;
      if (idle) {
        const s = (now - t0) / 1000;
        tx = Math.sin(s * 0.55) * 0.55;
        ty = Math.sin(s * 0.8) * 0.25 - 0.1;
      }
      const k = idle ? 0.03 : 0.09;
      x += (tx - x) * k;
      y += (ty - y) * k;
      gx = 50 + x * 40;
      gy = 30 + y * 40;
      stage.style.setProperty("--rx", `${(-y * 12).toFixed(2)}deg`);
      stage.style.setProperty("--ry", `${(x * 16).toFixed(2)}deg`);
      stage.style.setProperty("--gx", `${gx.toFixed(1)}%`);
      stage.style.setProperty("--gy", `${gy.toFixed(1)}%`);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (e.isIntersecting) stage.classList.add("is-in");
      },
      { threshold: 0.2 }
    );
    io.observe(stage);

    if (!reduce) {
      stage.addEventListener("pointermove", pm);
      stage.addEventListener("pointerleave", leave);
      raf = requestAnimationFrame(tick);
    } else {
      stage.classList.add("is-in");
    }
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      stage.removeEventListener("pointermove", pm);
      stage.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section id="workspace" className="pt-16 md:pt-20 pb-8 border-t overflow-hidden">
      <div className="ws-row">
      <div className="ws-left">
      <div className="ws-head text-center mb-2">
        <h2 className="font-headline text-xl font-semibold flex items-center justify-center gap-2">
          <Armchair className="h-5 w-5" />
          My Workspace
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">Where the Java happens. Move your cursor over it.</p>
      </div>

      <div ref={stageRef} className="ws-stage ws-stage--left" aria-label="3D illustration of Deep's cozy developer workspace">
        <div className="ws-rig">
          <div className="ws-glow" aria-hidden="true" />
          <div className="ws-floor" aria-hidden="true" />
          <div className="ws-model">
            {/* depth slices of the same image give the diorama real thickness */}
            <img src="/workspace/desk.webp" alt="" aria-hidden="true" className="ws-img ws-img--back2" draggable={false} />
            <img src="/workspace/desk.webp" alt="" aria-hidden="true" className="ws-img ws-img--back" draggable={false} />
            <img
              src="/workspace/desk.webp"
              alt="Deep's cozy developer workspace: desk with laptop, monitors showing Spring Boot, Java books, a sleeping cat and a city window"
              className="ws-img ws-img--front"
              draggable={false}
            />
            <div className="ws-glare" aria-hidden="true" />
          </div>
          {chips.map((c) => (
            <span key={c.label} className={`ws-chip ${c.cls}`} style={{ ["--z" as string]: `${c.z}px` }} aria-hidden="true">
              {c.label}
            </span>
          ))}
        </div>
      </div>
      </div>

      {/* contact sheet: four torn-paper frames (from hero Sample C) */}
      <ul className="ws-sheet" aria-label="Deep at work, four frames">
        {SHEET.map((f, i) => (
          <li key={f.label} className="ws-frame">
            <span className="ws-frame__photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt={f.alt} loading="lazy" draggable={false} />
            </span>
            <span className="ws-cap">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <b>{f.label}</b>
            </span>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
};

export default WorkspaceSection;
