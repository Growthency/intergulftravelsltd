import { PageHeader, Card, Badge, EmptyState, TableWrap, thClass, tdClass } from '@/components/manage/ui';
import { ExportBar } from '@/components/manage/ExportBar';
import { loadActiveHeads, loadTransactions, headMap, headName } from '@/lib/management/accounts-data';
import { BRANCHES, branchShort } from '@/lib/management/branches';
import { money } from '@/lib/management/format';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Vouchers' };

const TYPES = ['receipt', 'payment', 'contra', 'journal', 'expense', 'income'] as const;
const TYPE_TONE: Record<string, 'emerald' | 'gold' | 'red' | 'blue' | 'slate'> = {
  receipt: 'emerald',
  income: 'emerald',
  payment: 'red',
  expense: 'red',
  contra: 'blue',
  journal: 'slate',
};

type SP = { from?: string; to?: string; branch?: string; type?: string };

const labelStyle = 'mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-muted';
const ctrl =
  'w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20';

export default async function VouchersPage({ searchParams }: { searchParams: SP }) {
  const filters = {
    from: searchParams.from || undefined,
    to: searchParams.to || undefined,
    branch: searchParams.branch || 'all',
    type: searchParams.type || 'all',
    limit: 1000,
  };

  const [heads, txns] = await Promise.all([loadActiveHeads(), loadTransactions(filters)]);
  const map = headMap(heads);

  const total = txns.reduce((s, t) => s + Number(t.amount), 0);

  const exportRows = txns.map((t) => [
    t.voucher_no ?? '',
    t.date,
    t.type,
    headName(map, t.debit_account_id),
    headName(map, t.credit_account_id),
    money(t.amount, false),
    branchShort(t.branch),
    t.narration ?? '',
  ]);

  return (
    <>
      <PageHeader
        title="Vouchers"
        subtitle="Every posted transaction. Filter by date, branch or type, then export."
        actions={
          txns.length > 0 ? (
            <ExportBar
              filename="vouchers"
              title="Voucher Register"
              subtitle={filterSubtitle(searchParams)}
              orientation="l"
              headers={['Voucher', 'Date', 'Type', 'Debit', 'Credit', 'Amount', 'Branch', 'Narration']}
              rows={exportRows}
            />
          ) : undefined
        }
      />

      {/* Filters */}
      <Card className="mb-5">
        <form method="get" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <label>
            <span className={labelStyle}>From</span>
            <input type="date" name="from" defaultValue={searchParams.from} className={ctrl} />
          </label>
          <label>
            <span className={labelStyle}>To</span>
            <input type="date" name="to" defaultValue={searchParams.to} className={ctrl} />
          </label>
          <label>
            <span className={labelStyle}>Branch</span>
            <select name="branch" defaultValue={searchParams.branch ?? 'all'} className={ctrl}>
              <option value="all">All branches</option>
              {BRANCHES.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className={labelStyle}>Type</span>
            <select name="type" defaultValue={searchParams.type ?? 'all'} className={ctrl}>
              <option value="all">All types</option>
              {TYPES.map((t) => (
                <option key={t} value={t} className="capitalize">
                  {t}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="h-[42px] flex-1 rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Apply
            </button>
            <a
              href="/admin/accounts/vouchers"
              className="grid h-[42px] place-items-center rounded-xl border border-border px-4 text-sm font-semibold text-ink-muted transition hover:border-brand-600/40"
            >
              Reset
            </a>
          </div>
        </form>
      </Card>

      {txns.length === 0 ? (
        <EmptyState
          title="No vouchers found"
          hint="No transactions match the current filters. Adjust the range or post a new entry from Daily Entry."
        />
      ) : (
        <>
          <p className="mb-3 text-sm text-ink-muted">
            Showing <span className="font-semibold text-ink">{txns.length}</span> voucher
            {txns.length === 1 ? '' : 's'} · total{' '}
            <span className="font-semibold text-ink">{money(total)}</span>
          </p>
          <TableWrap>
            <thead>
              <tr>
                <th className={thClass}>Voucher</th>
                <th className={thClass}>Date</th>
                <th className={thClass}>Type</th>
                <th className={thClass}>Debit head</th>
                <th className={thClass}>Credit head</th>
                <th className={`${thClass} text-right`}>Amount</th>
                <th className={thClass}>Branch</th>
                <th className={thClass}>Narration</th>
              </tr>
            </thead>
            <tbody>
              {txns.map((t) => (
                <tr key={t.id}>
                  <td className={`${tdClass} whitespace-nowrap font-mono text-xs`}>{t.voucher_no ?? '—'}</td>
                  <td className={`${tdClass} whitespace-nowrap`}>{t.date}</td>
                  <td className={tdClass}>
                    <Badge tone={TYPE_TONE[t.type] ?? 'slate'}>{t.type}</Badge>
                  </td>
                  <td className={tdClass}>{headName(map, t.debit_account_id)}</td>
                  <td className={tdClass}>{headName(map, t.credit_account_id)}</td>
                  <td className={`${tdClass} text-right font-semibold tabular-nums`}>{money(t.amount)}</td>
                  <td className={`${tdClass} whitespace-nowrap`}>{branchShort(t.branch)}</td>
                  <td className={`${tdClass} max-w-[16rem] truncate text-ink-muted`} title={t.narration ?? ''}>
                    {t.narration || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </>
      )}
    </>
  );
}

function filterSubtitle(sp: SP): string {
  const parts: string[] = [];
  if (sp.from) parts.push(`From ${sp.from}`);
  if (sp.to) parts.push(`To ${sp.to}`);
  if (sp.branch && sp.branch !== 'all') parts.push(branchShort(sp.branch));
  if (sp.type && sp.type !== 'all') parts.push(`Type: ${sp.type}`);
  return parts.length ? parts.join(' · ') : 'All vouchers';
}
