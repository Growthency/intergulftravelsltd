'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { CalendarDays } from 'lucide-react';
import { inputClass } from '@/components/manage/ui';
import { useLocale } from '@/components/providers/LocaleProvider';
import { presetRange, type RangeKey } from '@/lib/date-range';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ *
 *  Quick date-range filter shared by the dashboard and the ledger
 *  pages. Presets compute a from/to (using the local calendar) and push
 *  them into the URL, so the server component re-renders scoped to the
 *  chosen window. "Lifetime" clears the dates (show everything).
 * ------------------------------------------------------------------ */

const ORDER: RangeKey[] = ['this-month', 'last-month', 'this-year', 'last-year', 'lifetime', 'custom'];

const LABELS: Record<'en' | 'bn', Record<RangeKey | 'from' | 'to', string>> = {
  en: {
    'this-month': 'This month',
    'last-month': 'Last month',
    'this-year': 'This year',
    'last-year': 'Last year',
    lifetime: 'Lifetime',
    custom: 'Custom',
    from: 'From',
    to: 'To',
  },
  bn: {
    'this-month': 'এই মাস',
    'last-month': 'গত মাস',
    'this-year': 'এই বছর',
    'last-year': 'গত বছর',
    lifetime: 'সর্বকালীন',
    custom: 'কাস্টম',
    from: 'থেকে',
    to: 'পর্যন্ত',
  },
};

export function DateRangeFilter({ from, to, range }: { from: string; to: string; range: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const L = LABELS[useLocale()];
  const active = (range || (from || to ? 'custom' : 'lifetime')) as RangeKey;

  function apply(patch: Record<string, string>) {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  function choose(key: RangeKey) {
    if (key === 'custom') {
      apply({ range: 'custom' });
      return;
    }
    const r = presetRange(key);
    apply({ range: key, from: r.from, to: r.to });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <CalendarDays className="h-4 w-4 text-ink-muted" />
      {ORDER.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => choose(key)}
          aria-pressed={active === key}
          className={cn(
            'rounded-full border px-3 py-1.5 text-xs font-semibold transition',
            active === key
              ? 'border-brand-600 bg-brand-600 text-white shadow-emerald'
              : 'border-border bg-card text-ink-muted hover:border-brand-600/40 hover:text-brand-700',
          )}
        >
          {L[key]}
        </button>
      ))}

      {active === 'custom' && (
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
            {L.from}
            <input
              type="date"
              value={from}
              onChange={(e) => apply({ range: 'custom', from: e.target.value })}
              className={`${inputClass} h-9 w-40 py-1`}
            />
          </label>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
            {L.to}
            <input
              type="date"
              value={to}
              onChange={(e) => apply({ range: 'custom', to: e.target.value })}
              className={`${inputClass} h-9 w-40 py-1`}
            />
          </label>
        </div>
      )}
    </div>
  );
}
