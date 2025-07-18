

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
    type: 'mcq',
    question: "What is the difference between `==` and `.equals()` when comparing Strings in Java?",
    options: [
      "`==` compares object references, `.equals()` compares string values.",
      "`.equals()` compares object references, `==` compares string values.",
      "They are identical in function.",
      "Both compare only object references."
    ],
    answer: "`==` operator checks if two references point to the same object in memory. The `.equals()` method, when used with Strings, checks if the two strings have the same sequence of characters (i.e., the same value).",
    correctAnswerIndex: 0,
  },
  {
    type: 'mcq',
    question: "Which of these keywords is used to prevent a class from being extended?",
    options: ["static", "final", "private", "abstract"],
    answer: "A `final` class cannot be extended (inherited from).",
    correctAnswerIndex: 1
  },
  {
    type: 'problem',
    question: "Write a Java function to check if a string is a palindrome. Your function should ignore case and non-alphanumeric characters.",
    solution: `public static boolean isPalindrome(String str) {
    if (str == null) {
        return false;
    }
    String cleaned = str.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    int left = 0;
    int right = cleaned.length() - 1;
    while (left < right) {
        if (cleaned.charAt(left) != cleaned.charAt(right)) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}`
  },
  {
    type: 'mcq',
    question: "What will be the output of the following code?\n\nString s1 = \"hello\";\nString s2 = new String(\"hello\");\nSystem.out.println(s1 == s2);",
    options: ["true", "false", "Compilation Error", "Runtime Exception"],
    answer: "The output will be `false`. `s1` refers to a string in the string pool. `s2` is a new object created in the heap memory. Since they are different objects in memory, `==` returns false.",
    correctAnswerIndex: 1
  },
  {
    type: 'problem',
    question: "Write a Java function that finds the largest element in an integer array.",
    solution: `public static int findLargest(int[] arr) {
    if (arr == null || arr.length == 0) {
        throw new IllegalArgumentException("Array must not be empty or null");
    }
    int largest = arr[0];
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] > largest) {
            largest = arr[i];
        }
    }
    return largest;
}`
  },
  {
    type: 'mcq',
    question: "What is the purpose of the `@Autowired` annotation in Spring Boot?",
    options: [
        "To define a new bean.",
        "For automatic dependency injection.",
        "To specify a component's scope.",
        "To handle web requests."
    ],
    answer: "The `@Autowired` annotation is used for automatic dependency injection. It allows Spring to resolve and inject collaborating beans into your bean.",
    correctAnswerIndex: 1
  }
];
