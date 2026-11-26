import { personalData, experience, education } from "@/lib/data";
import { Briefcase, GraduationCap, MapPin, Target, UserRound, Github, Linkedin } from "lucide-react";

/** About: a short story plus quick facts, all taken from data.ts. Uses the shared card/heading
 *  classes so it follows both the dark design and the light (paper) theme. */
const AboutSection = () => {
  const current = experience[0];
  const intern = experience[1];
  const degree = education[0];

  const facts = [
    { icon: Briefcase, label: "Now", value: `${current.role} at ${current.company.replace(" Pvt. Ltd.", "")}` },
    { icon: Target, label: "Focus", value: "Java · Spring Boot · AWS" },
    { icon: GraduationCap, label: "Education", value: `${degree.degree} (${degree.duration.split("–").pop()?.trim()})` },
    { icon: MapPin, label: "Based in", value: personalData.location },
  ];

  return (
    <section id="about" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <UserRound className="h-10 w-10" />
          About Me
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="bg-card p-6 sm:p-8 rounded-lg shadow-sm lg:col-span-3">
          <p className="text-lg leading-relaxed">
            I’m <strong>Deep Shah</strong>, a software engineer from {personalData.location.split(",")[0]} who builds
            backend systems with <strong>Java and Spring Boot</strong>.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Since {current.duration.split("–")[0].trim()} I’ve been a {current.role} at {current.company}, designing REST
            APIs, payment and payout flows, and event-driven workflows with RabbitMQ, deployed on AWS with Terraform.
            Before that I interned at {intern.company.replace(" Pvt. Ltd.", "")}, working across the Spring ecosystem.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            I care about backends that are secure, scalable and calm under load.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="about-link">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className="about-link">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>

        <ul className="about-facts grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:col-span-2">
          {facts.map(({ icon: Icon, label, value }) => (
            <li key={label} className="bg-card p-4 rounded-lg shadow-sm flex items-center gap-4">
              <span className="about-fact__icon">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
                <span className="block font-semibold">{value}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutSection;
