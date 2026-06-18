import Link from 'next/link';
import { Wallet, Banknote } from 'lucide-react';
import { PageHeader, StatCard, Money, Badge, EmptyState, TableWrap, thClass, tdClass } from '@/components/manage/ui';
import { HeadForm } from '@/components/manage/accounts/HeadForm';
import { loadActiveHeads } from '@/lib/management/accounts-data';
import { naturalBalance } from '@/lib/management/types';
import { branchShort } from '@/lib/management/branches';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Cash & Bank' };

export default async function CashBankPage() {
  const heads = await loadActiveHeads();
  const accounts = heads.filter((h) => h.subtype === 'cash' || h.subtype === 'bank');

  const cashTotal = accounts
    .filter((h) => h.subtype === 'cash')
    .reduce((s, h) => s + naturalBalance(h), 0);
  const bankTotal = accounts
    .filter((h) => h.subtype === 'bank')
    .reduce((s, h) => s + naturalBalance(h), 0);

  return (
    <>
      <PageHeader
        title="Cash & Bank"
        subtitle="Your liquid accounts. Add bank accounts as you open them."
        actions={<HeadForm bankOnly />}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Cash in Hand" value={<Money value={cashTotal} />} icon={Wallet} accent="emerald" />
        <StatCard label="Total in Banks" value={<Money value={bankTotal} />} icon={Banknote} accent="gold" />
        <StatCard label="Liquid Total" value={<Money value={cashTotal + bankTotal} />} accent="slate" />
      </div>

      {accounts.length === 0 ? (
        <EmptyState
          title="No cash or bank accounts yet"
          hint="Once the database is set up, the system Cash in Hand account appears here. Use “Add Bank Account” to register a bank."
        />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <th className={thClass}>Account</th>
              <th className={thClass}>Type</th>
              <th className={thClass}>Bank / Number</th>
              <th className={thClass}>Branch</th>
              <th className={`${thClass} text-right`}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((h) => (
              <tr key={h.id}>
                <td className={tdClass}>
                  <Link href={`/admin/accounts/heads/${h.id}`} className="font-medium text-brand-700 hover:underline">
                    {h.name}
                  </Link>
                </td>
                <td className={tdClass}>
                  <Badge tone={h.subtype === 'cash' ? 'emerald' : 'gold'}>{h.subtype}</Badge>
                </td>
                <td className={`${tdClass} text-ink-muted`}>
                  {h.subtype === 'bank' ? (
                    <span>
                      {h.bank_name || '—'}
                      {h.account_no ? ` · ${h.account_no}` : ''}
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
                <td className={tdClass}>{branchShort(h.branch)}</td>
                <td className={`${tdClass} text-right`}>
                  <Money value={naturalBalance(h)} />
                </td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </>
  );
}
