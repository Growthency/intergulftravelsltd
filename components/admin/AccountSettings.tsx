'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { Loader2, Upload, X, User, Mail, KeyRound, Phone, MapPin } from 'lucide-react';
import { Card, Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/adminshell';

type Initial = { email: string; full_name: string; avatar_url: string | null; phone: string; address: string };

export function AccountSettings({ initial, canEditEmail = true }: { initial: Initial; canEditEmail?: boolean }) {
  const router = useRouter();
  const locale = useLocale();
  const t = getDict(locale).account;
  const L =
    locale === 'bn'
      ? { phone: 'ফোন', address: 'ঠিকানা', phonePh: 'যেমন 01711 000000', addressPh: 'যেমন ৩১, পুরানা পল্টন, ঢাকা' }
      : { phone: 'Phone', address: 'Address', phonePh: 'e.g. 01711 000000', addressPh: 'e.g. 31, Purana Paltan, Dhaka' };
  const fileRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initial.avatar_url);

  async function handlePhoto(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'media');
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.url) {
        toast.error(data?.error ?? t.couldNotUpload);
        return;
      }
      setAvatarUrl(data.url);
      toast.success(t.photoUploaded);
    } catch {
      toast.error(t.uploadNetworkError);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saving) return;
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get('password') ?? '');
    const confirm = String(fd.get('confirm') ?? '');
    if (password && password !== confirm) {
      toast.error(t.passwordsMismatch);
      return;
    }

    const payload: Record<string, unknown> = {
      full_name: String(fd.get('full_name') ?? '').trim(),
      avatar_url: avatarUrl,
      phone: String(fd.get('phone') ?? '').trim(),
      address: String(fd.get('address') ?? '').trim(),
    };
    // The email input is disabled for branch accounts (so it submits nothing).
    // Only send it when it actually has a value — an empty string would fail
    // email validation and block saving the name/photo/password.
    const email = String(fd.get('email') ?? '').trim();
    if (email) payload.email = email;
    if (password) payload.password = password;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/account', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? t.couldNotSave);
        return;
      }
      toast.success(data.emailChanged ? t.savedNewEmail : t.accountUpdated);
      router.refresh();
    } catch {
      toast.error(t.networkError);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-6">
      {/* Profile */}
      <Card className="space-y-5">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
          <User className="h-4 w-4 text-brand-600" /> {t.profile}
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full border border-border bg-muted">
            {avatarUrl ? (
              <>
                <Image src={avatarUrl} alt={t.profilePhotoAlt} fill className="object-cover" sizes="80px" />
                <button
                  type="button"
                  onClick={() => setAvatarUrl(null)}
                  className="absolute right-0.5 top-0.5 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white"
                  aria-label={t.removePhoto}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <User className="h-8 w-8 text-ink-muted" />
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
            <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {uploading ? t.uploading : t.uploadPhoto}
            </Button>
            <p className="mt-1 text-xs text-ink-muted">{t.photoHint}</p>
          </div>
        </div>
        <Field label={t.fullName}>
          <input name="full_name" defaultValue={initial.full_name} className={inputClass} placeholder={t.yourName} autoComplete="name" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={L.phone}>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3">
              <Phone className="h-4 w-4 shrink-0 text-ink-muted" />
              <input name="phone" defaultValue={initial.phone} className="w-full bg-transparent py-2.5 text-sm text-ink outline-none" placeholder={L.phonePh} autoComplete="tel" />
            </div>
          </Field>
          <Field label={L.address}>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3">
              <MapPin className="h-4 w-4 shrink-0 text-ink-muted" />
              <input name="address" defaultValue={initial.address} className="w-full bg-transparent py-2.5 text-sm text-ink outline-none" placeholder={L.addressPh} autoComplete="street-address" />
            </div>
          </Field>
        </div>
      </Card>

      {/* Sign-in */}
      <Card className="space-y-5">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
          <Mail className="h-4 w-4 text-brand-600" /> {t.signInEmail}
        </h2>
        <Field
          label={t.emailAddress}
          hint={canEditEmail ? undefined : t.emailFixedHint}
        >
          <input
            name="email"
            type="email"
            defaultValue={initial.email}
            className={inputClass}
            autoComplete="email"
            disabled={!canEditEmail}
            readOnly={!canEditEmail}
          />
        </Field>

        <h2 className="flex items-center gap-2 border-t border-border pt-5 font-display text-lg font-semibold text-ink">
          <KeyRound className="h-4 w-4 text-brand-600" /> {t.changePassword}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t.newPassword} hint={t.newPasswordHint}>
            <input name="password" type="password" className={inputClass} autoComplete="new-password" placeholder="••••••••" />
          </Field>
          <Field label={t.confirmNewPassword}>
            <input name="confirm" type="password" className={inputClass} autoComplete="new-password" placeholder="••••••••" />
          </Field>
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving || uploading}>
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? t.saving : t.saveChanges}
        </Button>
      </div>
    </form>
  );
}
