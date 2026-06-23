import Link from 'next/link';
import { Package as PackageIcon } from 'lucide-react';
import {
  PageHeader,
  Card,
  Money,
  Badge,
  EmptyState,
  TableWrap,
  thClass,
  tdClass,
} from '@/components/manage/ui';
import { ExportBar } from '@/components/manage/ExportBar';
import { PackageForm } from '@/components/manage/hajj/PackageForm';
import { PackageDelete } from '@/components/manage/PackageDelete';
import { mgmtDb } from '@/lib/management/server';
import { loadHeadMap, dueForHead, loadHajjPackages } from '@/lib/management/hajj';
import { money } from '@/lib/management/format';
import { branchShort } from '@/lib/management/branches';
import type { HajjPilgrim, MgmtPackage } from '@/lib/management/types';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Hajj Packages' };

const CURRENT_YEAR = new Date().getFullYear();

async function loadPilgrims(): Promise<HajjPilgrim[]> {
  try {
    const { data } = await mgmtDb()
      .from('hajj_pilgrims')
      .select('*')
      .order('created_at', { ascending: false });
    return (data ?? []) as HajjPilgrim[];
  } catch {
    return [];
  }
}

export default async function HajjPackagesPage({
  searchParams,
}: {
  searchParams: { package?: string };
}) {
  const [packages, pilgrims, heads] = await Promise.all([
    loadHajjPackages(),
    loadPilgrims(),
    loadHeadMap(),
  ]);

  // assigned-count per package
  const countByPkg = new Map<string, number>();
  for (const p of pilgrims) {
    if (p.package_id) countByPkg.set(p.package_id, (countByPkg.get(p.package_id) ?? 0) + 1);
  }

  const selectedId = searchParams.package ?? '';
  const selectedPkg: MgmtPackage | undefined = packages.find((p) => p.id === selectedId);

  // Package-wise pilgrim list
  const assigned = selectedPkg
    ? pilgrims
        .filter((p) => p.package_id === selectedPkg.id)
        .map((p) => {
          const head = p.account_head_id ? heads.get(p.account_head_id) : undefined;
          const paid = head ? Number(head.credit_total) : 0;
          const due = Math.max(0, dueForHead(p.account_head_id, heads));
          return { p, paid, due };
        })
    : [];

  const assignedExport = assigned.map((r) => [
    r.p.tracking_no ?? '',
    r.p.name,
    r.p.phone ?? '',
    r.p.reg_type === 'registered' ? 'Registered' : 'Pre-registration',
    money(r.paid, false),
    money(r.due, false),
    branchShort(r.p.branch),
  ]);

  return (
    <>
      <PageHeader
        title="Hajj Packages"
        subtitle="Create packages and review the pilgrims assigned to each."
        actions={<PackageForm defaultYear={CURRENT_YEAR + 1} variant="create" />}
      />

      {packages.length === 0 ? (
        <EmptyState
          title="No packages yet"
          hint="Create your first Hajj package to start assigning pilgrims and charging dues."
          action={<PackageForm defaultYear={CURRENT_YEAR + 1} variant="create" />}
        />
      ) : (
        <TableWrap className="mb-8">
          <thead>
            <tr>
              <th className={thClass}>Package</th>
              <th className={thClass}>Year</th>
              <th className={`${thClass} text-right`}>Price</th>
              <th className={`${thClass} text-right`}>Seats</th>
              <th className={`${thClass} text-right`}>Assigned</th>
              <th className={thClass}>Branch</th>
              <th className={thClass}>Status</th>
              <th className={`${thClass} text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => {
              const assignedCount = countByPkg.get(pkg.id) ?? 0;
              return (
                <tr key={pkg.id} className="transition hover:bg-muted/40">
                  <td className={tdClass}>
                    <span className="font-medium text-ink">{pkg.name}</span>
                    {pkg.description && (
                      <span className="block text-xs text-ink-muted">{pkg.description}</span>
                    )}
                  </td>
                  <td className={tdClass}>{pkg.year ?? '—'}</td>
                  <td className={`${tdClass} text-right`}>
                    <Money value={pkg.price} />
                  </td>
                  <td className={`${tdClass} text-right`}>{pkg.seats ?? '—'}</td>
                  <td className={`${tdClass} text-right`}>
                    <Link
                      href={`/admin/hajj/packages?package=${pkg.id}`}
                      className="font-medium text-brand-700 hover:underline"
                    >
                      {assignedCount}
                    </Link>
                  </td>
                  <td className={tdClass}>{branchShort(pkg.branch)}</td>
                  <td className={tdClass}>
                    {pkg.active ? <Badge tone="emerald">Active</Badge> : <Badge tone="slate">Inactive</Badge>}
                  </td>
                  <td className={`${tdClass} text-right`}>
                    <div className="inline-flex items-center justify-end gap-2">
                      <PackageForm pkg={pkg} defaultYear={CURRENT_YEAR + 1} variant="edit" />
                      <PackageDelete id={pkg.id} name={pkg.name} endpoint="/api/admin/hajj/packages" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TableWrap>
      )}

      {/* Package-wise pilgrim list */}
      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <PackageIcon className="h-5 w-5 text-brand-700" />
            <h2 className="font-display text-base font-semibold text-ink">Package-wise pilgrims</h2>
          </div>
          {packages.length > 0 && (
            <form method="get" className="flex items-center gap-2">
              <select
                name="package"
                defaultValue={selectedId}
                className="rounded-xl border border-border bg-card px-3 py-2 text-sm text-ink"
              >
                <option value="">Choose a package…</option>
                {packages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                    {p.year ? ` · ${p.year}` : ''}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-ink-muted hover:border-brand-600/40 hover:text-brand-700"
              >
                View
              </button>
            </form>
          )}
        </div>

        {!selectedPkg ? (
          <p className="py-8 text-center text-sm text-ink-muted">
            Choose a package above to list its assigned pilgrims with paid and due amounts.
          </p>
        ) : assigned.length === 0 ? (
          <EmptyState
            title={`No pilgrims on “${selectedPkg.name}”`}
            hint="Assign this package from a pilgrim's profile to see them here."
          />
        ) : (
          <>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-ink-muted">
                {assigned.length} pilgrim{assigned.length === 1 ? '' : 's'} · {selectedPkg.name}
              </p>
              <ExportBar
                filename={`hajj-package-${selectedPkg.name.replace(/\s+/g, '-').toLowerCase()}`}
                title={`${selectedPkg.name} — Assigned Pilgrims`}
                subtitle={`${assigned.length} pilgrim${assigned.length === 1 ? '' : 's'} · Price ${money(
                  selectedPkg.price,
                )}`}
                headers={['Tracking', 'Name', 'Phone', 'Type', 'Paid', 'Due', 'Branch']}
                rows={assignedExport}
                orientation="l"
              />
            </div>
            <TableWrap>
              <thead>
                <tr>
                  <th className={thClass}>Tracking</th>
                  <th className={thClass}>Name</th>
                  <th className={thClass}>Phone</th>
                  <th className={thClass}>Type</th>
                  <th className={`${thClass} text-right`}>Paid</th>
                  <th className={`${thClass} text-right`}>Due</th>
                </tr>
              </thead>
              <tbody>
                {assigned.map(({ p, paid, due }) => (
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
                    </td>
                    <td className={tdClass}>{p.phone ?? '—'}</td>
                    <td className={tdClass}>
                      {p.reg_type === 'registered' ? (
                        <Badge tone="emerald">Registered</Badge>
                      ) : (
                        <Badge tone="slate">Pre-reg</Badge>
                      )}
                    </td>
                    <td className={`${tdClass} text-right`}>
                      <Money value={paid} />
                    </td>
                    <td className={`${tdClass} text-right`}>
                      <Money value={due} className={due > 0 ? 'font-semibold text-red-600' : ''} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
          </>
        )}
      </Card>
    </>
  );
}
