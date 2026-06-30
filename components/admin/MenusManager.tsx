'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, X, Menu as MenuIcon, CornerDownRight } from 'lucide-react';
import { Card, Field, inputClass, AdminButton, EmptyState, Badge } from '@/components/admin/ui';
import { confirmDialog } from '@/components/admin/confirm';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/adminsystem';

export type MenuItem = {
  id: string;
  label: string;
  href: string;
  parent_id: string | null;
  sort_order: number | null;
  location: string | null;
};

type Draft = {
  id?: string;
  label: string;
  href: string;
  parent_id: string | null;
  sort_order: string;
  location: string;
};

const EMPTY: Draft = {
  label: '',
  href: '',
  parent_id: null,
  sort_order: '0',
  location: 'header',
};

export function MenusManager({ items }: { items: MenuItem[] }) {
  const t = getDict(useLocale());
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const parents = useMemo(() => items.filter((i) => !i.parent_id), [items]);
  const childrenOf = useMemo(() => {
    const map = new Map<string, MenuItem[]>();
    items.forEach((i) => {
      if (i.parent_id) {
        if (!map.has(i.parent_id)) map.set(i.parent_id, []);
        map.get(i.parent_id)!.push(i);
      }
    });
    return map;
  }, [items]);

  const topLevel = useMemo(
    () => [...parents].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)),
    [parents],
  );

  function openNew(parentId: string | null = null) {
    setDraft({ ...EMPTY, parent_id: parentId });
  }

  function openEdit(item: MenuItem) {
    setDraft({
      id: item.id,
      label: item.label,
      href: item.href,
      parent_id: item.parent_id,
      sort_order: String(item.sort_order ?? 0),
      location: item.location ?? 'header',
    });
  }

  async function save() {
    if (!draft) return;
    if (draft.label.trim().length < 1 || draft.href.trim().length < 1) {
      toast.error(t.labelLinkBothRequired);
      return;
    }
    setSaving(true);
    const body = {
      id: draft.id,
      label: draft.label.trim(),
      href: draft.href.trim(),
      parent_id: draft.parent_id,
      sort_order: Number(draft.sort_order) || 0,
      location: draft.location || 'header',
    };
    try {
      const res = await fetch('/api/admin/menus', {
        method: draft.id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? t.couldNotSaveItem);
        return;
      }
      toast.success(draft.id ? t.menuItemUpdated : t.menuItemAdded);
      setDraft(null);
      router.refresh();
    } catch {
      toast.error(t.networkError);
    } finally {
      setSaving(false);
    }
  }

  async function remove(item: MenuItem) {
    const childCount = childrenOf.get(item.id)?.length ?? 0;
    const msg = childCount
      ? t.confirmDeleteItemWithChildren(item.label, childCount)
      : t.confirmDeleteItem(item.label);
    if (!(await confirmDialog({ message: msg, confirmText: t.delete, danger: true }))) return;
    setDeletingId(item.id);
    try {
      const res = await fetch(`/api/admin/menus?id=${encodeURIComponent(item.id)}`, {
        method: 'DELETE',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? t.couldNotDeleteItem);
        return;
      }
      toast.success(t.menuItemDeleted);
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
        <AdminButton variant="primary" onClick={() => openNew(null)}>
          <Plus className="h-4 w-4" /> {t.addMenuItem}
        </AdminButton>
      </div>

      {draft && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">
              {draft.id ? t.editMenuItem : t.newMenuItem}
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
            <Field label={t.parent} hint={t.forSubmenus}>
              <select
                className={inputClass}
                value={draft.parent_id ?? ''}
                onChange={(e) => setDraft({ ...draft, parent_id: e.target.value || null })}
              >
                <option value="">{t.noneTopLevel}</option>
                {parents
                  .filter((p) => p.id !== draft.id)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label={t.location}>
                <select
                  className={inputClass}
                  value={draft.location}
                  onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                >
                  <option value="header">{t.header}</option>
                  <option value="footer">{t.footer}</option>
                  <option value="mobile">{t.mobile}</option>
                </select>
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
          </div>
          <div className="flex justify-end gap-2">
            <AdminButton variant="ghost" onClick={() => setDraft(null)}>
              {t.cancel}
            </AdminButton>
            <AdminButton variant="primary" onClick={save} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {draft.id ? t.saveChanges : t.addItem}
            </AdminButton>
          </div>
        </Card>
      )}

      {items.length === 0 ? (
        <EmptyState
          icon={<MenuIcon className="h-6 w-6" />}
          title={t.noMenuItemsTitle}
          description={t.noMenuItemsDesc}
          action={
            <AdminButton variant="primary" onClick={() => openNew(null)}>
              <Plus className="h-4 w-4" /> {t.addMenuItem}
            </AdminButton>
          }
        />
      ) : (
        <div className="space-y-3">
          {topLevel.map((parent) => {
            const kids = (childrenOf.get(parent.id) ?? []).sort(
              (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
            );
            return (
              <div
                key={parent.id}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
              >
                <Row
                  item={parent}
                  labels={{ addChild: t.addSubItem, edit: t.edit, del: t.delete }}
                  onEdit={() => openEdit(parent)}
                  onDelete={() => remove(parent)}
                  onAddChild={() => openNew(parent.id)}
                  deleting={deletingId === parent.id}
                />
                {kids.length > 0 && (
                  <ul className="divide-y divide-border border-t border-border bg-muted/20">
                    {kids.map((child) => (
                      <li key={child.id} className="pl-6">
                        <Row
                          item={child}
                          child
                          labels={{ addChild: t.addSubItem, edit: t.edit, del: t.delete }}
                          onEdit={() => openEdit(child)}
                          onDelete={() => remove(child)}
                          deleting={deletingId === child.id}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Row({
  item,
  child,
  labels,
  onEdit,
  onDelete,
  onAddChild,
  deleting,
}: {
  item: MenuItem;
  child?: boolean;
  labels: { addChild: string; edit: string; del: string };
  onEdit: () => void;
  onDelete: () => void;
  onAddChild?: () => void;
  deleting: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <div className="flex min-w-0 items-center gap-2.5">
        {child && <CornerDownRight className="h-4 w-4 shrink-0 text-ink-muted" />}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{item.label}</p>
          <p className="truncate text-xs text-ink-muted">{item.href}</p>
        </div>
        {item.location && item.location !== 'header' && (
          <Badge tone="gray">{item.location}</Badge>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="hidden text-xs text-ink-muted sm:inline">#{item.sort_order ?? 0}</span>
        {onAddChild && (
          <button
            onClick={onAddChild}
            className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-brand-50 hover:text-brand-700"
            aria-label={labels.addChild}
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={onEdit}
          className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-brand-50 hover:text-brand-700"
          aria-label={labels.edit}
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={onDelete}
          disabled={deleting}
          className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
          aria-label={labels.del}
        >
          {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
