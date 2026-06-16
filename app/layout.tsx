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
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    title: `${siteConfig.name} — Trusted Hajj & Umrah since 2002`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: 'en_GB',
  },
  twitter: { card: 'summary_large_image', title: siteConfig.name, description: siteConfig.description },
  icons: { icon: '/favicon.svg', apple: '/favicon.svg' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#06402b',
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
