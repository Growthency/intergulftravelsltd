'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, BookOpen } from 'lucide-react';
import { Card, Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import { BRANCHES } from '@/lib/management/branches';
import { money } from '@/lib/management/format';

export type HeadOption = {
  id: string;
  name: string;
  type: string;
  subtype: string;
  code: string | null;
};

type Mode = 'income' | 'expense' | 'transfer' | 'journal';

const MODES: { value: Mode; label: string; icon: typeof BookOpen; hint: string }[] = [
  { value: 'income', label: 'Income', icon: ArrowDownToLine, hint: 'Money received — debit Cash/Bank, credit an income head.' },
  { value: 'expense', label: 'Expense', icon: ArrowUpFromLine, hint: 'Money paid out — debit an expense head, credit Cash/Bank.' },
  { value: 'transfer', label: 'Cash ⇄ Bank', icon: ArrowLeftRight, hint: 'Move funds between cash and a bank account (contra).' },
  { value: 'journal', label: 'Journal', icon: BookOpen, hint: 'Free-form adjustment — pick any debit and credit head.' },
];

const today = () => new Date().toISOString().slice(0, 10);

export function VoucherForm({ heads }: { heads: HeadOption[] }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('income');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(today());
  const [branch, setBranch] = useState<string>(BRANCHES[0].value);
  const [method, setMethod] = useState<'cash' | 'bank'>('cash');
  const [narration, setNarration] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // mode-specific selections
  const [incomeId, setIncomeId] = useState('');
  const [expenseId, setExpenseId] = useState('');
  const [bankId, setBankId] = useState('');
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');
  const [debitId, setDebitId] = useState('');
  const [creditId, setCreditId] = useState('');

  const incomeHeads = useMemo(() => heads.filter((h) => h.type === 'income'), [heads]);
  const expenseHeads = useMemo(() => heads.filter((h) => h.type === 'expense'), [heads]);
  const bankHeads = useMemo(() => heads.filter((h) => h.subtype === 'bank'), [heads]);
  const cashBankHeads = useMemo(() => heads.filter((h) => h.subtype === 'cash' || h.subtype === 'bank'), [heads]);

  function reset() {
    setAmount('');
    setNarration('');
    setIncomeId('');
    setExpenseId('');
    setBankId('');
    setFromId('');
    setToId('');
    setDebitId('');
    setCreditId('');
  }

  async function submit() {
    const value = Number(amount);
    if (!value || value <= 0) {
      toast.error('Enter an amount greater than zero.');
      return;
    }

    const body: Record<string, unknown> = { mode, amount: value, date, branch, method, narration };

    if (mode === 'income') {
      if (!incomeId) return toast.error('Select an income head.');
      if (method === 'bank' && !bankId) return toast.error('Select the bank account.');
      body.income_account_id = incomeId;
      if (method === 'bank') body.bank_account_id = bankId;
    } else if (mode === 'expense') {
      if (!expenseId) return toast.error('Select an expense head.');
      if (method === 'bank' && !bankId) return toast.error('Select the bank account.');
      body.expense_account_id = expenseId;
      if (method === 'bank') body.bank_account_id = bankId;
    } else if (mode === 'transfer') {
      if (!fromId || !toId) return toast.error('Choose both the source and destination accounts.');
      if (fromId === toId) return toast.error('The source and destination must differ.');
      body.from_account_id = fromId;
      body.to_account_id = toId;
    } else {
      if (!debitId || !creditId) return toast.error('Choose both a debit and a credit account.');
      if (debitId === creditId) return toast.error('The debit and credit accounts must differ.');
      body.debit_account_id = debitId;
      body.credit_account_id = creditId;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/accounts/entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not post this voucher.');
        return;
      }
      toast.success(`Voucher ${data.voucher_no} posted.`);
      reset();
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const active = MODES.find((m) => m.value === mode)!;
  const noHeads = heads.length === 0;

  return (
    <Card className="space-y-6">
      {/* Mode tabs */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {MODES.map((m) => {
          const Icon = m.icon;
          const on = m.value === mode;
          return (
            <button
              key={m.value}
              type="button"
              onClick={() => setMode(m.value)}
              className={
                'flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-sm font-semibold transition ' +
                (on
                  ? 'border-brand-600 bg-brand-50 text-brand-700'
                  : 'border-border bg-card text-ink-muted hover:border-brand-600/40 hover:text-brand-700')
              }
            >
              <Icon className="h-5 w-5" />
              {m.label}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-ink-muted">{active.hint}</p>

      {noHeads ? (
        <p className="rounded-xl border border-dashed border-border bg-muted/40 px-4 py-6 text-center text-sm text-ink-muted">
          No account heads are available yet. Create the chart of accounts first, then post vouchers here.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Date" required>
            <input type="date" className={inputClass} value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label="Amount (৳)" required>
            <input
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              className={inputClass}
              value={amount}
              placeholder="0.00"
              onChange={(e) => setAmount(e.target.value)}
            />
          </Field>

          {/* Income mode */}
          {mode === 'income' && (
            <>
              <Field label="Income head" required>
                <select className={inputClass} value={incomeId} onChange={(e) => setIncomeId(e.target.value)}>
                  <option value="">Select income head…</option>
                  {incomeHeads.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </Field>
              <MethodPair method={method} setMethod={setMethod} bankId={bankId} setBankId={setBankId} bankHeads={bankHeads} />
            </>
          )}

          {/* Expense mode */}
          {mode === 'expense' && (
            <>
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
              <MethodPair method={method} setMethod={setMethod} bankId={bankId} setBankId={setBankId} bankHeads={bankHeads} payOut />
            </>
          )}

          {/* Transfer (contra) mode */}
          {mode === 'transfer' && (
            <>
              <Field label="From account" required>
                <select className={inputClass} value={fromId} onChange={(e) => setFromId(e.target.value)}>
                  <option value="">Select source…</option>
                  {cashBankHeads.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="To account" required>
                <select className={inputClass} value={toId} onChange={(e) => setToId(e.target.value)}>
                  <option value="">Select destination…</option>
                  {cashBankHeads.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </Field>
            </>
          )}

          {/* Journal mode */}
          {mode === 'journal' && (
            <>
              <Field label="Debit account" required>
                <select className={inputClass} value={debitId} onChange={(e) => setDebitId(e.target.value)}>
                  <option value="">Select debit head…</option>
                  {heads.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Credit account" required>
                <select className={inputClass} value={creditId} onChange={(e) => setCreditId(e.target.value)}>
                  <option value="">Select credit head…</option>
                  {heads.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
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

          <Field label="Narration" className="sm:col-span-2">
            <input
              className={inputClass}
              value={narration}
              placeholder="What is this entry for?"
              onChange={(e) => setNarration(e.target.value)}
            />
          </Field>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <p className="text-sm text-ink-muted">
          {amount && Number(amount) > 0 ? (
            <>
              Posting <span className="font-semibold text-ink">{money(Number(amount))}</span> as a{' '}
              <span className="font-semibold text-ink">{active.label.toLowerCase()}</span> voucher.
            </>
          ) : (
            'Enter the details, then post the voucher.'
          )}
        </p>
        <Button type="button" onClick={submit} disabled={submitting || noHeads}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Post voucher
        </Button>
      </div>
    </Card>
  );
}

function MethodPair({
  method,
  setMethod,
  bankId,
  setBankId,
  bankHeads,
  payOut,
}: {
  method: 'cash' | 'bank';
  setMethod: (m: 'cash' | 'bank') => void;
  bankId: string;
  setBankId: (id: string) => void;
  bankHeads: HeadOption[];
  payOut?: boolean;
}) {
  return (
    <>
      <Field label={payOut ? 'Paid from' : 'Received in'}>
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
          {bankHeads.length === 0 && (
            <span className="mt-1 block text-xs text-amber-600">
              No bank accounts yet — add one under Cash &amp; Bank.
            </span>
          )}
        </Field>
      )}
    </>
  );
}
