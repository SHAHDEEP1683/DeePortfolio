import { experience } from "@/lib/data";
import { Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          Work Journey
        </h2>
      </div>
      
      <div className="space-y-8">
          {experience.map((job, index) => (
            <Card key={index} className="bg-card/50 dark:bg-card">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="font-headline text-xl font-semibold text-primary">{job.role}</CardTitle>
                            <p className="text-md font-medium text-muted-foreground mt-1">{job.company}</p>
                        </div>
                        <p className="text-sm text-muted-foreground min-w-max">{job.duration}</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                        {job.description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
          ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
