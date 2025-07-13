import { experience } from "@/lib/data";
import { Briefcase } from "lucide-react";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <Briefcase className="h-10 w-10 text-accent" />
          Work Experience
        </h2>
        <p className="text-muted-foreground mt-2">My professional journey.</p>
      </div>
      
      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-border" aria-hidden="true"></div>
        <div className="space-y-12">
          {experience.map((job, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-card border-2 border-accent shadow-md absolute left-1/2 -translate-x-1/2 md:group-odd:left-auto md:group-odd:right-1/2 md:group-odd:-mr-5 md:group-even:right-auto md:group-even:left-1/2 md:group-even:-ml-5" aria-hidden="true">
                <Briefcase className="w-5 h-5 text-accent" />
              </div>

              <div className="w-full md:w-[calc(50%-2.5rem)] bg-card p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="font-headline text-xl font-semibold text-primary">{job.role}</h3>
                    <p className="text-sm text-muted-foreground">{job.duration}</p>
                </div>
                <p className="text-md font-medium text-muted-foreground mb-2">{job.company}</p>
                <p className="text-sm">{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
