import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export function initializeGenkit() {
    return genkit({
        plugins: [
            googleAI({
                apiKey: process.env.GOOGLE_API_KEY,
            }),
        ],
        model: 'googleai/gemini-2.0-flash',
    });
}
