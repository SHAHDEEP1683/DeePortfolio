'use server';

/**
 * @fileOverview A coding tip generator AI agent.
 * 
 * - generateCodingTip - A function that generates a coding tip.
 */

import { ai } from '@/ai/genkit';
import { CodingTipInput, CodingTipInputSchema, CodingTipOutput, CodingTipOutputSchema } from '@/ai/types';


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
