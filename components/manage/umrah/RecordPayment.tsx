'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';

type BankAccount = { id: string; name: string };

const PAYMENT_TYPES: { value: string; label: string }[] = [
  { value: 'advance', label: 'Advance' },
  { value: 'installment', label: 'Installment' },
  { value: 'token', label: 'Token money' },
  { value: 'full', label: 'Full payment' },
];

export function RecordPayment({
  passengerId,
  bankAccounts,
  due,
}: {
  passengerId: string;
  bankAccounts: BankAccount[];
  due: number;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    amount: '',
    method: 'cash',
    bank_account_id: '',
    type: 'installment',
    date: new Date().toISOString().slice(0, 10),
    narration: '',
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!amount || amount <= 0) {
      toast.error('Enter an amount greater than zero.');
      return;
    }
    if (form.method === 'bank' && !form.bank_account_id) {
      toast.error('Select the receiving bank account.');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/umrah/${passengerId}/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          method: form.method,
          bank_account_id: form.method === 'bank' ? form.bank_account_id : null,
          type: form.type,
          date: form.date,
          narration: form.narration,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not record the payment.');
        return;
      }
      toast.success(`Payment recorded${data.voucher_no ? ` · ${data.voucher_no}` : ''}.`);
      setForm((f) => ({ ...f, amount: '', narration: '' }));
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Amount (৳)" required hint={due > 0 ? `Due: ৳ ${due.toLocaleString('en-IN')}` : undefined}>
          <input
            type="number"
            min={0}
            step="0.01"
            className={inputClass}
            value={form.amount}
            onChange={set('amount')}
            placeholder="0"
          />
        </Field>
        <Field label="Date" required>
          <input type="date" className={inputClass} value={form.date} onChange={set('date')} />
        </Field>
        <Field label="Method" required>
          <select className={inputClass} value={form.method} onChange={set('method')}>
            <option value="cash">Cash</option>
            <option value="bank">Bank</option>
          </select>
        </Field>
        {form.method === 'bank' && (
          <Field label="Bank account" required>
            <select className={inputClass} value={form.bank_account_id} onChange={set('bank_account_id')}>
              <option value="">Select account…</option>
              {bankAccounts.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </Field>
        )}
        <Field label="Payment type" required>
          <select className={inputClass} value={form.type} onChange={set('type')}>
            {PAYMENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Narration" className="sm:col-span-2">
          <input
            className={inputClass}
            value={form.narration}
            onChange={set('narration')}
            placeholder="e.g. 2nd installment, received by hand"
          />
        </Field>
      </div>
      {bankAccounts.length === 0 && form.method === 'bank' && (
        <p className="text-xs text-amber-600">
          No bank account heads found. Add one under Cash &amp; Bank to receive bank payments.
        </p>
      )}
      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {saving ? 'Recording…' : 'Record payment'}
        </Button>
      </div>
    </form>
  );
}
