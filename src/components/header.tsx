"use client";

import { ThemeSwitch } from "./theme-switch";
import { Button } from "./ui/button";
import { Briefcase, CodeXml, Menu } from "lucide-react";
import { dropTo } from "@/lib/drop-to";
import { Sheet, SheetTrigger, SheetContent, SheetClose, SheetTitle, SheetDescription } from "./ui/sheet";

// Contact is reached through "Hire Me"; About takes the last slot.
const navLinks = [
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#challenge", label: "Challenge" },
  { href: "#terminal", label: "Terminal" },
  { href: "#about", label: "About" },
];

/** Header in the paper style of the hero: paper strip, ink type, highlighter hovers, taped button. */
const Header = () => {
  return (
    <header className="paper-nav sticky top-0 z-50 w-full">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <a href="#" className="paper-nav__logo">
            <span className="paper-nav__chip" aria-hidden="true">
              <CodeXml className="h-4 w-4" />
            </span>
            DeePortfolio
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-5 text-sm font-semibold">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="paper-nav__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="paper-nav__hire hidden sm:inline-flex" onClick={dropTo}>
            <Briefcase className="h-4 w-4" /> Hire Me
          </a>
          <ThemeSwitch />

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="paper-nav__menu h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Access the navigation links for the portfolio website.
                </SheetDescription>
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
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
