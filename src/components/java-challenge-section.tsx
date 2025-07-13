
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getJavaChallenge } from "@/app/actions";
import { type JavaChallengeOutput } from "@/ai/flows/java-challenge-flow";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "./ui/skeleton";
import { RefreshCw, Check, Code, Eye } from "lucide-react";

const JavaChallengeSection = () => {
  const [challenge, setChallenge] = useState<JavaChallengeOutput | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [revealedAnswer, setRevealedAnswer] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchChallenge = async () => {
    setIsLoading(true);
    setChallenge(null);
    setUserAnswer("");
    setRevealedAnswer(null);
    try {
      const newChallenge = await getJavaChallenge();
      setChallenge(newChallenge);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load a new challenge. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenge();
  }, []);

  const checkAnswer = () => {
    if (!challenge) return;
    if (userAnswer.trim().toLowerCase() === challenge.answer.trim().toLowerCase()) {
      toast({
        title: "Correct!",
        description: "Great job! You solved the challenge.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect",
        description: "That's not quite right. Give it another try!",
      });
    }
  };

  const showAnswer = () => {
    if (!challenge) return;
    setRevealedAnswer(challenge.answer);
    setTimeout(() => {
      setRevealedAnswer(null);
    }, 5000);
  };


  const renderCodeSnippet = () => {
    if (!challenge) return null;
    const parts = challenge.codeSnippet.split("______");
    return (
      <pre className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap font-code">
        <code>
          {parts[0]}
          <Input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="inline-block w-32 h-7 mx-1 px-1 border-b-2 border-primary bg-transparent focus:ring-0 focus:outline-none"
            placeholder="Fill me in"
          />
          {parts[1]}
        </code>
      </pre>
    );
  };
  
  return (
    <section id="challenge" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
            <Code className="h-10 w-10 text-accent" />
            Java Challenge
        </h2>
        <p className="text-muted-foreground mt-2">Test your knowledge by filling in the blanks to complete the code snippet.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="bg-card/50 dark:bg-card">
          <CardHeader>
            {isLoading || !challenge ? (
              <>
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-5 w-full mt-2" />
                <Skeleton className="h-5 w-3/4" />
              </>
            ) : (
              <>
                <CardTitle className="font-headline text-2xl">{challenge.title}</CardTitle>
                <CardDescription>{challenge.description}</CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            {isLoading || !challenge ? (
                <div className="space-y-2">
                    <Skeleton className="h-40 w-full" />
                </div>
            ) : (
                renderCodeSnippet()
            )}
            <div className="mt-4 min-h-[2rem] text-center">
              {revealedAnswer && (
                <p className="text-accent font-bold animate-pulse">
                  Correct Answer: {revealedAnswer}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-4 mt-2">
              <Button variant="outline" onClick={fetchChallenge} disabled={isLoading}>
                <RefreshCw className="mr-2" />
                New Challenge
              </Button>
               <Button variant="secondary" onClick={showAnswer} disabled={!challenge || isLoading || !!revealedAnswer}>
                <Eye className="mr-2" />
                Show Answer
              </Button>
              <Button onClick={checkAnswer} disabled={!challenge || isLoading}>
                <Check className="mr-2" />
                Check Answer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default JavaChallengeSection;
