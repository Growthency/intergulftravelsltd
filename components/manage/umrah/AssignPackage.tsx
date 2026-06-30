'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, PackageCheck } from 'lucide-react';
import { Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import { money } from '@/lib/management/format';
import type { MgmtPackage } from '@/lib/management/types';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/adminumrah';

type PackageOption = Pick<MgmtPackage, 'id' | 'name' | 'price' | 'year'>;

export function AssignPackage({
  passengerId,
  packages,
  currentPackageId,
  alreadyCharged,
}: {
  passengerId: string;
  packages: PackageOption[];
  currentPackageId: string | null;
  alreadyCharged: boolean;
}) {
  const t = getDict(useLocale());
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [packageId, setPackageId] = useState(currentPackageId ?? '');

  const selected = packages.find((p) => p.id === packageId);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!packageId) {
      toast.error(t.toastChoosePackage);
      return;
    }
    if (packageId === currentPackageId) {
      toast.info(t.toastAlreadyOnPackage);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/umrah/${passengerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ package_id: packageId }),
      });
      const data = await res.json().catch(() => ({}));
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
    <form onSubmit={submit} className="space-y-3">
      <Field label={t.umrahPackage}>
        <select className={inputClass} value={packageId} onChange={(e) => setPackageId(e.target.value)}>
          <option value="">{t.selectPackage}</option>
          {packages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}{p.year ? ` (${p.year})` : ''} — {money(p.price)}
            </option>
          ))}
        </select>
      </Field>

      {selected && !alreadyCharged && packageId !== currentPackageId && (
        <p className="rounded-xl bg-gold-50 px-3 py-2 text-xs font-medium text-gold-700">
          {t.assignWillCharge.replace('{amount}', money(selected.price))}
        </p>
      )}
      {alreadyCharged && (
        <p className="flex items-center gap-1.5 text-xs text-ink-muted">
          <PackageCheck className="h-3.5 w-3.5" />
          {t.alreadyChargedHint}
        </p>
      )}

      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={saving || !packageId}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {saving ? t.assigningEllipsis : currentPackageId ? t.updatePackage : t.assignPackage}
        </Button>
      </div>
    </form>
  );
}
