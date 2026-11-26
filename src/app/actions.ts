"use server";

import nodemailer from "nodemailer";
import * as z from "zod";

/** Same rules as the form, checked again on the server (never trust the browser). */
const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  message: z.string().trim().min(10).max(1000),
  /** honeypot: real people never fill this hidden field; bots usually do */
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export async function sendContactEmail(input: ContactFormData) {
  const parsed = contactFormSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false as const, error: "Please check the form fields and try again." };
  }
  const { name, email, message, company } = parsed.data;
  if (company) return { success: true as const }; // bot: pretend success, send nothing

  const { GMAIL_EMAIL, GMAIL_APP_PASSWORD } = process.env;
  if (!GMAIL_EMAIL || !GMAIL_APP_PASSWORD) {
    console.error("Contact form: GMAIL_EMAIL / GMAIL_APP_PASSWORD missing in .env");
    return { success: false as const, error: "Email isn't configured right now. Please use WhatsApp or email me directly." };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_EMAIL, pass: GMAIL_APP_PASSWORD.replace(/\s+/g, "") },
  });

  const safe = { name: escapeHtml(name), email: escapeHtml(email), message: escapeHtml(message).replace(/\n/g, "<br/>") };

  try {
    await transporter.sendMail({
      // Gmail only sends as the authenticated account; the visitor goes in Reply-To.
      from: { name: "DeePortfolio contact form", address: GMAIL_EMAIL },
      to: GMAIL_EMAIL,
      replyTo: { name, address: email },
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#232323">
          <p style="margin:0 0 12px"><strong>New message from your portfolio</strong></p>
          <p style="margin:0"><strong>Name:</strong> ${safe.name}</p>
          <p style="margin:0 0 12px"><strong>Email:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
          <div style="padding:12px 14px;background:#fff3c4;border-radius:6px">${safe.message}</div>
          <p style="margin:12px 0 0;color:#6b6b6b;font-size:13px">Just hit Reply to answer ${safe.name}.</p>
        </div>`,
    });
    return { success: true as const };
  } catch (error) {
    console.error("Contact form: failed to send email:", error);
    return { success: false as const, error: "Couldn't send right now. Please try WhatsApp or email me directly." };
  }
}
