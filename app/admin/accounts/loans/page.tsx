import { ArrowLeftRight, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { PageHeader, StatCard, Money, Badge, EmptyState, TableWrap, thClass, tdClass } from '@/components/manage/ui';
import { ExportBar } from '@/components/manage/ExportBar';
import { LoanForm } from '@/components/manage/accounts/LoanForm';
import { LoanStatusControl } from '@/components/manage/accounts/LoanStatusControl';
import { LoanEdit } from '@/components/manage/accounts/LoanEdit';
import type { HeadOption } from '@/components/manage/accounts/VoucherForm';
import { createAdminClient } from '@/lib/supabase/server';
import { getStaffScope } from '@/lib/management/scope';
import { loadActiveHeads } from '@/lib/management/accounts-data';
import type { Loan } from '@/lib/management/types';
import { branchShort } from '@/lib/management/branches';
import { money } from '@/lib/management/format';
import { getLocale } from '@/lib/i18n-server';
import { getDict } from '@/lib/dictionaries/areas/adminaccounting';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Loans' };

async function loadLoans(): Promise<Loan[]> {
  try {
    const scope = await getStaffScope();
    const db = createAdminClient();
    let q = db.from('loans').select('*');
    if (scope.branch) q = q.eq('branch', scope.branch);
    const { data, error } = await q.order('date', { ascending: false });
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
  const t = getDict(getLocale());
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
        title={t.loans.title}
        subtitle={t.loans.subtitle}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {loans.length > 0 && (
              <ExportBar
                filename="loans"
                title={t.loans.exportTitle}
                headers={[t.loans.exHDate, t.loans.exHParty, t.loans.exHPhone, t.loans.exHType, t.loans.exHPrincipal, t.loans.exHDueDate, t.loans.exHStatus, t.loans.exHBranch]}
                rows={exportRows}
                orientation="l"
              />
            )}
            <LoanForm bankHeads={bankHeads} />
          </div>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label={t.loans.receivable} value={<Money value={givenTotal} />} icon={ArrowUpRight} accent="emerald" />
        <StatCard label={t.loans.payable} value={<Money value={takenTotal} />} icon={ArrowDownLeft} accent="red" />
        <StatCard label={t.loans.activeLoans} value={open.length} icon={ArrowLeftRight} accent="slate" />
      </div>

      {loans.length === 0 ? (
        <EmptyState
          title={t.loans.noLoansTitle}
          hint={t.loans.noLoansHint}
        />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <th className={thClass}>{t.loans.thDate}</th>
              <th className={thClass}>{t.loans.thParty}</th>
              <th className={thClass}>{t.loans.thType}</th>
              <th className={`${thClass} text-right`}>{t.loans.thPrincipal}</th>
              <th className={thClass}>{t.loans.thDueDate}</th>
              <th className={thClass}>{t.loans.thBranch}</th>
              <th className={thClass}>{t.loans.thStatus}</th>
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
                    {l.type === 'given' ? t.loans.given : t.loans.taken}
                  </Badge>
                </td>
                <td className={`${tdClass} text-right font-semibold tabular-nums`}>{money(l.principal)}</td>
                <td className={`${tdClass} whitespace-nowrap text-ink-muted`}>{l.due_date || '—'}</td>
                <td className={`${tdClass} whitespace-nowrap`}>{branchShort(l.branch)}</td>
                <td className={tdClass}>
                  <div className="flex items-center gap-2">
                    <Badge tone={STATUS_TONE[l.status] ?? 'slate'}>{t.statusLabels[l.status as keyof typeof t.statusLabels] ?? l.status}</Badge>
                    <LoanStatusControl id={l.id} status={l.status} />
                    <LoanEdit loan={l} />
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
