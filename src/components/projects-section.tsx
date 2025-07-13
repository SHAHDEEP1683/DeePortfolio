import { projects, personalData } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, FolderGit2 } from "lucide-react";

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
        {projects.map((project, index) => (
          <Card key={index} className="flex flex-col bg-card/50 dark:bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="mb-4">{project.description}</CardDescription>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <Badge key={i} variant="secondary" className="font-medium">{tech}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <a href={personalData.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
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
