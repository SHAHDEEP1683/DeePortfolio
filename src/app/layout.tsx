import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import { personalData, skillGroups, experience, education } from '@/lib/data';

// Absolute URLs for canonical, sitemap and link previews: set NEXT_PUBLIC_SITE_URL to the live address.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002').replace(/\/$/, '');

const title = 'Deep Shah | Software Engineer · Java & Spring Boot';
const description =
  'Deep Shah is a Software Engineer at Techxplore IT Solutions building scalable Java & Spring Boot backends, REST APIs, event-driven systems and AWS deployments.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s | Deep Shah' },
  description,
  applicationName: 'DeePortfolio',
  authors: [{ name: 'Deep Shah', url: personalData.linkedin }],
  creator: 'Deep Shah',
  keywords: [
    'Deep Shah', 'Software Engineer', 'Java Developer', 'Spring Boot Developer', 'Backend Developer',
    'Java Backend Developer India', 'Microservices', 'REST API', 'AWS', 'Terraform', 'RabbitMQ', 'Gujarat', 'Portfolio',
  ],
  category: 'technology',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: 'DeePortfolio',
    locale: 'en_IN',
    title,
    description,
    firstName: 'Deep',
    lastName: 'Shah',
  },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fdfcf9' },
    { media: '(prefers-color-scheme: dark)', color: '#020817' },
  ],
};

/** Structured data so search engines understand who the page is about. */
const current = experience[0] as (typeof experience)[number] & { url?: string };
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Deep Shah',
      url: siteUrl,
      image: `${siteUrl}/icon.png`,
      jobTitle: current.role,
      worksFor: { '@type': 'Organization', name: current.company.replace(' Pvt. Ltd.', ''), ...(current.url ? { url: current.url } : {}) },
      address: { '@type': 'PostalAddress', addressLocality: 'Amreli', addressRegion: 'Gujarat', addressCountry: 'IN' },
      email: `mailto:${personalData.email}`,
      sameAs: [personalData.github, personalData.linkedin, personalData.instagram],
      alumniOf: education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.university })),
      knowsAbout: skillGroups.flatMap((g) => g.skills).slice(0, 30),
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'DeePortfolio',
      description,
      inLanguage: 'en',
      publisher: { '@id': `${siteUrl}/#person` },
    },
  ],
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
        {/* one request for all fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&family=Source+Code+Pro:wght@400;500;700&family=Inter+Tight:wght@100..900&family=Caveat+Brush&family=Archivo+Black&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
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
