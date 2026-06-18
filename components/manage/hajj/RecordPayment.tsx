'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';

export type BankOption = { id: string; name: string };

export function RecordPayment({
  pilgrimId,
  bankAccounts,
}: {
  pilgrimId: string;
  bankAccounts: BankOption[];
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [method, setMethod] = useState<'cash' | 'bank'>('cash');

  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saving) return;
    const form = e.currentTarget;
    const fd = new FormData(form);

    const amount = Number(fd.get('amount') ?? 0);
    if (!(amount > 0)) {
      toast.error('Enter an amount greater than zero.');
      return;
    }
    if (method === 'bank' && !fd.get('bank_account_id')) {
      toast.error('Select a bank account.');
      return;
    }

    const payload = {
      amount,
      method,
      bank_account_id: method === 'bank' ? String(fd.get('bank_account_id') ?? '') || null : null,
      type: String(fd.get('type') ?? 'installment'),
      date: String(fd.get('date') ?? today),
      narration: String(fd.get('narration') ?? ''),
    };

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/hajj/${pilgrimId}/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not record the payment.');
        return;
      }
      toast.success('Payment recorded.');
      form.reset();
      setMethod('cash');
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <Field label="Amount (৳)" required>
        <input name="amount" type="number" min={0} step="any" className={inputClass} placeholder="0" />
      </Field>
      <Field label="Date">
        <input name="date" type="date" defaultValue={today} className={inputClass} />
      </Field>
      <Field label="Method" required>
        <select
          name="method"
          className={inputClass}
          value={method}
          onChange={(e) => setMethod(e.target.value as 'cash' | 'bank')}
        >
          <option value="cash">Cash</option>
          <option value="bank">Bank</option>
        </select>
      </Field>
      {method === 'bank' && (
        <Field label="Bank account" required>
          <select name="bank_account_id" className={inputClass} defaultValue="">
            <option value="">Select account…</option>
            {bankAccounts.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          {bankAccounts.length === 0 && (
            <span className="mt-1 block text-xs text-red-600">No bank accounts set up yet.</span>
          )}
        </Field>
      )}
      <Field label="Type">
        <select name="type" className={inputClass} defaultValue="installment">
          <option value="installment">Installment</option>
          <option value="advance">Advance</option>
          <option value="token">Token</option>
          <option value="full">Full payment</option>
          <option value="refund">Refund</option>
        </select>
      </Field>
      <Field label="Narration" className="sm:col-span-2">
        <input name="narration" className={inputClass} placeholder="Optional note for the receipt" />
      </Field>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? 'Recording…' : 'Record payment'}
        </Button>
      </div>
    </form>
  );
}
