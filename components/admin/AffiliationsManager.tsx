'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Plane,
  BedDouble,
  Plus,
  Trash2,
  X,
  Loader2,
  Pencil,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Check,
} from 'lucide-react';
import { Card, Field, inputClass, AdminButton, EmptyState, Badge } from '@/components/admin/ui';
import { confirmDialog } from '@/components/admin/confirm';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { cn } from '@/lib/utils';
import type { Affiliation } from '@/lib/affiliations';

type Category = 'flight' | 'hotel';

const TABS: { key: Category; label: string; icon: React.ReactNode; help: string }[] = [
  {
    key: 'flight',
    label: 'Flight Partners',
    icon: <Plane className="h-4 w-4" />,
    help: 'Airlines featured on the public Our Affiliations section.',
  },
  {
    key: 'hotel',
    label: 'Hotel Partners',
    icon: <BedDouble className="h-4 w-4" />,
    help: 'Makkah & Madinah hotels featured on the public site.',
  },
];

type FormState = {
  id: string | null;
  category: Category;
  name: string;
  logo_url: string | null;
  website_url: string;
  sort_order: string;
  active: boolean;
};

function emptyForm(category: Category, sort_order: number): FormState {
  return {
    id: null,
    category,
    name: '',
    logo_url: null,
    website_url: '',
    sort_order: String(sort_order),
    active: true,
  };
}

