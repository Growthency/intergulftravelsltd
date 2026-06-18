import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { PageHeader, StatCard, Money, Badge, EmptyState, TableWrap, thClass, tdClass } from '@/components/manage/ui';
import { ExportBar } from '@/components/manage/ExportBar';
import { loadHead, loadActiveHeads, loadTransactions, headMap, headName } from '@/lib/management/accounts-data';
import { naturalBalance, isDebitNormal } from '@/lib/management/types';
import { branchShort } from '@/lib/management/branches';
import { money } from '@/lib/management/format';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const head = await loadHead(params.id);
  return { title: head ? `${head.name} · Ledger` : 'Account Ledger' };
}

export default async function AccountLedgerPage({ params }: { params: { id: string } }) {
  const head = await loadHead(params.id);
  if (!head) notFound();

  const [allHeads, txns] = await Promise.all([
    loadActiveHeads(),
    loadTransactions({ accountId: params.id, limit: 2000 }),
  ]);
  const map = headMap(allHeads);

  // Oldest → newest for the running balance walk.
  const ordered = [...txns].sort((a, b) => {
    if (a.date === b.date) return a.created_at.localeCompare(b.created_at);
    return a.date.localeCompare(b.date);
  });

  const debitNormal = isDebitNormal(head.type);
  const openingSigned = Number(head.opening_balance) * (head.opening_is_debit ? 1 : -1);

  // Walk the ledger keeping a signed net-debit running figure; display it on the
  // account's natural side (positive = the side this account normally sits on).
  let running = openingSigned;
  let totalDebit = 0;
  let totalCredit = 0;

  const rows = ordered.map((t) => {
    const isDebit = t.debit_account_id === params.id;
    const amount = Number(t.amount);
    if (isDebit) {
      running += amount;
      totalDebit += amount;
    } else {
      running -= amount;
      totalCredit += amount;
    }
    const naturalRunning = debitNormal ? running : -running;
    const contraId = isDebit ? t.credit_account_id : t.debit_account_id;
    return {
      id: t.id,
      date: t.date,
      voucher: t.voucher_no ?? '—',
      type: t.type,
      contra: headName(map, contraId),
      narration: t.narration ?? '',
      debit: isDebit ? amount : 0,
      credit: isDebit ? 0 : amount,
      balance: naturalRunning,
    };
  });

  const closing = naturalBalance(head);
  const sideLabel = debitNormal ? 'Dr' : 'Cr';

  const exportRows = [
    ['', 'Opening balance', '', '', '', '', money(Math.abs(openingSigned), false)],
    ...rows.map((r) => [
      r.date,
      r.voucher,
      r.type,
      r.contra,
      r.debit ? money(r.debit, false) : '',
      r.credit ? money(r.credit, false) : '',
      money(Math.abs(r.balance), false),
    ]),
    ['', 'Totals', '', '', money(totalDebit, false), money(totalCredit, false), `${money(Math.abs(closing), false)} ${sideLabel}`],
  ];

  return (
    <>
      <Link
        href="/admin/accounts/heads"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted transition hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" /> All account heads
      </Link>

      <PageHeader
        title={head.name}
        subtitle={`${head.code ? head.code + ' · ' : ''}${head.type} · ${head.subtype} · ${branchShort(head.branch)}`}
        actions={
          rows.length > 0 ? (
            <ExportBar
              filename={`ledger-${head.code ?? head.name}`}
              title={`Ledger — ${head.name}`}
              subtitle={`Closing balance: ${money(Math.abs(closing))} ${sideLabel}`}
              orientation="l"
              headers={['Date', 'Voucher', 'Type', 'Against', 'Debit', 'Credit', 'Balance']}
              rows={exportRows}
            />
          ) : undefined
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <StatCard label="Opening" value={<Money value={Math.abs(openingSigned)} />} accent="slate" />
        <StatCard label="Total Debit" value={<Money value={totalDebit} />} accent="emerald" />
        <StatCard label="Total Credit" value={<Money value={totalCredit} />} accent="gold" />
        <StatCard
          label={`Closing (${sideLabel})`}
          value={<Money value={Math.abs(closing)} />}
          accent={closing < 0 ? 'red' : 'emerald'}
        />
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title="No movements yet"
          hint="This account has no posted transactions. Entries against it will build the statement here."
        />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <th className={thClass}>Date</th>
              <th className={thClass}>Voucher</th>
              <th className={thClass}>Type</th>
              <th className={thClass}>Against</th>
              <th className={`${thClass} text-right`}>Debit</th>
              <th className={`${thClass} text-right`}>Credit</th>
              <th className={`${thClass} text-right`}>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-muted/40">
              <td className={tdClass} colSpan={4}>
                <span className="font-semibold text-ink">Opening balance</span>
              </td>
              <td className={tdClass} />
              <td className={tdClass} />
              <td className={`${tdClass} text-right font-semibold tabular-nums`}>
                {money(Math.abs(openingSigned))}
              </td>
            </tr>
            {rows.map((r) => (
              <tr key={r.id}>
                <td className={`${tdClass} whitespace-nowrap`}>{r.date}</td>
                <td className={`${tdClass} whitespace-nowrap font-mono text-xs`}>{r.voucher}</td>
                <td className={tdClass}>
                  <Badge tone="slate">{r.type}</Badge>
                </td>
                <td className={tdClass}>{r.contra}</td>
                <td className={`${tdClass} text-right tabular-nums`}>{r.debit ? money(r.debit) : '—'}</td>
                <td className={`${tdClass} text-right tabular-nums`}>{r.credit ? money(r.credit) : '—'}</td>
                <td className={`${tdClass} text-right font-semibold tabular-nums`}>{money(Math.abs(r.balance))}</td>
              </tr>
            ))}
            <tr className="bg-muted/60">
              <td className={`${tdClass} font-semibold`} colSpan={4}>
                Totals
              </td>
              <td className={`${tdClass} text-right font-semibold tabular-nums`}>{money(totalDebit)}</td>
              <td className={`${tdClass} text-right font-semibold tabular-nums`}>{money(totalCredit)}</td>
              <td className={`${tdClass} text-right font-bold tabular-nums`}>
                {money(Math.abs(closing))} {sideLabel}
              </td>
            </tr>
          </tbody>
        </TableWrap>
      )}
    </>
  );
}
