
export const personalData = {
  name: "DEEP SHAH",
  role: "Software Engineer",
  titles: [
    "Software Engineer",
    "Java Developer",
    "Spring Boot Enthusiast",
    "AWS"
  ],
  location: "Amreli, Gujarat, India",
  email: "shahdeep.1683@gmail.com",
  github: "https://github.com/SHAHDEEP1683",
  linkedin: "https://linkedin.com/in/deepshah-java-developer",
  phone: "+91 98986 69892",
  bio: "I'm a passionate Software Engineer specializing in Java, Spring Boot, and AWS. I design and build secure, scalable, and high-performance backend systems.",
};

/**
 * Tech Stack, grouped. Every earlier skill is kept; additions come from the Projects and
 * Experience entries below (Spring MVC, Spring Data JPA, REST APIs, AWS services, ...).
 * `icon` is a key the Skills section maps to an icon.
 */
export const skillGroups = [
  { title: "Languages & Core", icon: "code", skills: ["Java", "SQL", "Microservices", "Event-Driven Architecture", "Authentication & Authorization"] },
  { title: "Spring Ecosystem", icon: "leaf", skills: ["Spring Boot", "Spring Security", "Spring MVC", "Spring Data JPA", "Hibernate - JPA", "Maven"] },
  { title: "APIs & Integrations", icon: "plug", skills: ["REST APIs", "OpenAPI Spec", "Swagger", "Postman", "Payment & Banking APIs"] },
  { title: "Databases", icon: "database", skills: ["PostgreSQL", "MySQL", "MongoDB", "Liquibase/Flyway"] },
  { title: "Messaging & Caching", icon: "workflow", skills: ["Apache Kafka", "RabbitMQ", "Redis"] },
  { title: "Cloud & DevOps", icon: "cloud", skills: ["AWS", "AWS EC2", "AWS RDS", "AWS S3", "AWS SES", "Amazon MQ", "AWS ALB", "Terraform", "Docker", "Kubernetes", "Argo CD", "GitHub Actions", "Git CI/CD"] },
  { title: "Testing & Quality", icon: "beaker", skills: ["JUnit", "Mockito", "Spring Boot Test", "SonarQube"] },
  { title: "Tools", icon: "wrench", skills: ["Git", "GitHub", "IntelliJ IDEA", "VS Code", "DBeaver", "Claude Code", "JasperReport"] },
];

const group = (title: string) => skillGroups.find((g) => g.title === title)?.skills ?? [];

/** Older flat view of the same skills (the terminal's `skills` command reads this). */
export const skills = {
  coreTechnologies: group("Languages & Core"),
  frameworksAndLibraries: group("Spring Ecosystem"),
  developerTools: group("Cloud & DevOps"),
  testing: group("Testing & Quality"),
  otherSkills: [...group("APIs & Integrations"), ...group("Databases"), ...group("Messaging & Caching"), ...group("Tools")],
};

export const projects = [
  {
    title: "Fixie – On-Demand Home Services Platform",
    description: "Developed and maintained backend services for Fixie, an on-demand home services platform. Built scalable, secure, and high-performance REST APIs to support booking lifecycle, payment processing, and provider management.",
    tech: ["Java", "Spring Boot", "Spring Security", "PostgreSQL", "Redis", "RabbitMQ", "AWS", "Terraform"],
    link: "https://github.com/SHAHDEEP1683"
  },
  {
    title: "Digi-Biometric – Examination Biometric Verification System",
    description: "Developed backend services for DigiBiometric, a biometric verification platform used at examination centres to authenticate candidates and streamline attendance and verification processes.",
    tech: ["Java", "Spring Boot", "REST APIs", "Authentication", "S3 Pre-signed URLs", "AWS"],
    link: "https://github.com/SHAHDEEP1683"
  },
  {
    title: "OSM – On-Screen Marking System",
    description: "Built backend services for an On-Screen Marking platform where examiners evaluate scanned answer sheets digitally. Added an AI assistant that helps examiners review and mark answers faster, and AI proctoring that monitors online exams for face presence and tab switching.",
    tech: ["Java", "Spring Boot", "REST APIs", "AI Assistant", "AI Proctoring", "AWS"],
    link: "https://github.com/SHAHDEEP1683"
  },
  {
    title: "Election Management System (New York State Based)",
    description: "Designed and developed an Election Management System based on the New York State election process, featuring voter registration, profile management, and election-related workflows.",
    tech: ["Java", "Spring Boot", "Spring Data JPA", "Hibernate", "REST APIs"],
    link: "https://github.com/SHAHDEEP1683/Election-Management-System"
  }
];

