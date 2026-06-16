import Link from 'next/link';
import {
  FileText,
  Inbox,
  Calculator,
  GalleryHorizontalEnd,
  Users,
  ShieldCheck,
  ArrowUpRight,
  PenSquare,
  Image as ImageIcon,
  Settings,
  Clock,
} from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { PageHeader, Card, Panel, StatusBadge, EmptyState } from '@/components/admin/ui';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Dashboard' };

type Counts = {
  published: number;
  drafts: number;
  contacts: number;
  estimates: number;
  gallery: number;
  users: number;
  vault: number;
};

async function loadDashboard() {
  const counts: Counts = {
    published: 0,
    drafts: 0,
    contacts: 0,
    estimates: 0,
    gallery: 0,
    users: 0,
    vault: 0,
  };
  let recentContacts: any[] = [];
  let recentEstimates: any[] = [];

  try {
    const supabase = createAdminClient();
    const head = { count: 'exact' as const, head: true };

    const [
      published,
      drafts,
      contacts,
      estimates,
      gallery,
      users,
      vault,
      contactsList,
      estimatesList,
    ] = await Promise.all([
      supabase.from('blog_posts').select('id', head).eq('status', 'published'),
      supabase.from('blog_posts').select('id', head).eq('status', 'draft'),
      supabase.from('contact_requests').select('id', head).eq('handled', false),
      supabase.from('estimate_requests').select('id', head).eq('status', 'new'),
      supabase.from('gallery_images').select('id', head),
      supabase.from('profiles').select('id', head),
      supabase.from('vault_items').select('id', head),
      supabase
        .from('contact_requests')
        .select('id, name, email, subject, handled, created_at')
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('estimate_requests')
        .select('id, name, service, pax, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5),
    ]);

    counts.published = published.count ?? 0;
    counts.drafts = drafts.count ?? 0;
    counts.contacts = contacts.count ?? 0;
    counts.estimates = estimates.count ?? 0;
    counts.gallery = gallery.count ?? 0;
    counts.users = users.count ?? 0;
    counts.vault = vault.count ?? 0;
    recentContacts = contactsList.data ?? [];
    recentEstimates = estimatesList.data ?? [];
  } catch (err) {
    console.error('[admin/overview] load failed:', err);
  }

  return { counts, recentContacts, recentEstimates };
}

export default async function AdminOverviewPage() {
  const { counts, recentContacts, recentEstimates } = await loadDashboard();

  const stats = [
    {
      label: 'Published posts',
      value: counts.published,
      sub: `${counts.drafts} in draft`,
      icon: FileText,
      href: '/admin/posts',
      tone: 'emerald' as const,
    },
    {
      label: 'New contact requests',
      value: counts.contacts,
      sub: 'awaiting reply',
      icon: Inbox,
      href: '/admin/contacts',
      tone: 'gold' as const,
    },
    {
      label: 'New estimate requests',
      value: counts.estimates,
      sub: 'to be quoted',
      icon: Calculator,
      href: '/admin/estimates',
      tone: 'emerald' as const,
    },
    {
      label: 'Gallery images',
      value: counts.gallery,
      sub: 'published to site',
      icon: GalleryHorizontalEnd,
      href: '/admin/gallery',
      tone: 'gold' as const,
    },
    {
      label: 'Registered users',
      value: counts.users,
      sub: 'in the directory',
      icon: Users,
      href: '/admin/users',
      tone: 'emerald' as const,
    },
    {
      label: 'Vault documents',
      value: counts.vault,
      sub: 'stored securely',
      icon: ShieldCheck,
      href: '/admin/vault',
      tone: 'gold' as const,
    },
  ];

  const quickActions = [
    { label: 'Write a post', href: '/admin/posts/new', icon: PenSquare },
    { label: 'Upload media', href: '/admin/media', icon: ImageIcon },
    { label: 'Add gallery image', href: '/admin/gallery', icon: GalleryHorizontalEnd },
    { label: 'Site settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="A live overview of content, enquiries and people across Inter Gulf Travels."
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-emerald"
            >
              <div className="flex items-start justify-between">
                <span
                  className={
                    s.tone === 'emerald'
                      ? 'grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-600'
                      : 'grid h-11 w-11 place-items-center rounded-2xl bg-gold-50 text-gold-600'
                  }
                >
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-ink-muted/50 transition group-hover:text-brand-600" />
              </div>
              <p className="mt-4 font-display text-3xl font-semibold text-ink">{s.value}</p>
              <p className="mt-1 text-sm font-medium text-ink">{s.label}</p>
              <p className="text-xs text-ink-muted">{s.sub}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick actions */}
      <Card className="mt-6">
        <p className="mb-3 text-sm font-semibold text-ink">Quick actions</p>
        <div className="flex flex-wrap gap-2.5">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.href}
                href={a.href}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 text-sm font-medium text-ink transition hover:border-brand-600/40 hover:bg-brand-50 hover:text-brand-700"
              >
                <Icon className="h-4 w-4" />
                {a.label}
              </Link>
            );
          })}
        </div>
      </Card>

      {/* Recent activity */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel>
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-display text-lg font-semibold text-ink">Recent contact requests</h2>
            <Link href="/admin/contacts" className="text-sm font-semibold text-brand-700 hover:underline">
              View all
            </Link>
          </div>
          {recentContacts.length === 0 ? (
            <EmptyState
              icon={<Inbox className="h-6 w-6" />}
              title="No contact requests yet"
              description="Enquiries submitted through the website contact form will appear here."
            />
          ) : (
            <ul className="divide-y divide-border">
              {recentContacts.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{c.name}</p>
                    <p className="truncate text-xs text-ink-muted">{c.subject || c.email}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <StatusBadge status={c.handled ? 'handled' : 'new'} />
                    <span className="hidden text-xs text-ink-muted sm:flex sm:items-center sm:gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(c.created_at, { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel>
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-display text-lg font-semibold text-ink">Recent estimate requests</h2>
            <Link href="/admin/estimates" className="text-sm font-semibold text-brand-700 hover:underline">
              View all
            </Link>
          </div>
          {recentEstimates.length === 0 ? (
            <EmptyState
              icon={<Calculator className="h-6 w-6" />}
              title="No estimate requests yet"
              description="Quote requests from the website estimate form will appear here."
            />
          ) : (
            <ul className="divide-y divide-border">
              {recentEstimates.map((e) => (
                <li key={e.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{e.name}</p>
                    <p className="truncate text-xs text-ink-muted">
                      {e.service}
                      {e.pax ? ` · ${e.pax} traveller${e.pax > 1 ? 's' : ''}` : ''}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <StatusBadge status={e.status ?? 'new'} />
                    <span className="hidden text-xs text-ink-muted sm:flex sm:items-center sm:gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(e.created_at, { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </>
  );
}
