'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { UploadCloud, Loader2, X, CheckCircle2, User } from 'lucide-react';
import { Card, Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import { BRANCHES } from '@/lib/management/branches';
import type { MgmtPackage, UmrahPassenger } from '@/lib/management/types';
import { money } from '@/lib/management/format';
import { cn } from '@/lib/utils';

type PackageOption = Pick<MgmtPackage, 'id' | 'name' | 'price' | 'year'>;

export function PassengerForm({
  packages,
  mode = 'create',
  passengerId,
  initial,
}: {
  packages: PackageOption[];
  mode?: 'create' | 'edit';
  passengerId?: string;
  initial?: Partial<UmrahPassenger>;
}) {
  const router = useRouter();
  const isEdit = mode === 'edit';
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(initial?.photo_url ?? null);
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    name_bn: initial?.name_bn ?? '',
    passport_no: initial?.passport_no ?? '',
    passport_issue: initial?.passport_issue ?? '',
    passport_expiry: initial?.passport_expiry ?? '',
    dob: initial?.dob ?? '',
    phone: initial?.phone ?? '',
    address: initial?.address ?? '',
    branch: initial?.branch ?? 'inter-gulf-travels',
    package_id: initial?.package_id ?? '',
    token_money: '',
    note: initial?.note ?? '',
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function uploadPhoto(file: File) {
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file.');
      return;
    }
    setUploading(true);
    try {
      const body = new FormData();
      body.append('file', file);
      body.append('folder', 'media');
      const res = await fetch('/api/admin/upload', { method: 'POST', body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok || !data?.url) {
        toast.error(data?.error ?? 'Upload failed. Please try again.');
        return;
      }
      setPhotoUrl(data.url as string);
      toast.success('Photo uploaded.');
    } catch {
      toast.error('Network error while uploading.');
    } finally {
      setUploading(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Passenger name is required.');
      return;
    }
    setSaving(true);
    try {
      // On edit we PATCH only the profile fields. Package + branch are managed
      // from the profile so the ledger charge stays correct.
      const editPayload = {
        name: form.name,
        name_bn: form.name_bn,
        passport_no: form.passport_no,
        passport_issue: form.passport_issue,
        passport_expiry: form.passport_expiry,
        dob: form.dob,
        phone: form.phone,
        address: form.address,
        note: form.note,
        photo_url: photoUrl,
      };

      const res = await fetch(isEdit ? `/api/admin/umrah/${passengerId}` : '/api/admin/umrah', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isEdit
            ? editPayload
            : {
                ...form,
                token_money: form.token_money ? Number(form.token_money) : 0,
                photo_url: photoUrl,
              },
        ),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not save the passenger.');
        return;
      }
      toast.success(isEdit ? 'Passenger updated.' : 'Passenger added.');
      router.push(`/admin/umrah/${isEdit ? passengerId : data.id}`);
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <Card className="space-y-5">
          <h2 className="font-display text-lg font-semibold text-ink">Passenger details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name (English)" required>
              <input className={inputClass} value={form.name} onChange={set('name')} placeholder="As in passport" />
            </Field>
            <Field label="Name (Bangla)">
              <input className={inputClass} value={form.name_bn} onChange={set('name_bn')} placeholder="বাংলায় নাম" />
            </Field>
            <Field label="Phone">
              <input className={inputClass} value={form.phone} onChange={set('phone')} placeholder="01XXXXXXXXX" />
            </Field>
            <Field label="Date of birth">
              <input type="date" className={inputClass} value={form.dob} onChange={set('dob')} />
            </Field>
            <Field label="Address" className="sm:col-span-2">
              <textarea className={inputClass} rows={2} value={form.address} onChange={set('address')} placeholder="Village / Road, Thana, District" />
            </Field>
          </div>

          <h3 className="border-t border-border pt-4 font-display text-base font-semibold text-ink">
            Passport information
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Passport no.">
              <input className={inputClass} value={form.passport_no} onChange={set('passport_no')} placeholder="A01234567" />
            </Field>
            <Field label="Issue date">
              <input type="date" className={inputClass} value={form.passport_issue} onChange={set('passport_issue')} />
            </Field>
            <Field label="Expiry date">
              <input type="date" className={inputClass} value={form.passport_expiry} onChange={set('passport_expiry')} />
            </Field>
          </div>

          <h3 className="border-t border-border pt-4 font-display text-base font-semibold text-ink">
            Booking
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Branch / Concern" required>
              <select className={inputClass} value={form.branch} onChange={set('branch')} disabled={isEdit}>
                {BRANCHES.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </Field>
            {!isEdit && (
              <Field label="Umrah package" hint="Optional — assigning charges the package price.">
                <select className={inputClass} value={form.package_id} onChange={set('package_id')}>
                  <option value="">Not assigned yet</option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}{p.year ? ` (${p.year})` : ''} — {money(p.price)}
                    </option>
                  ))}
                </select>
              </Field>
            )}
            {!isEdit && (
              <Field label="Token money (৳)" hint="Recorded as a received cash payment.">
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  className={inputClass}
                  value={form.token_money}
                  onChange={set('token_money')}
                  placeholder="0"
                />
              </Field>
            )}
            <Field label="Note" className="sm:col-span-2">
              <textarea className={inputClass} rows={2} value={form.note} onChange={set('note')} placeholder="Any internal remarks" />
            </Field>
            {isEdit && (
              <p className="sm:col-span-2 text-xs text-ink-muted">
                Package assignment and branch are managed from the passenger profile so the ledger charge stays accurate.
              </p>
            )}
          </div>
        </Card>

        <Card className="space-y-3">
          <h2 className="font-display text-lg font-semibold text-ink">Photo</h2>
          {photoUrl ? (
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoUrl} alt="Passenger" className="aspect-[3/4] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-ink/80 to-transparent p-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold-300" /> Stored
                </span>
                <button
                  type="button"
                  onClick={() => setPhotoUrl(null)}
                  className="grid h-7 w-7 place-items-center rounded-full bg-white/90 text-rose-600 transition hover:bg-white"
                  aria-label="Remove photo"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <label
              className={cn(
                'flex aspect-[3/4] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-background/40 px-4 text-center transition hover:border-brand-600/50 hover:bg-brand-50/50',
                uploading && 'pointer-events-none opacity-70',
              )}
            >
              {uploading ? (
                <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
              ) : (
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <UploadCloud className="h-6 w-6" />
                </span>
              )}
              <span className="text-sm font-semibold text-ink">
                {uploading ? 'Uploading…' : 'Upload photo'}
              </span>
              <span className="text-xs text-ink-muted">Passport-size · auto WebP</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void uploadPhoto(file);
                  e.target.value = '';
                }}
              />
            </label>
          )}
          <p className="flex items-start gap-1.5 text-xs text-ink-muted">
            <User className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            A customer ledger account is created automatically for every passenger.
          </p>
        </Card>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={saving}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Save passenger'}
        </Button>
      </div>
    </form>
  );
}
