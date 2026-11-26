import { projects } from "@/lib/data";
import { Check, FolderGit2, Fingerprint, ScanLine, Vote, Wrench, type LucideIcon } from "lucide-react";

/** Presentation per project (looked up by the start of the title). Features come from each description. */
const LOOK: { match: string; icon: LucideIcon; tone: string; domain: string; features: string[] }[] = [
  { match: "Fixie", icon: Wrench, tone: "green", domain: "Home services marketplace", features: ["Booking lifecycle", "Payments & payouts", "Provider management"] },
  { match: "Digi-Biometric", icon: Fingerprint, tone: "blue", domain: "EdTech · Exam security", features: ["Candidate authentication", "Attendance tracking", "Verification at exam centres"] },
  { match: "OSM", icon: ScanLine, tone: "yellow", domain: "EdTech · AI", features: ["Digital answer-sheet marking", "AI marking assistant", "AI proctoring"] },
  { match: "Election", icon: Vote, tone: "purple", domain: "GovTech · New York State process", features: ["Voter registration", "Profile management", "Election workflows"] },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <FolderGit2 className="h-10 w-10" />
          Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => {
          const look = LOOK.find((l) => project.title.startsWith(l.match));
          const Icon = look?.icon ?? FolderGit2;
          // "Name – Subtitle" or "Name (Subtitle)" -> bold name + lighter subtitle
          const paren = project.title.match(/^(.*?)\s*\((.*)\)\s*$/);
          const [name, ...rest] = paren ? [paren[1], paren[2]] : project.title.split(" – ");
          return (
            <article key={index} className={`project-card bg-card rounded-lg shadow-sm tone-${look?.tone ?? "green"}`}>
              <div className="project-band" aria-hidden="true">
                <span className="project-icon"><Icon className="h-6 w-6" /></span>
                <span className="project-num">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="project-body">
                {look && <p className="project-domain">{look.domain}</p>}
                <h3 className="font-headline project-title">
                  {name}
                  {rest.length > 0 && <span className="project-sub">{rest.join(" – ")}</span>}
                </h3>
                <p className="project-desc">{project.description}</p>
                {look && (
                  <ul className="project-features">
                    {look.features.map((f) => (
                      <li key={f}><Check className="h-3.5 w-3.5" aria-hidden="true" /> {f}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;
