'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { CalendarDays, Building2 } from 'lucide-react';
import { BRANCHES } from '@/lib/management/branches';
import { inputClass } from '@/components/manage/ui';

type Mode = 'date' | 'range' | 'asof' | 'none';

/**
 * Filter toolbar for the report views. Pushes its values into the URL search
 * params so the server component re-renders with the chosen date / range /
 * branch. Each report declares which inputs it needs via `mode`.
 */
export function ReportFilters({
  report,
  mode,
  date,
  from,
  to,
  branch,
}: {
  report: string;
  mode: Mode;
  date: string;
  from: string;
  to: string;
  branch: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function update(patch: Record<string, string>) {
    const next = new URLSearchParams(params.toString());
    next.set('report', report);
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    router.push(`${pathname}?${next.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-end gap-3">
      {(mode === 'date' || mode === 'asof') && (
        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-muted">
            <CalendarDays className="mr-1 inline h-3.5 w-3.5" />
            {mode === 'asof' ? 'As of date' : 'Date'}
          </span>
          <input
            type="date"
            value={date}
            onChange={(e) => update({ date: e.target.value })}
            className={`${inputClass} sm:w-48`}
          />
        </label>
      )}

      {mode === 'range' && (
        <>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-muted">
              <CalendarDays className="mr-1 inline h-3.5 w-3.5" /> From
            </span>
            <input
              type="date"
              value={from}
              onChange={(e) => update({ from: e.target.value })}
              className={`${inputClass} sm:w-44`}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-muted">
              To
            </span>
            <input
              type="date"
              value={to}
              onChange={(e) => update({ to: e.target.value })}
              className={`${inputClass} sm:w-44`}
            />
          </label>
        </>
      )}

      {mode !== 'none' && (
        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-muted">
            <Building2 className="mr-1 inline h-3.5 w-3.5" /> Branch
          </span>
          <select
            value={branch}
            onChange={(e) => update({ branch: e.target.value })}
            className={`${inputClass} sm:w-56`}
          >
            <option value="">All branches</option>
            {BRANCHES.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}
