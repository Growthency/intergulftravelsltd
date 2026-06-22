'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  GripVertical,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Plus,
  Link2,
  ListTree,
  RotateCcw,
  Download,
} from 'lucide-react';
import { Card, Field, inputClass, AdminButton, EmptyState } from '@/components/admin/ui';
import { navigation } from '@/lib/site';

/** Row shape loaded from the DB (`menu_items`, header location). */
export type BuilderItem = {
  id: string;
  label: string | null;
  href: string | null;
  parent_id: string | null;
  sort_order: number | null;
  location: string | null;
};

/** Local, ordered, flat working state. Order in the array IS the display order. */
type Node = {
  tempId: string;
  label: string;
  href: string;
  parentTempId: string | null;
};

/** This site's real pages, offered as one-click quick links. */
const QUICK_LINKS: { label: string; href: string }[] = [
  { label: 'Home', href: '/' },
  { label: 'Hajj', href: '/hajj' },
  { label: 'Umrah', href: '/umrah' },
  { label: 'Services', href: '/services' },
  { label: 'Branches', href: '/branches' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Videos', href: '/videos' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Get Free Estimate', href: '/estimate' },
];

let counter = 0;
function nextId() {
  counter += 1;
  return `n${Date.now().toString(36)}${counter}`;
}

/**
 * Turn the DB rows (top-level + children via parent_id) into a flat, ordered
 * Node[] where every child immediately follows its parent — the same shape the
 * builder maintains while editing.
 */
function buildInitialNodes(items: BuilderItem[]): Node[] {
  const valid = items.filter((i) => i.label && i.href);
  const sorted = [...valid].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  const idToTemp = new Map<string, string>();
  sorted.forEach((i) => idToTemp.set(i.id, nextId()));

  const tops = sorted.filter((i) => !i.parent_id);
  const nodes: Node[] = [];

  for (const top of tops) {
    const topTemp = idToTemp.get(top.id)!;
    nodes.push({
      tempId: topTemp,
      label: top.label as string,
      href: top.href as string,
      parentTempId: null,
    });
    const kids = sorted.filter((i) => i.parent_id === top.id);
    for (const kid of kids) {
      nodes.push({
        tempId: idToTemp.get(kid.id)!,
        label: kid.label as string,
        href: kid.href as string,
        // Only two levels: a child of a child is flattened under the top parent.
        parentTempId: topTemp,
      });
    }
  }

  return nodes;
}

/** The site's built-in default navigation, expressed as builder nodes. */
function defaultNodes(): Node[] {
  const nodes: Node[] = [];
  for (const item of navigation) {
    const topTemp = nextId();
    nodes.push({ tempId: topTemp, label: item.label, href: item.href, parentTempId: null });
    for (const c of item.children ?? []) {
      nodes.push({ tempId: nextId(), label: c.label, href: c.href, parentTempId: topTemp });
    }
  }
  return nodes;
}

