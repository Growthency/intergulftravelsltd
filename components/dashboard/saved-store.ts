/**
 * Tiny client-side store for saved blog articles.
 *
 * There is no `saved_articles` table, so a member's bookmarks live in
 * localStorage. The blog "save" control and the dashboard both read/write the
 * same key through these helpers, and dispatch a window event so any mounted
 * component (e.g. the overview stat) updates instantly.
 */
export const SAVED_ARTICLES_KEY = 'igt:saved-articles';
export const SAVED_ARTICLES_EVENT = 'igt:saved-articles-changed';

export function readSavedSlugs(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SAVED_ARTICLES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((s): s is string => typeof s === 'string');
  } catch {
    return [];
  }
}

function writeSavedSlugs(slugs: string[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(slugs));
    window.dispatchEvent(new Event(SAVED_ARTICLES_EVENT));
  } catch {
    // storage may be unavailable (private mode / quota) — fail silently
  }
}

export function isSaved(slug: string): boolean {
  return readSavedSlugs().includes(slug);
}

export function toggleSaved(slug: string): boolean {
  const current = readSavedSlugs();
  const exists = current.includes(slug);
  const next = exists ? current.filter((s) => s !== slug) : [...current, slug];
  writeSavedSlugs(next);
  return !exists;
}

export function removeSaved(slug: string) {
  writeSavedSlugs(readSavedSlugs().filter((s) => s !== slug));
}
