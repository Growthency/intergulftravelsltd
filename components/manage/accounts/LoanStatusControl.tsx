'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/adminaccounting';

type Status = 'open' | 'partial' | 'closed';

/** Inline dropdown to move a loan between open / partial / closed. */
export function LoanStatusControl({ id, status }: { id: string; status: Status }) {
  const router = useRouter();
  const t = getDict(useLocale());
  const [value, setValue] = useState<Status>(status);
  const [busy, setBusy] = useState(false);

  async function change(next: Status) {
    const prev = value;
    setValue(next);
    setBusy(true);
    try {
      const res = await fetch('/api/admin/accounts/loans', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: next }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setValue(prev);
        toast.error(data?.error ?? t.loanStatus.errUpdate);
        return;
      }
      toast.success(t.loanStatus.updated);
      router.refresh();
    } catch {
      setValue(prev);
      toast.error(t.common.networkError);
    } finally {
      setBusy(false);
    }
  }

  return (
    <select
      value={value}
      disabled={busy}
      onChange={(e) => change(e.target.value as Status)}
      className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-semibold text-ink outline-none transition focus:border-brand-600 disabled:opacity-50"
    >
      <option value="open">{t.loanStatus.open}</option>
      <option value="partial">{t.loanStatus.partial}</option>
      <option value="closed">{t.loanStatus.closed}</option>
    </select>
  );
}
