/**
 * Client-safe i18n config. The site has TWO separate versions, both
 * server-rendered (no client text-swapping):
 *   • Bangla  → default, no URL prefix  (e.g. /hajj)
 *   • English → /en prefix              (e.g. /en/hajj)
 * `getLocale()` (server-only, reads the middleware header) lives in
 * `lib/i18n-server.ts` so this file stays importable from client components.
 */
export const LOCALES = ['bn', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'bn';

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'bn' || value === 'en';
}

/** Prefix an internal path for the given locale. bn → as-is, en → /en/... */
export function localizedPath(locale: Locale, path: string): string {
  // Leave external links, anchors, tel/mailto and already-prefixed paths alone.
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path;
  if (locale === 'en') {
    if (path === '/') return '/en';
    return path.startsWith('/en/') || path === '/en' ? path : `/en${path}`;
  }
  return path;
}

/** Strip the /en prefix from a path (for building the "other locale" URL). */
export function stripLocale(path: string): string {
  if (path === '/en') return '/';
  if (path.startsWith('/en/')) return path.slice(3);
  return path;
}
