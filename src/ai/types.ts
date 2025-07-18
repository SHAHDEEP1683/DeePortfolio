import {z} from 'genkit';

export const CodingTipInputSchema = z.object({
  request: z.string().optional().describe('The user request for a coding tip.'),
});
export type CodingTipInput = z.infer<typeof CodingTipInputSchema>;

export const CodingTipOutputSchema = z.object({
  tip: z.string().describe('A coding tip or quote.'),
});
export type CodingTipOutput = z.infer<typeof CodingTipOutputSchema>;
