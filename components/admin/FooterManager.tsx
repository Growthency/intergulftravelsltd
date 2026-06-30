'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, X, PanelsTopLeft } from 'lucide-react';
import { Card, Field, inputClass, AdminButton, EmptyState } from '@/components/admin/ui';
import { confirmDialog } from '@/components/admin/confirm';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/adminsystem';

export type FooterLink = {
  id: string;
  label: string;
  href: string;
  column_key: string;
  sort_order: number | null;
};

type Draft = {
  id?: string;
  label: string;
  href: string;
  column_key: string;
  sort_order: string;
};

const EMPTY: Draft = { label: '', href: '', column_key: '', sort_order: '0' };

function titleCase(key: string) {
  return key
    .replace(/[-_]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function FooterManager({ links }: { links: FooterLink[] }) {
  const t = getDict(useLocale());
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const columns = useMemo(() => {
    const map = new Map<string, FooterLink[]>();
    links.forEach((l) => {
      const key = l.column_key || 'general';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(l);
    });
    map.forEach((arr) => arr.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)));
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [links]);

  const knownColumns = useMemo(
    () => Array.from(new Set(links.map((l) => l.column_key).filter(Boolean))),
    [links],
  );

  function openNew(column = '') {
    setDraft({ ...EMPTY, column_key: column });
  }

  function openEdit(link: FooterLink) {
    setDraft({
      id: link.id,
      label: link.label,
      href: link.href,
      column_key: link.column_key,
      sort_order: String(link.sort_order ?? 0),
    });
  }

  async function save() {
    if (!draft) return;
    if (
      draft.label.trim().length < 1 ||
      draft.href.trim().length < 1 ||
      draft.column_key.trim().length < 1
    ) {
      toast.error(t.footerAllRequired);
      return;
    }
    setSaving(true);
    const body = {
      id: draft.id,
      label: draft.label.trim(),
      href: draft.href.trim(),
      column_key: draft.column_key.trim(),
      sort_order: Number(draft.sort_order) || 0,
    };
    try {
      const res = await fetch('/api/admin/footer', {
        method: draft.id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? t.couldNotSaveLink);
        return;
      }
      toast.success(draft.id ? t.footerLinkUpdated : t.footerLinkAdded);
      setDraft(null);
      router.refresh();
    } catch {
      toast.error(t.networkError);
    } finally {
      setSaving(false);
    }
  }

  async function remove(link: FooterLink) {
    if (!(await confirmDialog({ message: t.confirmDeleteItem(link.label), confirmText: t.delete, danger: true }))) return;
    setDeletingId(link.id);
    try {
      const res = await fetch(`/api/admin/footer?id=${encodeURIComponent(link.id)}`, {
        method: 'DELETE',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? t.couldNotDeleteLink);
        return;
      }
      toast.success(t.footerLinkDeleted);
      router.refresh();
    } catch {
      toast.error(t.networkError);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <AdminButton variant="primary" onClick={() => openNew()}>
          <Plus className="h-4 w-4" /> {t.addFooterLink}
        </AdminButton>
      </div>

      {draft && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">
              {draft.id ? t.editFooterLink : t.newFooterLink}
            </p>
            <button
              onClick={() => setDraft(null)}
              className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-muted"
              aria-label={t.close}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t.label}>
              <input
                className={inputClass}
                value={draft.label}
                placeholder={t.menuLabelPlaceholder}
                onChange={(e) => setDraft({ ...draft, label: e.target.value })}
              />
            </Field>
            <Field label={t.link} hint={t.pathOrFullUrl}>
              <input
                className={inputClass}
                value={draft.href}
                placeholder={t.menuHrefPlaceholder}
                onChange={(e) => setDraft({ ...draft, href: e.target.value })}
              />
            </Field>
            <Field label={t.column} hint={t.columnHint}>
              <input
                className={inputClass}
                list="footer-columns"
                value={draft.column_key}
                placeholder={t.columnPlaceholder}
                onChange={(e) => setDraft({ ...draft, column_key: e.target.value })}
              />
              <datalist id="footer-columns">
                {knownColumns.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </Field>
            <Field label={t.sort} hint={t.lowerFirst}>
              <input
                type="number"
                className={inputClass}
                value={draft.sort_order}
                onChange={(e) => setDraft({ ...draft, sort_order: e.target.value })}
              />
            </Field>
          </div>
          <div className="flex justify-end gap-2">
            <AdminButton variant="ghost" onClick={() => setDraft(null)}>
              {t.cancel}
            </AdminButton>
            <AdminButton variant="primary" onClick={save} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {draft.id ? t.saveChanges : t.addLink}
            </AdminButton>
          </div>
        </Card>
      )}

      {links.length === 0 ? (
        <EmptyState
          icon={<PanelsTopLeft className="h-6 w-6" />}
          title={t.noFooterTitle}
          description={t.noFooterDesc}
          action={
            <AdminButton variant="primary" onClick={() => openNew()}>
              <Plus className="h-4 w-4" /> {t.addFooterLink}
            </AdminButton>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {columns.map(([column, items]) => (
            <div
              key={column}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <p className="text-sm font-semibold text-ink">{titleCase(column)}</p>
                <button
                  onClick={() => openNew(column)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:underline"
                >
                  <Plus className="h-3.5 w-3.5" /> {t.add}
                </button>
              </div>
              <ul className="divide-y divide-border">
                {items.map((link) => (
                  <li key={link.id} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">{link.label}</p>
                      <p className="truncate text-xs text-ink-muted">{link.href}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <span className="hidden text-xs text-ink-muted sm:inline">
                        #{link.sort_order ?? 0}
                      </span>
                      <button
                        onClick={() => openEdit(link)}
                        className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-brand-50 hover:text-brand-700"
                        aria-label={t.edit}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => remove(link)}
                        disabled={deletingId === link.id}
                        className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
                        aria-label={t.delete}
                      >
                        {deletingId === link.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
