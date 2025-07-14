"use client";

import { useEffect } from 'react';
import Header from '@/components/header';
import IntroSection from '@/components/intro-section';
import SkillsSection from '@/components/skills-section';
import ProjectsSection from '@/components/projects-section';
import ExperienceSection from '@/components/experience-section';
import EducationSection from '@/components/education-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';
import TerminalSection from '@/components/terminal-section';
import JavaChallengeSection from '@/components/java-challenge-section';

export default function Home() {
  useEffect(() => {
    // A timeout is used to ensure this runs after other potential focus-stealing events.
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 0);
  }, []);

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="container mx-auto max-w-7xl px-4">
        <IntroSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <JavaChallengeSection />
        <TerminalSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
