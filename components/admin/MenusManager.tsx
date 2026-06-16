'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, X, Menu as MenuIcon, CornerDownRight } from 'lucide-react';
import { Card, Field, inputClass, AdminButton, EmptyState, Badge } from '@/components/admin/ui';

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
      toast.error('Label and link are both required.');
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
        toast.error(data?.error ?? 'Could not save the menu item.');
        return;
      }
      toast.success(draft.id ? 'Menu item updated.' : 'Menu item added.');
      setDraft(null);
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function remove(item: MenuItem) {
    const childCount = childrenOf.get(item.id)?.length ?? 0;
    const msg = childCount
      ? `Delete "${item.label}"? Its ${childCount} sub-item(s) will become top-level links.`
      : `Delete "${item.label}"?`;
    if (!window.confirm(msg)) return;
    setDeletingId(item.id);
    try {
      const res = await fetch(`/api/admin/menus?id=${encodeURIComponent(item.id)}`, {
        method: 'DELETE',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not delete the menu item.');
        return;
      }
      toast.success('Menu item deleted.');
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <AdminButton variant="primary" onClick={() => openNew(null)}>
          <Plus className="h-4 w-4" /> Add menu item
        </AdminButton>
      </div>

      {draft && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">
              {draft.id ? 'Edit menu item' : 'New menu item'}
            </p>
            <button
              onClick={() => setDraft(null)}
              className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-muted"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Label">
              <input
                className={inputClass}
                value={draft.label}
                placeholder="e.g. Hajj Packages"
                onChange={(e) => setDraft({ ...draft, label: e.target.value })}
              />
            </Field>
            <Field label="Link" hint="Path or full URL">
              <input
                className={inputClass}
                value={draft.href}
                placeholder="/hajj/packages"
                onChange={(e) => setDraft({ ...draft, href: e.target.value })}
              />
            </Field>
            <Field label="Parent" hint="For submenus">
              <select
                className={inputClass}
                value={draft.parent_id ?? ''}
                onChange={(e) => setDraft({ ...draft, parent_id: e.target.value || null })}
              >
                <option value="">None (top level)</option>
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
              <Field label="Location">
                <select
                  className={inputClass}
                  value={draft.location}
                  onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                >
                  <option value="header">Header</option>
                  <option value="footer">Footer</option>
                  <option value="mobile">Mobile</option>
                </select>
              </Field>
              <Field label="Sort" hint="Lower first">
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
              Cancel
            </AdminButton>
            <AdminButton variant="primary" onClick={save} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {draft.id ? 'Save changes' : 'Add item'}
            </AdminButton>
          </div>
        </Card>
      )}

      {items.length === 0 ? (
        <EmptyState
          icon={<MenuIcon className="h-6 w-6" />}
          title="No menu items yet"
          description="Add navigation links to control the site header and menus."
          action={
            <AdminButton variant="primary" onClick={() => openNew(null)}>
              <Plus className="h-4 w-4" /> Add menu item
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
  onEdit,
  onDelete,
  onAddChild,
  deleting,
}: {
  item: MenuItem;
  child?: boolean;
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
            aria-label="Add sub-item"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={onEdit}
          className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-brand-50 hover:text-brand-700"
          aria-label="Edit"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={onDelete}
          disabled={deleting}
          className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
          aria-label="Delete"
        >
          {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
