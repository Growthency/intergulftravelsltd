/**
 * Pure report builders for the management module. Each function takes already
 * fetched rows (account heads / transactions) and returns the computed report
 * shape — no I/O here, so the pages stay thin and these stay testable.
 */

import type { AccountHead, AccountType, Transaction } from '@/lib/management/types';
import { netDebit, naturalBalance, isDebitNormal } from '@/lib/management/types';

/* ----------------------------- Trial Balance ----------------------------- */

export type TrialBalanceRow = {
  id: string;
  code: string | null;
  name: string;
  type: AccountType;
  debit: number;
  credit: number;
};

export type TrialBalanceReport = {
  rows: TrialBalanceRow[];
  totalDebit: number;
  totalCredit: number;
  balanced: boolean;
};

/** Every active head split into its debit / credit balance via netDebit(). */
export function buildTrialBalance(heads: AccountHead[]): TrialBalanceReport {
  const rows: TrialBalanceRow[] = [];
  let totalDebit = 0;
  let totalCredit = 0;

  for (const h of heads) {
    const nd = netDebit(h);
    const debit = nd > 0 ? nd : 0;
    const credit = nd < 0 ? -nd : 0;
    if (debit === 0 && credit === 0) continue; // skip zero-balance heads
    totalDebit += debit;
    totalCredit += credit;
    rows.push({ id: h.id, code: h.code, name: h.name, type: h.type, debit, credit });
  }

  rows.sort((a, b) => (a.code ?? '').localeCompare(b.code ?? '') || a.name.localeCompare(b.name));

  return {
    rows,
    totalDebit,
    totalCredit,
    balanced: Math.abs(totalDebit - totalCredit) < 0.01,
  };
}

/* -------------------------------- Day Book -------------------------------- */

export type DayBookRow = {
  id: string;
  voucher_no: string | null;
  type: Transaction['type'];
  debitName: string;
  creditName: string;
  narration: string | null;
  branch: string;
  amount: number;
};

export type DayBookReport = {
  rows: DayBookRow[];
  total: number;
};

/** Transactions for a single day, resolved to debit / credit head names. */
export function buildDayBook(transactions: Transaction[], heads: AccountHead[]): DayBookReport {
  const nameOf = new Map(heads.map((h) => [h.id, h.name]));
  let total = 0;
  const rows: DayBookRow[] = transactions.map((t) => {
    total += Number(t.amount);
    return {
      id: t.id,
      voucher_no: t.voucher_no,
      type: t.type,
      debitName: nameOf.get(t.debit_account_id) ?? 'Unknown',
      creditName: nameOf.get(t.credit_account_id) ?? 'Unknown',
      narration: t.narration,
      branch: t.branch,
      amount: Number(t.amount),
    };
  });
  return { rows, total };
}

/* --------------------------- Income & Expense ----------------------------- */

export type PnlLine = { id: string; name: string; amount: number };

export type IncomeExpenseReport = {
  income: PnlLine[];
  expense: PnlLine[];
  totalIncome: number;
  totalExpense: number;
  net: number; // positive = profit, negative = loss
};

/**
 * P&L for a date range. We re-derive each head's movement from the supplied
 * transactions (range-scoped) rather than the lifetime debit/credit totals, so
 * the figures match the chosen period.
 */
export function buildIncomeExpense(
  heads: AccountHead[],
  transactions: Transaction[],
): IncomeExpenseReport {
  const headById = new Map(heads.map((h) => [h.id, h]));
  // movement keyed by head id: net debit position from the period's vouchers
  const debit = new Map<string, number>();
  const credit = new Map<string, number>();

  for (const t of transactions) {
    debit.set(t.debit_account_id, (debit.get(t.debit_account_id) ?? 0) + Number(t.amount));
    credit.set(t.credit_account_id, (credit.get(t.credit_account_id) ?? 0) + Number(t.amount));
  }

  const income: PnlLine[] = [];
  const expense: PnlLine[] = [];
  let totalIncome = 0;
  let totalExpense = 0;

  for (const h of heads) {
    if (h.type !== 'income' && h.type !== 'expense') continue;
    const d = debit.get(h.id) ?? 0;
    const c = credit.get(h.id) ?? 0;
    if (h.type === 'income') {
      // income is credit-normal → earned = credits − debits (refunds)
      const amount = c - d;
      if (amount === 0) continue;
      totalIncome += amount;
      income.push({ id: h.id, name: h.name, amount });
    } else {
      // expense is debit-normal → spent = debits − credits (reversals)
      const amount = d - c;
      if (amount === 0) continue;
      totalExpense += amount;
      expense.push({ id: h.id, name: h.name, amount });
    }
  }

  income.sort((a, b) => b.amount - a.amount);
  expense.sort((a, b) => b.amount - a.amount);

  // headById is used to keep the signature honest for callers passing the full
  // chart; lines already carry their names so no further lookup is needed.
  void headById;

  return {
    income,
    expense,
    totalIncome,
    totalExpense,
    net: totalIncome - totalExpense,
  };
}

