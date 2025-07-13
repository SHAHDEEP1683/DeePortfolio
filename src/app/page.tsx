import Header from '@/components/header';
import IntroSection from '@/components/intro-section';
import SkillsSection from '@/components/skills-section';
import ProjectsSection from '@/components/projects-section';
import ExperienceSection from '@/components/experience-section';
import EducationSection from '@/components/education-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';
import GithubGraph from '@/components/github-graph';

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="container mx-auto max-w-5xl px-4">
        <IntroSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <GithubGraph />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
