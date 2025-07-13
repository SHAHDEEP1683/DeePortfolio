import { personalData } from "@/lib/data";
import { Mail, Smartphone, MapPin } from "lucide-react";
import ContactForm from "./contact-form";

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 border-t">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold">
          Get In Touch
        </h2>
      </div>

      <div className="max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-lg">
        <h3 className="font-headline text-2xl font-semibold mb-2">Contact Me</h3>
        <p className="text-muted-foreground mb-6">
            Have a question or want to work together? Fill out the form below or reach out directly.
        </p>

        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8 text-sm text-muted-foreground">
            <a href={`mailto:${personalData.email}`} className="flex items-center gap-2 hover:text-primary">
                <Mail className="h-4 w-4 text-accent" />
                <span>{personalData.email}</span>
            </a>
            <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-accent" />
                <span>{personalData.phone}</span>
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{personalData.location}</span>
            </div>
        </div>

        <ContactForm />

      </div>
    </section>
  );
};

export default ContactSection;
