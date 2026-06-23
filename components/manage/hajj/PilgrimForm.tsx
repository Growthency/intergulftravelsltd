'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { Loader2, Upload, X } from 'lucide-react';
import { Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import { BRANCHES } from '@/lib/management/branches';
import type { HajjPilgrim, MgmtPackage } from '@/lib/management/types';

type PkgOption = Pick<MgmtPackage, 'id' | 'name' | 'price' | 'year'>;

export function PilgrimForm({
  packages,
  defaultYear,
  mode = 'create',
  pilgrimId,
  initial,
}: {
  packages: PkgOption[];
  defaultYear: number;
  mode?: 'create' | 'edit';
  pilgrimId?: string;
  initial?: Partial<HajjPilgrim>;
}) {
  const router = useRouter();
  const isEdit = mode === 'edit';
  const fileRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(initial?.photo_url ?? null);
  const [regType, setRegType] = useState<'pre-registration' | 'registered'>(
    initial?.reg_type ?? 'pre-registration',
  );

  async function handlePhoto(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'media');
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok || !data?.url) {
        toast.error(data?.error ?? 'Could not upload the photo.');
        return;
      }
      setPhotoUrl(data.url);
      toast.success('Photo uploaded.');
    } catch {
      toast.error('Network error while uploading.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saving) return;
    const fd = new FormData(e.currentTarget);

    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      name_bn: String(fd.get('name_bn') ?? ''),
      father_name: String(fd.get('father_name') ?? ''),
      mother_name: String(fd.get('mother_name') ?? ''),
      nid: String(fd.get('nid') ?? ''),
      passport_no: String(fd.get('passport_no') ?? ''),
      dob: String(fd.get('dob') ?? ''),
      gender: String(fd.get('gender') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      address: String(fd.get('address') ?? ''),
      district: String(fd.get('district') ?? ''),
      year: Number(fd.get('year') ?? defaultYear),
      reg_type: regType,
      pre_reg_no: String(fd.get('pre_reg_no') ?? ''),
      govt_serial: String(fd.get('govt_serial') ?? ''),
      branch: String(fd.get('branch') ?? 'general'),
      package_id: String(fd.get('package_id') ?? '') || null,
      token_money: Number(fd.get('token_money') ?? 0),
      photo_url: photoUrl ?? '',
      note: String(fd.get('note') ?? ''),
    };

    if (!payload.name) {
      toast.error('Pilgrim name is required.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(isEdit ? `/api/admin/hajj/${pilgrimId}` : '/api/admin/hajj', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isEdit ? { action: 'edit', ...payload } : payload),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not save the pilgrim.');
        return;
      }
      if (isEdit) {
        toast.success('Pilgrim updated.');
        router.push(`/admin/hajj/${pilgrimId}`);
      } else {
        toast.success(`Saved · ${data.tracking_no ?? ''}`.trim());
        router.push(`/admin/hajj/${data.id}`);
      }
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Identity */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="mb-4 font-display text-base font-semibold text-ink">Pilgrim details</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Full name" required>
            <input name="name" defaultValue={initial?.name ?? ''} className={inputClass} placeholder="As per passport" autoComplete="off" />
          </Field>
          <Field label="Name (Bangla)">
            <input name="name_bn" defaultValue={initial?.name_bn ?? ''} className={inputClass} placeholder="বাংলা নাম" autoComplete="off" />
          </Field>
          <Field label="Mobile number">
            <input name="phone" defaultValue={initial?.phone ?? ''} className={inputClass} placeholder="01XXXXXXXXX" inputMode="tel" />
          </Field>
          <Field label="Father's name">
            <input name="father_name" defaultValue={initial?.father_name ?? ''} className={inputClass} autoComplete="off" />
          </Field>
          <Field label="Mother's name">
            <input name="mother_name" defaultValue={initial?.mother_name ?? ''} className={inputClass} autoComplete="off" />
          </Field>
          <Field label="Date of birth">
            <input name="dob" type="date" defaultValue={initial?.dob ?? ''} className={inputClass} />
          </Field>
          <Field label="Gender">
            <select name="gender" className={inputClass} defaultValue={initial?.gender ?? ''}>
              <option value="">Select…</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </Field>
          <Field label="NID number">
            <input name="nid" defaultValue={initial?.nid ?? ''} className={inputClass} autoComplete="off" inputMode="numeric" />
          </Field>
          <Field label="Passport number">
            <input name="passport_no" defaultValue={initial?.passport_no ?? ''} className={inputClass} autoComplete="off" />
          </Field>
          <Field label="District">
            <input name="district" defaultValue={initial?.district ?? ''} className={inputClass} autoComplete="off" />
          </Field>
          <Field label="Address" className="sm:col-span-2">
            <input name="address" defaultValue={initial?.address ?? ''} className={inputClass} autoComplete="off" />
          </Field>
        </div>
      </section>

      {/* Registration */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="mb-4 font-display text-base font-semibold text-ink">Registration</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Hajj year" required>
            <input name="year" type="number" defaultValue={initial?.year ?? defaultYear} min={2000} max={2100} className={inputClass} />
          </Field>
          <Field label="Registration type" required>
            <select
              name="reg_type"
              className={inputClass}
              value={regType}
              onChange={(e) => setRegType(e.target.value as 'pre-registration' | 'registered')}
            >
              <option value="pre-registration">Pre-registration</option>
              <option value="registered">Registered</option>
            </select>
          </Field>
          <Field label="Branch / concern" required>
            <select name="branch" className={inputClass} defaultValue={initial?.branch ?? 'inter-gulf-travels'}>
              {BRANCHES.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Pre-registration no.">
            <input name="pre_reg_no" defaultValue={initial?.pre_reg_no ?? ''} className={inputClass} autoComplete="off" />
          </Field>
          <Field label="Govt. serial no.">
            <input name="govt_serial" defaultValue={initial?.govt_serial ?? ''} className={inputClass} autoComplete="off" />
          </Field>
          {isEdit ? (
            <Field label="Package" hint="Change a package from the pilgrim profile so the charge is posted correctly.">
              <input
                className={`${inputClass} bg-muted/60`}
                value={packages.find((p) => p.id === initial?.package_id)?.name ?? 'Manage from profile'}
                disabled
                readOnly
              />
            </Field>
          ) : (
            <Field label="Package" hint="Assigning a package charges its price as a due.">
              <select name="package_id" className={inputClass} defaultValue="">
                <option value="">No package yet</option>
                {packages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                    {p.year ? ` · ${p.year}` : ''} · ৳ {Number(p.price).toLocaleString('en-IN')}
                  </option>
                ))}
              </select>
            </Field>
          )}
          {!isEdit && (
            <Field label="Token money (৳)" hint="Recorded as a cash receipt.">
              <input name="token_money" type="number" min={0} step="any" defaultValue={0} className={inputClass} />
            </Field>
          )}
          <Field label="Note" className="sm:col-span-2 lg:col-span-3">
            <textarea name="note" rows={2} defaultValue={initial?.note ?? ''} className={inputClass} placeholder="Optional remarks" />
          </Field>
        </div>
      </section>

      {/* Photo */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="mb-4 font-display text-base font-semibold text-ink">Photo</h2>
        <div className="flex items-center gap-4">
          <div className="relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-muted">
            {photoUrl ? (
              <>
                <Image src={photoUrl} alt="Pilgrim photo" fill className="object-cover" sizes="96px" />
                <button
                  type="button"
                  onClick={() => setPhotoUrl(null)}
                  className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white"
                  aria-label="Remove photo"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <Upload className="h-7 w-7 text-ink-muted" />
            )}
          </div>
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handlePhoto(e.target.files?.[0])}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {uploading ? 'Uploading…' : 'Upload photo'}
            </Button>
            <p className="mt-1 text-xs text-ink-muted">JPG or PNG — converted to WebP automatically.</p>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving || uploading}>
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Save pilgrim'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} disabled={saving}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
