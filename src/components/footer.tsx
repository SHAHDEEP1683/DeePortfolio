import { personalData } from "@/lib/data";
import { Github, Linkedin, Mail, Code2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center text-sm text-muted-foreground sm:text-left flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            <span>Built with ❤️ using Next.js, React & Firebase.</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} {personalData.name}
             </div>
             <div className="flex items-center gap-3">
                <a
                    href={personalData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                </a>
                 <a
                    href={personalData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                </a>
                <a
                    href={`mailto:${personalData.email}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                </a>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
