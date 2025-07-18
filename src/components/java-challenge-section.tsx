"use client";

import { useState, useEffect } from 'react';
import { java-challenges } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lightbulb, RefreshCw, Code2, CheckCircle, XCircle } from 'lucide-react';

const JavaChallengeSection = () => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const currentChallenge = javaChallenges[currentChallengeIndex];

  useEffect(() => {
    // Reset state when challenge changes
    setUserAnswer('');
    setFeedback(null);
    setShowHint(false);
  }, [currentChallengeIndex]);

  const handleNextChallenge = () => {
    setCurrentChallengeIndex((prevIndex) => (prevIndex + 1) % javaChallenges.length);
  };

  const handleCheckAnswer = () => {
    if (userAnswer.trim().toLowerCase() === currentChallenge.answer.toLowerCase()) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    setShowHint(true);
  };

  return (
    <section id="challenge" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <Code2 className="h-10 w-10" />
          Java Fun Challenge
        </h2>
        <p className="text-muted-foreground mt-2">Test your Java knowledge by filling in the blanks!</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="bg-card/50 dark:bg-card shadow-lg">
          <CardHeader>
            <CardTitle className="font-code text-lg text-primary">Question {currentChallengeIndex + 1}/{javaChallenges.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-code text-base whitespace-pre-wrap mb-6">{currentChallenge.question}</p>
            
            <div className="flex gap-2 items-center">
                <Input
                  placeholder="Your answer..."
                  className="font-code"
                  value={userAnswer}
                  onChange={(e) => {
                    setUserAnswer(e.target.value);
                    setFeedback(null);
                    setShowHint(false);
                  }}
                  disabled={feedback !== null}
                />
                <Button onClick={handleCheckAnswer} disabled={!userAnswer || feedback !== null}>
                    Check Answer
                </Button>
            </div>
            
            {feedback === 'correct' && (
                <div className="mt-4 flex items-center text-green-500">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    <p className="font-bold">Correct! Great job.</p>
                </div>
            )}
            {feedback === 'incorrect' && (
                <div className="mt-4 flex items-center text-red-500">
                    <XCircle className="mr-2 h-5 w-5" />
                    <p className="font-bold">Not quite. Try again or check the hint!</p>
                </div>
            )}

            {showHint && (
              <div className="animate-in fade-in-50 mt-6 bg-muted p-4 rounded-md">
                <h4 className="font-headline text-md font-semibold mb-2 text-accent">
                    The correct answer is:
                </h4>
                <p className="font-code text-lg font-bold text-primary">{currentChallenge.answer}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
             <Button variant="outline" onClick={() => setShowHint(true)} disabled={showHint}>
                <Lightbulb className="mr-2 h-4 w-4" /> 
                Show Answer
              </Button>
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
