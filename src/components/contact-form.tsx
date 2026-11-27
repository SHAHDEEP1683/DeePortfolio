"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Loader2, MessageCircle, RotateCcw, Send } from "lucide-react";
import { sendContactEmail } from "@/app/actions";
import { personalData } from "@/lib/data";

const MAX = 1000;
const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name (2+ characters).").max(80),
  email: z.string().trim().email("Please enter a valid email so I can reply."),
  message: z.string().trim().min(10, "A few more words please (10+ characters).").max(MAX, `Keep it under ${MAX} characters.`),
  company: z.string().optional(), // honeypot
});
type Values = z.infer<typeof formSchema>;

const whatsappNumber = personalData.phone.replace(/\D/g, "");

const ContactForm = () => {
  const { toast } = useToast();
  const [sent, setSent] = useState<{ name: string; email: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [flying, setFlying] = useState(false); // the sent form folds into a paper plane and flies off

  const form = useForm<Values>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });
  const isSubmitting = form.formState.isSubmitting;
  const msgLen = form.watch("message")?.length ?? 0;

  const onSubmit = async (values: Values) => {
    setServerError(null);
    const res = await sendContactEmail(values);
    if (res.success) {
      const done = () => {
        setFlying(false);
        setSent({ name: values.name, email: values.email });
        form.reset();
      };
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) done();
      else {
        setFlying(true);
        window.setTimeout(done, 1500);
      }
      toast({ title: "Message sent", description: "It's in Deep's inbox. You'll get a reply by email." });
    } else {
      setServerError(res.error);
      toast({ variant: "destructive", title: "Couldn't send", description: res.error });
    }
  };

  // the original WhatsApp route, kept as an alternative
  const sendViaWhatsApp = () => {
    const v = form.getValues();
    const lines = ["Hello Deep, I'm contacting you from your portfolio."];
    const details = [v.name && `Name: ${v.name.trim()}`, v.email && `Email: ${v.email.trim()}`].filter(Boolean);
    if (details.length) lines.push("", ...(details as string[]));
    if (v.message?.trim()) lines.push("", v.message.trim());
    const text = lines.join("\n");
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  if (sent) {
    return (
      <div className="contact-sent" role="status">
        <span className="contact-sent__tape" aria-hidden="true" />
        <CheckCircle2 className="h-10 w-10" />
        <h4>Message sent ✓</h4>
        <p>
          Thanks, <strong>{sent.name}</strong>! I&rsquo;ll reply to you at <strong>{sent.email}</strong>.
        </p>
        <Button type="button" variant="outline" onClick={() => setSent(null)}>
          <RotateCcw className="mr-2 h-4 w-4" /> Send another
        </Button>
      </div>
    );
  }

  return (
    <div className="contact-flight">
    {flying && (
      <svg className="contact-plane" viewBox="0 0 64 40" aria-hidden="true">
        <path d="M2 18 L62 2 L26 24 Z" fill="#fff" stroke="#232323" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M26 24 L62 2 L34 38 Z" fill="#f4f1ea" stroke="#232323" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M26 24 L30 31 L34 38" fill="none" stroke="#232323" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    )}
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-5${flying ? " is-folding" : ""}`} noValidate aria-busy={flying}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@company.com" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-baseline justify-between">
                <FormLabel>Message</FormLabel>
                <span className={`text-xs tabular-nums ${msgLen > MAX ? "text-destructive" : "text-muted-foreground"}`}>
                  {msgLen}/{MAX}
                </span>
              </div>
              <FormControl>
                <Textarea
                  placeholder="A role, a project, or a question: tell me a bit about it…"
                  className="resize-y min-h-[140px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* honeypot: hidden from people, tempting for bots */}
        <div aria-hidden="true" className="contact-hp">
          <label>
            Company
            <input tabIndex={-1} autoComplete="off" {...form.register("company")} />
          </label>
        </div>

        {serverError && <p className="text-sm text-destructive" role="alert">{serverError}</p>}

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" className="contact-send" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> Send Message
              </>
            )}
          </Button>
          <button type="button" className="contact-wa" onClick={sendViaWhatsApp}>
            <MessageCircle className="h-4 w-4" /> or send it on WhatsApp
          </button>
        </div>
      </form>
    </Form>
    </div>
  );
};

export default ContactForm;
