import { personalData } from "@/lib/data";
import Typewriter from "./typewriter";
import Terminal from "./terminal";

const IntroSection = () => {
  return (
    <section id="intro" className="py-24 text-center">
      <h1 className="font-headline text-5xl md:text-7xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-primary">
        {personalData.name}
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-8">
        <Typewriter text={personalData.role} />
      </p>
      <div className="text-left max-w-4xl mx-auto">
        <Terminal />
      </div>
    </section>
  );
};

export default IntroSection;
