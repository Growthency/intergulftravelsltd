import Link from 'next/link';
import { PageHeader, Card, Money, Badge, EmptyState, TableWrap, thClass, tdClass } from '@/components/manage/ui';
import { HeadForm } from '@/components/manage/accounts/HeadForm';
import { HeadRowActions } from '@/components/manage/accounts/HeadRowActions';
import { loadActiveHeads } from '@/lib/management/accounts-data';
import { naturalBalance, type AccountHead, type AccountType } from '@/lib/management/types';
import { branchShort } from '@/lib/management/branches';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Account Heads' };

const TYPE_ORDER: AccountType[] = ['asset', 'liability', 'income', 'expense', 'equity'];
const TYPE_LABEL: Record<AccountType, string> = {
  asset: 'Assets',
  liability: 'Liabilities',
  income: 'Income',
  expense: 'Expenses',
  equity: 'Equity',
};

export default async function HeadsPage() {
  const heads = await loadActiveHeads();

  const grouped = TYPE_ORDER.map((type) => ({
    type,
    label: TYPE_LABEL[type],
    rows: heads.filter((h) => h.type === type),
  })).filter((g) => g.rows.length > 0);

  return (
    <>
      <PageHeader
        title="Account Heads"
        subtitle="The chart of accounts. Each head carries its own running balance."
      />

      <div className="mb-6">
        <HeadForm />
      </div>

      {heads.length === 0 ? (
        <EmptyState
          title="No account heads yet"
          hint="The chart of accounts will populate once the database is set up. You can also add your own heads above."
        />
      ) : (
        <div className="space-y-8">
          {grouped.map((g) => (
            <section key={g.type}>
              <h2 className="mb-3 font-display text-lg font-semibold text-ink">{g.label}</h2>
              <TableWrap>
                <thead>
                  <tr>
                    <th className={thClass}>Name</th>
                    <th className={thClass}>Code</th>
                    <th className={thClass}>Subtype</th>
                    <th className={thClass}>Branch</th>
                    <th className={`${thClass} text-right`}>Balance</th>
                    <th className={`${thClass} text-right`}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {g.rows.map((h) => (
                    <HeadRow key={h.id} head={h} />
                  ))}
                </tbody>
              </TableWrap>
            </section>
          ))}
        </div>
      )}
    </>
  );
}

function HeadRow({ head }: { head: AccountHead }) {
  const balance = naturalBalance(head);
  return (
    <tr>
      <td className={tdClass}>
        <Link href={`/admin/accounts/heads/${head.id}`} className="font-medium text-brand-700 hover:underline">
          {head.name}
        </Link>
        {head.is_system && (
          <span className="ml-2 align-middle">
            <Badge tone="slate">System</Badge>
          </span>
        )}
      </td>
      <td className={`${tdClass} font-mono text-xs text-ink-muted`}>{head.code ?? '—'}</td>
      <td className={`${tdClass} capitalize`}>{head.subtype}</td>
      <td className={tdClass}>{branchShort(head.branch)}</td>
      <td className={`${tdClass} text-right`}>
        <Money value={balance} />
      </td>
      <td className={`${tdClass} text-right`}>
        {head.is_system ? (
          <span className="text-xs text-ink-muted">—</span>
        ) : (
          <HeadRowActions id={head.id} name={head.name} />
        )}
      </td>
    </tr>
  );
}
