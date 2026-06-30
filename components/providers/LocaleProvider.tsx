'use client';

import { createContext, useContext } from 'react';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import { getDictionary, type Dictionary } from '@/lib/dictionaries';

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** Translations for the active locale, usable in any client component. */
export function useDictionary(): Dictionary {
  return getDictionary(useContext(LocaleContext));
}
