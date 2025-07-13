"use server";

import { generateCodingTip, type CodingTipInput } from "@/ai/flows/coding-tip-generator";
import { generateJavaChallenge } from "@/ai/flows/java-challenge-flow";
import { personalData } from "@/lib/data";
import { Resend } from "resend";
import * as z from "zod";

// You need to sign up for Resend (resend.com) and get an API key.
// Then add it to your .env file as RESEND_API_KEY.
const resend = new Resend(process.env.RESEND_API_KEY);

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
