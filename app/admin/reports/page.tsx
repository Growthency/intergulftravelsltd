import Link from 'next/link';
import {
  Scale,
  BookOpen,
  TrendingUp,
  Landmark,
  HandCoins,
  ArrowLeft,
  BarChart3,
} from 'lucide-react';
import { mgmtDb } from '@/lib/management/server';
import { getStaffScope } from '@/lib/management/scope';
import type { AccountHead, Transaction } from '@/lib/management/types';
import { money } from '@/lib/management/format';
import { branchLabel } from '@/lib/management/branches';
import { formatDate } from '@/lib/utils';
import { PageHeader, Card, EmptyState, TableWrap, thClass, tdClass, Money, Badge } from '@/components/manage/ui';
import { ExportBar } from '@/components/manage/ExportBar';
import { ReportFilters } from '@/components/manage/reports/ReportFilters';
import {
  buildTrialBalance,
  buildDayBook,
  buildIncomeExpense,
  buildBalanceSheet,
  buildDueReport,
  TYPE_LABEL,
} from '@/lib/management/reports';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Reports & Export' };

type ReportKey = 'trial-balance' | 'day-book' | 'income-expense' | 'balance-sheet' | 'due-aging';

const REPORTS: {
  key: ReportKey;
  title: string;
  desc: string;
  icon: typeof Scale;
  mode: 'date' | 'range' | 'asof' | 'none';
}[] = [
  {
    key: 'trial-balance',
    title: 'Trial Balance',
    desc: 'Every active head with its debit / credit balance. Totals must agree.',
    icon: Scale,
    mode: 'none',
  },
  {
    key: 'day-book',
    title: 'Day Book',
    desc: 'All vouchers posted on a chosen day, with particulars and amounts.',
    icon: BookOpen,
    mode: 'date',
  },
  {
    key: 'income-expense',
    title: 'Income & Expense',
    desc: 'Profit & loss for a date range — income heads against expense heads.',
    icon: TrendingUp,
    mode: 'range',
  },
  {
    key: 'balance-sheet',
    title: 'Balance Sheet',
    desc: 'Assets against liabilities and equity as of a date.',
    icon: Landmark,
    mode: 'asof',
  },
  {
    key: 'due-aging',
    title: 'Due / Aging',
    desc: 'Customers carrying an outstanding balance, largest due first.',
    icon: HandCoins,
    mode: 'none',
  },
];

const today = () => new Date().toISOString().slice(0, 10);

/* ----------------------------- data fetchers ----------------------------- */

async function fetchHeads(branch: string): Promise<AccountHead[]> {
  try {
    const db = mgmtDb();
    let q = db.from('account_heads').select('*').eq('active', true);
    if (branch) q = q.eq('branch', branch);
    const { data, error } = await q;
    if (error) return [];
    return (data ?? []) as AccountHead[];
  } catch {
    return [];
  }
}

async function fetchTransactions(opts: {
  branch: string;
  date?: string;
  from?: string;
  to?: string;
  asOf?: string;
}): Promise<Transaction[]> {
  try {
    const db = mgmtDb();
    let q = db.from('transactions').select('*').order('date', { ascending: true }).order('created_at', {
      ascending: true,
    });
    if (opts.branch) q = q.eq('branch', opts.branch);
    if (opts.date) q = q.eq('date', opts.date);
    if (opts.from) q = q.gte('date', opts.from);
    if (opts.to) q = q.lte('date', opts.to);
    if (opts.asOf) q = q.lte('date', opts.asOf);
    const { data, error } = await q;
    if (error) return [];
    return (data ?? []) as Transaction[];
  } catch {
    return [];
  }
}

