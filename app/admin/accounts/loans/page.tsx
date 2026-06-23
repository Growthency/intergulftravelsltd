import { ArrowLeftRight, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { PageHeader, StatCard, Money, Badge, EmptyState, TableWrap, thClass, tdClass } from '@/components/manage/ui';
import { ExportBar } from '@/components/manage/ExportBar';
import { LoanForm } from '@/components/manage/accounts/LoanForm';
import { LoanStatusControl } from '@/components/manage/accounts/LoanStatusControl';
import type { HeadOption } from '@/components/manage/accounts/VoucherForm';
import { createAdminClient } from '@/lib/supabase/server';
import { loadActiveHeads } from '@/lib/management/accounts-data';
import type { Loan } from '@/lib/management/types';
import { branchShort } from '@/lib/management/branches';
import { money } from '@/lib/management/format';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Loans' };

async function loadLoans(): Promise<Loan[]> {
  try {
    const db = createAdminClient();
    const { data, error } = await db.from('loans').select('*').order('date', { ascending: false });
    if (error) return [];
    return (data ?? []) as Loan[];
  } catch {
    return [];
  }
}

const STATUS_TONE: Record<string, 'emerald' | 'gold' | 'red' | 'slate'> = {
  open: 'gold',
  partial: 'slate',
  closed: 'emerald',
};

export default async function LoansPage() {
  const [loans, heads] = await Promise.all([loadLoans(), loadActiveHeads()]);
  const bankHeads: HeadOption[] = heads
    .filter((h) => h.subtype === 'bank')
    .map((h) => ({ id: h.id, name: h.name, type: h.type, subtype: h.subtype, code: h.code }));

  const open = loans.filter((l) => l.status !== 'closed');
  const givenTotal = open.filter((l) => l.type === 'given').reduce((s, l) => s + Number(l.principal), 0);
  const takenTotal = open.filter((l) => l.type === 'taken').reduce((s, l) => s + Number(l.principal), 0);

  const exportRows = loans.map((l) => [
    l.date,
    l.party_name,
    l.party_phone ?? '',
    l.type,
    money(l.principal, false),
    l.due_date ?? '',
    l.status,
    branchShort(l.branch),
  ]);

  return (
    <>
      <PageHeader
        title="Loans"
        subtitle="Money lent out and borrowed, with their cash/bank vouchers."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {loans.length > 0 && (
              <ExportBar
                filename="loans"
                title="Loan Register"
                headers={['Date', 'Party', 'Phone', 'Type', 'Principal', 'Due date', 'Status', 'Branch']}
                rows={exportRows}
                orientation="l"
              />
            )}
            <LoanForm bankHeads={bankHeads} />
          </div>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Receivable (loans given)" value={<Money value={givenTotal} />} icon={ArrowUpRight} accent="emerald" />
        <StatCard label="Payable (loans taken)" value={<Money value={takenTotal} />} icon={ArrowDownLeft} accent="red" />
        <StatCard label="Active Loans" value={open.length} icon={ArrowLeftRight} accent="slate" />
      </div>

      {loans.length === 0 ? (
        <EmptyState
          title="No loans recorded"
          hint="Use “Add Loan” to record money you have lent out or borrowed. The matching cash/bank voucher is posted automatically."
        />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <th className={thClass}>Date</th>
              <th className={thClass}>Party</th>
              <th className={thClass}>Type</th>
              <th className={`${thClass} text-right`}>Principal</th>
              <th className={thClass}>Due date</th>
              <th className={thClass}>Branch</th>
              <th className={thClass}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((l) => (
              <tr key={l.id}>
                <td className={`${tdClass} whitespace-nowrap`}>{l.date}</td>
                <td className={tdClass}>
                  <div className="font-medium text-ink">{l.party_name}</div>
                  {l.party_phone && <div className="text-xs text-ink-muted">{l.party_phone}</div>}
                </td>
                <td className={tdClass}>
                  <Badge tone={l.type === 'given' ? 'emerald' : 'red'}>
                    {l.type === 'given' ? 'Given' : 'Taken'}
                  </Badge>
                </td>
                <td className={`${tdClass} text-right font-semibold tabular-nums`}>{money(l.principal)}</td>
                <td className={`${tdClass} whitespace-nowrap text-ink-muted`}>{l.due_date || '—'}</td>
                <td className={`${tdClass} whitespace-nowrap`}>{branchShort(l.branch)}</td>
                <td className={tdClass}>
                  <div className="flex items-center gap-2">
                    <Badge tone={STATUS_TONE[l.status] ?? 'slate'}>{l.status}</Badge>
                    <LoanStatusControl id={l.id} status={l.status} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </>
  );
}
