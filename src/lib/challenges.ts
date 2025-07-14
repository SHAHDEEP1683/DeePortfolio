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
    level: 'easy',
    questionText: `public class Main {
  public static void main(String[] args) {
    int x = 5;
    int y = 10;
    int sum = x ___ y;
    System.out.println(sum); // prints 15
  }
}`,
    answer: '+',
  },
  {
    id: 3,
    level: 'medium',
    questionText: `public class Main {
  public static void main(String[] args) {
    String[] cars = {"Volvo", "BMW", "Ford"};
    for (String i : ___) {
      System.out.println(i);
    }
  }
}`,
    answer: 'cars',
  },
  {
    id: 4,
    level: 'medium',
    questionText: `public class Main {
  ___ void myMethod() {
    System.out.println("Method executed!");
  }
  
  public static void main(String[] args) {
    Main myObj = new Main();
    myObj.myMethod();
  }
}`,
    answer: 'static',
  },
  {
    id: 5,
    level: 'hard',
    questionText: `import java.util.ArrayList;
import java.util.stream.Collectors;

public class Main {
  public static void main(String[] args) {
    ArrayList<Integer> numbers = new ArrayList<>();
    numbers.add(1);
    numbers.add(2);
    numbers.add(3);
    
    List<Integer> doubled = numbers.stream()
      .map(n -> n * 2)
      .___   (Collectors.toList());
      
    System.out.println(doubled);
  }
}`,
    answer: 'collect',
  },
];
