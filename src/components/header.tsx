import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Briefcase, CodeXml } from "lucide-react";

const navLinks = [
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#challenge", label: "Challenge" },
  { href: "#terminal", label: "Terminal" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4">
        <a href="#" className="flex items-center gap-2 font-headline text-xl font-bold">
          <CodeXml className="h-6 w-6" />
          DeePortfolio
        </a>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map(link => (
                <a key={link.href} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                </a>
            ))}
        </nav>

        <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:flex">
                 <a href="#contact">
                    <Briefcase className="mr-2 h-4 w-4" /> Hire Me
                </a>
            </Button>
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
