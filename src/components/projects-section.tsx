import { projects } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, FolderGit2 } from "lucide-react";

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <FolderGit2 className="h-10 w-10 text-accent" />
          Projects
        </h2>
        <p className="text-muted-foreground mt-2">A selection of my work.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-muted-foreground">Key Features:</h4>
                <p className="text-sm">{project.features}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <Badge key={i} variant="outline">{tech}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="link" className="text-accent p-0 h-auto">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  View on GitHub <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
