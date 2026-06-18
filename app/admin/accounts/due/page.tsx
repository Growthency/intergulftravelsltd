import Link from 'next/link';
import { HandCoins } from 'lucide-react';
import { PageHeader, StatCard, Money, EmptyState, TableWrap, thClass, tdClass } from '@/components/manage/ui';
import { ExportBar } from '@/components/manage/ExportBar';
import { loadActiveHeads } from '@/lib/management/accounts-data';
import { naturalBalance } from '@/lib/management/types';
import { branchShort } from '@/lib/management/branches';
import { money } from '@/lib/management/format';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Customer Dues' };

export default async function DuePage() {
  const heads = await loadActiveHeads();

  const dues = heads
    .filter((h) => h.subtype === 'customer')
    .map((h) => ({ head: h, due: naturalBalance(h) }))
    .filter((r) => r.due > 0)
    .sort((a, b) => b.due - a.due);

  const totalDue = dues.reduce((s, r) => s + r.due, 0);

  const exportRows = dues.map((r) => [
    r.head.name,
    r.head.party_phone ?? '',
    branchShort(r.head.branch),
    money(r.due, false),
  ]);

  return (
    <>
      <PageHeader
        title="Customer Dues"
        subtitle="Outstanding balances owed by pilgrims and passengers."
        actions={
          dues.length > 0 ? (
            <ExportBar
              filename="customer-dues"
              title="Customer Dues"
              subtitle={`Total receivable: ${money(totalDue)}`}
              headers={['Customer', 'Phone', 'Branch', 'Due']}
              rows={exportRows}
            />
          ) : undefined
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <StatCard label="Total Receivable" value={<Money value={totalDue} />} icon={HandCoins} accent="red" />
        <StatCard label="Customers with Dues" value={dues.length} accent="slate" />
      </div>

      {dues.length === 0 ? (
        <EmptyState
          title="No outstanding dues"
          hint="Every customer is settled, or no customer charges have been posted yet."
        />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <th className={thClass}>Customer</th>
              <th className={thClass}>Phone</th>
              <th className={thClass}>Branch</th>
              <th className={`${thClass} text-right`}>Due</th>
            </tr>
          </thead>
          <tbody>
            {dues.map((r) => (
              <tr key={r.head.id}>
                <td className={tdClass}>
                  <Link href={`/admin/accounts/heads/${r.head.id}`} className="font-medium text-brand-700 hover:underline">
                    {r.head.name}
                  </Link>
                </td>
                <td className={`${tdClass} text-ink-muted`}>{r.head.party_phone || '—'}</td>
                <td className={tdClass}>{branchShort(r.head.branch)}</td>
                <td className={`${tdClass} text-right font-semibold tabular-nums text-red-600`}>{money(r.due)}</td>
              </tr>
            ))}
            <tr className="bg-muted/60">
              <td className={`${tdClass} font-semibold`} colSpan={3}>
                Total receivable
              </td>
              <td className={`${tdClass} text-right font-bold tabular-nums`}>{money(totalDue)}</td>
            </tr>
          </tbody>
        </TableWrap>
      )}
    </>
  );
}
