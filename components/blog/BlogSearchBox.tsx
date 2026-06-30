'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, X, Loader2 } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/blog';

/** Debounced search that updates the ?search URL param (server re-paginates). */
export function BlogSearchBox() {
  const t = getDict(useLocale()).search;
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get('search') ?? '');
  const [pending, startTransition] = useTransition();

  // Keep in sync if the URL changes elsewhere (e.g. a category tab is clicked).
  useEffect(() => {
    setValue(params.get('search') ?? '');
  }, [params]);

  useEffect(() => {
    const id = setTimeout(() => {
      const current = params.get('search') ?? '';
      if (value.trim() === current) return;
      const sp = new URLSearchParams(params.toString());
      if (value.trim()) sp.set('search', value.trim());
      else sp.delete('search');
      sp.delete('page');
      startTransition(() => router.replace(`${pathname}?${sp.toString()}`, { scroll: false }));
    }, 350);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="relative mx-auto mb-12 max-w-xl">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t.placeholder}
        aria-label={t.ariaLabel}
        className="w-full rounded-full border border-border bg-card py-3.5 pl-12 pr-11 text-sm text-ink shadow-soft outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2">
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin text-ink-muted" />
        ) : value ? (
          <button onClick={() => setValue('')} aria-label={t.clearLabel} className="text-ink-muted transition hover:text-ink">
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </span>
    </div>
  );
}
