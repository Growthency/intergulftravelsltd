'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import type { MgmtPackage } from '@/lib/management/types';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/adminhajj';

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
  const t = getDict(useLocale());
  const [saving, setSaving] = useState(false);
  const [packageId, setPackageId] = useState(currentPackageId ?? '');

  async function assign() {
    if (saving) return;
    if (!packageId) {
      toast.error(t.toastSelectPackage);
      return;
    }
    if (packageId === currentPackageId) {
      toast.info(t.toastAlreadyAssigned);
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
        toast.error(data?.error ?? t.toastAssignFail);
        return;
      }
      toast.success(t.toastAssigned);
      router.refresh();
    } catch {
      toast.error(t.toastNetwork);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <label className="block flex-1">
        <span className="mb-1 block text-sm font-medium text-ink">{t.packageLabel}</span>
        <select
          className={inputClass}
          value={packageId}
          onChange={(e) => setPackageId(e.target.value)}
        >
          <option value="">{t.selectPackage}</option>
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
        {currentPackageId ? t.changePackage : t.assignPackage}
      </Button>
    </div>
  );
}
