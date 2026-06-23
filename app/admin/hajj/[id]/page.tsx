import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, User, Pencil } from 'lucide-react';
import {
  PageHeader,
  Card,
  StatCard,
  Money,
  Badge,
  EmptyState,
  TableWrap,
  thClass,
  tdClass,
} from '@/components/manage/ui';
import { ExportBar } from '@/components/manage/ExportBar';
import { RecordPayment } from '@/components/manage/hajj/RecordPayment';
import { AssignPackage } from '@/components/manage/hajj/AssignPackage';
import { StatusControl } from '@/components/manage/hajj/StatusControl';
import { mgmtDb } from '@/lib/management/server';
import { loadBankAccounts, loadHajjPackages } from '@/lib/management/hajj';
import { naturalBalance } from '@/lib/management/types';
import { money } from '@/lib/management/format';
import { branchLabel } from '@/lib/management/branches';
import type { AccountHead, HajjPilgrim, MgmtPackage, Payment } from '@/lib/management/types';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Pilgrim Profile' };

async function loadPilgrim(id: string): Promise<HajjPilgrim | null> {
  try {
    const { data } = await mgmtDb().from('hajj_pilgrims').select('*').eq('id', id).maybeSingle();
    return (data as HajjPilgrim) ?? null;
  } catch {
    return null;
  }
}

async function loadHead(id: string | null): Promise<AccountHead | null> {
  if (!id) return null;
  try {
    const { data } = await mgmtDb().from('account_heads').select('*').eq('id', id).maybeSingle();
    return (data as AccountHead) ?? null;
  } catch {
    return null;
  }
}

async function loadPayments(pilgrimId: string): Promise<Payment[]> {
  try {
    const { data } = await mgmtDb()
      .from('payments')
      .select('*')
      .eq('party_table', 'hajj_pilgrims')
      .eq('party_id', pilgrimId)
      .order('date', { ascending: false })
      .order('created_at', { ascending: false });
    return (data ?? []) as Payment[];
  } catch {
    return [];
  }
}

const fmtDate = (d?: string | null) => (d ? new Date(d).toLocaleDateString('en-GB') : '—');

