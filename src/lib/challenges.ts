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
    questionText: `// Check if a string is a palindrome
public class Palindrome {
  public static void main(String[] args) {
    String str = "madam", reversed = "";
    for (int i = str.length() - 1; i >= 0; i--) {
      reversed = reversed + str.charAt(i);
    }
    if (str.___ (reversed)) {
      System.out.println("Palindrome");
    }
  }
}`,
    answer: 'equals',
  },
  {
    id: 3,
    level: 'medium',
    questionText: `// Find the largest element in an array
public class LargestElement {
  public static void main(String[] args) {
    int[] arr = {25, 11, 7, 75, 56};
    int max = arr[0];
    for (int i = 1; i < arr.length; i++) {
      if (arr[i] > ___) {
        max = arr[i];
      }
    }
    System.out.println(max);
  }
}`,
    answer: 'max',
  },
  {
    id: 4,
    level: 'hard',
    questionText: `// Swap two numbers without a third variable
public class SwapNumbers {
  public static void main(String[] args) {
    int a = 10, b = 20;
    a = a + b;
    b = a - b;
    a = a - ___;
    System.out.println("a=" + a + ", b=" + b);
  }
}`,
    answer: 'b',
  },
  {
    id: 5,
    level: 'hard',
    questionText: `// Check if a number is prime
class PrimeCheck {
  static boolean isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i < n; i++) {
      if (n % i == 0) {
        return ___;
      }
    }
    return true;
  }
}`,
    answer: 'false',
  },
];
