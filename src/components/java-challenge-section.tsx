"use client";

import { useState } from 'react';
import { javaChallenges } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, RefreshCw, Code2 } from 'lucide-react';
import { Separator } from './ui/separator';

const JavaChallengeSection = () => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNextChallenge = () => {
    setCurrentChallengeIndex((prevIndex) => (prevIndex + 1) % javaChallenges.length);
    setShowAnswer(false);
  };

  const currentChallenge = javaChallenges[currentChallengeIndex];

  return (
    <section id="challenge" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <Code2 className="h-10 w-10" />
          Java Fun Challenge
        </h2>
        <p className="text-muted-foreground mt-2">Test your Java knowledge with these quick questions!</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="bg-card/50 dark:bg-card shadow-lg">
          <CardHeader>
            <CardTitle className="font-code text-lg text-primary">Question {currentChallengeIndex + 1}/{javaChallenges.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-code text-base whitespace-pre-wrap mb-6">{currentChallenge.question}</p>
            
            {showAnswer && (
              <div className="animate-in fade-in-50">
                <Separator className="my-4" />
                <h4 className="font-headline text-md font-semibold mb-2 text-accent">Answer:</h4>
                <p className="font-code text-base whitespace-pre-wrap text-muted-foreground">{currentChallenge.answer}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            {!showAnswer && (
              <Button variant="outline" onClick={() => setShowAnswer(true)}>
                <Lightbulb className="mr-2 h-4 w-4" /> Show Answer
              </Button>
            )}
            <Button onClick={handleNextChallenge}>
              <RefreshCw className="mr-2 h-4 w-4" /> Next Challenge
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default JavaChallengeSection;
