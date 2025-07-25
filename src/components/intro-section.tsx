"use client";

import { personalData } from "@/lib/data";
import Typewriter from "./typewriter";
import { Button } from "./ui/button";
import { Github, Download } from "lucide-react";
import { useEffect, useRef } from "react";

const IntroSection = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section id="intro" className="py-24 sm:py-32 md:py-40 text-center">
      <div className="container max-w-4xl">
        <h1 
          ref={headingRef}
          tabIndex={-1}
          className="font-headline text-5xl md:text-7xl font-bold mb-4 outline-none"
        >
          {personalData.name}
        </h1>
        <div className="text-xl md:text-2xl text-muted-foreground mb-8 h-8">
          <Typewriter 
            textArray={personalData.titles} 
            speed={100} 
            delay={1500}
          />
        </div>
        <p className="max-w-2xl mx-auto mb-10 text-lg text-muted-foreground">
          {personalData.bio}
        </p>
        <div className="flex justify-center gap-4">
            <Button asChild size="lg">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Resume
                </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
                 <a href={personalData.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
            </Button>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
