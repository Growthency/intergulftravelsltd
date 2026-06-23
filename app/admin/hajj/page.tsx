import Link from 'next/link';
import { Users, UserPlus, BadgeCheck, Wallet } from 'lucide-react';
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
import { RecordRowActions } from '@/components/manage/RecordRowActions';
import { Button } from '@/components/ui/Button';
import { mgmtDb } from '@/lib/management/server';
import { loadHeadMap, dueForHead, loadHajjPackages } from '@/lib/management/hajj';
import { branchShort } from '@/lib/management/branches';
import { money } from '@/lib/management/format';
import type { HajjPilgrim, MgmtPackage } from '@/lib/management/types';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Hajj Pilgrims' };

const CURRENT_YEAR = new Date().getFullYear();

type Search = {
  year?: string;
  reg_type?: string;
  package?: string;
  branch?: string;
  status?: string;
  q?: string;
};

async function loadPilgrims(): Promise<HajjPilgrim[]> {
  try {
    const { data, error } = await mgmtDb()
      .from('hajj_pilgrims')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('[admin/hajj] load failed:', error.message);
      return [];
    }
    return (data ?? []) as HajjPilgrim[];
  } catch (err) {
    console.error('[admin/hajj] unexpected error:', err);
    return [];
  }
}

export default async function HajjPilgrimsPage({ searchParams }: { searchParams: Search }) {
  const [allPilgrims, packages, heads] = await Promise.all([
    loadPilgrims(),
    loadHajjPackages(),
    loadHeadMap(),
  ]);

  const pkgById = new Map<string, MgmtPackage>(packages.map((p) => [p.id, p]));

  // Year tabs: every year present plus the current + next year.
  const yearSet = new Set<number>([CURRENT_YEAR, CURRENT_YEAR + 1]);
  for (const p of allPilgrims) if (p.year) yearSet.add(p.year);
  const years = Array.from(yearSet).sort((a, b) => b - a);

  const selectedYear = searchParams.year ? Number(searchParams.year) : years[0] ?? CURRENT_YEAR;
  const regType = searchParams.reg_type ?? '';
  const pkgFilter = searchParams.package ?? '';
  const branchFilter = searchParams.branch ?? '';
  const statusFilter = searchParams.status ?? '';
  const q = (searchParams.q ?? '').trim().toLowerCase();

  // Year-scoped set drives the stat cards.
  const yearPilgrims = allPilgrims.filter((p) => p.year === selectedYear);

  const filtered = yearPilgrims.filter((p) => {
    if (regType && p.reg_type !== regType) return false;
    if (pkgFilter && p.package_id !== pkgFilter) return false;
    if (branchFilter && p.branch !== branchFilter) return false;
    if (statusFilter && p.status !== statusFilter) return false;
    if (q) {
      const hay = `${p.name} ${p.tracking_no ?? ''} ${p.phone ?? ''} ${p.passport_no ?? ''} ${p.nid ?? ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  // Stats over the whole year (not the filtered subset).
  const preReg = yearPilgrims.filter((p) => p.reg_type === 'pre-registration').length;
  const registered = yearPilgrims.filter((p) => p.reg_type === 'registered').length;
  const totalDue = yearPilgrims.reduce((sum, p) => sum + Math.max(0, dueForHead(p.account_head_id, heads)), 0);

  // Build rows with paid/due once for both the table and the export.
  const rows = filtered.map((p) => {
    const head = p.account_head_id ? heads.get(p.account_head_id) : undefined;
    const due = dueForHead(p.account_head_id, heads);
    const charged = head ? Number(head.debit_total) : 0;
    const received = head ? Number(head.credit_total) : 0;
    // Paid against this customer = credits to their (asset) head.
    const paid = received;
    return {
      p,
      pkgName: p.package_id ? pkgById.get(p.package_id)?.name ?? '—' : '—',
      paid,
      due,
      charged,
    };
  });

  const exportRows = rows.map((r) => [
    r.p.tracking_no ?? '',
    r.p.name,
    r.p.phone ?? '',
    r.p.year,
    r.p.reg_type === 'registered' ? 'Registered' : 'Pre-registration',
    r.pkgName,
    money(r.paid, false),
    money(Math.max(0, r.due), false),
    branchShort(r.p.branch),
    r.p.status,
  ]);

  const qs = (patch: Partial<Search>) => {
    const sp = new URLSearchParams();
    const merged = { year: String(selectedYear), reg_type: regType, package: pkgFilter, branch: branchFilter, status: statusFilter, q: searchParams.q ?? '', ...patch };
    for (const [k, v] of Object.entries(merged)) if (v) sp.set(k, String(v));
    const s = sp.toString();
    return s ? `/admin/hajj?${s}` : '/admin/hajj';
  };

  return (
    <>
      <PageHeader
        title="Hajj Pilgrims"
        subtitle="Pre-registration, registration, packages and dues."
        actions={
          <>
            <ExportBar
              filename={`hajj-pilgrims-${selectedYear}`}
              title={`Hajj Pilgrims — ${selectedYear}`}
              subtitle={`${filtered.length} record${filtered.length === 1 ? '' : 's'}`}
              headers={['Tracking', 'Name', 'Phone', 'Year', 'Type', 'Package', 'Paid', 'Due', 'Branch', 'Status']}
              rows={exportRows}
              orientation="l"
            />
            <Button href="/admin/hajj/new" size="sm">
              <UserPlus className="h-4 w-4" /> New Pre-registration
            </Button>
          </>
        }
      />

      {/* Stat cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={`Pilgrims · ${selectedYear}`} value={yearPilgrims.length} icon={Users} accent="emerald" />
        <StatCard label="Pre-registered" value={preReg} icon={UserPlus} accent="slate" />
        <StatCard label="Registered" value={registered} icon={BadgeCheck} accent="gold" />
        <StatCard label="Total due" value={<Money value={totalDue} />} icon={Wallet} accent="red" />
      </div>

      {/* Year tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {years.map((y) => {
          const active = y === selectedYear;
          return (
            <Link
              key={y}
              href={qs({ year: String(y) })}
              className={
                active
                  ? 'rounded-full bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white'
                  : 'rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-ink-muted hover:border-brand-600/40 hover:text-brand-700'
              }
            >
              {y}
            </Link>
          );
        })}
      </div>

      {/* Filters */}
      <form method="get" className="mb-5 grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft sm:grid-cols-2 lg:grid-cols-5">
        <input type="hidden" name="year" value={selectedYear} />
        <input
          name="q"
          defaultValue={searchParams.q ?? ''}
          placeholder="Search name, tracking, phone…"
          className="rounded-xl border border-border bg-card px-3.5 py-2 text-sm text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 lg:col-span-2"
        />
        <select name="reg_type" defaultValue={regType} className="rounded-xl border border-border bg-card px-3 py-2 text-sm text-ink">
          <option value="">All types</option>
          <option value="pre-registration">Pre-registration</option>
          <option value="registered">Registered</option>
        </select>
        <select name="package" defaultValue={pkgFilter} className="rounded-xl border border-border bg-card px-3 py-2 text-sm text-ink">
          <option value="">All packages</option>
          {packages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <select name="status" defaultValue={statusFilter} className="rounded-xl border border-border bg-card px-3 py-2 text-sm text-ink">
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <div className="flex gap-2 sm:col-span-2 lg:col-span-5">
          <Button type="submit" size="sm" variant="outline">
            Apply filters
          </Button>
          <Link
            href={`/admin/hajj?year=${selectedYear}`}
            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-ink-muted hover:text-brand-700"
          >
            Reset
          </Link>
        </div>
      </form>

      {rows.length === 0 ? (
        <EmptyState
          title="No pilgrims found"
          hint={
            yearPilgrims.length === 0
              ? `No pilgrims have been entered for ${selectedYear} yet.`
              : 'No records match the current filters.'
          }
          action={
            <Button href="/admin/hajj/new" size="sm">
              <UserPlus className="h-4 w-4" /> Add a pilgrim
            </Button>
          }
        />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <th className={thClass}>Tracking</th>
              <th className={thClass}>Name</th>
              <th className={thClass}>Phone</th>
              <th className={thClass}>Type</th>
              <th className={thClass}>Package</th>
              <th className={`${thClass} text-right`}>Paid</th>
              <th className={`${thClass} text-right`}>Due</th>
              <th className={thClass}>Status</th>
              <th className={`${thClass} text-right`}>Manage</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ p, pkgName, paid, due }) => (
              <tr key={p.id} className="transition hover:bg-muted/40">
                <td className={tdClass}>
                  <Link href={`/admin/hajj/${p.id}`} className="font-medium text-brand-700 hover:underline">
                    {p.tracking_no ?? '—'}
                  </Link>
                </td>
                <td className={tdClass}>
                  <Link href={`/admin/hajj/${p.id}`} className="font-medium text-ink hover:text-brand-700">
                    {p.name}
                  </Link>
                  {p.name_bn && <span className="block text-xs text-ink-muted">{p.name_bn}</span>}
                </td>
                <td className={tdClass}>{p.phone ?? '—'}</td>
                <td className={tdClass}>
                  {p.reg_type === 'registered' ? (
                    <Badge tone="emerald">Registered</Badge>
                  ) : (
                    <Badge tone="slate">Pre-reg</Badge>
                  )}
                </td>
                <td className={tdClass}>{pkgName}</td>
                <td className={`${tdClass} text-right`}>
                  <Money value={paid} />
                </td>
                <td className={`${tdClass} text-right`}>
                  <Money value={Math.max(0, due)} className={due > 0 ? 'font-semibold text-red-600' : ''} />
                </td>
                <td className={tdClass}>
                  {p.status === 'active' && <Badge tone="blue">Active</Badge>}
                  {p.status === 'completed' && <Badge tone="emerald">Completed</Badge>}
                  {p.status === 'cancelled' && <Badge tone="red">Cancelled</Badge>}
                </td>
                <td className={`${tdClass} whitespace-nowrap text-right`}>
                  <RecordRowActions
                    editHref={`/admin/hajj/${p.id}/edit`}
                    deleteEndpoint={`/api/admin/hajj/${p.id}`}
                    name={p.name}
                    confirmMessage={`Delete ${p.name}${p.tracking_no ? ` (${p.tracking_no})` : ''}? This permanently removes the pilgrim, their payments and all ledger entries. This cannot be undone.`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </>
  );
}
