'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { inputClass } from '@/components/manage/ui';
import { BRANCHES } from '@/lib/management/branches';

type PackageOpt = { id: string; name: string };

export function PassengerFilters({ packages }: { packages: PackageOpt[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${pathname}?${next.toString()}`);
  }

  const hasFilters = ['q', 'package', 'branch', 'status', 'expiring'].some((k) => params.get(k));

  return (
    <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
      <div className="relative lg:col-span-2">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
        <input
          className={`${inputClass} pl-9`}
          placeholder="Search name, passport, phone…"
          defaultValue={params.get('q') ?? ''}
          onChange={(e) => update('q', e.target.value)}
        />
      </div>

      <select className={inputClass} value={params.get('package') ?? ''} onChange={(e) => update('package', e.target.value)}>
        <option value="">All packages</option>
        <option value="unassigned">Unassigned</option>
        {packages.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <select className={inputClass} value={params.get('branch') ?? ''} onChange={(e) => update('branch', e.target.value)}>
        <option value="">All branches</option>
        {BRANCHES.map((b) => (
          <option key={b.value} value={b.value}>{b.short}</option>
        ))}
      </select>

      <select className={inputClass} value={params.get('status') ?? ''} onChange={(e) => update('status', e.target.value)}>
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <div className="flex items-center gap-2">
        <select className={inputClass} value={params.get('expiring') ?? ''} onChange={(e) => update('expiring', e.target.value)}>
          <option value="">Any passport</option>
          <option value="1">Expiring in &lt; 6 months</option>
        </select>
        {hasFilters && (
          <button
            type="button"
            onClick={() => router.replace(pathname)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-ink-muted transition hover:bg-muted"
            aria-label="Clear filters"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
