'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import { BRANCHES } from '@/lib/management/branches';
import type { MgmtPackage } from '@/lib/management/types';

type EditTarget = Pick<
  MgmtPackage,
  'id' | 'name' | 'price' | 'year' | 'seats' | 'branch' | 'description' | 'active'
>;

const empty = {
  name: '',
  price: '',
  year: String(new Date().getFullYear()),
  seats: '',
  branch: 'inter-gulf-travels',
  description: '',
  active: true,
};

export function PackageForm({ editing, assignedCount = 0 }: { editing?: EditTarget; assignedCount?: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(!!editing);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState(
    editing
      ? {
          name: editing.name ?? '',
          price: String(editing.price ?? ''),
          year: editing.year ? String(editing.year) : '',
          seats: editing.seats != null ? String(editing.seats) : '',
          branch: editing.branch ?? 'inter-gulf-travels',
          description: editing.description ?? '',
          active: editing.active ?? true,
        }
      : empty,
  );

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Package name is required.');
      return;
    }
    setSaving(true);
    try {
      const body = {
        ...(editing ? { id: editing.id } : {}),
        name: form.name,
        price: form.price ? Number(form.price) : 0,
        year: form.year ? Number(form.year) : null,
        seats: form.seats ? Number(form.seats) : null,
        branch: form.branch,
        description: form.description,
        active: form.active,
      };
      const res = await fetch('/api/admin/umrah/packages', {
        method: editing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not save the package.');
        return;
      }
      toast.success(editing ? 'Package updated.' : 'Package created.');
      if (!editing) {
        setForm(empty);
        setOpen(false);
      }
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!editing) return;
    if (!confirm(`Delete the package "${editing.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/umrah/packages?id=${editing.id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not delete the package.');
        return;
      }
      toast.success('Package deleted.');
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setDeleting(false);
    }
  }

  if (editing) {
    // Inline edit panel (always expanded).
    return (
      <form onSubmit={submit} className="space-y-4">
        <Fields form={form} set={set} setActive={(v) => setForm((f) => ({ ...f, active: v }))} />
        <div className="flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={remove}
            disabled={deleting || saving || assignedCount > 0}
            className="!border-rose-200 !text-rose-600 hover:!bg-rose-50"
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            {assignedCount > 0 ? `${assignedCount} assigned` : 'Delete'}
          </Button>
          <Button type="submit" size="sm" disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Pencil className="h-4 w-4" />}
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div>
      {!open ? (
        <Button type="button" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" /> New package
        </Button>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <Fields form={form} set={set} setActive={(v) => setForm((f) => ({ ...f, active: v }))} />
          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="outline" size="sm" onClick={() => setOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              {saving ? 'Saving…' : 'Create package'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

function Fields({
  form,
  set,
  setActive,
}: {
  form: typeof empty;
  set: (key: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  setActive: (v: boolean) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Package name" required className="sm:col-span-2">
        <input className={inputClass} value={form.name} onChange={set('name')} placeholder="e.g. Umrah Economy 14 Days" />
      </Field>
      <Field label="Price (৳)" required>
        <input type="number" min={0} step="0.01" className={inputClass} value={form.price} onChange={set('price')} placeholder="0" />
      </Field>
      <Field label="Year">
        <input type="number" className={inputClass} value={form.year} onChange={set('year')} placeholder="2026" />
      </Field>
      <Field label="Seats / capacity">
        <input type="number" min={0} className={inputClass} value={form.seats} onChange={set('seats')} placeholder="Optional" />
      </Field>
      <Field label="Branch / Concern" required>
        <select className={inputClass} value={form.branch} onChange={set('branch')}>
          {BRANCHES.map((b) => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>
      </Field>
      <Field label="Description" className="sm:col-span-2" hint="Duration, hotel, inclusions, etc.">
        <textarea className={inputClass} rows={2} value={form.description} onChange={set('description')} />
      </Field>
      <label className="flex items-center gap-2 sm:col-span-2">
        <input
          type="checkbox"
          checked={form.active}
          onChange={(e) => setActive(e.target.checked)}
          className="h-4 w-4 rounded border-border text-brand-600 focus:ring-brand-600/30"
        />
        <span className="text-sm font-medium text-ink">Active (available for new bookings)</span>
      </label>
    </div>
  );
}
