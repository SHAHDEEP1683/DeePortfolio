import { experience } from "@/lib/data";
import { Briefcase, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <Briefcase className="h-10 w-10" />
          Work Journey
        </h2>
      </div>
      
      <div className="space-y-8">
          {experience.map((job: any, index: number) => (
            <Card key={index} className="bg-card/50 dark:bg-card">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                        <div>
                            <CardTitle className="font-headline text-xl font-semibold text-primary">{job.role}</CardTitle>
                            <p className="text-md font-medium text-muted-foreground mt-1">
                              {job.url ? (
                                <a href={job.url} target="_blank" rel="noopener noreferrer" className="company-link">
                                  {job.company}
                                </a>
                              ) : (
                                job.company
                              )}
                            </p>
                        </div>
                        <p className="text-sm text-muted-foreground sm:min-w-max">{job.duration}</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                        {job.description.map((desc: string, i: number) => (
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