/* --------------------------------- page ---------------------------------- */

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: { report?: string; date?: string; from?: string; to?: string; branch?: string };
}) {
  const reportKey = searchParams.report as ReportKey | undefined;
  const active = REPORTS.find((r) => r.key === reportKey);

  // --- Hub view (no report selected) ---
  if (!active) {
    return (
      <>
        <PageHeader
          title="Reports & Export"
          subtitle="Accounting statements for Inter Gulf Travels. Open a report, set the dates, then export to Excel, PDF or print."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {REPORTS.map((r) => {
            const Icon = r.icon;
            return (
              <Link
                key={r.key}
                href={`/admin/reports?report=${r.key}`}
                className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-600/40 hover:shadow-emerald"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-display text-lg font-semibold text-ink">{r.title}</p>
                <p className="mt-1 text-sm text-ink-muted">{r.desc}</p>
              </Link>
            );
          })}
        </div>
      </>
    );
  }

  // --- Report view ---
  const scope = await getStaffScope();
  const branch = scope.branch ?? (searchParams.branch ?? '');
  const date = searchParams.date || today();
  const from = searchParams.from || `${today().slice(0, 4)}-01-01`;
  const to = searchParams.to || today();

  const branchTag = branch ? branchLabel(branch) : 'All branches';

  return (
    <>
      <div className="mb-4">
        <Link
          href="/admin/reports"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" /> All reports
        </Link>
      </div>
      <PageHeader title={active.title} subtitle={active.desc} />

      <Card className="mb-5">
        <ReportFilters
          report={active.key}
          mode={active.mode}
          date={date}
          from={from}
          to={to}
          branch={branch}
        />
      </Card>

      {active.key === 'trial-balance' && (
        <TrialBalanceView branch={branch} branchTag={branchTag} />
      )}
      {active.key === 'day-book' && (
        <DayBookView branch={branch} branchTag={branchTag} date={date} />
      )}
      {active.key === 'income-expense' && (
        <IncomeExpenseView branch={branch} branchTag={branchTag} from={from} to={to} />
      )}
      {active.key === 'balance-sheet' && (
        <BalanceSheetView branch={branch} branchTag={branchTag} asOf={date} />
      )}
      {active.key === 'due-aging' && <DueView branch={branch} branchTag={branchTag} />}
    </>
  );
}

/* =============================== Trial Balance ============================ */

async function TrialBalanceView({ branch, branchTag }: { branch: string; branchTag: string }) {
  const heads = await fetchHeads(branch);
  const report = buildTrialBalance(heads);

  if (report.rows.length === 0) {
    return (
      <EmptyState
        title="No balances to show"
        hint="Once account heads carry opening balances or posted vouchers, the trial balance will appear here."
      />
    );
  }

  const headers = ['Code', 'Account head', 'Type', 'Debit (৳)', 'Credit (৳)'];
  const rows = report.rows.map((r) => [
    r.code ?? '',
    r.name,
    TYPE_LABEL[r.type],
    r.debit ? money(r.debit, false) : '',
    r.credit ? money(r.credit, false) : '',
  ]);
  rows.push(['', 'TOTAL', '', money(report.totalDebit, false), money(report.totalCredit, false)]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge tone={report.balanced ? 'emerald' : 'red'}>
          {report.balanced ? 'Balanced' : 'Out of balance'}
        </Badge>
        <ExportBar
          filename={`trial-balance-${today()}`}
          title="Trial Balance"
          subtitle={`${branchTag} · as of ${formatDate(today())}`}
          headers={headers}
          rows={rows}
        />
      </div>
      <TableWrap>
        <thead>
          <tr>
            <th className={thClass}>Code</th>
            <th className={thClass}>Account Head</th>
            <th className={thClass}>Type</th>
            <th className={`${thClass} text-right`}>Debit</th>
            <th className={`${thClass} text-right`}>Credit</th>
          </tr>
        </thead>
        <tbody>
          {report.rows.map((r) => (
            <tr key={r.id}>
              <td className={`${tdClass} font-mono text-xs text-ink-muted`}>{r.code ?? '—'}</td>
              <td className={`${tdClass} font-medium`}>{r.name}</td>
              <td className={tdClass}>
                <Badge>{TYPE_LABEL[r.type]}</Badge>
              </td>
              <td className={`${tdClass} text-right tabular-nums`}>
                {r.debit ? money(r.debit, false) : '—'}
              </td>
              <td className={`${tdClass} text-right tabular-nums`}>
                {r.credit ? money(r.credit, false) : '—'}
              </td>
            </tr>
          ))}
          <tr className="bg-muted/50 font-semibold">
            <td className={tdClass} colSpan={3}>
              Total
            </td>
            <td className={`${tdClass} text-right tabular-nums`}>{money(report.totalDebit, false)}</td>
            <td className={`${tdClass} text-right tabular-nums`}>{money(report.totalCredit, false)}</td>
          </tr>
        </tbody>
      </TableWrap>
    </div>
  );
}

