"use client";

import { useState } from "react";
import { personalData } from "@/lib/data";
import { Check, Copy, Linkedin, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import ContactForm from "./contact-form";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const wa = personalData.phone.replace(/\D/g, "");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalData.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  };

  const direct = [
    { icon: Mail, label: "Email", value: personalData.email, href: `mailto:${personalData.email}`, copy: true },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with me", href: `https://wa.me/${wa}` },
    { icon: Phone, label: "Phone", value: personalData.phone, href: `tel:+${wa}` },
    { icon: Linkedin, label: "LinkedIn", value: "deepshah-java-developer", href: personalData.linkedin },
    { icon: MapPin, label: "Based in", value: personalData.location, href: "https://en.wikipedia.org/wiki/Amreli" },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold flex items-center justify-center gap-2">
          <Send className="h-10 w-10" />
          Get In Touch
        </h2>
        <p className="mt-3 text-muted-foreground">Have a role, a project or a question? Send a message, it lands straight in my inbox.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-direct">
          <h3 className="font-headline text-lg font-semibold mb-3">Reach me directly</h3>
          <ul className="space-y-3">
            {direct.map(({ icon: Icon, label, value, href, copy }) => (
              <li key={label} className="contact-row bg-card rounded-lg shadow-sm">
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="contact-row__link">
                  <span className="about-fact__icon"><Icon className="h-5 w-5" /></span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
                    <span className="block font-semibold truncate">{value}</span>
                  </span>
                </a>
                {copy && (
                  <button type="button" className="contact-copy" onClick={copyEmail} aria-label="Copy email address">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="contact-formcard bg-card p-5 sm:p-8 rounded-lg shadow-lg">
          <h3 className="font-headline text-2xl font-semibold">Send a message</h3>
          <p className="text-muted-foreground mt-1 mb-6 text-sm">I&rsquo;ll reply by email.</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
