'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Pencil, Plus, Trash2, X } from 'lucide-react';
import { Field, inputClass } from '@/components/manage/ui';
import { confirmDialog } from '@/components/admin/confirm';
import { Button } from '@/components/ui/Button';
import { BRANCHES } from '@/lib/management/branches';
import type { MgmtPackage } from '@/lib/management/types';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/adminhajj';

type Props = {
  /** When editing, the existing package; otherwise undefined for a new one. */
  pkg?: MgmtPackage;
  defaultYear: number;
  /** Render compact (used in the edit row) vs. a full create card. */
  variant?: 'create' | 'edit';
};

export function PackageForm({ pkg, defaultYear, variant = 'create' }: Props) {
  const router = useRouter();
  const t = getDict(useLocale());
  const isEdit = Boolean(pkg);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saving) return;
    const fd = new FormData(e.currentTarget);

    const payload: Record<string, unknown> = {
      name: String(fd.get('name') ?? '').trim(),
      year: fd.get('year') ? Number(fd.get('year')) : null,
      price: Number(fd.get('price') ?? 0),
      seats: fd.get('seats') ? Number(fd.get('seats')) : null,
      branch: String(fd.get('branch') ?? 'general'),
      description: String(fd.get('description') ?? ''),
      active: fd.get('active') === 'on',
    };
    if (isEdit && pkg) payload.id = pkg.id;

    if (!payload.name) {
      toast.error(t.toastPkgNameRequired);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/hajj/packages', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? t.toastPkgSaveFail);
        return;
      }
      toast.success(isEdit ? t.toastPkgUpdated : t.toastPkgCreated);
      setOpen(false);
      router.refresh();
    } catch {
      toast.error(t.toastNetwork);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!pkg || deleting) return;
    if (!(await confirmDialog({ message: t.confirmDeletePackage.replace('{name}', pkg.name), confirmText: t.confirmDeleteText, danger: true }))) return;
    setDeleting(true);
    try {
      const res = await fetch('/api/admin/hajj/packages', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: pkg.id }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? t.toastPkgDeleteFail);
        return;
      }
      toast.success(t.toastPkgDeleted);
      setOpen(false);
      router.refresh();
    } catch {
      toast.error(t.toastNetwork);
    } finally {
      setDeleting(false);
    }
  }

  const trigger =
    variant === 'edit' ? (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800"
      >
        <Pencil className="h-3.5 w-3.5" /> {t.editLabel}
      </button>
    ) : (
      <Button type="button" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" /> {t.newPackage}
      </Button>
    );

  if (!open) return trigger;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-base font-semibold text-ink">
            {isEdit ? t.editPackage : t.newHajjPackage}
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-full text-ink-muted hover:bg-muted"
            aria-label={t.closeLabel}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <Field label={t.packageName} required className="sm:col-span-2">
            <input name="name" defaultValue={pkg?.name ?? ''} className={inputClass} placeholder={t.packageNamePlaceholder} />
          </Field>
          <Field label={t.year}>
            <input
              name="year"
              type="number"
              min={2000}
              max={2100}
              defaultValue={pkg?.year ?? defaultYear}
              className={inputClass}
            />
          </Field>
          <Field label={t.priceTaka} required>
            <input name="price" type="number" min={0} step="any" defaultValue={pkg?.price ?? 0} className={inputClass} />
          </Field>
          <Field label={t.seats}>
            <input name="seats" type="number" min={0} defaultValue={pkg?.seats ?? ''} className={inputClass} />
          </Field>
          <Field label={t.branchConcern} required>
            <select name="branch" className={inputClass} defaultValue={pkg?.branch ?? 'inter-gulf-travels'}>
              {BRANCHES.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t.description} className="sm:col-span-2">
            <textarea name="description" rows={2} defaultValue={pkg?.description ?? ''} className={inputClass} />
          </Field>
          <label className="flex items-center gap-2 sm:col-span-2">
            <input type="checkbox" name="active" defaultChecked={pkg?.active ?? true} className="h-4 w-4 rounded border-border" />
            <span className="text-sm text-ink">{t.activeForAssignment}</span>
          </label>

          <div className="mt-1 flex items-center justify-between sm:col-span-2">
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {isEdit ? t.saveChanges : t.createPackage}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={saving}>
                {t.cancel}
              </Button>
            </div>
            {isEdit && (
              <button
                type="button"
                onClick={onDelete}
                disabled={deleting}
                className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-60"
              >
                {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                {t.deleteLabel}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
