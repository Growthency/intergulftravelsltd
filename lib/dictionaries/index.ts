import type { Locale } from '@/lib/i18n';
import { en, type Dictionary } from './en';
import { bn } from './bn';

const dictionaries: Record<Locale, Dictionary> = { en, bn };

/** Pure data — safe to import from both server and client components. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? bn;
}

export type { Dictionary };
