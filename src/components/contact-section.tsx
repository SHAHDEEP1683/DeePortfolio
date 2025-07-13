import { personalData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Mail, Smartphone, Github, Download, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <Send className="h-10 w-10 text-accent" />
          Get In Touch
        </h2>
        <p className="text-muted-foreground mt-2">Feel free to reach out. I'm open to opportunities.</p>
      </div>

      <div className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-lg">
        <div className="space-y-4">
            <a href={`mailto:${personalData.email}`} className="flex items-center gap-4 group">
                <div className="p-2 bg-secondary rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Mail className="h-5 w-5"/>
                </div>
                <span>{personalData.email}</span>
            </a>
            <div className="flex items-center gap-4 group">
                <div className="p-2 bg-secondary rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Smartphone className="h-5 w-5"/>
                </div>
                <span>{personalData.phone}</span>
            </div>
            <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="p-2 bg-secondary rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Github className="h-5 w-5"/>
                </div>
                <span>GitHub Profile</span>
            </a>
        </div>
        <div className="mt-8 text-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <a href="/resume.pdf" download="Deep_Shah_Resume.pdf">
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                </a>
            </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
