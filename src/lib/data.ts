

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
    title: "Election Management System",
    description: "A comprehensive system for managing elections. Features include CRUD operations for voters and officers, secure logging with MDC, and detailed reporting using JasperReports.",
    tech: ["Java", "Spring Boot", "React", "MySQL", "MongoDB"],
    link: "https://github.com/SHAHDEEP1683/Election-Management-System"
  },
  {
    title: "Tours & Travel Management System",
    description: "A backend system for a travel agency to manage tour packages, customer bookings, itineraries, and user accounts.",
    tech: ["Spring Boot", "MySQL"],
    link: "https://github.com/SHAHDEEP1683/Tours-and-Travels-Management-System"
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
    degree: "Bachelor of Engineering in Information Technology",
    university: "LDRP Institute of Technology and Research",
    location: "Gandhinagar, India",
    duration: "2021 – 2025",
  }
];

export const javaChallenges = [
  {
    question: "What is the difference between `==` and `.equals()` when comparing Strings in Java?",
    answer: "The `==` operator checks if two references point to the same object in memory. The `.equals()` method, when used with Strings, checks if the two strings have the same sequence of characters (i.e., the same value)."
  },
  {
    question: "Can you explain the 'final' keyword in Java and its uses?",
    answer: "The `final` keyword can be used with variables, methods, and classes.\n- A final variable's value cannot be changed.\n- A final method cannot be overridden by subclasses.\n- A final class cannot be extended (inherited from)."
  },
  {
    question: "What is method overloading and method overriding in Java?",
    answer: "Overloading: Occurs when two or more methods in the same class have the same name but different parameters (number or type).\nOverriding: Occurs when a subclass has a method with the same name, parameters, and return type as a method in its superclass. It provides a specific implementation for the method."
  },
  {
    question: "What will be the output of the following code?\n\nString s1 = \"hello\";\nString s2 = new String(\"hello\");\nSystem.out.println(s1 == s2);",
    answer: "The output will be `false`. `s1` refers to a string in the string pool. `s2` is a new object created in the heap memory. Since they are different objects in memory, `==` returns false."
  },
  {
    question: "What is a `static` method in Java?",
    answer: "A static method belongs to the class itself rather than an instance of the class. It can be called without creating an object of the class (e.g., `ClassName.staticMethod()`). It cannot access instance variables or instance methods directly."
  },
  {
    question: "What is the purpose of the `@Autowired` annotation in Spring Boot?",
    answer: "The `@Autowired` annotation is used for automatic dependency injection. It allows Spring to resolve and inject collaborating beans into your bean. It can be used on constructors, fields, and setter methods."
  }
];
