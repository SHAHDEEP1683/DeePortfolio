import { personalData, experience, education } from "@/lib/data";
import { ArrowUpRight, Briefcase, GraduationCap, MapPin, Target, UserRound, Github, Linkedin, Instagram } from "lucide-react";

/** About: a short story plus quick facts, all taken from data.ts. Uses the shared card/heading
 *  classes so it follows both the dark design and the light (paper) theme. */
const AboutSection = () => {
  const current = experience[0];
  const intern = experience[1];
  const degree = education[0];
  const companyUrl = "url" in current ? current.url : undefined;
  const companyName = current.company.replace(" Pvt. Ltd.", "");

  const facts = [
    { icon: Briefcase, label: "Now", value: `${current.role} at ${companyName}`, href: companyUrl },
    { icon: Target, label: "Focus", value: "Java · Spring Boot · AWS", href: undefined },
    { icon: GraduationCap, label: "Education", value: `${degree.degree} (${degree.duration.split("–").pop()?.trim()})`, href: undefined },
    { icon: MapPin, label: "Based in", value: personalData.location, href: "https://en.wikipedia.org/wiki/Amreli" },
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
            I’m <strong>Deep Shah</strong>, a <strong>{current.role}</strong> at{" "}
            <strong>
              {companyUrl ? (
                <a href={companyUrl} target="_blank" rel="noopener noreferrer" className="company-link">{companyName}</a>
              ) : (
                companyName
              )}
            </strong>,
            specializing in Java, Spring Boot, REST API development, event-driven architectures, and AWS deployments
            using Terraform. I focus on building scalable, reliable backend systems and seamless payment and booking
            workflows.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            I started out as a Java intern at {intern.company.replace(" Pvt. Ltd.", "")}, getting hands-on across the
            Spring ecosystem.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="about-link">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className="about-link">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a href={personalData.instagram} target="_blank" rel="noopener noreferrer" className="about-link">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>

        <ul className="about-facts grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:col-span-2">
          {facts.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <>
                <span className="about-fact__icon">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
                  <span className="about-fact__value block font-semibold">{value}</span>
                  {href && <span className="about-fact__host">{new URL(href).hostname.replace(/^www\.|^en\./, "")} ↗</span>}
                </span>
                {href && <ArrowUpRight className="about-fact__arrow h-5 w-5" aria-hidden="true" />}
              </>
            );
            return (
              <li key={label} className={`bg-card rounded-lg shadow-sm ${href ? "about-fact--link" : "p-4 flex items-center gap-4"}`}>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="about-fact__a" title={`Open ${new URL(href).hostname}`}>
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default AboutSection;
