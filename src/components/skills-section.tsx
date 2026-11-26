"use client";

import { useEffect, useState } from "react";
import { skillGroups } from "@/lib/data";
import {
  Archive, Beaker, Boxes, Cloud, Code, Cpu, CreditCard, Database, FileText, GitMerge, Globe, Leaf, Mail,
  MessagesSquare, Plug, Server, ShieldCheck, Split, Workflow, Wrench, Zap, type LucideIcon,
} from "lucide-react";

const GROUP_ICONS: Record<string, LucideIcon> = {
  code: Code, leaf: Leaf, plug: Plug, database: Database, workflow: Workflow, cloud: Cloud, beaker: Beaker, wrench: Wrench,
};

/** Brand logos (Devicon, open-source SVGs served from jsDelivr). */
const DEVICON = (p: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${p}.svg`;
const LOGOS: Record<string, string> = {
  "Java": "java/java-original",
  "Spring Boot": "spring/spring-original",
  "Spring Security": "spring/spring-original",
  "Spring MVC": "spring/spring-original",
  "Spring Data JPA": "spring/spring-original",
  "Spring Boot Test": "spring/spring-original",
  "Hibernate - JPA": "hibernate/hibernate-original",
  "Maven": "maven/maven-original",
  "OpenAPI Spec": "openapi/openapi-original",
  "Swagger": "swagger/swagger-original",
  "Postman": "postman/postman-original",
  "PostgreSQL": "postgresql/postgresql-original",
  "MySQL": "mysql/mysql-original",
  "MongoDB": "mongodb/mongodb-original",
  "Liquibase/Flyway": "liquibase/liquibase-original",
  "Apache Kafka": "apachekafka/apachekafka-original",
  "RabbitMQ": "rabbitmq/rabbitmq-original",
  "Redis": "redis/redis-original",
  "AWS": "amazonwebservices/amazonwebservices-original",
  "Terraform": "terraform/terraform-original",
  "Docker": "docker/docker-original",
  "Kubernetes": "kubernetes/kubernetes-original",
  "Argo CD": "argocd/argocd-original",
  "GitHub Actions": "githubactions/githubactions-original",
  "JUnit": "junit/junit-original",
  "SonarQube": "sonarqube/sonarqube-original",
  "Git": "git/git-original",
  "GitHub": "github/github-original",
  "IntelliJ IDEA": "intellij/intellij-original",
  "VS Code": "vscode/vscode-original",
  "DBeaver": "dbeaver/dbeaver-original",
  "Claude Code": "claude/claude-original",
};

/** Outline icons for skills that have no brand logo. */
const OUTLINE: Record<string, LucideIcon> = {
  "SQL": Database,
  "Microservices": Boxes,
  "Event-Driven Architecture": Zap,
  "Authentication & Authorization": ShieldCheck,
  "REST APIs": Globe,
  "Payment & Banking APIs": CreditCard,
  "AWS EC2": Server,
  "AWS RDS": Database,
  "AWS S3": Archive,
  "AWS SES": Mail,
  "Amazon MQ": MessagesSquare,
  "AWS ALB": Split,
  "Git CI/CD": GitMerge,
  "JasperReport": FileText,
};

function SkillMark({ skill }: { skill: string }) {
  const logo = LOGOS[skill];
  if (logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={DEVICON(logo)} alt="" width={14} height={14} loading="lazy" decoding="async" />;
  }
  const Icon = OUTLINE[skill] ?? Code;
  return <Icon strokeWidth={2.2} aria-hidden="true" />;
}

/** 1 column on phones, 2 on tablets, 3 on desktop (same breakpoints as before). */
function useColumnCount() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const update = () => setCols(lg.matches ? 3 : md.matches ? 2 : 1);
    update();
    md.addEventListener("change", update);
    lg.addEventListener("change", update);
    return () => {
      md.removeEventListener("change", update);
      lg.removeEventListener("change", update);
    };
  }, []);
  return cols;
}

const SkillsSection = () => {
  const cols = useColumnCount();
  const columns = Array.from({ length: cols }, (_, c) =>
    skillGroups.map((group, i) => ({ group, i })).filter(({ i }) => i % cols === c),
  );

  return (
    <section id="skills" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <Cpu className="h-10 w-10" />
          My Tech Stack
        </h2>
        <p className="mt-3 text-muted-foreground">
          What I use to build and ship Java backends.
        </p>
      </div>

      {/* cards keep the left-to-right order (card i goes to column i % cols) and stack
          straight under each other, so there are no gaps */}
      <div className="skills-cols" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {columns.map((column, c) => (
          <div key={c} className="skills-col">
            {column.map(({ group, i }) => {
          const Icon = GROUP_ICONS[group.icon] ?? Code;
          return (
            <div key={group.title} className={`skill-card bg-card p-5 rounded-lg shadow-sm ${i % 2 ? "skill-card--b" : "skill-card--a"}${i % 3 === 2 ? " skill-card--mint" : ""}`}>
              <h3 className="font-headline text-lg font-semibold mb-3 flex items-center gap-2.5">
                <Icon className="h-5 w-5" />
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2" aria-label={group.title}>
                {group.skills.map((skill) => (
                  <li key={skill} className="skill-chip bg-secondary text-secondary-foreground">
                    <span className="skill-chip__mark">
                      <SkillMark skill={skill} />
                    </span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
