"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Code2, Flame, Heart, Lightbulb, Play, RotateCcw, Timer, Trophy } from "lucide-react";

/**
 * Light-theme "Java Fun Challenge": production-grade, timed, with lives, streaks, hints,
 * pass/fail stamps, explanations with official-doc links, and a final rank.
 * (The dark theme keeps the original JavaChallengeSection.)
 */
type Q = { level: "Medium" | "Hard" | "Expert"; topic: string; code?: string; question: string; options: string[]; answer: string; hint: string; explain: string; doc: string; docLabel: string };

const QUESTIONS: Q[] = [
  {
    level: "Medium", topic: "Autoboxing",
    code: `Integer a = 127, b = 127;\nInteger c = 128, d = 128;\nSystem.out.println((a == b) + " " + (c == d));`,
    question: "What does this print?",
    options: ["true true", "true false", "false false", "false true"], answer: "true false",
    hint: "Integer.valueOf caches a small range of values.",
    explain: "Boxing uses Integer.valueOf, which caches −128 to 127. a and b share one cached object; 128 creates two different objects, so == compares references and fails.",
    doc: "https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html#jls-5.1.7", docLabel: "JLS §5.1.7 Boxing Conversion",
  },
  {
    level: "Hard", topic: "try / finally",
    code: `static int f() {\n  try { return 1; }\n  finally { return 2; }\n}\nSystem.out.println(f());`,
    question: "What does this print?",
    options: ["1", "2", "Compile error", "1 then 2"], answer: "2",
    hint: "Which return wins when both blocks return?",
    explain: "A return inside finally completes abruptly and discards the pending return from try. Avoid returning from finally in real code.",
    doc: "https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.20.2", docLabel: "JLS §14.20.2 try-finally",
  },
  {
    level: "Medium", topic: "String pool",
    code: `String s1 = "java";\nString s2 = new String("java");\nString s3 = s2.intern();\nSystem.out.println((s1 == s2) + " " + (s1 == s3));`,
    question: "What does this print?",
    options: ["true true", "false false", "false true", "true false"], answer: "false true",
    hint: "new always creates a new object; intern() returns the pooled one.",
    explain: "Literals live in the string pool. new String(...) is a separate heap object, but intern() returns the pooled instance, the same one s1 points to.",
    doc: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html#intern()", docLabel: "String.intern() Javadoc",
  },
  {
    level: "Expert", topic: "Collections",
    code: `List<Integer> list = new ArrayList<>(List.of(1, 2, 3));\nfor (Integer x : list) {\n  if (x == 2) list.remove(x);\n}\nSystem.out.println(list);`,
    question: "What happens?",
    options: ["Prints [1, 3]", "ConcurrentModificationException", "Prints [1, 2, 3]", "Prints [1]"], answer: "Prints [1, 3]",
    hint: "Think about what hasNext() checks after the removal.",
    explain: "Removing the second-to-last element shrinks the list so hasNext() returns false; the loop ends before next() can detect the modification. Fail-fast is best-effort, never rely on it.",
    doc: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayList.html", docLabel: "ArrayList Javadoc (fail-fast iterators)",
  },
  {
    level: "Hard", topic: "Integer overflow",
    code: `System.out.println(Math.abs(Integer.MIN_VALUE));`,
    question: "What does this print?",
    options: ["2147483648", "-2147483648", "ArithmeticException", "0"], answer: "-2147483648",
    hint: "+2147483648 does not fit in an int.",
    explain: "The positive value doesn't fit in 32 bits, so abs overflows and returns Integer.MIN_VALUE itself. Use Math.absExact to get an exception instead.",
    doc: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Math.html#abs(int)", docLabel: "Math.abs(int) Javadoc",
  },
  {
    level: "Hard", topic: "Streams",
    code: `Stream.of("a", "b", "c")\n      .filter(s -> { System.out.print(s); return true; });\nSystem.out.println("!");`,
    question: "What does this print?",
    options: ["abc!", "!", "a!", "!abc"], answer: "!",
    hint: "Intermediate operations are lazy.",
    explain: "filter is an intermediate operation; without a terminal operation (collect, forEach, …) the pipeline never runs, so the lambda is never called.",
    doc: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html", docLabel: "java.util.stream: laziness",
  },
  {
    level: "Medium", topic: "equals / hashCode",
    code: `class P {\n  int id; P(int id) { this.id = id; }\n  @Override public boolean equals(Object o) {\n    return o instanceof P p && p.id == id;\n  }\n}\nSet<P> set = new HashSet<>();\nset.add(new P(1)); set.add(new P(1));\nSystem.out.println(set.size());`,
    question: "What does this (almost always) print?",
    options: ["1", "2", "0", "Compile error"], answer: "2",
    hint: "HashSet looks at the hash bucket before equals.",
    explain: "equals is overridden but hashCode isn't, so equal objects get different identity hash codes and land in different buckets. Always override both together.",
    doc: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html#hashCode()", docLabel: "Object.hashCode() contract",
  },
  {
    level: "Expert", topic: "Concurrency",
    code: `volatile int count = 0;\n// two threads each run:\nfor (int i = 0; i < 1000; i++) count++;`,
    question: "What is count after both threads finish?",
    options: ["Always 2000", "2000 or less", "Always 1000", "Compile error"], answer: "2000 or less",
    hint: "volatile gives visibility, not atomicity.",
    explain: "count++ is read-modify-write. volatile makes writes visible, but two threads can still read the same value and lose an update. Use AtomicInteger or a lock.",
    doc: "https://docs.oracle.com/javase/tutorial/essential/concurrency/atomic.html", docLabel: "Java Tutorials: Atomic Access",
  },
  {
    level: "Expert", topic: "Spring transactions",
    question: "In a Spring bean, a method without @Transactional calls this.save(), and save() is @Transactional. With the default proxy mode, what happens?",
    options: ["save() runs in a new transaction", "No transaction is started for save()", "Spring fails at startup", "The caller becomes transactional too"], answer: "No transaction is started for save()",
    hint: "The call never leaves the object.",
    explain: "Spring applies @Transactional through a proxy. A self-invocation (this.save()) bypasses the proxy, so the annotation is ignored. Move the method to another bean or use AspectJ mode.",
    doc: "https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html", docLabel: "Spring: Using @Transactional",
  },
  {
    level: "Hard", topic: "Spring bean scopes",
    question: "A singleton bean @Autowires a prototype-scoped bean into a field (no ObjectProvider or lookup method). How many prototype instances does the singleton use?",
    options: ["A new one per method call", "Exactly one, injected once", "One per HTTP request", "None, injection fails"], answer: "Exactly one, injected once",
    hint: "When does injection happen for a singleton?",
    explain: "Dependencies are injected once, when the singleton is created, so it keeps that one prototype instance forever. Use ObjectProvider or method injection to get a fresh one each time.",
    doc: "https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html", docLabel: "Spring: Bean Scopes",
  },
];

