'use server';

import { generateJavaChallengeFlow } from '@/ai/flows/java-challenge-generator';
import type { JavaChallengeInput, JavaChallengeOutput } from '@/ai/types';

export async function generateChallengeAction(input: JavaChallengeInput): Promise<JavaChallengeOutput> {
  return generateJavaChallengeFlow(input);
}
