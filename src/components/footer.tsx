import { personalData } from "@/lib/data";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto max-w-5xl px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-center text-sm text-muted-foreground sm:text-left">
            <p>&copy; {new Date().getFullYear()} {personalData.name}. All Rights Reserved.</p>
            <p>Built with ❤️ using React + Firebase Hosting</p>
          </div>
          <a
            href={personalData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
