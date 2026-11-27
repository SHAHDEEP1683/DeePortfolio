import { education } from "@/lib/data";
import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const EducationSection = () => {
  return (
    <section id="education" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <GraduationCap className="h-10 w-10" />
          Education
        </h2>
      </div>

      <ol className="exp-timeline space-y-8">
        {education.map((edu, index) => (
          <li key={index} className="exp-item">
          <span className="exp-dot" aria-hidden="true" />
          <Card className="bg-card/50 dark:bg-card">
            <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <div>
                        <h3 className="font-headline text-xl font-semibold text-primary">{edu.degree}</h3>
                        <p className="text-md font-medium text-muted-foreground mt-1">{edu.university}</p>
                        <p className="text-sm text-muted-foreground">{edu.location}</p>
                    </div>
                    <p className="text-sm text-muted-foreground sm:min-w-max">{edu.duration}</p>
                </div>
            </CardContent>
          </Card>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default EducationSection;
