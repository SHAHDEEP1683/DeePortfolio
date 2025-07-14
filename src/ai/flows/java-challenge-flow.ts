'use server';

/**
 * @fileOverview A Java challenge generator AI agent.
 *
 * - generateJavaChallenge - A function that handles the Java challenge generation process.
 * - JavaChallengeOutput - The return type for the generateJavaChallenge function.
 */

import { initializeGenkit } from '@/ai/init';
import { z } from 'zod';

const ai = initializeGenkit();

const JavaChallengeOutputSchema = z.object({
  title: z.string().describe('The title of the Java challenge.'),
  description: z.string().describe('A brief description of the challenge and what needs to be done.'),
  codeSnippet: z.string().describe('A Java code snippet that contains a blank represented by "______" for the user to fill in.'),
  answer: z.string().describe('The correct string to fill in the blank.'),
});
export type JavaChallengeOutput = z.infer<typeof JavaChallengeOutputSchema>;

export async function generateJavaChallenge(): Promise<JavaChallengeOutput> {
  return generateJavaChallengeFlow();
}

const prompt = ai.definePrompt({
  name: 'javaChallengePrompt',
  output: { schema: JavaChallengeOutputSchema },
  prompt: `You are an expert Java programmer who creates educational programming challenges.

  Generate a random Java code challenge that involves filling in a blank. The challenge can be on any topic from basic syntax to more advanced concepts like data structures or algorithms.

  The code snippet you provide must contain exactly one blank, represented by "______".

  Provide a title for the challenge, a clear description of the task, the code snippet with the blank, and the correct answer that should replace the blank.
  `,
});

const generateJavaChallengeFlow = ai.defineFlow(
  {
    name: 'generateJavaChallengeFlow',
    outputSchema: JavaChallengeOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    return output!;
  }
);
