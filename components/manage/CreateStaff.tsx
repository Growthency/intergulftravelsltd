'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { UserPlus, Loader2, ChevronDown } from 'lucide-react';
import { Field, inputClass } from '@/components/manage/ui';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/adminsystem';

const ROLE_OPTIONS = [
  { value: 'operator', labelKey: 'roleOperator' },
  { value: 'accountant', labelKey: 'roleAccountant' },
  { value: 'staff', labelKey: 'roleStaff' },
  { value: 'admin', labelKey: 'roleAdministrator' },
] as const;

type Form = {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
};

const EMPTY: Form = { full_name: '', email: '', phone: '', password: '', role: 'operator' };

/** Admin-only panel to create a staff login + profile in one step. */
export function CreateStaff() {
  const t = getDict(useLocale());
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(EMPTY);
  const [busy, setBusy] = useState(false);

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;

    if (form.full_name.trim().length < 2) return toast.error(t.enterFullName);
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return toast.error(t.enterValidEmail);
    if (form.password.length < 8) return toast.error(t.passwordMin8);

    setBusy(true);
    try {
      const res = await fetch('/api/admin/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.full_name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim() || null,
          password: form.password,
          role: form.role,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? t.couldNotCreateStaff);
        return;
      }
      toast.success(t.staffCreatedFor(form.full_name.trim()));
      setForm(EMPTY);
      setOpen(false);
      router.refresh();
    } catch {
      toast.error(t.networkError);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-card shadow-soft">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left sm:px-6"
      >
        <span className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
            <UserPlus className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-display text-base font-semibold text-ink">{t.createStaffAccount}</span>
            <span className="block text-sm text-ink-muted">
              {t.createStaffSubtitle}
            </span>
          </span>
        </span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-ink-muted transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <form onSubmit={submit} className="border-t border-border px-5 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t.fullName} required>
              <input
                className={inputClass}
                value={form.full_name}
                onChange={(e) => set('full_name', e.target.value)}
                placeholder={t.fullNamePlaceholder}
                autoComplete="off"
              />
            </Field>
            <Field label={t.email} required>
              <input
                type="email"
                className={inputClass}
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder={t.emailPlaceholder}
                autoComplete="off"
              />
            </Field>
            <Field label={t.phone}>
              <input
                className={inputClass}
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                placeholder={t.optional}
                autoComplete="off"
              />
            </Field>
            <Field label={t.tempPassword} required hint={t.tempPasswordHint}>
              <input
                type="text"
                className={inputClass}
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
                placeholder={t.tempPasswordPlaceholder}
                autoComplete="new-password"
              />
            </Field>
            <Field label={t.role} required>
              <select className={inputClass} value={form.role} onChange={(e) => set('role', e.target.value)}>
                {ROLE_OPTIONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {t[r.labelKey]}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-5 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setForm(EMPTY);
              }}
              className="rounded-full border border-border px-4 py-2.5 text-sm font-medium text-ink-muted transition hover:text-ink"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-emerald transition hover:bg-brand-700 disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
              {t.createAccount}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
