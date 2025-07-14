"use client";

import { useState, useEffect } from 'react';
import { challenges } from '@/lib/challenges';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, CheckCircle, XCircle, Code, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';

const JavaChallengeSection = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect'; message: string } | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  
  const currentChallenge = challenges[currentQuestionIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showAnswer) {
      timer = setTimeout(() => {
        setShowAnswer(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showAnswer]);

  useEffect(() => {
    // Reset state when question changes
    setUserAnswer('');
    setFeedback(null);
    setShowAnswer(false);
  }, [currentQuestionIndex]);

  const handleCheckAnswer = () => {
    if (userAnswer.trim().toLowerCase() === currentChallenge.answer.toLowerCase()) {
      setFeedback({ type: 'correct', message: 'Correct! Well done.' });
    } else {
      setFeedback({ type: 'incorrect', message: "Not quite. Try again or use 'Show Answer'." });
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % challenges.length);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setFeedback(null);
  };

  const codeParts = currentChallenge.questionText.split('___');

  return (
    <section id="challenge" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <Code className="h-10 w-10" />
          Java Fun Challenge
        </h2>
        <p className="text-muted-foreground mt-2">Test your Java knowledge with these quick challenges.</p>
      </div>

      <Card className="max-w-4xl mx-auto bg-card/50 dark:bg-card shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex justify-between items-center">
            <span>Question {currentQuestionIndex + 1} of {challenges.length}</span>
            <span className="text-sm font-medium text-muted-foreground capitalize">{currentChallenge.level}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
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
