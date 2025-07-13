import { ThemeToggle } from "./theme-toggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-5xl items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="font-headline text-xl font-bold">
            DeepType
          </a>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
