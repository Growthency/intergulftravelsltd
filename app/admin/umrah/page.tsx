import Link from 'next/link';
import { Users, UserCheck, HandCoins, CalendarClock, Plus, Plane } from 'lucide-react';
import {
  PageHeader,
  StatCard,
  Money,
  Badge,
  EmptyState,
  TableWrap,
  thClass,
  tdClass,
} from '@/components/manage/ui';
import { ExportBar } from '@/components/manage/ExportBar';
import { Button } from '@/components/ui/Button';
import { PassengerFilters } from '@/components/manage/umrah/PassengerFilters';
import { loadPassengers, loadUmrahPackages, isExpiringSoon, monthsUntil, type PassengerRow } from '@/lib/management/umrah';
import { money } from '@/lib/management/format';
import { branchShort } from '@/lib/management/branches';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Umrah Passengers' };

function fmtDate(d: string | null | undefined) {
  if (!d) return '—';
  const dt = new Date(d);
  return Number.isNaN(dt.getTime()) ? '—' : dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function applyFilters(rows: PassengerRow[], sp: Record<string, string | undefined>): PassengerRow[] {
  let out = rows;
  const q = sp.q?.trim().toLowerCase();
  if (q) {
    out = out.filter((r) =>
      [r.name, r.name_bn, r.passport_no, r.phone].some((v) => v?.toLowerCase().includes(q)),
    );
  }
  if (sp.package === 'unassigned') out = out.filter((r) => !r.package_id);
  else if (sp.package) out = out.filter((r) => r.package_id === sp.package);
  if (sp.branch) out = out.filter((r) => r.branch === sp.branch);
  if (sp.status) out = out.filter((r) => r.status === sp.status);
  if (sp.expiring === '1') out = out.filter((r) => isExpiringSoon(r.passport_expiry));
  return out;
}

export default async function UmrahPassengersPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const [all, packages] = await Promise.all([loadPassengers(), loadUmrahPackages()]);
  const rows = applyFilters(all, searchParams);

  // Stats are computed across the full (unfiltered) set.
  const total = all.length;
  const assigned = all.filter((r) => r.package_id).length;
  const unassigned = total - assigned;
  const totalDue = all.reduce((s, r) => s + r.due, 0);
  const expiringSoon = all.filter((r) => isExpiringSoon(r.passport_expiry) && r.status === 'active').length;

  const exportRows = rows.map((r) => [
    r.name,
    r.passport_no ?? '',
    fmtDate(r.passport_expiry),
    r.phone ?? '',
    r.package_name ?? 'Unassigned',
    money(r.paid, false),
    money(r.due, false),
  ]);

  return (
    <>
      <PageHeader
        title="Umrah Passengers"
        subtitle="Passport records, package bookings, payments and dues for every Umrah passenger."
        actions={
          <>
            <ExportBar
              filename="umrah-passengers"
              title="Umrah Passengers"
              subtitle={`${rows.length} record(s)`}
              headers={['Name', 'Passport', 'Expiry', 'Phone', 'Package', 'Paid', 'Due']}
              rows={exportRows}
              orientation="l"
            />
            <Button href="/admin/umrah/new">
              <Plus className="h-4 w-4" /> New Passenger
            </Button>
          </>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total passengers" value={total} icon={Users} />
        <StatCard
          label="Assigned"
          value={assigned}
          hint={`${unassigned} unassigned`}
          icon={UserCheck}
          accent="gold"
        />
        <StatCard label="Total due" value={<Money value={totalDue} />} icon={HandCoins} accent="red" />
        <StatCard
          label="Passports expiring"
          value={expiringSoon}
          hint="within 6 months"
          icon={CalendarClock}
          accent="slate"
        />
      </div>

      <PassengerFilters packages={packages.map((p) => ({ id: p.id, name: p.name }))} />

      {rows.length === 0 ? (
        <EmptyState
          title={total === 0 ? 'No passengers yet' : 'No passengers match these filters'}
          hint={
            total === 0
              ? 'Add your first Umrah passenger to start tracking passports, packages and payments.'
              : 'Try clearing or changing the filters above.'
          }
          action={
            total === 0 ? (
              <Button href="/admin/umrah/new">
                <Plus className="h-4 w-4" /> New Passenger
              </Button>
            ) : undefined
          }
        />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <th className={thClass}>Passenger</th>
              <th className={thClass}>Passport</th>
              <th className={thClass}>Expiry</th>
              <th className={thClass}>Phone</th>
              <th className={thClass}>Package</th>
              <th className={`${thClass} text-right`}>Paid</th>
              <th className={`${thClass} text-right`}>Due</th>
              <th className={thClass}>Branch</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const months = monthsUntil(r.passport_expiry);
              const expiring = isExpiringSoon(r.passport_expiry);
              const expired = months !== null && months < 0;
              return (
                <tr key={r.id} className="transition hover:bg-muted/40">
                  <td className={tdClass}>
                    <Link href={`/admin/umrah/${r.id}`} className="font-semibold text-ink hover:text-brand-700">
                      {r.name}
                    </Link>
                    {r.name_bn && <p className="text-xs text-ink-muted">{r.name_bn}</p>}
                    {r.status !== 'active' && (
                      <span className="mt-1 inline-block">
                        <Badge tone={r.status === 'cancelled' ? 'red' : 'emerald'}>{r.status}</Badge>
                      </span>
                    )}
                  </td>
                  <td className={`${tdClass} tabular-nums`}>{r.passport_no ?? '—'}</td>
                  <td className={tdClass}>
                    {r.passport_expiry ? (
                      <span className={expired ? 'font-semibold text-red-600' : expiring ? 'font-semibold text-amber-600' : ''}>
                        {fmtDate(r.passport_expiry)}
                        {expired && <span className="ml-1 text-xs">(expired)</span>}
                        {!expired && expiring && months !== null && (
                          <span className="ml-1 text-xs">({months}m)</span>
                        )}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className={`${tdClass} tabular-nums`}>{r.phone ?? '—'}</td>
                  <td className={tdClass}>
                    {r.package_name ? (
                      r.package_name
                    ) : (
                      <span className="text-ink-muted">Unassigned</span>
                    )}
                  </td>
                  <td className={`${tdClass} text-right`}>
                    <Money value={r.paid} />
                  </td>
                  <td className={`${tdClass} text-right`}>
                    {r.due > 0 ? <Money value={r.due} className="font-semibold text-red-600" /> : <Money value={0} />}
                  </td>
                  <td className={tdClass}>
                    <Badge>{branchShort(r.branch)}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TableWrap>
      )}

      {total === 0 && (
        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-muted">
          <Plane className="h-3.5 w-3.5" /> Umrah management — Inter Gulf Travels Ltd.
        </p>
      )}
    </>
  );
}