export const experience = [
  {
    company: "Techxplore IT Solutions Pvt. Ltd.",
    role: "Software Engineer",
    duration: "Aug 2025 – Present",
    description: [
      "Designed and developed RESTful APIs and core backend functionalities for customer and provider registration, discovery, booking, pricing, and real-time tracking.",
      "Implemented provider payment, withdrawal request, and payout management by integrating banking APIs.",
      "Designed and implemented event-driven order management and payment workflows using RabbitMQ.",
      "Built secure, scalable, and maintainable backend services using Spring Security, PostgreSQL, and Redis.",
      "Deployed and managed end-to-end applications on AWS via Terraform (EC2, RDS, MQ, SES, ALB)."
    ],
  },
  {
    company: "BrightPeers Technology Solution Pvt. Ltd.",
    role: "Java Intern",
    duration: "Dec 2024 – May 2025",
    description: [
      "Gained hands-on experience with the complete Spring and Spring Boot ecosystem (IoC, MVC, Data JPA, Security, Hibernate).",
      "Developed and maintained voter-side functionalities including voter registration and profile management.",
      "Designed and integrated REST APIs using Java and Spring Boot for application modules."
    ]
  }
];

export const education = [
  {
    degree: "Master of Computer Application",
    university: "Sardar Vallabhbhai Global University, Ahmedabad",
    location: "CGPA: 6.9",
    duration: "2023 – 2025",
  },
  {
    degree: "Bachelor of Computer Application",
    university: "Saurashtra University",
    location: "CGPA: 7",
    duration: "2020 – 2023",
  },
];

export const javaChallenges = [
  // --- MCQ ---
  {
    type: "mcq",
    question: "Which of the following is NOT a primitive data type in Java?",
    options: ["int", "String", "boolean", "char"],
    answer: "String"
  },
  {
    type: "mcq",
    question: "What is the purpose of the `super` keyword in Java?",
    options: ["To call the constructor of the superclass", "To access members of the superclass", "To refer to the current object instance", "Both A and B"],
    answer: "Both A and B"
  },
  {
    type: "mcq",
    question: "Which collection class allows unique elements and is unordered?",
    options: ["ArrayList", "HashMap", "HashSet", "LinkedList"],
    answer: "HashSet"
  },
  // --- Fill-in-the-blank ---
  {
    type: "fill-in-the-blank",
    question: "The `____` keyword is used in Java to prevent a class from being inherited or a method from being overridden.",
    answer: "final"
  },
  {
    type: "fill-in-the-blank",
    question: "In Java, the `____` operator compares object references, not the actual string content.",
    answer: "=="
  },
  {
    type: "fill-in-the-blank",
    question: "The `@____` annotation is used in Spring Boot for automatic dependency injection.",
    answer: "Autowired"
  },
  // --- Problem Solving (Fill-in-the-blank style) ---
  {
    type: "problem",
    question: `
public boolean isPalindrome(String str) {
  String reversed = new StringBuilder(str).____.toString();
  return str.equals(reversed);
}`,
    answer: "reverse()"
  },
  {
    type: "problem",
    question: `
// Find the largest element in an array
public int findLargest(int[] arr) {
  int max = arr[0];
  for (int i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      ____ = arr[i];
    }
  }
  return max;
}`,
    answer: "max"
  },
  {
    type: "problem",
    question: `
// Count vowels in a string
public int countVowels(String str) {
  int count = 0;
  String vowels = "aeiou";
  for (char c : str.toLowerCase().toCharArray()) {
    if (vowels.____(c) != -1) {
      count++;
    }
  }
  return count;
}`,
    answer: "indexOf"
  }
];
