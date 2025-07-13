import { education } from "@/lib/data";
import { GraduationCap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const EducationSection = () => {
  return (
    <section id="education" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <GraduationCap className="h-10 w-10 text-accent" />
          Education
        </h2>
        <p className="text-muted-foreground mt-2">My academic background.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {education.map((edu, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="font-headline text-xl">{edu.degree}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">{edu.university}</p>
              <p className="text-sm text-muted-foreground">{edu.duration}</p>
              <p className="text-sm text-muted-foreground">CGPA: {edu.cgpa}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
