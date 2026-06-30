'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Save, Plus, X, Phone, Mail, MapPin, Share2, Palette } from 'lucide-react';
import { Card, Field, inputClass, AdminButton } from '@/components/admin/ui';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/adminsystem';

export type ContactSettings = {
  phones: string[];
  emails: string[];
  whatsapp: string;
  whatsappDisplay: string;
  address: { line1: string; line2: string; country: string };
  hours: string;
};

export type SocialLink = { label: string; href: string };

export type ThemeSettings = { primary: string; accent: string };

export function SettingsForm({
  contact,
  social,
  theme,
}: {
  contact: ContactSettings;
  social: SocialLink[];
  theme: ThemeSettings;
}) {
  return (
    <div className="space-y-6">
      <ContactSection initial={contact} />
      <SocialSection initial={social} />
      <ThemeSection initial={theme} />
    </div>
  );
}

async function saveKey(key: string, value: unknown) {
  const res = await fetch('/api/admin/settings', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, value }),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok && data?.ok, error: data?.error as string | undefined };
}

/* ----------------------------- Contact ----------------------------- */
function ContactSection({ initial }: { initial: ContactSettings }) {
  const t = getDict(useLocale());
  const router = useRouter();
  const [form, setForm] = useState<ContactSettings>(initial);
  const [saving, setSaving] = useState(false);

  function setList(key: 'phones' | 'emails', idx: number, value: string) {
    setForm((f) => {
      const next = [...f[key]];
      next[idx] = value;
      return { ...f, [key]: next };
    });
  }
  function addToList(key: 'phones' | 'emails') {
    setForm((f) => ({ ...f, [key]: [...f[key], ''] }));
  }
  function removeFromList(key: 'phones' | 'emails', idx: number) {
    setForm((f) => ({ ...f, [key]: f[key].filter((_, i) => i !== idx) }));
  }

  async function submit() {
    setSaving(true);
    const value: ContactSettings = {
      ...form,
      phones: form.phones.map((p) => p.trim()).filter(Boolean),
      emails: form.emails.map((e) => e.trim()).filter(Boolean),
    };
    const { ok, error } = await saveKey('contact', value);
    setSaving(false);
    if (!ok) {
      toast.error(error ?? t.couldNotSaveContact);
      return;
    }
    toast.success(t.contactSaved);
    router.refresh();
  }

  return (
    <Card className="space-y-5">
      <SectionHeader
        icon={<Phone className="h-4 w-4" />}
        title={t.contactDetails}
        subtitle={t.contactSubtitle}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <ListField
          label={t.phoneNumbers}
          addLabel={t.add}
          noneLabel={t.noneYet}
          removeLabel={t.remove}
          icon={<Phone className="h-3.5 w-3.5" />}
          values={form.phones}
          placeholder="01XXX XXXXXX"
          onChange={(i, v) => setList('phones', i, v)}
          onAdd={() => addToList('phones')}
          onRemove={(i) => removeFromList('phones', i)}
        />
        <ListField
          label={t.emailAddresses}
          addLabel={t.add}
          noneLabel={t.noneYet}
          removeLabel={t.remove}
          icon={<Mail className="h-3.5 w-3.5" />}
          values={form.emails}
          placeholder="info@example.com"
          onChange={(i, v) => setList('emails', i, v)}
          onAdd={() => addToList('emails')}
          onRemove={(i) => removeFromList('emails', i)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.whatsappNumber} hint={t.whatsappNumberHint}>
          <input
            className={inputClass}
            value={form.whatsapp}
            placeholder="8801711358939"
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
          />
        </Field>
        <Field label={t.whatsappDisplay}>
          <input
            className={inputClass}
            value={form.whatsappDisplay}
            placeholder="+880 1711 358939"
            onChange={(e) => setForm({ ...form, whatsappDisplay: e.target.value })}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={t.addressLine1}>
          <input
            className={inputClass}
            value={form.address.line1}
            onChange={(e) =>
              setForm({ ...form, address: { ...form.address, line1: e.target.value } })
            }
          />
        </Field>
        <Field label={t.addressLine2}>
          <input
            className={inputClass}
            value={form.address.line2}
            onChange={(e) =>
              setForm({ ...form, address: { ...form.address, line2: e.target.value } })
            }
          />
        </Field>
        <Field label={t.country}>
          <input
            className={inputClass}
            value={form.address.country}
            onChange={(e) =>
              setForm({ ...form, address: { ...form.address, country: e.target.value } })
            }
          />
        </Field>
      </div>

      <Field label={t.openingHours} hint="">
        <input
          className={inputClass}
          value={form.hours}
          placeholder={t.openingHoursPlaceholder}
          onChange={(e) => setForm({ ...form, hours: e.target.value })}
        />
      </Field>

      <div className="flex justify-end">
        <AdminButton variant="primary" onClick={submit} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {t.saveContactDetails}
        </AdminButton>
      </div>
    </Card>
  );
}