export default async function PilgrimProfilePage({ params }: { params: { id: string } }) {
  const pilgrim = await loadPilgrim(params.id);
  if (!pilgrim) notFound();

  const [head, payments, packages, banks] = await Promise.all([
    loadHead(pilgrim.account_head_id),
    loadPayments(pilgrim.id),
    loadHajjPackages(),
    loadBankAccounts(),
  ]);

  const pkgById = new Map<string, MgmtPackage>(packages.map((p) => [p.id, p]));
  const assignedPkg = pilgrim.package_id ? pkgById.get(pilgrim.package_id) : undefined;

  const charged = head ? Number(head.debit_total) : 0;
  const paid = head ? Number(head.credit_total) : 0;
  const due = head ? Math.max(0, naturalBalance(head)) : 0;

  const pkgOptions = packages
    .filter((p) => p.active || p.id === pilgrim.package_id)
    .map((p) => ({ id: p.id, name: p.name, price: p.price, year: p.year }));

  const info: [string, string | number | null | undefined][] = [
    ['Tracking no.', pilgrim.tracking_no],
    ['Hajj year', pilgrim.year],
    ['Name (Bangla)', pilgrim.name_bn],
    ['Father', pilgrim.father_name],
    ['Mother', pilgrim.mother_name],
    ['Date of birth', fmtDate(pilgrim.dob)],
    ['Gender', pilgrim.gender],
    ['NID', pilgrim.nid],
    ['Passport', pilgrim.passport_no],
    ['Phone', pilgrim.phone],
    ['District', pilgrim.district],
    ['Address', pilgrim.address],
    ['Pre-reg no.', pilgrim.pre_reg_no],
    ['Govt. serial', pilgrim.govt_serial],
    ['Branch', branchLabel(pilgrim.branch)],
  ];

  const paymentRows = payments.map((p) => [
    fmtDate(p.date),
    p.voucher_no ?? '',
    p.type,
    p.method,
    money(p.amount, false),
    p.narration ?? '',
  ]);

  return (
    <>
      <Link
        href="/admin/hajj"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" /> Back to pilgrims
      </Link>

      <PageHeader
        title={pilgrim.name}
        subtitle={`${pilgrim.tracking_no ?? 'No tracking no.'} · ${
          pilgrim.reg_type === 'registered' ? 'Registered' : 'Pre-registration'
        } · ${pilgrim.year}`}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/hajj/${pilgrim.id}/edit`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-semibold text-ink shadow-soft transition hover:border-brand-600/40 hover:text-brand-700"
            >
              <Pencil className="h-4 w-4" /> Edit
            </Link>
            <ExportBar
              filename={`hajj-${pilgrim.tracking_no ?? pilgrim.id}-receipt`}
              title={`Payment History — ${pilgrim.name}`}
              subtitle={`Tracking ${pilgrim.tracking_no ?? '—'} · Charged ${money(charged)} · Paid ${money(
                paid,
              )} · Due ${money(due)}`}
              headers={['Date', 'Voucher', 'Type', 'Method', 'Amount', 'Narration']}
              rows={paymentRows}
            />
          </div>
        }
      />

      {/* Account summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Package charged" value={<Money value={charged} />} accent="slate" />
        <StatCard label="Total paid" value={<Money value={paid} />} accent="emerald" />
        <StatCard label="Due balance" value={<Money value={due} />} accent={due > 0 ? 'red' : 'emerald'} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: identity + photo */}
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <div className="flex items-start gap-4">
              <div className="relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-muted">
                {pilgrim.photo_url ? (
                  <Image src={pilgrim.photo_url} alt={pilgrim.name} fill className="object-cover" sizes="96px" />
                ) : (
                  <User className="h-10 w-10 text-ink-muted" />
                )}
              </div>
              <div className="min-w-0">
                <p className="font-display text-lg font-semibold text-ink">{pilgrim.name}</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {pilgrim.reg_type === 'registered' ? (
                    <Badge tone="emerald">Registered</Badge>
                  ) : (
                    <Badge tone="slate">Pre-registration</Badge>
                  )}
                  {pilgrim.status === 'active' && <Badge tone="blue">Active</Badge>}
                  {pilgrim.status === 'completed' && <Badge tone="emerald">Completed</Badge>}
                  {pilgrim.status === 'cancelled' && <Badge tone="red">Cancelled</Badge>}
                </div>
              </div>
            </div>

            <dl className="mt-5 divide-y divide-border/70 text-sm">
              {info.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-3 py-2">
                  <dt className="text-ink-muted">{label}</dt>
                  <dd className="text-right font-medium text-ink">{value || '—'}</dd>
                </div>
              ))}
            </dl>
            {pilgrim.note && (
              <p className="mt-4 rounded-xl bg-muted/60 p-3 text-sm text-ink-muted">{pilgrim.note}</p>
            )}
          </Card>

          <Card>
            <h2 className="mb-3 font-display text-base font-semibold text-ink">Status</h2>
            <StatusControl pilgrimId={pilgrim.id} current={pilgrim.status} />
          </Card>
        </div>

        {/* Right: package + payments */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <h2 className="mb-1 font-display text-base font-semibold text-ink">Package</h2>
            <p className="mb-4 text-sm text-ink-muted">
              {assignedPkg
                ? `Assigned: ${assignedPkg.name}${assignedPkg.year ? ` · ${assignedPkg.year}` : ''} · ${money(
                    assignedPkg.price,
                  )}`
                : 'No package assigned yet. Assigning a package registers the pilgrim and charges its price as a due.'}
            </p>
            <AssignPackage
              pilgrimId={pilgrim.id}
              packages={pkgOptions}
              currentPackageId={pilgrim.package_id}
            />
          </Card>

          <Card>
            <h2 className="mb-4 font-display text-base font-semibold text-ink">Record a payment</h2>
            <RecordPayment pilgrimId={pilgrim.id} bankAccounts={banks} />
          </Card>

          <div>
            <h2 className="mb-3 font-display text-base font-semibold text-ink">Payment history</h2>
            {payments.length === 0 ? (
              <EmptyState title="No payments yet" hint="Recorded payments and installments will appear here." />
            ) : (
              <TableWrap>
                <thead>
                  <tr>
                    <th className={thClass}>Date</th>
                    <th className={thClass}>Voucher</th>
                    <th className={thClass}>Type</th>
                    <th className={thClass}>Method</th>
                    <th className={`${thClass} text-right`}>Amount</th>
                    <th className={thClass}>Narration</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} className="transition hover:bg-muted/40">
                      <td className={tdClass}>{fmtDate(p.date)}</td>
                      <td className={tdClass}>{p.voucher_no ?? '—'}</td>
                      <td className={`${tdClass} capitalize`}>{p.type}</td>
                      <td className={`${tdClass} capitalize`}>{p.method}</td>
                      <td className={`${tdClass} text-right`}>
                        <Money value={p.amount} />
                      </td>
                      <td className={tdClass}>{p.narration ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
