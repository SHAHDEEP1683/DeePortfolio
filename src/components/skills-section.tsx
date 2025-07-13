import { skills } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Code2 } from "lucide-react";

const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <Code2 className="h-10 w-10 text-accent" />
          Technical Skills
        </h2>
        <p className="text-muted-foreground mt-2">My technical arsenal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="font-headline text-2xl font-semibold mb-4 text-primary">Languages & Frameworks</h3>
          <div className="flex flex-wrap gap-2">
            {skills.languagesAndFrameworks.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-lg px-4 py-2">{skill}</Badge>
            ))}
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="font-headline text-2xl font-semibold mb-4 text-primary">Tools & Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {skills.toolsAndTechnologies.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-lg px-4 py-2">{skill}</Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
