'use server';

/**
 * @fileOverview A coding tip generator AI agent.
 * 
 * - generateCodingTip - A function that generates a coding tip.
 */

import { defineFlow, definePrompt, genkit } from 'genkit';
import { z } from 'genkit/zod';
import { googleAI } from '@genkit-ai/googleai';
import { CodingTipInput, CodingTipInputSchema, CodingTipOutput, CodingTipOutputSchema } from '@/ai/types';

// Initialize genkit within the flow file for server-side execution
genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_API_KEY,
    }),
  ],
  enableTracingAndMetrics: true,
});


export async function generateCodingTip(input: CodingTipInput): Promise<CodingTipOutput> {
  return codingTipGeneratorFlow(input);
}

const prompt = definePrompt({
  name: 'codingTipPrompt',
  input: {schema: CodingTipInputSchema},
  output: {schema: CodingTipOutputSchema},
  prompt: `You are a helpful coding assistant that provides coding tips and quotes.

  Generate a random coding tip or quote to inspire the user.

  Request: {{{request}}}
  `,
});

const codingTipGeneratorFlow = defineFlow(
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
