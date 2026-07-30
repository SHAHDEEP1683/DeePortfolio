import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Briefcase, CodeXml, Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "./ui/sheet";

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
            
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                  <nav className="flex flex-col gap-4 mt-8">
                    {navLinks.map(link => (
                      <SheetClose asChild key={link.href}>
                        <a href={link.href} className="text-lg font-medium text-muted-foreground hover:text-foreground py-2 border-b border-border/40">
                          {link.label}
                        </a>
                      </SheetClose>
                    ))}
                    <SheetClose asChild>
                      <a href="#contact" className="mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-primary text-primary-foreground font-semibold">
                        <Briefcase className="h-4 w-4" /> Hire Me
                      </a>
                    </SheetClose>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