/* ================================= Day Book ============================== */

async function DayBookView({
  branch,
  branchTag,
  date,
}: {
  branch: string;
  branchTag: string;
  date: string;
}) {
  const [heads, transactions] = await Promise.all([
    fetchHeads(branch),
    fetchTransactions({ branch, date }),
  ]);
  const report = buildDayBook(transactions, heads);

  if (report.rows.length === 0) {
    return (
      <EmptyState
        title="No vouchers on this day"
        hint={`No transactions were posted on ${formatDate(date)} for ${branchTag.toLowerCase()}.`}
      />
    );
  }

  const headers = ['Voucher', 'Dr — Account', 'Cr — Account', 'Narration', 'Amount (৳)'];
  const rows = report.rows.map((r) => [
    r.voucher_no ?? '',
    r.debitName,
    r.creditName,
    r.narration ?? '',
    money(r.amount, false),
  ]);
  rows.push(['', '', '', 'TOTAL', money(report.total, false)]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          {report.rows.length} voucher{report.rows.length === 1 ? '' : 's'} · {formatDate(date)}
        </p>
        <ExportBar
          filename={`day-book-${date}`}
          title="Day Book"
          subtitle={`${branchTag} · ${formatDate(date)}`}
          headers={headers}
          rows={rows}
          orientation="l"
        />
      </div>
      <TableWrap>
        <thead>
          <tr>
            <th className={thClass}>Voucher</th>
            <th className={thClass}>Dr — Account</th>
            <th className={thClass}>Cr — Account</th>
            <th className={thClass}>Narration</th>
            <th className={`${thClass} text-right`}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {report.rows.map((r) => (
            <tr key={r.id}>
              <td className={`${tdClass} font-mono text-xs`}>{r.voucher_no ?? '—'}</td>
              <td className={`${tdClass} font-medium`}>{r.debitName}</td>
              <td className={tdClass}>{r.creditName}</td>
              <td className={`${tdClass} text-ink-muted`}>{r.narration ?? '—'}</td>
              <td className={`${tdClass} text-right tabular-nums`}>{money(r.amount, false)}</td>
            </tr>
          ))}
          <tr className="bg-muted/50 font-semibold">
            <td className={tdClass} colSpan={4}>
              Total for the day
            </td>
            <td className={`${tdClass} text-right tabular-nums`}>{money(report.total, false)}</td>
          </tr>
        </tbody>
      </TableWrap>
    </div>
  );
}

/* ============================ Income & Expense =========================== */

async function IncomeExpenseView({
  branch,
  branchTag,
  from,
  to,
}: {
  branch: string;
  branchTag: string;
  from: string;
  to: string;
}) {
  const [heads, transactions] = await Promise.all([
    fetchHeads(branch),
    fetchTransactions({ branch, from, to }),
  ]);
  const report = buildIncomeExpense(heads, transactions);

  if (report.income.length === 0 && report.expense.length === 0) {
    return (
      <EmptyState
        title="No income or expenses in this period"
        hint={`Nothing was posted between ${formatDate(from)} and ${formatDate(to)} for ${branchTag.toLowerCase()}.`}
      />
    );
  }

  const headers = ['Section', 'Head', 'Amount (৳)'];
  const rows: (string | number)[][] = [];
  report.income.forEach((l) => rows.push(['Income', l.name, money(l.amount, false)]));
  rows.push(['Income', 'Total income', money(report.totalIncome, false)]);
  report.expense.forEach((l) => rows.push(['Expense', l.name, money(l.amount, false)]));
  rows.push(['Expense', 'Total expense', money(report.totalExpense, false)]);
  rows.push(['', report.net >= 0 ? 'Net profit' : 'Net loss', money(Math.abs(report.net), false)]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          {formatDate(from)} — {formatDate(to)} · {branchTag}
        </p>
        <ExportBar
          filename={`income-expense-${from}_${to}`}
          title="Income & Expense Statement"
          subtitle={`${branchTag} · ${formatDate(from)} to ${formatDate(to)}`}
          headers={headers}
          rows={rows}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PnlColumn title="Income" lines={report.income} total={report.totalIncome} tone="emerald" />
        <PnlColumn title="Expense" lines={report.expense} total={report.totalExpense} tone="red" />
      </div>

      <Card className="flex items-center justify-between">
        <span className="font-display text-lg font-semibold text-ink">
          {report.net >= 0 ? 'Net Profit' : 'Net Loss'}
        </span>
        <span
          className={`font-display text-2xl font-semibold tabular-nums ${
            report.net >= 0 ? 'text-brand-700' : 'text-red-600'
          }`}
        >
          {money(Math.abs(report.net))}
        </span>
      </Card>
    </div>
  );
}

