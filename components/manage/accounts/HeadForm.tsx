'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Plus, X } from 'lucide-react';
import { Card, Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import { BRANCHES } from '@/lib/management/branches';
import type { AccountType, AccountSubtype } from '@/lib/management/types';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useLockedBranch } from '@/components/providers/BranchScope';
import { getDict } from '@/lib/dictionaries/areas/adminaccounting';

const TYPE_VALUES: AccountType[] = ['asset', 'liability', 'income', 'expense', 'equity'];
const TYPE_LABEL_KEY: Record<AccountType, keyof ReturnType<typeof getDict>['headForm']> = {
  asset: 'typeAsset',
  liability: 'typeLiability',
  income: 'typeIncome',
  expense: 'typeExpense',
  equity: 'typeEquity',
};

const SUBTYPE_VALUES: AccountSubtype[] = ['general', 'cash', 'bank', 'customer', 'supplier', 'loan', 'income', 'expense', 'equity'];
const SUBTYPE_LABEL_KEY: Record<AccountSubtype, keyof ReturnType<typeof getDict>['headForm']> = {
  general: 'subGeneral',
  cash: 'subCash',
  bank: 'subBank',
  customer: 'subCustomer',
  supplier: 'subSupplier',
  loan: 'subLoan',
  income: 'subIncome',
  expense: 'subExpense',
  equity: 'subEquity',
};

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
  const t = getDict(useLocale());
  const lockedBranch = useLockedBranch();
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
      toast.error(t.headForm.errName);
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
        toast.error(data?.error ?? t.headForm.errCreate);
        return;
      }
      toast.success(t.headForm.created(name.trim()));
      reset();
      setOpen(false);
      router.refresh();
    } catch {
      toast.error(t.common.networkError);
    } finally {
      setSaving(false);
    }
  }

  const label = buttonLabel ?? (bankOnly ? t.headForm.addBankAccount : t.headForm.newHead);

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
          {bankOnly ? t.headForm.newBankAccount : t.headForm.newAccountHead}
        </h2>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition hover:bg-muted"
          aria-label={t.common.close}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.headForm.accountName} required className="sm:col-span-2">
          <input
            className={inputClass}
            value={name}
            placeholder={bankOnly ? t.headForm.placeholderBank : t.headForm.placeholderHead}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

        {!bankOnly && (
          <>
            <Field label={t.headForm.type} required>
              <select
                className={inputClass}
                value={type}
                onChange={(e) => setType(e.target.value as AccountType)}
              >
                {TYPE_VALUES.map((v) => (
                  <option key={v} value={v}>
                    {t.headForm[TYPE_LABEL_KEY[v]] as string}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t.headForm.subtype}>
              <select
                className={inputClass}
                value={subtype}
                onChange={(e) => setSubtype(e.target.value as AccountSubtype)}
              >
                {SUBTYPE_VALUES.map((v) => (
                  <option key={v} value={v}>
                    {t.headForm[SUBTYPE_LABEL_KEY[v]] as string}
                  </option>
                ))}
              </select>
            </Field>
          </>
        )}

        {showBank && (
          <>
            <Field label={t.headForm.bankName}>
              <input
                className={inputClass}
                value={bankName}
                placeholder={t.headForm.bankNamePlaceholder}
                onChange={(e) => setBankName(e.target.value)}
              />
            </Field>
            <Field label={t.headForm.accountNumber}>
              <input
                className={inputClass}
                value={accountNo}
                placeholder={t.headForm.accountNumberPlaceholder}
                onChange={(e) => setAccountNo(e.target.value)}
              />
            </Field>
          </>
        )}

        {lockedBranch ? (
          <input type="hidden" name="branch" value={lockedBranch} />
        ) : (
          <Field label={t.headForm.branch}>
            <select className={inputClass} value={branch} onChange={(e) => setBranch(e.target.value)}>
              {BRANCHES.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </Field>
        )}

        <Field label={t.headForm.openingBalance} hint={t.headForm.openingHint}>
          <input
            type="number"
            min="0"
            step="0.01"
            className={inputClass}
            value={openingBalance}
            placeholder={t.headForm.openingBalancePlaceholder}
            onChange={(e) => setOpeningBalance(e.target.value)}
          />
        </Field>

        {Number(openingBalance) > 0 && (
          <Field label={t.headForm.openingSide}>
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
                {t.headForm.debit}
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
                {t.headForm.credit}
              </button>
            </div>
          </Field>
        )}
      </div>

      <div className="flex justify-end gap-2 border-t border-border pt-4">
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          {t.headForm.cancel}
        </Button>
        <Button type="button" onClick={submit} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {bankOnly ? t.headForm.addBankBtn : t.headForm.createHead}
        </Button>
      </div>
    </Card>
  );
}
