'use server';
import { genkitNextHandler } from '@genkit-ai/next';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

import '@/ai/flows/coding-tip-generator';

genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_API_KEY,
    }),
  ],
  enableTracingAndMetrics: true,
});

export const POST = genkitNextHandler();
