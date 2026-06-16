'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Loader2,
  Save,
  UserRound,
  KeyRound,
  Camera,
  Eye,
  EyeOff,
  ShieldAlert,
} from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import { Card } from '@/components/dashboard/ui';
import { updateProfile, type ProfileActionState } from '@/components/dashboard/actions';
import { initials } from '@/components/dashboard/nav';

const fieldBase =
  'w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-brand-600 focus:bg-card focus:ring-2 focus:ring-brand-600/15';

type Props = {
  email: string | null;
  fullName: string;
  phone: string;
  avatarUrl: string | null;
};

export function SettingsForms({ email, fullName, phone, avatarUrl }: Props) {
  return (
    <div className="space-y-6">
      <AvatarSection name={fullName} email={email} avatarUrl={avatarUrl} />
      <ProfileSection email={email} fullName={fullName} phone={phone} />
      <PasswordSection />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Avatar
 * ------------------------------------------------------------------ */
function AvatarSection({
  name,
  email,
  avatarUrl,
}: {
  name: string;
  email: string | null;
  avatarUrl: string | null;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(avatarUrl);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file.');
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/vault/avatar', { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not update your photo.');
        setPreview(avatarUrl);
        return;
      }
      setPreview(data.avatar_url as string);
      toast.success('Profile photo updated.');
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
      setPreview(avatarUrl);
    } finally {
      setUploading(false);
      URL.revokeObjectURL(localUrl);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <Card className="p-5 sm:p-6">
      <SectionTitle icon={Camera} title="Profile photo" subtitle="A clear headshot helps our advisors recognise you." />
      <div className="mt-5 flex flex-wrap items-center gap-5">
        <div className="relative">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt={name}
              className="h-20 w-20 rounded-full object-cover ring-2 ring-brand-600/15"
            />
          ) : (
            <span className="grid h-20 w-20 place-items-center rounded-full bg-gold-gradient text-xl font-bold text-brand-900 ring-2 ring-brand-600/15">
              {initials(name)}
            </span>
          )}
          {uploading && (
            <span className="absolute inset-0 grid place-items-center rounded-full bg-ink/40">
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            </span>
          )}
        </div>

        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-semibold text-ink transition hover:border-brand-600/40 hover:bg-brand-50 disabled:opacity-60"
          >
            <Camera className="h-4 w-4" /> {preview ? 'Change photo' : 'Upload photo'}
          </button>
          <p className="mt-2 text-xs text-ink-muted">JPG, PNG or WebP. Converted to WebP, max 12MB.</p>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 *  Profile (name + phone) — server action
 * ------------------------------------------------------------------ */
function ProfileSection({
  email,
  fullName,
  phone,
}: {
  email: string | null;
  fullName: string;
  phone: string;
}) {
  const initialState: ProfileActionState = { ok: false, message: '' };
  const [state, formAction] = useFormState(updateProfile, initialState);
  const lastMessage = useRef<string>('');

  useEffect(() => {
    if (state.message && state.message !== lastMessage.current) {
      lastMessage.current = state.message;
      if (state.ok) toast.success(state.message);
      else toast.error(state.message);
    }
  }, [state]);

  return (
    <Card className="p-5 sm:p-6">
      <SectionTitle icon={UserRound} title="Personal details" subtitle="Update your name and contact number." />
      <form action={formAction} className="mt-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Full name</span>
            <input
              name="full_name"
              type="text"
              defaultValue={fullName}
              autoComplete="name"
              required
              minLength={2}
              maxLength={120}
              placeholder="e.g. Md. Abdur Rahman"
              className={fieldBase}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Phone</span>
            <input
              name="phone"
              type="tel"
              defaultValue={phone}
              autoComplete="tel"
              maxLength={40}
              placeholder="01XXX XXXXXX"
              className={fieldBase}
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">Email</span>
          <input
            type="email"
            value={email ?? ''}
            readOnly
            disabled
            className={cn(fieldBase, 'cursor-not-allowed bg-muted/60 text-ink-muted')}
          />
          <span className="mt-1.5 block text-xs text-ink-muted">
            Your email is your sign-in identity and can't be changed here.
          </span>
        </label>

        <ProfileSubmit />
      </form>
    </Card>
  );
}

function ProfileSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-6 font-semibold text-white shadow-emerald transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Saving…
        </>
      ) : (
        <>
          <Save className="h-4 w-4" /> Save changes
        </>
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ *
 *  Password — browser supabase client
 * ------------------------------------------------------------------ */
function PasswordSection() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);

  const configured = isSupabaseConfigured();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      toast.error('The two passwords do not match.');
      return;
    }
    if (!configured) {
      toast.error('Password changes are unavailable until the account service is connected.');
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        toast.error(error.message || 'Could not update your password.');
        return;
      }
      toast.success('Your password has been updated.');
      setPassword('');
      setConfirm('');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="p-5 sm:p-6">
      <SectionTitle icon={KeyRound} title="Password" subtitle="Choose a strong password you don't use elsewhere." />
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">New password</span>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                minLength={8}
                placeholder="At least 8 characters"
                className={cn(fieldBase, 'pr-11')}
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted transition hover:text-ink"
              >
                {show ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Confirm new password</span>
            <input
              type={show ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              placeholder="Re-enter the password"
              className={fieldBase}
            />
          </label>
        </div>

        {!configured && (
          <p className="flex items-center gap-2 rounded-2xl bg-gold-100 px-3.5 py-2.5 text-xs font-medium text-gold-800">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            Password changes will be enabled once the account service is connected.
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 font-semibold text-white transition hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Updating…
            </>
          ) : (
            <>
              <KeyRound className="h-4 w-4" /> Update password
            </>
          )}
        </button>
      </form>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
function SectionTitle({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof UserRound;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
        <p className="mt-0.5 text-sm text-ink-muted">{subtitle}</p>
      </div>
    </div>
  );
}
