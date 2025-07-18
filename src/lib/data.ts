
export const personalData = {
  name: "DEEP SHAH",
  role: "Java Backend Developer",
  titles: [
    "Java Backend Developer",
    "Microservice Learner",
    "Spring Boot Enthusiast",
    "REST API Architect"
  ],
  location: "Ahmedabad, India",
  email: "sd365601@gmail.com",
  github: "https://github.com/SHAHDEEP1683",
  linkedin: "https://www.linkedin.com/in/deep-shah-576756199/",
  phone: "+91 98986 69892",
  bio: "I'm a passionate Java Backend Developer specializing in building robust and scalable applications. I thrive on solving complex problems and continuously learning new technologies.",
};

export const skills = {
  coreTechnologies: ["Java", "Spring Boot", "SQL / RDBMS", "REST API", "Microservices"],
  frameworksAndLibraries: ["Hibernate / JPA", "Spring Security", "MapStruct"],
  developerTools: ["Git", "Docker", "Postman", "IntelliJ", "Maven", "SonarQube"],
  testing: ["JUnit", "Mockito"],
  otherSkills: ["Liquibase", "OpenAPI Spec", "MDC Logging", "JasperReport"],
};

export const projects = [
  {
    title: "Election Management System (New York State Based Election Process)",
    description: "A comprehensive system designed to manage the New York State election process, featuring secure logging and robust API endpoints.",
    tech: ["Spring Boot", "Rest APIs", "Spring Security", "MDC Logging", "MySQL"],
    link: "https://github.com/SHAHDEEP1683/Election-Management-System"
  },
  {
    title: "Movie Catalog Microservice Project",
    description: "A microservice-based video streaming application featuring an API Gateway for routing, Eureka for service discovery, a centralized Config Server, and Zipkin for distributed tracing.",
    tech: ["Spring Boot", "Microservices", "Spring Cloud Gateway", "Eureka", "Config Server", "Zipkin"],
    link: "https://github.com/SHAHDEEP1683"
  },
  {
    title: "Secure API with Spring Security",
    description: "An implementation of a secure REST API using Spring Security, featuring JWT-based authentication and role-based access control.",
    tech: ["Spring Boot", "Spring Security", "REST API", "JWT", "MySQL", "OAuth2"],
    link: "https://github.com/SHAHDEEP1683"
  },
  {
    title: "Centralized Logging with MDC",
    description: "Demonstrates traceable logging in a microservices environment using Mapped Diagnostic Context (MDC) to add unique request IDs to every log entry.",
    tech: ["Spring Boot", "MDC Logging", "Logback", "Microservices"],
    link: "https://github.com/SHAHDEEP1683"
  }
];

export const experience = [
    {
        company: "Innovatech Solutions Inc.",
        role: "Java Spring Boot Intern",
        duration: "Dec 2024 - May 2025",
        description: [
            "Developed and maintained RESTful APIs for various microservices using Spring Boot.",
            "Collaborated with cross-functional teams in an Agile/Scrum environment, participating in daily stand-ups and sprint planning.",
            "Wrote unit and integration tests to ensure code quality and reliability.",
            "Assisted in troubleshooting and debugging production issues, improving application stability."
        ],
    },
    {
        company: "BCM Corporation",
        role: "Data Entry Operator",
        duration: "Aug 2023 – Nov 2024",
        description: [
            "Utilized Microsoft Office suite for efficient business data entry, record-keeping, and report generation."
        ]
    }
];

export const education = [
  {
    degree: "Master of Computer Application",
    university: "SARDAR VALLABHBHAI GLOBAL UNIVERSITY",
    location: "CGPA: 7.3",
    duration: "2023 – 2025",
  },
  {
    degree: "Bachelor of Computer Application",
    university: "SAURASHTRA UNIVERSITY",
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
