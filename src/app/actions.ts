"use server";

import { generateCodingTip, type CodingTipInput } from "@/ai/flows/coding-tip-generator";
import { generateJavaChallenge } from "@/ai/flows/java-challenge-flow";

export async function getCodingTip(input: CodingTipInput) {
    const { tip } = await generateCodingTip(input);
    return tip;
}

export async function getJavaChallenge() {
    return await generateJavaChallenge();
}
