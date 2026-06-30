import { headers } from 'next/headers';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/lib/i18n';

/** Active locale for the current request, set by middleware via the x-locale header. */
export function getLocale(): Locale {
  try {
    const value = headers().get('x-locale');
    return isLocale(value) ? value : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}