/* ----------------------------- Social ----------------------------- */
function SocialSection({ initial }: { initial: SocialLink[] }) {
  const t = getDict(useLocale());
  const router = useRouter();
  const [links, setLinks] = useState<SocialLink[]>(initial.length ? initial : [{ label: '', href: '' }]);
  const [saving, setSaving] = useState(false);

  function update(idx: number, key: keyof SocialLink, value: string) {
    setLinks((l) => l.map((item, i) => (i === idx ? { ...item, [key]: value } : item)));
  }

  async function submit() {
    setSaving(true);
    const value = links
      .map((l) => ({ label: l.label.trim(), href: l.href.trim() }))
      .filter((l) => l.label && l.href);
    const { ok, error } = await saveKey('social', value);
    setSaving(false);
    if (!ok) {
      toast.error(error ?? t.couldNotSaveSocial);
      return;
    }
    toast.success(t.socialSaved);
    router.refresh();
  }

  return (
    <Card className="space-y-5">
      <SectionHeader
        icon={<Share2 className="h-4 w-4" />}
        title={t.socialLinks}
        subtitle={t.socialSubtitle}
      />

      <div className="space-y-3">
        {links.map((link, i) => (
          <div key={i} className="grid grid-cols-[1fr_2fr_auto] items-center gap-2">
            <input
              className={inputClass}
              value={link.label}
              placeholder="Facebook"
              onChange={(e) => update(i, 'label', e.target.value)}
            />
            <input
              className={inputClass}
              value={link.href}
              placeholder="https://facebook.com/…"
              onChange={(e) => update(i, 'href', e.target.value)}
            />
            <button
              onClick={() => setLinks((l) => l.filter((_, idx) => idx !== i))}
              className="grid h-10 w-10 place-items-center rounded-lg border border-border text-ink-muted transition hover:border-rose-300 hover:text-rose-600"
              aria-label={t.remove}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setLinks((l) => [...l, { label: '', href: '' }])}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"
        >
          <Plus className="h-4 w-4" /> {t.addSocialLink}
        </button>
        <AdminButton variant="primary" onClick={submit} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {t.saveSocialLinks}
        </AdminButton>
      </div>
    </Card>
  );
}

/* ----------------------------- Theme ----------------------------- */
function ThemeSection({ initial }: { initial: ThemeSettings }) {
  const t = getDict(useLocale());
  const router = useRouter();
  const [theme, setTheme] = useState<ThemeSettings>(initial);
  const [saving, setSaving] = useState(false);

  const valid = (hex: string) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex);

  async function submit() {
    if (!valid(theme.primary) || !valid(theme.accent)) {
      toast.error(t.invalidHex);
      return;
    }
    setSaving(true);
    const { ok, error } = await saveKey('theme', theme);
    setSaving(false);
    if (!ok) {
      toast.error(error ?? t.couldNotSaveTheme);
      return;
    }
    toast.success(t.themeSaved);
    router.refresh();
  }

  return (
    <Card className="space-y-5">
      <SectionHeader
        icon={<Palette className="h-4 w-4" />}
        title={t.themeColours}
        subtitle={t.themeSubtitle}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <ColorField
          label={t.primary}
          value={theme.primary}
          onChange={(v) => setTheme({ ...theme, primary: v })}
        />
        <ColorField
          label={t.accent}
          value={theme.accent}
          onChange={(v) => setTheme({ ...theme, accent: v })}
        />
      </div>

      <div className="flex justify-end">
        <AdminButton variant="primary" onClick={submit} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {t.saveTheme}
        </AdminButton>
      </div>
    </Card>
  );
}

/* ----------------------------- Shared bits ----------------------------- */
function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-border pb-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
        {icon}
      </span>
      <div>
        <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
        <p className="text-sm text-ink-muted">{subtitle}</p>
      </div>
    </div>
  );
}

function ListField({
  label,
  addLabel,
  noneLabel,
  removeLabel,
  icon,
  values,
  placeholder,
  onChange,
  onAdd,
  onRemove,
}: {
  label: string;
  addLabel: string;
  noneLabel: string;
  removeLabel: string;
  icon: React.ReactNode;
  values: string[];
  placeholder: string;
  onChange: (idx: number, value: string) => void;
  onAdd: () => void;
  onRemove: (idx: number) => void;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      <div className="space-y-2">
        {values.length === 0 && (
          <p className="text-xs text-ink-muted">{noneLabel}</p>
        )}
        {values.map((value, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-muted text-ink-muted">
              {icon}
            </span>
            <input
              className={inputClass}
              value={value}
              placeholder={placeholder}
              onChange={(e) => onChange(i, e.target.value)}
            />
            <button
              onClick={() => onRemove(i)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border text-ink-muted transition hover:border-rose-300 hover:text-rose-600"
              aria-label={removeLabel}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={onAdd}
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"
      >
        <Plus className="h-4 w-4" /> {addLabel}
      </button>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const safe = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value) ? value : '#000000';
  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      <div className="flex items-center gap-3">
        <label className="relative h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-border">
          <span className="block h-full w-full" style={{ backgroundColor: safe }} />
          <input
            type="color"
            value={safe}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </label>
        <input
          className={`${inputClass} font-mono uppercase`}
          value={value}
          placeholder="#0e7c5a"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
