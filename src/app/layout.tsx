import type {Metadata} from 'next';
import './globals.css';
import {ThemeProvider} from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster"

// Link previews (LinkedIn, WhatsApp, X…) need absolute image URLs: set NEXT_PUBLIC_SITE_URL to the live address.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
const shareTitle = 'Deep Shah | Software Engineer · Java & Spring Boot';
const shareDescription =
  'Software Engineer at Techxplore IT Solutions building scalable, reliable Java & Spring Boot backends: REST APIs, event-driven workflows and AWS deployments with Terraform.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Deep Shah | Java Backend Developer',
  description: 'Portfolio of Deep Shah, a Java Backend Developer.',
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'DeePortfolio',
    title: shareTitle,
    description: shareDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: shareTitle,
    description: shareDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@100..900&family=Caveat+Brush&family=Archivo+Black&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
