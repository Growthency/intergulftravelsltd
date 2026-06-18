'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Plus, X } from 'lucide-react';
import { Card, Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import { BRANCHES } from '@/lib/management/branches';
import type { AccountType, AccountSubtype } from '@/lib/management/types';

const TYPES: { value: AccountType; label: string }[] = [
  { value: 'asset', label: 'Asset' },
  { value: 'liability', label: 'Liability' },
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
  { value: 'equity', label: 'Equity' },
];

const SUBTYPES: { value: AccountSubtype; label: string }[] = [
  { value: 'general', label: 'General' },
  { value: 'cash', label: 'Cash' },
  { value: 'bank', label: 'Bank' },
  { value: 'customer', label: 'Customer' },
  { value: 'supplier', label: 'Supplier' },
  { value: 'loan', label: 'Loan' },
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
  { value: 'equity', label: 'Equity' },
];

/**
 * Account-head creator. In `bankOnly` mode the form is locked to a bank
 * account (used by the Cash & Bank page); otherwise it is the full
 * chart-of-accounts creator used by the Account Heads page.
 */
export function HeadForm({
  bankOnly = false,
  buttonLabel,
}: {
  bankOnly?: boolean;
  buttonLabel?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState('');
  const [type, setType] = useState<AccountType>(bankOnly ? 'asset' : 'expense');
  const [subtype, setSubtype] = useState<AccountSubtype>(bankOnly ? 'bank' : 'general');
  const [branch, setBranch] = useState<string>(BRANCHES[0].value);
  const [openingBalance, setOpeningBalance] = useState('');
  const [openingIsDebit, setOpeningIsDebit] = useState(true);
  const [bankName, setBankName] = useState('');
  const [accountNo, setAccountNo] = useState('');

  const showBank = bankOnly || subtype === 'bank';

  function reset() {
    setName('');
    setType(bankOnly ? 'asset' : 'expense');
    setSubtype(bankOnly ? 'bank' : 'general');
    setBranch(BRANCHES[0].value);
    setOpeningBalance('');
    setOpeningIsDebit(true);
    setBankName('');
    setAccountNo('');
  }

  async function submit() {
    if (!name.trim()) {
      toast.error('Enter an account name.');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/accounts/heads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          type,
          subtype,
          branch,
          opening_balance: openingBalance ? Number(openingBalance) : 0,
          opening_is_debit: openingIsDebit,
          bank_name: showBank ? bankName.trim() || null : null,
          account_no: showBank ? accountNo.trim() || null : null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not create the account.');
        return;
      }
      toast.success(`${name.trim()} created.`);
      reset();
      setOpen(false);
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  const label = buttonLabel ?? (bankOnly ? 'Add Bank Account' : 'New Head');

  if (!open) {
    return (
      <Button type="button" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" /> {label}
      </Button>
    );
  }

  return (
    <Card className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">
          {bankOnly ? 'New bank account' : 'New account head'}
        </h2>
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
        <Field label="Account name" required className="sm:col-span-2">
          <input
            className={inputClass}
            value={name}
            placeholder={bankOnly ? 'e.g. Islami Bank — Current A/C' : 'e.g. Marketing Expense'}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

        {!bankOnly && (
          <>
            <Field label="Type" required>
              <select
                className={inputClass}
                value={type}
                onChange={(e) => setType(e.target.value as AccountType)}
              >
                {TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Subtype">
              <select
                className={inputClass}
                value={subtype}
                onChange={(e) => setSubtype(e.target.value as AccountSubtype)}
              >
                {SUBTYPES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
          </>
        )}

        {showBank && (
          <>
            <Field label="Bank name">
              <input
                className={inputClass}
                value={bankName}
                placeholder="e.g. Islami Bank Bangladesh"
                onChange={(e) => setBankName(e.target.value)}
              />
            </Field>
            <Field label="Account number">
              <input
                className={inputClass}
                value={accountNo}
                placeholder="0000 0000 0000"
                onChange={(e) => setAccountNo(e.target.value)}
              />
            </Field>
          </>
        )}

        <Field label="Branch">
          <select className={inputClass} value={branch} onChange={(e) => setBranch(e.target.value)}>
            {BRANCHES.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Opening balance (৳)" hint="Leave 0 if this is a new account.">
          <input
            type="number"
            min="0"
            step="0.01"
            className={inputClass}
            value={openingBalance}
            placeholder="0.00"
            onChange={(e) => setOpeningBalance(e.target.value)}
          />
        </Field>

        {Number(openingBalance) > 0 && (
          <Field label="Opening side">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOpeningIsDebit(true)}
                className={
                  'flex-1 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ' +
                  (openingIsDebit
                    ? 'border-brand-600 bg-brand-50 text-brand-700'
                    : 'border-border text-ink-muted hover:border-brand-600/40')
                }
              >
                Debit
              </button>
              <button
                type="button"
                onClick={() => setOpeningIsDebit(false)}
                className={
                  'flex-1 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ' +
                  (!openingIsDebit
                    ? 'border-brand-600 bg-brand-50 text-brand-700'
                    : 'border-border text-ink-muted hover:border-brand-600/40')
                }
              >
                Credit
              </button>
            </div>
          </Field>
        )}
      </div>

      <div className="flex justify-end gap-2 border-t border-border pt-4">
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="button" onClick={submit} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {bankOnly ? 'Add bank account' : 'Create head'}
        </Button>
      </div>
    </Card>
  );
}
