"use server";

import nodemailer from "nodemailer";
import * as z from "zod";

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function sendContactEmail(formData: z.infer<typeof contactFormSchema>) {
    const { GMAIL_EMAIL, GMAIL_APP_PASSWORD } = process.env;

    if (!GMAIL_EMAIL || !GMAIL_APP_PASSWORD) {
        console.error("Gmail credentials are missing. Please add GMAIL_EMAIL and GMAIL_APP_PASSWORD to your .env file.");
        return { success: false, error: "Email service is not configured. Please contact the administrator." };
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: GMAIL_EMAIL,
            pass: GMAIL_APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: formData.email,
        to: GMAIL_EMAIL,
        subject: `New message from ${formData.name} via your portfolio`,
        replyTo: formData.email,
        html: `
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Message:</strong></p>
            <p>${formData.message}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error("Failed to send email:", error);
        return { success: false, error: "Failed to send email. Check server logs and Gmail configuration." };
    }
}
