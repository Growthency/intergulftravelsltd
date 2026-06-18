'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, PackageCheck } from 'lucide-react';
import { Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import { money } from '@/lib/management/format';
import type { MgmtPackage } from '@/lib/management/types';

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
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [packageId, setPackageId] = useState(currentPackageId ?? '');

  const selected = packages.find((p) => p.id === packageId);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!packageId) {
      toast.error('Choose a package to assign.');
      return;
    }
    if (packageId === currentPackageId) {
      toast.info('This passenger is already on that package.');
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
        toast.error(data?.error ?? 'Could not assign the package.');
        return;
      }
      toast.success('Package assigned and charged.');
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <Field label="Umrah package">
        <select className={inputClass} value={packageId} onChange={(e) => setPackageId(e.target.value)}>
          <option value="">Select a package…</option>
          {packages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}{p.year ? ` (${p.year})` : ''} — {money(p.price)}
            </option>
          ))}
        </select>
      </Field>

      {selected && !alreadyCharged && packageId !== currentPackageId && (
        <p className="rounded-xl bg-gold-50 px-3 py-2 text-xs font-medium text-gold-700">
          Assigning will charge {money(selected.price)} to this passenger&apos;s account.
        </p>
      )}
      {alreadyCharged && (
        <p className="flex items-center gap-1.5 text-xs text-ink-muted">
          <PackageCheck className="h-3.5 w-3.5" />
          The package charge has already been posted — changing the package will not charge again.
        </p>
      )}

      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={saving || !packageId}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {saving ? 'Assigning…' : currentPackageId ? 'Update package' : 'Assign package'}
        </Button>
      </div>
    </form>
  );
}
