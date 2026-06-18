import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { Toaster } from 'sonner';
import { siteConfig } from '@/lib/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Trusted Hajj & Umrah since 2002`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Hajj packages Bangladesh',
    'Umrah packages Dhaka',
    'Inter Gulf Travels',
    'Hajj agency Bangladesh',
    'Umrah agency Dhaka',
    'Saudi visa Bangladesh',
    'air ticket Dhaka',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.legalName,
  applicationName: siteConfig.name,
  category: 'travel',
  alternates: { canonical: '/' },
  formatDetection: { telephone: true, email: true, address: true },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: `${siteConfig.name} — Trusted Hajj & Umrah since 2002`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: 'en_GB',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Inter Gulf Travels Ltd — Hajj & Umrah' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/og.png'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = {
  themeColor: '#06402b',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: { borderRadius: '0.9rem', border: '1px solid rgb(224 220 206)' },
          }}
        />
      </body>
    </html>
  );
}
