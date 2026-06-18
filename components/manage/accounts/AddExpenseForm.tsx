'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Plus, X } from 'lucide-react';
import { Card, Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import { BRANCHES } from '@/lib/management/branches';
import type { HeadOption } from './VoucherForm';

const today = () => new Date().toISOString().slice(0, 10);

/** Quick expense voucher — posts in expense mode to /api/admin/accounts/entry. */
export function AddExpenseForm({
  expenseHeads,
  bankHeads,
}: {
  expenseHeads: HeadOption[];
  bankHeads: HeadOption[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [expenseId, setExpenseId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(today());
  const [method, setMethod] = useState<'cash' | 'bank'>('cash');
  const [bankId, setBankId] = useState('');
  const [branch, setBranch] = useState<string>(BRANCHES[0].value);
  const [narration, setNarration] = useState('');

  function reset() {
    setExpenseId('');
    setAmount('');
    setDate(today());
    setMethod('cash');
    setBankId('');
    setBranch(BRANCHES[0].value);
    setNarration('');
  }

  async function submit() {
    if (!expenseId) return toast.error('Select an expense head.');
    const value = Number(amount);
    if (!value || value <= 0) return toast.error('Enter an amount greater than zero.');
    if (method === 'bank' && !bankId) return toast.error('Select the bank account.');

    setSaving(true);
    try {
      const res = await fetch('/api/admin/accounts/entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'expense',
          expense_account_id: expenseId,
          amount: value,
          date,
          method,
          bank_account_id: method === 'bank' ? bankId : undefined,
          branch,
          narration: narration.trim() || null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not record this expense.');
        return;
      }
      toast.success(`Expense posted — voucher ${data.voucher_no}.`);
      reset();
      setOpen(false);
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return (
      <Button type="button" onClick={() => setOpen(true)} disabled={expenseHeads.length === 0}>
        <Plus className="h-4 w-4" /> Add Expense
      </Button>
    );
  }

  return (
    <Card className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">Record an expense</h2>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition hover:bg-muted"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Expense head" required>
          <select className={inputClass} value={expenseId} onChange={(e) => setExpenseId(e.target.value)}>
            <option value="">Select expense head…</option>
            {expenseHeads.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Amount (৳)" required>
          <input
            type="number"
            min="0"
            step="0.01"
            className={inputClass}
            value={amount}
            placeholder="0.00"
            onChange={(e) => setAmount(e.target.value)}
          />
        </Field>

        <Field label="Paid from">
          <div className="flex gap-2">
            {(['cash', 'bank'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={
                  'flex-1 rounded-xl border px-3 py-2.5 text-sm font-semibold capitalize transition ' +
                  (method === m
                    ? 'border-brand-600 bg-brand-50 text-brand-700'
                    : 'border-border text-ink-muted hover:border-brand-600/40')
                }
              >
                {m}
              </button>
            ))}
          </div>
        </Field>
        {method === 'bank' && (
          <Field label="Bank account" required>
            <select className={inputClass} value={bankId} onChange={(e) => setBankId(e.target.value)}>
              <option value="">Select bank account…</option>
              {bankHeads.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </Field>
        )}

        <Field label="Date" required>
          <input type="date" className={inputClass} value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <Field label="Branch">
          <select className={inputClass} value={branch} onChange={(e) => setBranch(e.target.value)}>
            {BRANCHES.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Narration" className="sm:col-span-2">
          <input
            className={inputClass}
            value={narration}
            placeholder="Vendor, bill reference, purpose…"
            onChange={(e) => setNarration(e.target.value)}
          />
        </Field>
      </div>

      <div className="flex justify-end gap-2 border-t border-border pt-4">
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="button" onClick={submit} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Post expense
        </Button>
      </div>
    </Card>
  );
}
