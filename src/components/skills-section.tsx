import { skillGroups } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Beaker, Cloud, Code, Cpu, Database, Leaf, Plug, Workflow, Wrench, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  code: Code,
  leaf: Leaf,
  plug: Plug,
  database: Database,
  workflow: Workflow,
  cloud: Cloud,
  beaker: Beaker,
  wrench: Wrench,
};

const SkillsSection = () => {
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <section id="skills" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <Cpu className="h-10 w-10" />
          My Tech Stack
        </h2>
        <p className="mt-3 text-muted-foreground">
          {total} tools across {skillGroups.length} areas: what I use to build and ship Java backends.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillGroups.map((group) => {
          const Icon = ICONS[group.icon] ?? Code;
          return (
            <div key={group.title} className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="font-headline text-xl font-semibold mb-4 flex items-center gap-3">
                <Icon className="h-6 w-6" />
                {group.title}
                <span className="ml-auto text-xs font-medium text-muted-foreground">{group.skills.length}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm px-3 py-1 font-medium">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsSection;
