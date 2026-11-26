"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import JavaChallengeSection from "./java-challenge-section";
import JavaGauntlet from "./java-gauntlet";

/** Dark theme: the original Java challenge (unchanged). Light theme: the harder, interactive gauntlet. */
export default function ChallengeSwitch() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && resolvedTheme === "light" ? <JavaGauntlet /> : <JavaChallengeSection />;
}
