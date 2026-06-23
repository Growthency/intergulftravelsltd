'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Pencil, Users, X } from 'lucide-react';
import { Money, Badge } from '@/components/manage/ui';
import { PackageForm } from '@/components/manage/umrah/PackageForm';
import { PackageDelete } from '@/components/manage/PackageDelete';
import { branchShort } from '@/lib/management/branches';
import type { MgmtPackage } from '@/lib/management/types';

export function PackageRow({
  pkg,
  assignedCount,
  totalDue,
}: {
  pkg: MgmtPackage;
  assignedCount: number;
  totalDue: number;
}) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-semibold text-ink">{pkg.name}</h3>
            {!pkg.active && <Badge tone="red">Inactive</Badge>}
            <Badge>{branchShort(pkg.branch)}</Badge>
            {pkg.year && <Badge tone="gold">{pkg.year}</Badge>}
          </div>
          {pkg.description && <p className="mt-1 text-sm text-ink-muted">{pkg.description}</p>}
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            <span className="font-semibold text-ink"><Money value={pkg.price} /></span>
            <span className="inline-flex items-center gap-1 text-ink-muted">
              <Users className="h-3.5 w-3.5" /> {assignedCount} assigned
              {pkg.seats ? ` / ${pkg.seats} seats` : ''}
            </span>
            {totalDue > 0 && (
              <span className="text-red-600">Due <Money value={totalDue} className="text-red-600" /></span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/umrah?package=${pkg.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink-muted transition hover:border-brand-600/40 hover:text-brand-700"
          >
            <Users className="h-3.5 w-3.5" /> Passengers
          </Link>
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink-muted transition hover:border-brand-600/40 hover:text-brand-700"
          >
            {editing ? <X className="h-3.5 w-3.5" /> : <Pencil className="h-3.5 w-3.5" />}
            {editing ? 'Close' : 'Edit'}
          </button>
          <PackageDelete id={pkg.id} name={pkg.name} endpoint="/api/admin/umrah/packages" />
        </div>
      </div>

      {editing && (
        <div className="mt-5 border-t border-border pt-5">
          <PackageForm editing={pkg} assignedCount={assignedCount} />
        </div>
      )}
    </div>
  );
}
