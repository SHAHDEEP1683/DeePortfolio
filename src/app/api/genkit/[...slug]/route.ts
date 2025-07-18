'use server';
import { createNextHandler } from '@genkit-ai/next';
import '@/ai/genkit';
import '@/ai/flows/coding-tip-generator';

export const POST = createNextHandler();
