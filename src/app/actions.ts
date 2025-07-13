"use server";

import { generateCodingTip, type CodingTipInput } from "@/ai/flows/coding-tip-generator";
import { generateJavaChallenge } from "@/ai/flows/java-challenge-flow";
import { personalData } from "@/lib/data";
import { Resend } from "resend";
import * as z from "zod";

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function getCodingTip(input: CodingTipInput) {
    const { tip } = await generateCodingTip(input);
    return tip;
}

export async function getJavaChallenge() {
    return await generateJavaChallenge();
}

export async function sendContactEmail(formData: z.infer<typeof contactFormSchema>) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        console.error("Resend API key is missing. Please add it to your .env file.");
        return { success: false, error: "Email service is not configured. Please contact the administrator." };
    }

    const resend = new Resend(apiKey);

    try {
        const result = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // This can be a generic address
            to: personalData.email, // Your personal email address
            subject: `New message from ${formData.name} via your portfolio`,
            reply_to: formData.email,
            html: `
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Message:</strong></p>
                <p>${formData.message}</p>
            `,
        });

        if (result.error) {
            console.error("Resend error:", result.error);
            return { success: false, error: result.error.message };
        }

        return { success: true };
    } catch (error) {
        console.error("Failed to send email:", error);
        return { success: false, error: "Failed to send email. See server logs for details." };
    }
}