function PnlColumn({
  title,
  lines,
  total,
  tone,
}: {
  title: string;
  lines: { id: string; name: string; amount: number }[];
  total: number;
  tone: 'emerald' | 'red';
}) {
  return (
    <Card className="p-0">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
        <span className={`font-semibold tabular-nums ${tone === 'emerald' ? 'text-brand-700' : 'text-red-600'}`}>
          {money(total, false)}
        </span>
      </div>
      {lines.length === 0 ? (
        <p className="px-5 py-6 text-center text-sm text-ink-muted">No {title.toLowerCase()} recorded.</p>
      ) : (
        <ul className="divide-y divide-border/70">
          {lines.map((l) => (
            <li key={l.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
              <span className="text-ink">{l.name}</span>
              <span className="tabular-nums text-ink">{money(l.amount, false)}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

/* ============================== Balance Sheet =========================== */

async function BalanceSheetView({
  branch,
  branchTag,
  asOf,
}: {
  branch: string;
  branchTag: string;
  asOf: string;
}) {
  const heads = await fetchHeads(branch);
  const report = buildBalanceSheet(heads);

  const noData =
    report.assets.length === 0 && report.liabilities.length === 0 && report.equity.length === 0;
  if (noData && report.retainedEarnings === 0) {
    return (
      <EmptyState
        title="Nothing on the balance sheet yet"
        hint="Asset, liability and equity balances will appear here once vouchers are posted."
      />
    );
  }

  const headers = ['Side', 'Item', 'Amount (৳)'];
  const rows: (string | number)[][] = [];
  report.assets.forEach((l) => rows.push(['Assets', l.name, money(l.amount, false)]));
  rows.push(['Assets', 'Total assets', money(report.totalAssets, false)]);
  report.liabilities.forEach((l) => rows.push(['Liabilities', l.name, money(l.amount, false)]));
  report.equity.forEach((l) => rows.push(['Equity', l.name, money(l.amount, false)]));
  rows.push([
    'Equity',
    report.retainedEarnings >= 0 ? 'Retained earnings (profit)' : 'Retained earnings (loss)',
    money(report.retainedEarnings, false),
  ]);
  rows.push(['', 'Total liabilities & equity', money(report.totalLiabEquity, false)]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <p className="text-sm text-ink-muted">
            As of {formatDate(asOf)} · {branchTag}
          </p>
          <Badge tone={report.balanced ? 'emerald' : 'red'}>
            {report.balanced ? 'Balanced' : 'Out of balance'}
          </Badge>
        </div>
        <ExportBar
          filename={`balance-sheet-${asOf}`}
          title="Balance Sheet"
          subtitle={`${branchTag} · as of ${formatDate(asOf)}`}
          headers={headers}
          rows={rows}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-0">
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <h3 className="font-display text-base font-semibold text-ink">Assets</h3>
            <span className="font-semibold tabular-nums text-ink">{money(report.totalAssets, false)}</span>
          </div>
          <BsList lines={report.assets} emptyLabel="assets" />
        </Card>

        <Card className="p-0">
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <h3 className="font-display text-base font-semibold text-ink">Liabilities &amp; Equity</h3>
            <span className="font-semibold tabular-nums text-ink">
              {money(report.totalLiabEquity, false)}
            </span>
          </div>
          <ul className="divide-y divide-border/70">
            {report.liabilities.map((l) => (
              <li key={l.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                <span className="text-ink">{l.name}</span>
                <span className="tabular-nums text-ink">{money(l.amount, false)}</span>
              </li>
            ))}
            {report.equity.map((l) => (
              <li key={l.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                <span className="text-ink">{l.name}</span>
                <span className="tabular-nums text-ink">{money(l.amount, false)}</span>
              </li>
            ))}
            <li className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
              <span className="text-ink">
                {report.retainedEarnings >= 0 ? 'Retained earnings (profit)' : 'Retained earnings (loss)'}
              </span>
              <span className="tabular-nums text-ink">{money(report.retainedEarnings, false)}</span>
            </li>
            {report.liabilities.length === 0 &&
              report.equity.length === 0 &&
              report.retainedEarnings === 0 && (
                <li className="px-5 py-6 text-center text-sm text-ink-muted">
                  No liabilities or equity recorded.
                </li>
              )}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function BsList({
  lines,
  emptyLabel,
}: {
  lines: { id: string; name: string; amount: number }[];
  emptyLabel: string;
}) {
  if (lines.length === 0) {
    return <p className="px-5 py-6 text-center text-sm text-ink-muted">No {emptyLabel} recorded.</p>;
  }
  return (
    <ul className="divide-y divide-border/70">
      {lines.map((l) => (
        <li key={l.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
          <span className="text-ink">{l.name}</span>
          <span className="tabular-nums text-ink">{money(l.amount, false)}</span>
        </li>
      ))}
    </ul>
  );
}

/* ================================ Due / Aging =========================== */

async function DueView({ branch, branchTag }: { branch: string; branchTag: string }) {
  const heads = await fetchHeads(branch);
  const report = buildDueReport(heads);

  if (report.rows.length === 0) {
    return (
      <EmptyState
        title="No outstanding dues"
        hint="Customers with a remaining balance will be listed here, largest due first."
      />
    );
  }

  const headers = ['Code', 'Customer', 'Phone', 'Branch', 'Due (৳)'];
  const rows = report.rows.map((r) => [
    r.code ?? '',
    r.name,
    r.phone ?? '',
    branchLabel(r.branch),
    money(r.due, false),
  ]);
  rows.push(['', 'TOTAL', '', '', money(report.total, false)]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          {report.rows.length} customer{report.rows.length === 1 ? '' : 's'} · total due{' '}
          <span className="font-semibold text-ink">{money(report.total)}</span>
        </p>
        <ExportBar
          filename={`customer-dues-${today()}`}
          title="Customer Dues / Aging"
          subtitle={`${branchTag} · as of ${formatDate(today())}`}
          headers={headers}
          rows={rows}
        />
      </div>
      <TableWrap>
        <thead>
          <tr>
            <th className={thClass}>Code</th>
            <th className={thClass}>Customer</th>
            <th className={thClass}>Phone</th>
            <th className={thClass}>Branch</th>
            <th className={`${thClass} text-right`}>Due</th>
          </tr>
        </thead>
        <tbody>
          {report.rows.map((r) => (
            <tr key={r.id}>
              <td className={`${tdClass} font-mono text-xs text-ink-muted`}>{r.code ?? '—'}</td>
              <td className={`${tdClass} font-medium`}>{r.name}</td>
              <td className={`${tdClass} text-ink-muted`}>{r.phone ?? '—'}</td>
              <td className={`${tdClass} text-ink-muted`}>{branchLabel(r.branch)}</td>
              <td className={`${tdClass} text-right`}>
                <Money value={r.due} />
              </td>
            </tr>
          ))}
          <tr className="bg-muted/50 font-semibold">
            <td className={tdClass} colSpan={4}>
              Total outstanding
            </td>
            <td className={`${tdClass} text-right tabular-nums`}>{money(report.total, false)}</td>
          </tr>
        </tbody>
      </TableWrap>
    </div>
  );
}
