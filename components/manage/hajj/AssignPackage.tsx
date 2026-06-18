'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import type { MgmtPackage } from '@/lib/management/types';

type PkgOption = Pick<MgmtPackage, 'id' | 'name' | 'price' | 'year'>;

export function AssignPackage({
  pilgrimId,
  packages,
  currentPackageId,
}: {
  pilgrimId: string;
  packages: PkgOption[];
  currentPackageId: string | null;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [packageId, setPackageId] = useState(currentPackageId ?? '');

  async function assign() {
    if (saving) return;
    if (!packageId) {
      toast.error('Select a package first.');
      return;
    }
    if (packageId === currentPackageId) {
      toast.info('That package is already assigned.');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/hajj/${pilgrimId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'assign-package', package_id: packageId }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not assign the package.');
        return;
      }
      toast.success('Package assigned. The price has been charged as a due.');
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <label className="block flex-1">
        <span className="mb-1 block text-sm font-medium text-ink">Package</span>
        <select
          className={inputClass}
          value={packageId}
          onChange={(e) => setPackageId(e.target.value)}
        >
          <option value="">Select a package…</option>
          {packages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
              {p.year ? ` · ${p.year}` : ''} · ৳ {Number(p.price).toLocaleString('en-IN')}
            </option>
          ))}
        </select>
      </label>
      <Button type="button" onClick={assign} disabled={saving || packages.length === 0}>
        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
        {currentPackageId ? 'Change package' : 'Assign package'}
      </Button>
    </div>
  );
}
