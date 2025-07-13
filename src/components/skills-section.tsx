import { skills } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Code, Layers, Wrench, Beaker, SlidersHorizontal, Cpu } from "lucide-react";

const skillCategories = [
  {
    title: "Core Technologies",
    icon: <Code className="h-6 w-6" />,
    skills: skills.coreTechnologies,
  },
  {
    title: "Frameworks & Libraries",
    icon: <Layers className="h-6 w-6" />,
    skills: skills.frameworksAndLibraries,
  },
  {
    title: "Developer Tools",
    icon: <Wrench className="h-6 w-6" />,
    skills: skills.developerTools,
  },
  {
    title: "Testing",
    icon: <Beaker className="h-6 w-6" />,
    skills: skills.testing,
  },
  {
    title: "Other Skills",
    icon: <SlidersHorizontal className="h-6 w-6" />,
    skills: skills.otherSkills,
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <Cpu className="h-10 w-10" />
          My Tech Stack
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="font-headline text-xl font-semibold mb-4 flex items-center gap-3">
              {category.icon}
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <Badge key={skillIndex} variant="secondary" className="text-sm px-3 py-1 font-medium">{skill}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
