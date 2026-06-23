'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Pencil, X } from 'lucide-react';
import { Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import type { Loan } from '@/lib/management/types';

type EditableLoan = Pick<Loan, 'id' | 'party_name' | 'party_phone' | 'due_date' | 'narration'>;

/** Edit a loan's descriptive fields. Principal / type stay locked to the voucher. */
export function LoanEdit({ loan }: { loan: EditableLoan }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saving) return;
    const fd = new FormData(e.currentTarget);
    const payload = {
      id: loan.id,
      party_name: String(fd.get('party_name') ?? '').trim(),
      party_phone: String(fd.get('party_phone') ?? '').trim(),
      due_date: String(fd.get('due_date') ?? ''),
      narration: String(fd.get('narration') ?? '').trim(),
    };
    if (!payload.party_name) {
      toast.error('Party name is required.');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/accounts/loans', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not update the loan.');
        return;
      }
      toast.success('Loan updated.');
      setOpen(false);
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs font-semibold text-ink-muted transition hover:border-brand-600/40 hover:text-brand-700"
        aria-label={`Edit ${loan.party_name}`}
      >
        <Pencil className="h-3.5 w-3.5" /> Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 text-left shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-ink">Edit loan</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-ink-muted hover:bg-muted"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={onSubmit} className="grid gap-4">
              <Field label="Party name" required>
                <input name="party_name" defaultValue={loan.party_name} className={inputClass} />
              </Field>
              <Field label="Phone">
                <input name="party_phone" defaultValue={loan.party_phone ?? ''} className={inputClass} placeholder="01XXXXXXXXX" />
              </Field>
              <Field label="Due date">
                <input name="due_date" type="date" defaultValue={loan.due_date ?? ''} className={inputClass} />
              </Field>
              <Field label="Narration">
                <textarea name="narration" rows={2} defaultValue={loan.narration ?? ''} className={inputClass} />
              </Field>
              <p className="text-xs text-ink-muted">
                Principal, type and the posting voucher can&apos;t be changed here — record a repayment or reverse the
                voucher instead.
              </p>
              <div className="flex items-center gap-3">
                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  Save changes
                </Button>
                <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={saving}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