export function MenuBuilder({ initial }: { initial: BuilderItem[] }) {
  const router = useRouter();
  const [nodes, setNodes] = useState<Node[]>(() => buildInitialNodes(initial));
  const [saving, setSaving] = useState(false);
  const [customLabel, setCustomLabel] = useState('');
  const [customHref, setCustomHref] = useState('');
  const [dragId, setDragId] = useState<string | null>(null);

  const indexByTemp = useMemo(() => {
    const m = new Map<string, number>();
    nodes.forEach((n, i) => m.set(n.tempId, i));
    return m;
  }, [nodes]);

  function addItem(label: string, href: string) {
    const trimmedLabel = label.trim();
    const trimmedHref = href.trim();
    if (!trimmedLabel || !trimmedHref) {
      toast.error('A label and a link are both required.');
      return;
    }
    setNodes((prev) => [
      ...prev,
      { tempId: nextId(), label: trimmedLabel, href: trimmedHref, parentTempId: null },
    ]);
  }

  function addCustom() {
    if (!customLabel.trim() || !customHref.trim()) {
      toast.error('Enter both a label and a URL for the custom link.');
      return;
    }
    addItem(customLabel, customHref);
    setCustomLabel('');
    setCustomHref('');
  }

  function removeNode(tempId: string) {
    setNodes((prev) => {
      // Removing a parent re-parents (orphans) its children to top level.
      return prev
        .filter((n) => n.tempId !== tempId)
        .map((n) => (n.parentTempId === tempId ? { ...n, parentTempId: null } : n));
    });
  }

  /** Move a node (and, if it's a parent, its children) up or down as a block. */
  function move(tempId: string, dir: -1 | 1) {
    setNodes((prev) => {
      const idx = prev.findIndex((n) => n.tempId === tempId);
      if (idx === -1) return prev;
      const node = prev[idx];

      if (node.parentTempId) {
        // Child: reorder only within its sibling group under the same parent.
        const siblings = prev.filter((n) => n.parentTempId === node.parentTempId);
        const sIdx = siblings.findIndex((n) => n.tempId === tempId);
        const target = sIdx + dir;
        if (target < 0 || target >= siblings.length) return prev;
        const swapWith = siblings[target].tempId;
        const a = idx;
        const b = prev.findIndex((n) => n.tempId === swapWith);
        const copy = [...prev];
        [copy[a], copy[b]] = [copy[b], copy[a]];
        return copy;
      }

      // Top-level: move the whole block (parent + its contiguous children)
      // before/after the neighbouring top-level block.
      const blocks = topLevelBlocks(prev);
      const here = blocks.findIndex((b) => b.tempId === tempId);
      const neighbour = here + dir;
      if (here === -1 || neighbour < 0 || neighbour >= blocks.length) return prev;

      const mine = blocks[here];
      const blockNodes = prev.slice(mine.start, mine.end);
      const others = prev.filter((_, i) => i < mine.start || i >= mine.end);

      const targetBlock = blocks[neighbour];
      const anchorTemp =
        dir === -1 ? targetBlock.tempId : prev[targetBlock.end - 1].tempId;
      let insertAt = others.findIndex((n) => n.tempId === anchorTemp);
      if (insertAt === -1) insertAt = others.length;
      if (dir === 1) insertAt += 1; // place after the down-neighbour's last node

      const result = [...others];
      result.splice(insertAt, 0, ...blockNodes);
      return result;
    });
  }

  /** Outdent: make a child a top-level item again. */
  function outdent(tempId: string) {
    setNodes((prev) => {
      const idx = prev.findIndex((n) => n.tempId === tempId);
      if (idx === -1 || !prev[idx].parentTempId) return prev;
      const node = prev[idx];
      // Pull it out and place it right after its former parent's whole block so
      // the visual order stays sensible.
      const without = prev.filter((n) => n.tempId !== tempId);
      const pIdx = without.findIndex((n) => n.tempId === node.parentTempId);
      const at = pIdx === -1 ? without.length : blockOf(without, pIdx).end;
      const result = [...without];
      result.splice(at, 0, { ...node, parentTempId: null });
      return result;
    });
  }

  /** Indent: nest under the nearest valid top-level item directly above. */
  function indent(tempId: string) {
    setNodes((prev) => {
      const idx = prev.findIndex((n) => n.tempId === tempId);
      if (idx === -1 || idx === 0) {
        toast.error('Nothing above to nest under.');
        return prev;
      }
      const node = prev[idx];
      if (node.parentTempId) {
        toast.error('This item is already nested.');
        return prev;
      }
      // It must not have its own children (max depth = 2).
      const hasChildren = prev.some((n) => n.parentTempId === tempId);
      if (hasChildren) {
        toast.error('Items with sub-items cannot be nested. Move its sub-items out first.');
        return prev;
      }
      // Walk upward to find the first top-level item to be the parent.
      let parentTemp: string | null = null;
      for (let i = idx - 1; i >= 0; i -= 1) {
        if (!prev[i].parentTempId) {
          parentTemp = prev[i].tempId;
          break;
        }
      }
      if (!parentTemp) {
        toast.error('No top-level item above to nest under.');
        return prev;
      }
      // Re-place the node as the last child of that parent's block.
      const without = prev.filter((n) => n.tempId !== tempId);
      const pIdx = without.findIndex((n) => n.tempId === parentTemp);
      const block = blockOf(without, pIdx);
      const updated = { ...node, parentTempId: parentTemp };
      const result = [...without];
      result.splice(block.end, 0, updated);
      return result;
    });
  }

  /** HTML5 drag reorder: drop `dragId` immediately before `targetTempId`. */
  function onDrop(targetTempId: string) {
    const source = dragId;
    setDragId(null);
    if (!source || source === targetTempId) return;
    setNodes((prev) => {
      const sIdx = prev.findIndex((n) => n.tempId === source);
      if (sIdx === -1) return prev;
      const node = prev[sIdx];
      // Move the dragged block (node + children if it's a parent).
      const block = node.parentTempId ? { start: sIdx, end: sIdx + 1 } : blockOf(prev, sIdx);
      const blockNodes = prev.slice(block.start, block.end);
      const blockTemps = new Set(blockNodes.map((n) => n.tempId));
      if (blockTemps.has(targetTempId)) return prev; // can't drop onto itself
      const without = prev.filter((n) => !blockTemps.has(n.tempId));
      let at = without.findIndex((n) => n.tempId === targetTempId);
      if (at === -1) at = without.length;
      const targetNode = without[at];
      // A node that carries its own children must stay top-level (depth-2 cap);
      // otherwise it inherits the drop target's grouping.
      const dragHasChildren = blockNodes.length > 1;
      const movedNodes = blockNodes.map((n) => {
        if (n.tempId !== source) return n; // children keep their parent ref
        const parentTempId = dragHasChildren ? null : targetNode?.parentTempId ?? null;
        return { ...n, parentTempId };
      });
      const result = [...without];
      result.splice(at, 0, ...movedNodes);
      return result;
    });
  }

  async function save() {
    if (nodes.length === 0) {
      // An empty save is allowed — it clears the menu and the site falls back
      // to the default nav. Confirm so it isn't accidental.
      if (!window.confirm('Save an empty menu? The site will use the default navigation.')) return;
    }
    // Validate.
    for (const n of nodes) {
      if (!n.label.trim() || !n.href.trim()) {
        toast.error('Every item needs a label and a link.');
        return;
      }
    }

    // Flatten to the payload the API expects: parent_index references the row
    // index of the parent within this same array (or null for top level).
    const payload = nodes.map((n) => {
      const parentIndex =
        n.parentTempId != null ? indexByTemp.get(n.parentTempId) ?? null : null;
      return {
        label: n.label.trim(),
        href: n.href.trim(),
        parent_index: parentIndex,
      };
    });

    setSaving(true);
    try {
      const res = await fetch('/api/admin/menus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: payload }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not save the menu.');
        return;
      }
      toast.success('Menu saved.');
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  /** Fill the builder with the site's default menu so it can be edited. */
  function loadDefault() {
    setNodes(defaultNodes());
    toast.success('Default menu loaded — edit if you like, then Save to apply.');
  }

  /** Clear the custom menu entirely → the site reverts to the built-in nav. */
  async function resetToDefault() {
    if (
      !window.confirm(
        'Reset to the default menu? This clears your custom menu and the site uses the built-in navigation (with Branches and icons) again.',
      )
    )
      return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/menus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [] }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not reset the menu.');
        return;
      }
      setNodes([]);
      toast.success('Menu reset — the site now uses the default navigation.');
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <AdminButton variant="outline" size="sm" onClick={loadDefault} disabled={saving}>
          <Download className="h-4 w-4" /> Load default
        </AdminButton>
        <AdminButton variant="outline" size="sm" onClick={resetToDefault} disabled={saving}>
          <RotateCcw className="h-4 w-4" /> Reset to default
        </AdminButton>
        <AdminButton variant="primary" onClick={save} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Save menu
        </AdminButton>
      </div>

      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        {/* LEFT — ADD TO MENU */}
        <div className="space-y-5">
          <Card className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-ink">Quick links</p>
              <p className="mt-1 text-xs text-ink-muted">Add one of your site pages.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {QUICK_LINKS.map((q) => (
                <button
                  key={q.href}
                  type="button"
                  onClick={() => addItem(q.label, q.href)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-semibold text-ink-muted transition hover:border-brand-600/40 hover:bg-brand-50 hover:text-brand-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {q.label}
                </button>
              ))}
            </div>
          </Card>

          <Card className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-ink">Custom link</p>
              <p className="mt-1 text-xs text-ink-muted">Link to any page or external URL.</p>
            </div>
            <Field label="Label">
              <input
                className={inputClass}
                value={customLabel}
                placeholder="e.g. Special Offers"
                onChange={(e) => setCustomLabel(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustom();
                  }
                }}
              />
            </Field>
            <Field label="URL" hint="Path or full URL">
              <input
                className={inputClass}
                value={customHref}
                placeholder="/offers or https://…"
                onChange={(e) => setCustomHref(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustom();
                  }
                }}
              />
            </Field>
            <AdminButton variant="outline" size="sm" onClick={addCustom} className="w-full">
              <Link2 className="h-4 w-4" /> Add custom link
            </AdminButton>
          </Card>
        </div>

        {/* RIGHT — MENU STRUCTURE */}
        <div>
          <Card className="space-y-4">
            <div className="flex items-center gap-2">
              <ListTree className="h-4 w-4 text-brand-600" />
              <p className="text-sm font-semibold text-ink">Menu structure</p>
            </div>

            {nodes.length === 0 ? (
              <EmptyState
                icon={<ListTree className="h-6 w-6" />}
                title="Your menu is empty"
                description="Add pages or custom links from the left. While empty, the site shows its automatic default navigation."
              />
            ) : (
              <ul className="space-y-2">
                {nodes.map((n) => {
                  const isChild = !!n.parentTempId;
                  const idx = indexByTemp.get(n.tempId) ?? 0;
                  // A top-level item can be indented only if a top-level item
                  // sits somewhere above it to become its parent.
                  const aboveIsTop = !isChild && canBeParent(nodes, idx);
                  return (
                    <li
                      key={n.tempId}
                      draggable={false}
                      onDragOver={(e) => {
                        if (dragId) e.preventDefault();
                      }}
                      onDrop={() => onDrop(n.tempId)}
                      className={isChild ? 'pl-6 sm:pl-8' : ''}
                    >
                      <div
                        className={
                          'flex items-center gap-2 rounded-2xl border border-border bg-background/60 px-3 py-2.5 shadow-soft transition ' +
                          (dragId === n.tempId ? 'opacity-50 ring-2 ring-brand-600/30' : '')
                        }
                      >
                        <button
                          type="button"
                          aria-label="Drag to reorder"
                          draggable
                          onDragStart={() => setDragId(n.tempId)}
                          onDragEnd={() => setDragId(null)}
                          className="cursor-grab text-ink-muted/70 transition hover:text-ink active:cursor-grabbing"
                        >
                          <GripVertical className="h-4 w-4" />
                        </button>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-ink">{n.label}</p>
                          <p className="truncate text-xs text-ink-muted">{n.href}</p>
                        </div>

                        <div className="flex shrink-0 items-center gap-0.5">
                          {isChild ? (
                            <IconBtn label="Make top level" onClick={() => outdent(n.tempId)}>
                              <ChevronLeft className="h-4 w-4" />
                            </IconBtn>
                          ) : (
                            <IconBtn
                              label="Nest under the item above"
                              disabled={!aboveIsTop}
                              onClick={() => indent(n.tempId)}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </IconBtn>
                          )}
                          <IconBtn label="Move up" onClick={() => move(n.tempId, -1)}>
                            <ArrowUp className="h-4 w-4" />
                          </IconBtn>
                          <IconBtn label="Move down" onClick={() => move(n.tempId, 1)}>
                            <ArrowDown className="h-4 w-4" />
                          </IconBtn>
                          <IconBtn
                            label="Remove"
                            danger
                            onClick={() => removeNode(n.tempId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </IconBtn>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function IconBtn({
  label,
  onClick,
  disabled,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={
        'grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition disabled:cursor-not-allowed disabled:opacity-30 ' +
        (danger
          ? 'hover:bg-rose-50 hover:text-rose-600'
          : 'hover:bg-brand-50 hover:text-brand-700')
      }
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ *
 *  Small ordering helpers (kept module-local — pure functions over the
 *  flat Node[] array).
 * ------------------------------------------------------------------ */

/** The contiguous [start, end) range covering a top-level node and its children. */
function blockOf(nodes: Node[], topIdx: number): { start: number; end: number } {
  const top = nodes[topIdx];
  if (!top) return { start: topIdx, end: topIdx + 1 };
  let end = topIdx + 1;
  while (end < nodes.length && nodes[end].parentTempId === top.tempId) end += 1;
  return { start: topIdx, end };
}

/** First node of every top-level block, with its block range. */
function topLevelBlocks(nodes: Node[]): { tempId: string; start: number; end: number }[] {
  const out: { tempId: string; start: number; end: number }[] = [];
  let i = 0;
  while (i < nodes.length) {
    if (!nodes[i].parentTempId) {
      const b = blockOf(nodes, i);
      out.push({ tempId: nodes[i].tempId, start: b.start, end: b.end });
      i = b.end;
    } else {
      i += 1;
    }
  }
  return out;
}

/** True when the item directly above index `idx` is a valid top-level parent. */
function canBeParent(nodes: Node[], idx: number): boolean {
  for (let i = idx - 1; i >= 0; i -= 1) {
    if (!nodes[i].parentTempId) return true;
  }
  return false;
}
