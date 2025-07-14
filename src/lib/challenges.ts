export type Challenge = {
  id: number;
  level: 'easy' | 'medium' | 'hard';
  questionText: string;
  answer: string;
};

export const challenges: Challenge[] = [
  {
    id: 1,
    level: 'easy',
    questionText: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, ___!");
  }
}`,
    answer: 'World',
  },
  {
    id: 2,
    level: 'medium',
    questionText: `import java.util.ArrayList;

public class Main {
  public static void main(String[] args) {
    ArrayList<String> cars = new ArrayList<String>();
    cars.add("Volvo");
    cars.add("BMW");
    cars.add("Ford");
    cars.___("Mazda");
    System.out.println(cars);
  }
}`,
    answer: 'add',
  },
  {
    id: 3,
    level: 'medium',
    questionText: `public class Main {
  static void myMethod(String fname) {
    System.out.println(fname + " Refsnes");
  }

  public static void main(String[] args) {
    myMethod("Liam");
    myMethod("Jenny");
    myMethod(___);
  }
}`,
    answer: '"Anja"',
  },
  {
    id: 4,
    level: 'hard',
    questionText: `interface Animal {
  public void animalSound();
  public void sleep();
}

class Pig ___ Animal {
  public void animalSound() {
    System.out.println("The pig says: wee wee");
  }
  public void sleep() {
    System.out.println("Zzz");
  }
}`,
    answer: 'implements',
  },
  {
    id: 5,
    level: 'hard',
    questionText: `import java.util.HashMap;

public class Main {
  public static void main(String[] args) {
    HashMap<String, String> capitalCities = new HashMap<String, String>();
    capitalCities.put("England", "London");
    capitalCities.put("Germany", "Berlin");
    
    System.out.println(capitalCities.___("England"));
  }
}`,
    answer: 'get',
  },
];
