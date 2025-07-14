'use server';

/**
 * @fileOverview A coding tip generator AI agent.
 * 
 * - generateCodingTip - A function that generates a coding tip.
 * - CodingTipInput - The input type for the generateCodingTip function.
 * - CodingTipOutput - The return type for the generateCodingTip function.
 */

import { ai } from '@/ai/config';
import {z} from 'genkit';

const CodingTipInputSchema = z.object({
  request: z.string().optional().describe('The user request for a coding tip.'),
});
export type CodingTipInput = z.infer<typeof CodingTipInputSchema>;

const CodingTipOutputSchema = z.object({
  tip: z.string().describe('A coding tip or quote.'),
});
export type CodingTipOutput = z.infer<typeof CodingTipOutputSchema>;

export async function generateCodingTip(input: CodingTipInput): Promise<CodingTipOutput> {
  return codingTipGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codingTipPrompt',
  input: {schema: CodingTipInputSchema},
  output: {schema: CodingTipOutputSchema},
  prompt: `You are a helpful coding assistant that provides coding tips and quotes.

  Generate a random coding tip or quote to inspire the user.

  Request: {{{request}}}
  `,
});

const codingTipGeneratorFlow = ai.defineFlow(
  {
    name: 'codingTipGeneratorFlow',
    inputSchema: CodingTipInputSchema,
    outputSchema: CodingTipOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
