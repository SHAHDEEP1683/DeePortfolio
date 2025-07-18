/**
 * @fileOverview A Java challenge generator AI agent.
 *
 * - generateJavaChallengeFlow - A function that generates a Java code challenge.
 */
import { ai } from '@/ai/genkit';
import { JavaChallengeInputSchema, JavaChallengeOutputSchema } from '@/ai/types';


const prompt = ai.definePrompt({
  name: 'javaChallengePrompt',
  input: { schema: JavaChallengeInputSchema },
  output: { schema: JavaChallengeOutputSchema },
  prompt: `You are an expert Java programmer who creates educational code challenges. 
  
  Generate a single, unique Java code challenge based on the requested difficulty level: {{{level}}}.
  
  The challenge should be a small, self-contained Java code snippet.
  
  Crucially, the code must contain exactly one blank space represented by '___' where the user needs to fill in the correct answer.
  
  Provide the correct word or code fragment that fits in the blank as the 'answer'. The answer should be a single word or a very short expression.
  
  Do not repeat challenges. Make them interesting and relevant to core Java concepts.
  
  Example output for level 'easy':
  {
    "questionText": "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, ___!\");\n  }\n}",
    "answer": "World"
  }
  `,
});

export const generateJavaChallengeFlow = ai.defineFlow(
  {
    name: 'generateJavaChallengeFlow',
    inputSchema: JavaChallengeInputSchema,
    outputSchema: JavaChallengeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    // The AI might return an answer with quotes, so we strip them.
    const cleanedAnswer = output!.answer.replace(/["'`]/g, '');
    return { ...output!, answer: cleanedAnswer };
  }
);
