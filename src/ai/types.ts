import {z} from 'genkit';

export const CodingTipInputSchema = z.object({
  request: z.string().optional().describe('The user request for a coding tip.'),
});
export type CodingTipInput = z.infer<typeof CodingTipInputSchema>;

export const CodingTipOutputSchema = z.object({
  tip: z.string().describe('A coding tip or quote.'),
});
export type CodingTipOutput = z.infer<typeof CodingTipOutputSchema>;

export const JavaChallengeInputSchema = z.object({
    level: z.enum(['easy', 'medium', 'hard']).describe('The difficulty of the challenge.'),
});
export type JavaChallengeInput = z.infer<typeof JavaChallengeInputSchema>;

export const JavaChallengeOutputSchema = z.object({
    questionText: z.string().describe("A Java code snippet containing '___' for the user to fill in."),
    answer: z.string().describe('The correct word or code to fill in the blank.'),
});
export type JavaChallengeOutput = z.infer<typeof JavaChallengeOutputSchema>;
