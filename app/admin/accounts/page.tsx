import Link from 'next/link';
import { Wallet, Banknote, HandCoins, ArrowDownToLine, ArrowUpFromLine, NotebookPen, Receipt, Landmark } from 'lucide-react';
import { PageHeader, StatCard, Card, Money, Badge, EmptyState, TableWrap, thClass, tdClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import { VoucherRowActions } from '@/components/manage/accounts/VoucherRowActions';
import { loadActiveHeads, loadTransactions, headMap, headName } from '@/lib/management/accounts-data';
import { naturalBalance } from '@/lib/management/types';
import { branchShort } from '@/lib/management/branches';
import { money } from '@/lib/management/format';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Accounts' };

const TYPE_TONE: Record<string, 'emerald' | 'gold' | 'red' | 'blue' | 'slate'> = {
  receipt: 'emerald',
  income: 'emerald',
  payment: 'red',
  expense: 'red',
  contra: 'blue',
  journal: 'slate',
};

export default async function AccountsHomePage() {
  const today = new Date().toISOString().slice(0, 10);
  const heads = await loadActiveHeads();
  const [recent, todays] = await Promise.all([
    loadTransactions({ limit: 10 }),
    loadTransactions({ from: today, to: today }),
  ]);

  const map = headMap(heads);
  const headOptions = heads.map((h) => ({ id: h.id, name: h.name }));

  const cashHead = heads.find((h) => h.subtype === 'cash' && h.is_system) ?? heads.find((h) => h.subtype === 'cash');
  const cashBalance = cashHead ? naturalBalance(cashHead) : 0;

  const bankBalance = heads
    .filter((h) => h.subtype === 'bank')
    .reduce((sum, h) => sum + naturalBalance(h), 0);

  const totalDue = heads
    .filter((h) => h.subtype === 'customer')
    .reduce((sum, h) => sum + Math.max(0, naturalBalance(h)), 0);

  // Today's income / expense from the income & expense heads moved today.
  const incomeIds = new Set(heads.filter((h) => h.type === 'income').map((h) => h.id));
  const expenseIds = new Set(heads.filter((h) => h.type === 'expense').map((h) => h.id));
  const todaysIncome = todays
    .filter((t) => incomeIds.has(t.credit_account_id))
    .reduce((s, t) => s + Number(t.amount), 0);
  const todaysExpense = todays
    .filter((t) => expenseIds.has(t.debit_account_id))
    .reduce((s, t) => s + Number(t.amount), 0);

  return (
    <>
      <PageHeader
        title="Accounts"
        subtitle="Double-entry overview — cash position, dues and the day's movements."
        actions={
          <>
            <Button href="/admin/accounts/entry" variant="primary" size="sm">
              <NotebookPen className="h-4 w-4" /> Daily Entry
            </Button>
            <Button href="/admin/accounts/vouchers" variant="outline" size="sm">
              <Receipt className="h-4 w-4" /> Vouchers
            </Button>
            <Button href="/admin/accounts/heads" variant="outline" size="sm">
              <Landmark className="h-4 w-4" /> Heads
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Cash in Hand" value={<Money value={cashBalance} />} icon={Wallet} accent="emerald" />
        <StatCard label="Bank Balance" value={<Money value={bankBalance} />} icon={Banknote} accent="gold" />
        <StatCard label="Total Receivable" value={<Money value={totalDue} />} icon={HandCoins} accent="red" hint="Across all customers" />
        <StatCard label="Income Today" value={<Money value={todaysIncome} />} icon={ArrowDownToLine} accent="emerald" />
        <StatCard label="Expense Today" value={<Money value={todaysExpense} />} icon={ArrowUpFromLine} accent="slate" />
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">Recent vouchers</h2>
          <Link href="/admin/accounts/vouchers" className="text-sm font-semibold text-brand-700 hover:underline">
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <EmptyState
            title="No vouchers yet"
            hint="Once you post income, expenses or transfers, the latest entries will appear here."
            action={
              <Button href="/admin/accounts/entry" size="sm">
                <NotebookPen className="h-4 w-4" /> Post your first entry
              </Button>
            }
          />
        ) : (
          <TableWrap>
            <thead>
              <tr>
                <th className={thClass}>Voucher</th>
                <th className={thClass}>Date</th>
                <th className={thClass}>Type</th>
                <th className={thClass}>Debit</th>
                <th className={thClass}>Credit</th>
                <th className={`${thClass} text-right`}>Amount</th>
                <th className={thClass}>Branch</th>
                <th className={`${thClass} text-right`}>Manage</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((t) => (
                <tr key={t.id}>
                  <td className={`${tdClass} font-mono text-xs`}>{t.voucher_no ?? '—'}</td>
                  <td className={tdClass}>{t.date}</td>
                  <td className={tdClass}>
                    <Badge tone={TYPE_TONE[t.type] ?? 'slate'}>{t.type}</Badge>
                  </td>
                  <td className={tdClass}>{headName(map, t.debit_account_id)}</td>
                  <td className={tdClass}>{headName(map, t.credit_account_id)}</td>
                  <td className={`${tdClass} text-right font-semibold tabular-nums`}>{money(t.amount)}</td>
                  <td className={tdClass}>{branchShort(t.branch)}</td>
                  <td className={`${tdClass} whitespace-nowrap text-right`}>
                    <VoucherRowActions
                      voucher={{
                        id: t.id,
                        voucher_no: t.voucher_no,
                        date: t.date,
                        type: t.type,
                        debit_account_id: t.debit_account_id,
                        credit_account_id: t.credit_account_id,
                        amount: Number(t.amount),
                        narration: t.narration,
                        linked: !!t.ref_table,
                      }}
                      heads={headOptions}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        )}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <QuickLink href="/admin/accounts/entry" icon={NotebookPen} title="Daily Entry" hint="Post income, expenses, transfers & journals." />
        <QuickLink href="/admin/accounts/vouchers" icon={Receipt} title="Vouchers" hint="Search and export every transaction." />
        <QuickLink href="/admin/accounts/heads" icon={Landmark} title="Account Heads" hint="Manage the chart of accounts." />
      </div>
    </>
  );
}

function QuickLink({
  href,
  icon: Icon,
  title,
  hint,
}: {
  href: string;
  icon: typeof Wallet;
  title: string;
  hint: string;
}) {
  return (
    <Link href={href}>
      <Card className="h-full transition hover:border-brand-600/40 hover:shadow-md">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
          <Icon className="h-5 w-5" />
        </span>
        <p className="mt-3 font-display text-base font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-sm text-ink-muted">{hint}</p>
      </Card>
    </Link>
  );
}