/* ------------------------------ Balance Sheet ----------------------------- */

export type BalanceSheetLine = { id: string; name: string; amount: number };

export type BalanceSheetReport = {
  assets: BalanceSheetLine[];
  liabilities: BalanceSheetLine[];
  equity: BalanceSheetLine[];
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  // current-period profit folded into equity so the sheet balances
  retainedEarnings: number;
  totalLiabEquity: number;
  balanced: boolean;
};

/**
 * Assets vs Liabilities + Equity from lifetime head balances. Income/expense
 * heads are netted into retained earnings (profit) on the equity side so the
 * statement balances without a separate closing entry.
 */
export function buildBalanceSheet(heads: AccountHead[]): BalanceSheetReport {
  const assets: BalanceSheetLine[] = [];
  const liabilities: BalanceSheetLine[] = [];
  const equity: BalanceSheetLine[] = [];
  let totalAssets = 0;
  let totalLiabilities = 0;
  let totalEquity = 0;
  let income = 0;
  let expense = 0;

  for (const h of heads) {
    const bal = naturalBalance(h); // positive on the account's normal side
    if (h.type === 'asset') {
      if (bal === 0) continue;
      totalAssets += bal;
      assets.push({ id: h.id, name: h.name, amount: bal });
    } else if (h.type === 'liability') {
      if (bal === 0) continue;
      totalLiabilities += bal;
      liabilities.push({ id: h.id, name: h.name, amount: bal });
    } else if (h.type === 'equity') {
      if (bal === 0) continue;
      totalEquity += bal;
      equity.push({ id: h.id, name: h.name, amount: bal });
    } else if (h.type === 'income') {
      income += bal;
    } else if (h.type === 'expense') {
      expense += bal;
    }
  }

  const retainedEarnings = income - expense; // net profit/loss for all time
  const totalLiabEquity = totalLiabilities + totalEquity + retainedEarnings;

  assets.sort((a, b) => b.amount - a.amount);
  liabilities.sort((a, b) => b.amount - a.amount);
  equity.sort((a, b) => b.amount - a.amount);

  return {
    assets,
    liabilities,
    equity,
    totalAssets,
    totalLiabilities,
    totalEquity,
    retainedEarnings,
    totalLiabEquity,
    balanced: Math.abs(totalAssets - totalLiabEquity) < 0.01,
  };
}

/* ------------------------------ Due / Aging ------------------------------- */

export type DueRow = {
  id: string;
  code: string | null;
  name: string;
  phone: string | null;
  branch: string;
  due: number;
};

export type DueReport = {
  rows: DueRow[];
  total: number;
};

/** Customer heads carrying an outstanding due (positive natural balance). */
export function buildDueReport(heads: AccountHead[]): DueReport {
  const rows: DueRow[] = [];
  let total = 0;

  for (const h of heads) {
    if (h.subtype !== 'customer') continue;
    const due = naturalBalance(h);
    if (due <= 0.009) continue;
    total += due;
    rows.push({
      id: h.id,
      code: h.code,
      name: h.name,
      phone: h.party_phone,
      branch: h.branch,
      due,
    });
  }

  rows.sort((a, b) => b.due - a.due);
  return { rows, total };
}

/* -------------------------------- helpers --------------------------------- */

export const TYPE_LABEL: Record<AccountType, string> = {
  asset: 'Asset',
  liability: 'Liability',
  income: 'Income',
  expense: 'Expense',
  equity: 'Equity',
};

export { isDebitNormal };
