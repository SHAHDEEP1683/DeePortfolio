"use client";

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
import WorkspaceSection from '@/components/workspace-section';
import PaperHero from '@/components/paper-hero/paper-hero';

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      {/* new playful paper hero first; everything below stays as it was */}
      <PaperHero />
      <div className="container mx-auto max-w-7xl px-4">
        <IntroSection />
      </div>
      <main className="container mx-auto max-w-7xl px-4">
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <JavaChallengeSection />
        <TerminalSection />
        <ContactSection />
        <WorkspaceSection />
      </main>
      <Footer />
    </div>
  );
}