const SECONDS = 30;
const LIVES = 3;
const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const rankFor = (correct: number) =>
  correct >= 9 ? { title: "Staff Engineer", note: "Production instincts. Ship it." }
  : correct >= 7 ? { title: "Senior Engineer", note: "Sharp. A couple of traps got you." }
  : correct >= 4 ? { title: "Mid-level Engineer", note: "Solid base; read the linked docs." }
  : { title: "Junior Engineer", note: "These are hard ones. Try again!" };

// tiny keyword colouring for the code screen
const KW = /\b(static|int|return|try|finally|new|for|if|volatile|class|boolean|public|Override|String|Integer|List|Set|Stream|System)\b/g;
function CodeLine({ line }: { line: string }) {
  const parts = line.split(/("[^"]*"|\/\/.*|\b\d+\b)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (/^".*"$/.test(p)) return <span key={i} className="jg-str">{p}</span>;
        if (/^\/\//.test(p)) return <span key={i} className="jg-cm">{p}</span>;
        if (/^\d+$/.test(p)) return <span key={i} className="jg-num">{p}</span>;
        const sub = p.split(KW);
        return sub.map((s, k) => (k % 2 ? <span key={`${i}-${k}`} className="jg-kw">{s}</span> : <span key={`${i}-${k}`}>{s}</span>));
      })}
    </>
  );
}

