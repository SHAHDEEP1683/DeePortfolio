"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, CheckCircle, XCircle, ArrowRight, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';

type JavaChallenge = {
  questionText: string;
  answer: string;
};

const predefinedChallenges: JavaChallenge[] = [
    {
        questionText: 'public class Main {\n  public static void main(String[] args) {\n    int x = 5;\n    ___ (x > 0) {\n      System.out.println(x);\n      x--;\n    }\n  }\n}',
        answer: 'while',
    },
    {
        questionText: 'public class Main {\n  public static void main(String[] args) {\n    String[] cars = {"Volvo", "BMW", "Ford"};\n    for (String i : ___) {\n      System.out.println(i);\n    }\n  }\n}',
        answer: 'cars',
    },
    {
        questionText: 'class Vehicle {\n  protected String brand = "Ford";\n  public void honk() {\n    System.out.println("Tuut, tuut!");\n  }\n}\n\nclass Car ___ Vehicle {\n  private String modelName = "Mustang";\n}',
        answer: 'extends',
    },
    {
        questionText: 'import java.util.ArrayList;\n\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<String> cars = new ArrayList<String>();\n    cars.add("Volvo");\n    cars.add("BMW");\n    cars.add("Ford");\n    System.out.println(cars.___());\n  }\n}',
        answer: 'size',
    },
    {
        questionText: 'public class Main {\n  public ___ void myMethod() {\n    System.out.println("I just got executed!");\n  }\n\n  public static void main(String[] args) {\n    Main myObj = new Main();\n    myObj.myMethod();\n  }\n}',
        answer: 'void',
    },
    {
        questionText: 'public class Main {\n  ___ int x = 5;\n  static final double PI = 3.14;\n}',
        answer: 'final',
    },
];


const JavaChallengeSection = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect'; message: string } | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentChallenge = predefinedChallenges[questionIndex];

  useEffect(() => {
    setUserAnswer('');
    setFeedback(null);
    setShowAnswer(false);
  }, [questionIndex]);


  const handleCheckAnswer = () => {
    if (!currentChallenge) return;
    if (userAnswer.trim().toLowerCase() === currentChallenge.answer.toLowerCase()) {
      setFeedback({ type: 'correct', message: 'Correct! Well done.' });
    } else {
      setFeedback({ type: 'incorrect', message: "Not quite. Try again or use 'Show Answer'." });
    }
  };

  const handleNextQuestion = () => {
    setQuestionIndex((prev) => (prev + 1) % predefinedChallenges.length);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setFeedback(null);
  };
  
  const codeParts = currentChallenge?.questionText.split('___') ?? ['', ''];

  return (
    <section id="challenge" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <Wand2 className="h-10 w-10" />
          Java Fun Challenge
        </h2>
        <p className="text-muted-foreground mt-2">Test your Java knowledge with these quick challenges.</p>
      </div>

      <Card className="max-w-4xl mx-auto bg-card/50 dark:bg-card shadow-lg min-h-[30rem] flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex justify-between items-center">
            <span>Question {questionIndex + 1} of {predefinedChallenges.length}</span>
            <span className="text-sm font-medium text-muted-foreground capitalize">medium</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-center">
          <div className="bg-[#282c34] p-6 rounded-lg font-code text-white text-lg mb-6">
            <pre>
              <code>
                {codeParts[0]}
                <Input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="_____"
                  className={cn(
                    'inline-block w-28 h-8 mx-1 p-1 text-center bg-gray-700 border-gray-500 rounded text-white focus:ring-accent focus:border-accent',
                    feedback?.type === 'correct' && 'border-green-500',
                    feedback?.type === 'incorrect' && 'border-red-500'
                  )}
                  aria-label="Answer input"
                />
                {codeParts[1]}
              </code>
            </pre>
          </div>
          
          {feedback && (
            <Alert variant={feedback.type === 'correct' ? 'default' : 'destructive'} className={cn('mb-4', feedback.type === 'correct' ? 'bg-green-500/10 border-green-500/50' : 'bg-red-500/10')}>
              {feedback.type === 'correct' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              <AlertTitle>{feedback.type === 'correct' ? 'Success!' : 'Oops!'}</AlertTitle>
              <AlertDescription>{feedback.message}</AlertDescription>
            </Alert>
          )}

          {showAnswer && (
            <Alert className="mb-4 bg-blue-500/10 border-blue-500/50">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>The correct answer is:</AlertTitle>
                <AlertDescription className="font-code font-bold text-lg">{currentChallenge.answer}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-wrap gap-4 justify-center">
            <Button onClick={handleCheckAnswer} disabled={!userAnswer}>
                Check Answer
            </Button>
            <Button variant="secondary" onClick={handleShowAnswer}>
                <Lightbulb className="mr-2 h-4 w-4" />
                Show Answer
            </Button>
            <Button variant="outline" onClick={handleNextQuestion}>
                Next Question
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default JavaChallengeSection;
