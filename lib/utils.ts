import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function formatDate(date: string | Date, opts?: Intl.DateTimeFormatOptions) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...opts,
  }).format(d);
}

export function readingTime(html: string) {
  const text = html.replace(/<[^>]+>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

/** Build a wa.me deep link from a phone number + optional prefilled message. */
export function whatsappLink(phone: string, message?: string) {
  const digits = phone.replace(/[^0-9]/g, '');
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * The correct absolute base URL for THIS deployment — used for canonical, Open
 * Graph, sitemap, RSS, etc. Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL (your real domain, when set & not localhost)
 *   2. Vercel's stable production domain (VERCEL_PROJECT_PRODUCTION_URL)
 *   3. The per-deploy Vercel URL (VERCEL_URL)
 *   4. The brand domain fallback
 * This is what makes share previews (og:image) load on whatever domain the site
 * is actually served from.
 */
export function getBaseUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env && !env.includes('localhost')) return env.replace(/\/$/, '');
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://intergulftravelsltd.com';
}

export function absoluteUrl(path = '') {
  const base = getBaseUrl();
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
