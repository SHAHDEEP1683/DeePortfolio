"use client";

import { useState, useEffect } from 'react';
import { javaChallenges } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Lightbulb, RefreshCw, Code2, CheckCircle, XCircle } from 'lucide-react';
import { Separator } from './ui/separator';

const JavaChallengeSection = () => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userCode, setUserCode] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const currentChallenge = javaChallenges[currentChallengeIndex];

  useEffect(() => {
    // Reset state when challenge changes
    setShowAnswer(false);
    setSelectedOption(null);
    setUserCode('');
    setFeedback(null);
  }, [currentChallengeIndex]);

  const handleNextChallenge = () => {
    setCurrentChallengeIndex((prevIndex) => (prevIndex + 1) % javaChallenges.length);
  };

  const handleShowAnswer = () => {
    if (currentChallenge.type === 'mcq' && selectedOption !== null) {
      if (selectedOption === currentChallenge.correctAnswerIndex) {
        setFeedback('correct');
      } else {
        setFeedback('incorrect');
      }
    }
    setShowAnswer(true);
  };
  
  const handleOptionChange = (value: string) => {
    setSelectedOption(parseInt(value, 10));
    setFeedback(null); 
    setShowAnswer(false);
  };

  return (
    <section id="challenge" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <Code2 className="h-10 w-10" />
          Java Fun Challenge
        </h2>
        <p className="text-muted-foreground mt-2">Test your Java knowledge with these interactive questions!</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="bg-card/50 dark:bg-card shadow-lg">
          <CardHeader>
            <CardTitle className="font-code text-lg text-primary">Question {currentChallengeIndex + 1}/{javaChallenges.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-code text-base whitespace-pre-wrap mb-6">{currentChallenge.question}</p>
            
            {currentChallenge.type === 'mcq' && (
              <RadioGroup onValueChange={handleOptionChange} value={selectedOption?.toString()} className="space-y-2">
                {currentChallenge.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={showAnswer} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                      {showAnswer && feedback === 'correct' && selectedOption === index && <CheckCircle className="inline-block ml-2 h-5 w-5 text-green-500" />}
                      {showAnswer && feedback === 'incorrect' && selectedOption === index && <XCircle className="inline-block ml-2 h-5 w-5 text-red-500" />}
                      {showAnswer && index === currentChallenge.correctAnswerIndex && <span className="text-green-500 font-bold"> (Correct)</span>}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {currentChallenge.type === 'problem' && (
              <Textarea
                placeholder="Enter your Java code here..."
                className="font-code resize-y min-h-[150px]"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                disabled={showAnswer}
              />
            )}
            
            {showAnswer && (
              <div className="animate-in fade-in-50 mt-6">
                <Separator className="my-4" />
                <h4 className="font-headline text-md font-semibold mb-2 text-accent">
                    {currentChallenge.type === 'mcq' ? 'Explanation:' : 'Solution:'}
                </h4>
                <pre className="font-code text-sm whitespace-pre-wrap bg-muted p-4 rounded-md overflow-x-auto text-muted-foreground">
                    <code>
                        {currentChallenge.type === 'mcq' ? currentChallenge.answer : currentChallenge.solution}
                    </code>
                </pre>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            {!showAnswer && (
              <Button variant="outline" onClick={handleShowAnswer} disabled={currentChallenge.type === 'mcq' && selectedOption === null}>
                <Lightbulb className="mr-2 h-4 w-4" /> 
                {currentChallenge.type === 'mcq' ? 'Check Answer' : 'Show Solution'}
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
