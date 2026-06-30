'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Pencil, Trash2, Loader2, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';
import { StatusBadge, Badge, EmptyState, AdminButton } from '@/components/admin/ui';
import { confirmDialog } from '@/components/admin/confirm';
import { useLocale } from '@/components/providers/LocaleProvider';
import { localizedPath } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries/areas/adminwebsite';

export type PostRow = {
  id: string;
  title: string;
  slug: string;
  category: 'hajj-umrah' | 'others';
  status: 'draft' | 'published' | 'scheduled';
  featured: boolean;
  published_at: string | null;
  updated_at: string | null;
  created_at: string | null;
};

export function PostsTable({ posts }: { posts: PostRow[] }) {
  const router = useRouter();
  const locale = useLocale();
  const t = getDict(locale).postsTable;
  const TABS: { key: string; label: string }[] = [
    { key: 'all', label: t.tabAll },
    { key: 'published', label: t.tabPublished },
    { key: 'draft', label: t.tabDraft },
    { key: 'scheduled', label: t.tabScheduled },
  ];
  const [tab, setTab] = useState('all');
  const [query, setQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: posts.length, published: 0, draft: 0, scheduled: 0 };
    posts.forEach((p) => (c[p.status] = (c[p.status] ?? 0) + 1));
    return c;
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (tab !== 'all' && p.status !== tab) return false;
      if (q && !`${p.title} ${p.slug}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [posts, tab, query]);

  async function remove(post: PostRow) {
    if (!(await confirmDialog({ message: t.confirmDelete(post.title), confirmText: t.confirmText, danger: true }))) return;
    setDeletingId(post.id);
    try {
      const res = await fetch(`/api/admin/posts/${post.id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? t.couldNotDelete);
        return;
      }
      toast.success(t.postDeleted);
      router.refresh();
    } catch {
      toast.error(t.networkError);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                tab === t.key
                  ? 'bg-brand-600 text-white shadow-emerald'
                  : 'border border-border text-ink-muted hover:border-brand-600/40 hover:text-brand-700'
              }`}
            >
              {t.label}
              <span
                className={`rounded-full px-1.5 text-xs ${
                  tab === t.key ? 'bg-white/20' : 'bg-muted text-ink-muted'
                }`}
              >
                {counts[t.key] ?? 0}
              </span>
            </button>
          ))}
        </div>
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-full border border-border bg-card py-2.5 pl-9 pr-4 text-sm text-ink outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
          />
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-6 w-6" />}
          title={posts.length === 0 ? t.emptyTitleNone : t.emptyTitleFiltered}
          description={posts.length === 0 ? t.emptyDescNone : t.emptyDescFiltered}
          action={
            posts.length === 0 ? (
              <AdminButton href={localizedPath(locale, '/admin/posts/new')} variant="primary">
                {t.writeFirst}
              </AdminButton>
            ) : undefined
          }
        />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-ink-muted">
                  <th className="px-5 py-3 font-semibold">{t.thTitle}</th>
                  <th className="px-5 py-3 font-semibold">{t.thCategory}</th>
                  <th className="px-5 py-3 font-semibold">{t.thStatus}</th>
                  <th className="px-5 py-3 font-semibold">{t.thDate}</th>
                  <th className="px-5 py-3 text-right font-semibold">{t.thActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((p) => (
                  <tr key={p.id} className="transition hover:bg-muted/30">
                    <td className="px-5 py-3.5">
                      <Link
                        href={localizedPath(locale, `/admin/posts/${p.id}`)}
                        className="font-semibold text-ink hover:text-brand-700"
                      >
                        {p.title}
                      </Link>
                      <div className="mt-0.5 flex items-center gap-2">
                        <span className="truncate text-xs text-ink-muted">/{p.slug}</span>
                        {p.featured && <Badge tone="gold">{t.featured}</Badge>}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge tone={p.category === 'hajj-umrah' ? 'emerald' : 'gray'}>
                        {p.category === 'hajj-umrah' ? t.catHajjUmrah : t.catOthers}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={p.status} locale={locale} />
                    </td>
                    <td className="px-5 py-3.5 text-ink-muted">
                      {p.published_at || p.created_at
                        ? formatDate((p.published_at || p.created_at)!, {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : '—'}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={localizedPath(locale, `/admin/posts/${p.id}`)}
                          className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-brand-50 hover:text-brand-700"
                          aria-label={t.ariaEdit(p.title)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => remove(p)}
                          disabled={deletingId === p.id}
                          className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
                          aria-label={t.ariaDelete(p.title)}
                        >
                          {deletingId === p.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