type Phase = "intro" | "ask" | "result" | "done";

export default function JavaGauntlet() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [deck, setDeck] = useState<(Q & { shuffled: string[] })[]>([]);
  const [idx, setIdx] = useState(0);
  const [left, setLeft] = useState(SECONDS);
  const [lives, setLives] = useState(LIVES);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [hint, setHint] = useState(false);
  const [gained, setGained] = useState(0);
  const [best, setBest] = useState(0);
  const tick = useRef<number | null>(null);

  useEffect(() => { setBest(Number(localStorage.getItem("jg-best") || 0)); }, []);

  const q = deck[idx];

  const start = () => {
    setDeck(shuffle(QUESTIONS).map((x) => ({ ...x, shuffled: shuffle(x.options) })));
    setIdx(0); setLives(LIVES); setScore(0); setStreak(0); setBestStreak(0); setCorrect(0);
    setPicked(null); setHint(false); setLeft(SECONDS); setPhase("ask");
  };

  const answer = useCallback((choice: string | null) => {
    if (phase !== "ask" || !q) return;
    if (tick.current) window.clearInterval(tick.current);
    setPicked(choice ?? "__timeout__");
    if (choice === q.answer) {
      const pts = (hint ? 50 : 100) + Math.round((left / SECONDS) * 50) + streak * 20;
      setGained(pts); setScore((s) => s + pts); setCorrect((c) => c + 1);
      setStreak((s) => { const n = s + 1; setBestStreak((b) => Math.max(b, n)); return n; });
    } else {
      setGained(0); setStreak(0); setLives((l) => l - 1);
    }
    setPhase("result");
  }, [phase, q, hint, left, streak]);

  // countdown
  useEffect(() => {
    if (phase !== "ask") return;
    tick.current = window.setInterval(() => setLeft((s) => s - 1), 1000);
    return () => { if (tick.current) window.clearInterval(tick.current); };
  }, [phase, idx]);
  useEffect(() => { if (phase === "ask" && left <= 0) answer(null); }, [left, phase, answer]);

  const next = useCallback(() => {
    if (lives <= 0 || idx + 1 >= deck.length) {
      setPhase("done");
      const final = score;
      setBest((b) => { const nb = Math.max(b, final); localStorage.setItem("jg-best", String(nb)); return nb; });
      return;
    }
    setIdx((i) => i + 1); setPicked(null); setHint(false); setLeft(SECONDS); setPhase("ask");
  }, [lives, idx, deck.length, score]);

  // keyboard: 1-4 answer, H hint, Enter next/start
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      const sec = document.getElementById("challenge");
      const r = sec?.getBoundingClientRect();
      if (!r || r.bottom < 0 || r.top > window.innerHeight) return; // only while visible
      if (phase === "ask" && q && /^[1-4]$/.test(e.key)) { answer(q.shuffled[Number(e.key) - 1]); }
      else if (phase === "ask" && (e.key === "h" || e.key === "H")) { setHint(true); }
      else if (e.key === "Enter") { if (phase === "result") next(); else if (phase === "intro" || phase === "done") start(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, q, answer, next]); // eslint-disable-line react-hooks/exhaustive-deps

  const rank = useMemo(() => rankFor(correct), [correct]);
  const pct = Math.max(0, left / SECONDS) * 100;

  return (
    <section id="challenge" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <Code2 className="h-10 w-10" />
          Java Fun Challenge
        </h2>
        <p className="mt-3 text-muted-foreground">Refresh your Java knowledge!</p>
      </div>

      <div className="jg">
        {phase === "intro" && (
          <div className="jg-card jg-intro">
            <span className="jg-kicker">Production-grade edition</span>
            <h3>10 tricky questions real engineers get wrong</h3>
            <ul className="jg-rules">
              <li><Timer className="h-4 w-4" /> {SECONDS}s per question</li>
              <li><Heart className="h-4 w-4" /> {LIVES} lives</li>
              <li><Flame className="h-4 w-4" /> streak bonus</li>
              <li><Lightbulb className="h-4 w-4" /> hints cost half the points</li>
            </ul>
            <p className="jg-small">Keys: <kbd>1</kbd>–<kbd>4</kbd> answer · <kbd>H</kbd> hint · <kbd>Enter</kbd> next</p>
            <button type="button" className="jg-btn jg-btn--go" onClick={start}><Play className="h-4 w-4" /> Start the challenge</button>
            {best > 0 && <p className="jg-small">Your best: <b>{best}</b> pts</p>}
          </div>
        )}

        {(phase === "ask" || phase === "result") && q && (
          <div className="jg-card">
            <div className="jg-hud">
              <span className="jg-pill">Q {idx + 1}/{deck.length}</span>
              <span className={`jg-pill jg-level jg-level--${q.level.toLowerCase()}`}>{q.level}</span>
              <span className="jg-topic">{q.topic}</span>
              <span className="jg-spacer" />
              <span className="jg-lives" aria-label={`${lives} lives left`}>
                {Array.from({ length: LIVES }, (_, i) => <Heart key={i} className={`h-4 w-4 ${i < lives ? "on" : ""}`} />)}
              </span>
              {streak > 1 && <span className="jg-pill jg-streak"><Flame className="h-3.5 w-3.5" /> x{streak}</span>}
              <span className="jg-score">{score} pts</span>
            </div>

            <div className="jg-timer" aria-hidden="true"><i style={{ width: `${pct}%` }} className={left <= 8 ? "low" : ""} /></div>

            {q.code && (
              <pre className="jg-code"><code>{q.code.split("\n").map((l, i) => <div key={i}><CodeLine line={l} /></div>)}</code></pre>
            )}
            <p className="jg-q">{q.question}</p>

            <div className="jg-options" role="group" aria-label="Answers">
              {q.shuffled.map((o, i) => {
                const state = phase === "result" ? (o === q.answer ? "right" : o === picked ? "wrong" : "dim") : "";
                return (
                  <button key={o} type="button" className={`jg-opt ${state}`} disabled={phase === "result"} onClick={() => answer(o)}>
                    <kbd>{i + 1}</kbd> {o}
                  </button>
                );
              })}
            </div>

            {phase === "ask" && (
              <div className="jg-actions">
                {!hint ? (
                  <button type="button" className="jg-btn jg-btn--ghost" onClick={() => setHint(true)}><Lightbulb className="h-4 w-4" /> Hint (−50 pts)</button>
                ) : (
                  <p className="jg-hint"><Lightbulb className="h-4 w-4" /> {q.hint}</p>
                )}
                <span className="jg-left">{left}s</span>
              </div>
            )}

            {phase === "result" && (
              <div className="jg-result">
                <span className={`jg-stamp ${picked === q.answer ? "pass" : "fail"}`}>
                  {picked === q.answer ? "PASSED" : picked === "__timeout__" ? "TIME'S UP" : "FAILED"}
                </span>
                {gained > 0 && <span className="jg-gain">+{gained} pts</span>}
                <p className="jg-explain">{q.explain}</p>
                <a className="jg-doc" href={q.doc} target="_blank" rel="noopener noreferrer">Read: {q.docLabel} ↗</a>
                <button type="button" className="jg-btn jg-btn--go" onClick={next}>
                  {lives <= 0 ? "See results" : idx + 1 >= deck.length ? "Finish" : "Next question →"}
                </button>
              </div>
            )}
          </div>
        )}

        {phase === "done" && (
          <div className="jg-card jg-done">
            <Trophy className="h-10 w-10 jg-trophy" />
            <span className="jg-kicker">{lives <= 0 ? "Out of lives" : "Challenge complete"}</span>
            <h3>{rank.title}</h3>
            <p className="jg-small">{rank.note}</p>
            <div className="jg-stats">
              <div><b>{score}</b><span>points</span></div>
              <div><b>{correct}/{deck.length}</b><span>correct</span></div>
              <div><b>{bestStreak}</b><span>best streak</span></div>
              <div><b>{best}</b><span>your best</span></div>
            </div>
            <button type="button" className="jg-btn jg-btn--go" onClick={start}><RotateCcw className="h-4 w-4" /> Play again</button>
          </div>
        )}
      </div>
    </section>
  );
}