export function AffiliationsManager({ initial }: { initial: Affiliation[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<Category>('flight');
  const [items, setItems] = useState<Affiliation[]>(initial);
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const byCategory = useMemo(() => {
    const list = items
      .filter((a) => a.category === tab)
      .sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name));
    return list;
  }, [items, tab]);

  const nextSort = useMemo(() => {
    const list = items.filter((a) => a.category === tab);
    return list.length ? Math.max(...list.map((a) => a.sort_order)) + 1 : 0;
  }, [items, tab]);

  function openCreate() {
    setForm(emptyForm(tab, nextSort));
  }

  function openEdit(a: Affiliation) {
    setForm({
      id: a.id,
      category: a.category,
      name: a.name,
      logo_url: a.logo_url,
      website_url: a.website_url ?? '',
      sort_order: String(a.sort_order),
      active: a.active,
    });
  }

  async function refresh() {
    router.refresh();
  }

  async function save() {
    if (!form) return;
    if (form.name.trim().length < 1) {
      toast.error('Please enter the partner name.');
      return;
    }
    setSaving(true);
    try {
      const isEdit = Boolean(form.id);
      const body = {
        ...(isEdit ? { id: form.id } : {}),
        category: form.category,
        name: form.name.trim(),
        logo_url: form.logo_url || '',
        website_url: form.website_url.trim(),
        sort_order: Number(form.sort_order) || 0,
        active: form.active,
      };
      const res = await fetch('/api/admin/affiliations', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not save this partner.');
        return;
      }
      toast.success(isEdit ? 'Partner updated.' : 'Partner added.');
      setForm(null);
      await refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function patch(id: string, changes: Partial<Affiliation>) {
    setBusyId(id);
    try {
      const res = await fetch('/api/admin/affiliations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...changes }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not update this partner.');
        return false;
      }
      // Optimistically reflect the change so reorder/toggle feels instant.
      setItems((prev) => prev.map((a) => (a.id === id ? { ...a, ...changes } : a)));
      await refresh();
      return true;
    } catch {
      toast.error('Network error. Please try again.');
      return false;
    } finally {
      setBusyId(null);
    }
  }

  async function toggleActive(a: Affiliation) {
    const ok = await patch(a.id, { active: !a.active });
    if (ok) toast.success(a.active ? 'Hidden from the site.' : 'Now visible on the site.');
  }

  async function move(a: Affiliation, direction: -1 | 1) {
    const sorted = byCategory;
    const index = sorted.findIndex((x) => x.id === a.id);
    const swapWith = sorted[index + direction];
    if (!swapWith) return;
    // Swap sort_order values between the two neighbours.
    setBusyId(a.id);
    try {
      await Promise.all([
        fetch('/api/admin/affiliations', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: a.id, sort_order: swapWith.sort_order }),
        }),
        fetch('/api/admin/affiliations', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: swapWith.id, sort_order: a.sort_order }),
        }),
      ]);
      setItems((prev) =>
        prev.map((x) => {
          if (x.id === a.id) return { ...x, sort_order: swapWith.sort_order };
          if (x.id === swapWith.id) return { ...x, sort_order: a.sort_order };
          return x;
        }),
      );
      await refresh();
    } catch {
      toast.error('Could not reorder. Please try again.');
    } finally {
      setBusyId(null);
    }
  }

  async function remove(a: Affiliation) {
    if (!(await confirmDialog({ message: `Remove "${a.name}" from your partners?`, confirmText: 'Delete', danger: true }))) return;
    setBusyId(a.id);
    try {
      const res = await fetch(`/api/admin/affiliations?id=${encodeURIComponent(a.id)}`, {
        method: 'DELETE',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not delete this partner.');
        return;
      }
      setItems((prev) => prev.filter((x) => x.id !== a.id));
      toast.success('Partner removed.');
      await refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-5">
      {/* Tabs + add button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-soft">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key);
                setForm(null);
              }}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition',
                tab === t.key
                  ? 'bg-brand-600 text-white shadow-emerald'
                  : 'text-ink-muted hover:text-ink',
              )}
            >
              {t.icon}
              {t.label}
              <span
                className={cn(
                  'rounded-full px-1.5 text-xs',
                  tab === t.key ? 'bg-white/20 text-white' : 'bg-muted text-ink-muted',
                )}
              >
                {items.filter((a) => a.category === t.key).length}
              </span>
            </button>
          ))}
        </div>

        <AdminButton variant="primary" onClick={openCreate}>
          <Plus className="h-4 w-4" /> Add {tab === 'flight' ? 'airline' : 'hotel'}
        </AdminButton>
      </div>

      <p className="text-sm text-ink-muted">{TABS.find((t) => t.key === tab)?.help}</p>

      {/* Add / edit form */}
      {form && form.category === tab && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">
              {form.id ? 'Edit partner' : `New ${tab === 'flight' ? 'airline' : 'hotel'} partner`}
            </p>
            <button
              onClick={() => setForm(null)}
              className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-muted"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
            <Field label="Logo" hint="Optional — stored as WebP">
              <ImageUploader
                folder="media"
                label="Partner logo"
                aspect="video"
                value={form.logo_url}
                onChange={(url) => setForm((f) => (f ? { ...f, logo_url: url } : f))}
              />
            </Field>

            <div className="space-y-3">
              <Field label="Name">
                <input
                  className={inputClass}
                  value={form.name}
                  placeholder={tab === 'flight' ? 'e.g. Saudia' : 'e.g. Hilton Suites Makkah'}
                  onChange={(e) => setForm((f) => (f ? { ...f, name: e.target.value } : f))}
                />
              </Field>

              <Field label="Website" hint="Optional">
                <input
                  className={inputClass}
                  value={form.website_url}
                  placeholder="https://"
                  inputMode="url"
                  onChange={(e) => setForm((f) => (f ? { ...f, website_url: e.target.value } : f))}
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Sort order" hint="Lower shows first">
                  <input
                    type="number"
                    className={inputClass}
                    value={form.sort_order}
                    onChange={(e) =>
                      setForm((f) => (f ? { ...f, sort_order: e.target.value } : f))
                    }
                  />
                </Field>
                <Field label="Visibility">
                  <button
                    type="button"
                    onClick={() => setForm((f) => (f ? { ...f, active: !f.active } : f))}
                    className={cn(
                      'flex h-[46px] w-full items-center justify-center gap-2 rounded-xl border text-sm font-semibold transition',
                      form.active
                        ? 'border-brand-600/30 bg-brand-50 text-brand-700'
                        : 'border-border bg-muted text-ink-muted',
                    )}
                  >
                    {form.active ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    {form.active ? 'Visible on site' : 'Hidden'}
                  </button>
                </Field>
              </div>

              <AdminButton
                variant="primary"
                onClick={save}
                disabled={saving}
                className="w-full"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {form.id ? 'Save changes' : 'Add partner'}
              </AdminButton>
            </div>
          </div>
        </Card>
      )}

      {/* Existing partners */}
      {byCategory.length === 0 ? (
        <EmptyState
          icon={tab === 'flight' ? <Plane className="h-6 w-6" /> : <BedDouble className="h-6 w-6" />}
          title={`No ${tab === 'flight' ? 'airlines' : 'hotels'} yet`}
          description={`Add your first ${
            tab === 'flight' ? 'airline' : 'hotel'
          } partner to feature it on the public site.`}
          action={
            <AdminButton variant="primary" onClick={openCreate}>
              <Plus className="h-4 w-4" /> Add {tab === 'flight' ? 'airline' : 'hotel'}
            </AdminButton>
          }
        />
      ) : (
        <div className="space-y-3">
          {byCategory.map((a, index) => {
            const busy = busyId === a.id;
            return (
              <div
                key={a.id}
                className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft"
              >
                {/* Logo / initials thumbnail */}
                <div className="grid h-16 w-24 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-white">
                  {a.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={a.logo_url}
                      alt={a.name}
                      className="h-full w-full object-contain p-1.5"
                    />
                  ) : (
                    <span className="font-display text-xs font-semibold text-ink-muted">
                      No logo
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-semibold text-ink">{a.name}</p>
                    {a.active ? (
                      <Badge tone="emerald">Visible</Badge>
                    ) : (
                      <Badge tone="gray">Hidden</Badge>
                    )}
                    <span className="text-xs text-ink-muted">#{a.sort_order}</span>
                  </div>
                  {a.website_url && (
                    <a
                      href={a.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 inline-flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span className="truncate">{a.website_url}</span>
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => move(a, -1)}
                    disabled={busy || index === 0}
                    className="grid h-9 w-9 place-items-center rounded-lg text-ink-muted transition hover:bg-muted disabled:opacity-30"
                    aria-label="Move up"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => move(a, 1)}
                    disabled={busy || index === byCategory.length - 1}
                    className="grid h-9 w-9 place-items-center rounded-lg text-ink-muted transition hover:bg-muted disabled:opacity-30"
                    aria-label="Move down"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => toggleActive(a)}
                    disabled={busy}
                    className={cn(
                      'rounded-lg px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50',
                      a.active
                        ? 'text-ink-muted hover:bg-muted'
                        : 'bg-brand-50 text-brand-700 hover:bg-brand-100',
                    )}
                  >
                    {busy ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : a.active ? (
                      'Hide'
                    ) : (
                      'Show'
                    )}
                  </button>

                  <button
                    onClick={() => openEdit(a)}
                    disabled={busy}
                    className="grid h-9 w-9 place-items-center rounded-lg text-ink-muted transition hover:bg-muted disabled:opacity-50"
                    aria-label={`Edit ${a.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => remove(a)}
                    disabled={busy}
                    className="grid h-9 w-9 place-items-center rounded-lg text-rose-600 transition hover:bg-rose-50 disabled:opacity-50"
                    aria-label={`Delete ${a.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
