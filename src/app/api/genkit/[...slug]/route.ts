'use server';
import { genkitNextHandler } from '@genkit-ai/next';
import '@/ai/genkit';
import '@/ai/flows/java-challenge-generator';

export const POST = genkitNextHandler();
