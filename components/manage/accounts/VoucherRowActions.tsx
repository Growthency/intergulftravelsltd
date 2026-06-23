'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Pencil, Trash2, X, Lock } from 'lucide-react';
import { confirmDialog } from '@/components/admin/confirm';
import { Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';

export type VoucherHead = { id: string; name: string };

export type VoucherLite = {
  id: string;
  voucher_no: string | null;
  date: string;
  type: string;
  debit_account_id: string;
  credit_account_id: string;
  amount: number;
  narration: string | null;
  /** True when the voucher was posted from a payment / loan / registration. */
  linked: boolean;
};

const TYPES = ['receipt', 'payment', 'contra', 'journal', 'expense', 'income'] as const;

export function VoucherRowActions({ voucher, heads }: { voucher: VoucherLite; heads: VoucherHead[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);
  const linked = voucher.linked;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saving) return;
    const fd = new FormData(e.currentTarget);

    const payload: Record<string, unknown> = {
      id: voucher.id,
      date: String(fd.get('date') ?? voucher.date),
      narration: String(fd.get('narration') ?? '').trim(),
    };
    // Ledger-affecting fields can only change on manual vouchers.
    if (!linked) {
      payload.type = String(fd.get('type') ?? voucher.type);
      payload.debit_account_id = String(fd.get('debit_account_id') ?? voucher.debit_account_id);
      payload.credit_account_id = String(fd.get('credit_account_id') ?? voucher.credit_account_id);
      payload.amount = Number(fd.get('amount') ?? voucher.amount);
      if (payload.debit_account_id === payload.credit_account_id) {
        toast.error('The debit and credit accounts must be different.');
        return;
      }
      if (!payload.amount || Number(payload.amount) <= 0) {
        toast.error('Enter an amount greater than zero.');
        return;
      }
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/accounts/transactions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not update the voucher.');
        return;
      }
      toast.success('Voucher updated.');
      setOpen(false);
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (busy) return;
    if (linked) {
      toast.error('This voucher is linked to a payment/loan/registration — delete it from that record.');
      return;
    }
    if (
      !(await confirmDialog({
        message: `Delete voucher ${voucher.voucher_no ?? ''}? Both account balances will be reversed. This cannot be undone.`,
        confirmText: 'Delete voucher',
        danger: true,
      }))
    ) {
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/accounts/transactions?id=${encodeURIComponent(voucher.id)}`, {
        method: 'DELETE',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not delete the voucher.');
        return;
      }
      toast.success('Voucher deleted and balances reversed.');
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="inline-flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs font-semibold text-ink-muted transition hover:border-brand-600/40 hover:text-brand-700"
        aria-label="Edit voucher"
      >
        <Pencil className="h-3.5 w-3.5" /> Edit
      </button>
      {!linked && (
        <button
          type="button"
          onClick={onDelete}
          disabled={busy}
          className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs font-semibold text-ink-muted transition hover:border-red-300 hover:text-red-600 disabled:opacity-50"
          aria-label="Delete voucher"
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-5 text-left shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-ink">
                Edit voucher <span className="font-mono text-sm text-ink-muted">{voucher.voucher_no ?? ''}</span>
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-ink-muted hover:bg-muted"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {linked && (
              <p className="mb-4 flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Auto-posted from a payment / loan / registration — only the date and narration can be changed here.
              </p>
            )}

            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <Field label="Date" required>
                <input name="date" type="date" defaultValue={voucher.date} className={inputClass} />
              </Field>
              <Field label="Type">
                <select name="type" defaultValue={voucher.type} className={inputClass} disabled={linked}>
                  {TYPES.map((t) => (
                    <option key={t} value={t} className="capitalize">{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="Debit head">
                <select name="debit_account_id" defaultValue={voucher.debit_account_id} className={inputClass} disabled={linked}>
                  {heads.map((h) => (
                    <option key={h.id} value={h.id}>{h.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Credit head">
                <select name="credit_account_id" defaultValue={voucher.credit_account_id} className={inputClass} disabled={linked}>
                  {heads.map((h) => (
                    <option key={h.id} value={h.id}>{h.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Amount (৳)">
                <input name="amount" type="number" min={0} step="any" defaultValue={voucher.amount} className={inputClass} disabled={linked} />
              </Field>
              <Field label="Narration" className="sm:col-span-2">
                <textarea name="narration" rows={2} defaultValue={voucher.narration ?? ''} className={inputClass} />
              </Field>

              <div className="mt-1 flex items-center gap-3 sm:col-span-2">
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
    </div>
  );
}
