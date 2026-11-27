"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useTossChips } from "@/lib/use-toss-chips";
import { skillGroups } from "@/lib/data";
import {
  Archive, Beaker, Check, Shuffle, RotateCcw, Boxes, Cloud, Code, Cpu, CreditCard, Database, FileText, GitMerge, Globe, Leaf, Mail,
  MessagesSquare, Plug, Server, ShieldCheck, Split, Workflow, Wrench, Zap, type LucideIcon,
} from "lucide-react";

const GROUP_ICONS: Record<string, LucideIcon> = {
  code: Code, leaf: Leaf, plug: Plug, database: Database, workflow: Workflow, cloud: Cloud, beaker: Beaker, wrench: Wrench,
};

/** Brand logos (Devicon, open-source SVGs served from jsDelivr). */
const DEVICON = (p: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${p}.svg`;
const LOGOS: Record<string, string> = {
  "Java": "java/java-original",
  "Spring Boot": "spring/spring-original",
  "Spring Security": "spring/spring-original",
  "Spring MVC": "spring/spring-original",
  "Spring Data JPA": "spring/spring-original",
  "Spring Boot Test": "spring/spring-original",
  "Hibernate - JPA": "hibernate/hibernate-original",
  "Maven": "maven/maven-original",
  "OpenAPI Spec": "openapi/openapi-original",
  "Swagger": "swagger/swagger-original",
  "Postman": "postman/postman-original",
  "PostgreSQL": "postgresql/postgresql-original",
  "MySQL": "mysql/mysql-original",
  "MongoDB": "mongodb/mongodb-original",
  "Liquibase/Flyway": "liquibase/liquibase-original",
  "Apache Kafka": "apachekafka/apachekafka-original",
  "RabbitMQ": "rabbitmq/rabbitmq-original",
  "Redis": "redis/redis-original",
  "AWS": "amazonwebservices/amazonwebservices-original",
  "Terraform": "terraform/terraform-original",
  "Docker": "docker/docker-original",
  "Kubernetes": "kubernetes/kubernetes-original",
  "Argo CD": "argocd/argocd-original",
  "GitHub Actions": "githubactions/githubactions-original",
  "JUnit": "junit/junit-original",
  "SonarQube": "sonarqube/sonarqube-original",
  "Git": "git/git-original",
  "GitHub": "github/github-original",
  "IntelliJ IDEA": "intellij/intellij-original",
  "VS Code": "vscode/vscode-original",
  "DBeaver": "dbeaver/dbeaver-original",
  "Claude Code": "claude/claude-original",
};

/** Outline icons for skills that have no brand logo. */
const OUTLINE: Record<string, LucideIcon> = {
  "SQL": Database,
  "Microservices": Boxes,
  "Event-Driven Architecture": Zap,
  "Authentication & Authorization": ShieldCheck,
  "REST APIs": Globe,
  "Payment & Banking APIs": CreditCard,
  "AWS EC2": Server,
  "AWS RDS": Database,
  "AWS S3": Archive,
  "AWS SES": Mail,
  "Amazon MQ": MessagesSquare,
  "AWS ALB": Split,
  "Git CI/CD": GitMerge,
  "JasperReport": FileText,
};

function SkillMark({ skill }: { skill: string }) {
  const logo = LOGOS[skill];
  if (logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={DEVICON(logo)} alt="" width={14} height={14} loading="lazy" decoding="async" />;
  }
  const Icon = OUTLINE[skill] ?? Code;
  return <Icon strokeWidth={2.2} aria-hidden="true" />;
}

/** 1 column on phones, 2 on tablets, 3 on desktop (same breakpoints as before). */
function useColumnCount() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const update = () => setCols(lg.matches ? 3 : md.matches ? 2 : 1);
    update();
    md.addEventListener("change", update);
    lg.addEventListener("change", update);
    return () => {
      md.removeEventListener("change", update);
      lg.removeEventListener("change", update);
    };
  }, []);
  return cols;
}

/** Each skill's own card (index into skillGroups). */
const HOME: Record<string, number> = Object.fromEntries(skillGroups.flatMap((g, i) => g.skills.map((s) => [s, i])));
const ALL_SKILLS = skillGroups.flatMap((g) => g.skills);

/** Deal every chip into a card that isn't its own, keeping each card's chip count the same. */
function shuffledPlacement(): Record<string, number> {
  const slots = skillGroups.flatMap((g, i) => g.skills.map(() => i));
  const deck = [...ALL_SKILLS];
  for (let k = deck.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [deck[k], deck[j]] = [deck[j], deck[k]];
  }
  // swap away any chip that landed back in its own card
  for (let a = 0; a < deck.length; a++) {
    if (HOME[deck[a]] !== slots[a]) continue;
    for (let tries = 0; tries < 200; tries++) {
      const b = Math.floor(Math.random() * deck.length);
      if (HOME[deck[b]] !== slots[a] && HOME[deck[a]] !== slots[b]) {
        [deck[a], deck[b]] = [deck[b], deck[a]];
        break;
      }
    }
  }
  return Object.fromEntries(deck.map((s, k) => [s, slots[k]]));
}

const SkillsSection = () => {
  const cols = useColumnCount();
  const sectionRef = useRef<HTMLElement>(null);
  // sorting game: null = every chip in its own card; otherwise skill -> card it currently sits in
  const [placement, setPlacement] = useState<Record<string, number> | null>(null);
  const playing = placement !== null;
  const { moved, tidy } = useTossChips(
    sectionRef,
    playing ? (skill, card) => setPlacement((p) => (p ? { ...p, [skill]: card } : p)) : undefined,
  );

  const correct = useMemo(
    () => (placement ? ALL_SKILLS.filter((s) => placement[s] === HOME[s]).length : ALL_SKILLS.length),
    [placement],
  );
  const percent = Math.round((correct / ALL_SKILLS.length) * 100);
  const solved = playing && correct === ALL_SKILLS.length;

  const shuffle = () => {
    tidy();
    setPlacement(shuffledPlacement());
  };

  // While playing, the whole board fits on one screen: 4 columns, compact cards (CSS), then scale the
  // cards down if they're still taller than the space under the controls, and scroll the game into view.
  const gameRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(1);
  useLayoutEffect(() => {
    if (!playing) {
      setFit(1);
      return;
    }
    const measure = () => {
      const grid = gridRef.current, game = gameRef.current;
      if (!grid || !game) return;
      const header = 72; // sticky nav + a little air
      const room = window.innerHeight - header - game.offsetHeight - 28;
      const natural = grid.scrollHeight; // layout height, unaffected by zoom
      setFit(Math.max(0.55, Math.min(1, room / natural)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // re-fit when a game starts or the column count changes, not on every drop (the board would jump)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, cols]);
  const wasPlaying = useRef(false);
  useEffect(() => {
    if (playing && !wasPlaying.current && gameRef.current) {
      const top = gameRef.current.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
    wasPlaying.current = playing;
  }, [playing]);
  const gridCols = playing && cols === 3 ? 4 : cols;
  const reset = () => {
    tidy();
    setPlacement(null);
  };

  const chipsFor = (i: number) => (placement ? ALL_SKILLS.filter((s) => placement[s] === i) : skillGroups[i].skills);

  const columns = Array.from({ length: gridCols }, (_, c) =>
    skillGroups.map((group, i) => ({ group, i })).filter(({ i }) => i % gridCols === c),
  );

  return (
    <section id="skills" ref={sectionRef} className={`skills-section py-16 md:py-24 border-t${playing ? " is-playing" : ""}`}>
      <div className="text-center mb-8">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <Cpu className="h-10 w-10" />
          My Tech Stack
        </h2>
        <p className="mt-3 text-muted-foreground">
          What I use to build and ship Java backends.
        </p>

        <div className="skills-game" ref={gameRef}>
          <div className="skills-game__buttons">
            <button type="button" className="skills-btn" onClick={shuffle}>
              <Shuffle className="h-4 w-4" aria-hidden="true" /> Shuffle
            </button>
            {(playing || moved) && (
              <button type="button" className="skills-btn skills-btn--ghost" onClick={reset}>
                <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset
              </button>
            )}
          </div>
          <div className="skills-game__msg" aria-live="polite">
            {solved ? (
              <span className="is-solved">All sorted, 100%! You know this stack as well as I do 🎉</span>
            ) : playing ? (
              <>
                Mixed up! Drag each chip back to its card.
                <span className="skills-score">
                  <span className="skills-score__bar" style={{ width: `${percent}%` }} />
                  <span className="skills-score__text">
                    <b>{percent}%</b> in place ({correct}/{ALL_SKILLS.length})
                  </span>
                </span>
              </>
            ) : (
              <span aria-hidden="true">psst: toss a chip around, or shuffle and sort them back</span>
            )}
          </div>
        </div>
      </div>

      {/* cards keep the left-to-right order (card i goes to column i % cols) and stack
          straight under each other, so there are no gaps */}
      <div
        ref={gridRef}
        className="skills-cols"
        style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`, ...(fit < 1 ? { zoom: fit } : {}) }}
      >
        {columns.map((column, c) => (
          <div key={c} className="skills-col">
            {column.map(({ group, i }) => {
          const Icon = GROUP_ICONS[group.icon] ?? Code;
          return (
            <div key={group.title} data-card={i} className={`skill-card bg-card p-5 rounded-lg shadow-sm ${i % 2 ? "skill-card--b" : "skill-card--a"}${i % 3 === 2 ? " skill-card--mint" : ""}`}>
              <h3 className="font-headline text-lg font-semibold mb-3 flex items-center gap-2.5">
                <Icon className="h-5 w-5" />
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2" aria-label={group.title}>
                {chipsFor(i).map((skill, k) => {
                  const home = HOME[skill] === i;
                  return (
                    <li
                      key={skill}
                      data-skill={skill}
                      className={`skill-chip bg-secondary text-secondary-foreground${playing ? (home ? " is-home" : " is-away") : ""}`}
                      style={playing ? ({ "--pop": `${(k % 8) * 40}ms` } as CSSProperties) : undefined}
                    >
                      <span className="skill-chip__mark">
                        {playing && home ? <Check strokeWidth={3} aria-label="in the right card" /> : <SkillMark skill={skill} />}
                      </span>
                      {skill}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
