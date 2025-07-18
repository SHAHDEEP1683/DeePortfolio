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
  level: z.string().describe("The difficulty level for the Java challenge (e.g., 'easy', 'medium', 'hard')."),
});
export type JavaChallengeInput = z.infer<typeof JavaChallengeInputSchema>;

export const JavaChallengeOutputSchema = z.object({
  questionText: z.string().describe("The Java code snippet for the challenge, containing '___' as a placeholder."),
  answer: z.string().describe("The correct word or code fragment that fits in the '___' blank."),
});
export type JavaChallengeOutput = z.infer<typeof JavaChallengeOutputSchema>;
