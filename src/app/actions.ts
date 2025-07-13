"use server";

import { generateCodingTip, type CodingTipInput } from "@/ai/flows/coding-tip-generator";

export async function getCodingTip(input: CodingTipInput) {
    const { tip } = await generateCodingTip(input);
    return tip;
}
