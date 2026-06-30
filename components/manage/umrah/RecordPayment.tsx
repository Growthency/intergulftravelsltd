'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/adminumrah';

type BankAccount = { id: string; name: string };

export function RecordPayment({
  passengerId,
  bankAccounts,
  due,
}: {
  passengerId: string;
  bankAccounts: BankAccount[];
  due: number;
}) {
  const t = getDict(useLocale());
  const PAYMENT_TYPES: { value: string; label: string }[] = [
    { value: 'advance', label: t.ptAdvance },
    { value: 'installment', label: t.ptInstallment },
    { value: 'token', label: t.ptToken },
    { value: 'full', label: t.ptFull },
  ];
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
      toast.error(t.toastAmountPositive);
      return;
    }
    if (form.method === 'bank' && !form.bank_account_id) {
      toast.error(t.toastSelectBank);
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
        toast.error(data?.error ?? t.toastPaymentFail);
        return;
      }
      toast.success(`${t.toastPaymentRecorded}${data.voucher_no ? ` · ${data.voucher_no}` : ''}.`);
      setForm((f) => ({ ...f, amount: '', narration: '' }));
      router.refresh();
    } catch {
      toast.error(t.toastNetwork);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.amountTaka} required hint={due > 0 ? `${t.dueLabel} ৳ ${due.toLocaleString('en-IN')}` : undefined}>
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
        <Field label={t.rpDate} required>
          <input type="date" className={inputClass} value={form.date} onChange={set('date')} />
        </Field>
        <Field label={t.rpMethod} required>
          <select className={inputClass} value={form.method} onChange={set('method')}>
            <option value="cash">{t.methodCash}</option>
            <option value="bank">{t.methodBank}</option>
          </select>
        </Field>
        {form.method === 'bank' && (
          <Field label={t.bankAccount} required>
            <select className={inputClass} value={form.bank_account_id} onChange={set('bank_account_id')}>
              <option value="">{t.selectAccount}</option>
              {bankAccounts.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </Field>
        )}
        <Field label={t.paymentType} required>
          <select className={inputClass} value={form.type} onChange={set('type')}>
            {PAYMENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </Field>
        <Field label={t.narration} className="sm:col-span-2">
          <input
            className={inputClass}
            value={form.narration}
            onChange={set('narration')}
            placeholder={t.narrationPlaceholder}
          />
        </Field>
      </div>
      {bankAccounts.length === 0 && form.method === 'bank' && (
        <p className="text-xs text-amber-600">
          {t.noBankHeads}
        </p>
      )}
      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {saving ? t.recordingEllipsis : t.recordPayment}
        </Button>
      </div>
    </form>
  );
}
