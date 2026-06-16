import Link from 'next/link';
import {
  CalendarCheck,
  ShieldCheck,
  CalendarRange,
  Calculator,
  Compass,
  Upload,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { siteConfig } from '@/lib/site';
import { Card, StatCard, StatusBadge, EmptyState } from '@/components/dashboard/ui';
import { SavedCountStat } from '@/components/dashboard/SavedCountStat';
import { displayName } from '@/components/dashboard/nav';

export const dynamic = 'force-dynamic';

type EstimateRow = {
  id?: string | number;
  name: string | null;
  email: string | null;
  service: string | null;
  package: string | null;
  travel_date: string | null;
  pax: number | null;
  status: string | null;
  created_at: string | null;
};

type ProfileLite = { full_name: string | null; created_at: string | null };

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default async function DashboardOverviewPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email ?? null;

  // Profile (for name + member-since).
  let profile: ProfileLite | null = null;
  let requests: EstimateRow[] = [];
  let vaultCount = 0;

  if (user) {
    try {
      const [profileRes, requestsRes, vaultRes] = await Promise.all([
        supabase.from('profiles').select('full_name, created_at').eq('id', user.id).maybeSingle(),
        email
          ? supabase
              .from('estimate_requests')
              .select('name, email, service, package, travel_date, pax, status, created_at')
              .eq('email', email)
              .order('created_at', { ascending: false })
          : Promise.resolve({ data: [] as EstimateRow[] }),
        supabase.from('vault_items').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      ]);

      profile = ((profileRes as { data: unknown }).data as ProfileLite | null) ?? null;
      requests = (((requestsRes as { data: unknown }).data as EstimateRow[] | null) ?? []) as EstimateRow[];
      vaultCount = (vaultRes as { count: number | null }).count ?? 0;
    } catch {
      // graceful empty state below
    }
  }

  const name = displayName(profile ?? { full_name: null }, email);
  const firstName = name.split(' ')[0];

  const activeRequests = requests.filter(
    (r) => !['completed', 'cancelled', 'closed'].includes((r.status ?? '').toLowerCase()),
  ).length;

  const memberSince = profile?.created_at ?? user?.created_at ?? null;
  const recent = requests.slice(0, 4);

  const quickActions = [
    {
      label: 'New Estimate',
      description: 'Get a free, tailored quote',
      href: '/estimate',
      icon: Calculator,
    },
    {
      label: 'Browse Packages',
      description: 'Hajj & Umrah plans',
      href: '/umrah/packages',
      icon: Compass,
    },
    {
      label: 'Upload Document',
      description: 'Add to your secure vault',
      href: '/dashboard/vault',
      icon: Upload,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <section className="overflow-hidden rounded-3xl border border-border bg-brand-gradient p-6 text-white shadow-emerald sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-medium text-white/75">{greeting()},</p>
          <h2 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">{firstName}</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
            Welcome back to your {siteConfig.shortName} member area. Track your requests, keep your
            travel documents safe, and pick up right where you left off — all in one place.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/estimate"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-brand-800 shadow-soft transition hover:-translate-y-0.5"
            >
              <Calculator className="h-4 w-4" /> Request an estimate
            </Link>
            <Link
              href="/dashboard/vault"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <ShieldCheck className="h-4 w-4" /> Open document vault
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-gold-400/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 right-24 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      </section>

      {/* Quick stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active requests"
          value={activeRequests}
          sub={requests.length ? `${requests.length} total enquiries` : 'No enquiries yet'}
          icon={CalendarCheck}
          tone="emerald"
        />
        <SavedCountStat />
        <StatCard
          label="Vault documents"
          value={vaultCount}
          sub="Stored securely & private"
          icon={ShieldCheck}
          tone="forest"
        />
        <StatCard
          label="Member since"
          value={memberSince ? formatDate(memberSince, { day: undefined, month: 'short' }) : '—'}
          sub={memberSince ? formatDate(memberSince) : 'Welcome aboard'}
          icon={CalendarRange}
          tone="sand"
        />
      </section>

      {/* Recent requests + quick actions */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">Recent requests</h2>
                <p className="mt-0.5 text-sm text-ink-muted">Your latest estimate &amp; booking enquiries</p>
              </div>
              <Link
                href="/dashboard/bookings"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition hover:text-brand-800"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {recent.length === 0 ? (
              <EmptyState
                icon={CalendarCheck}
                title="No requests yet"
                description="When you request an estimate, it will appear here so you can track its progress."
                action={{ label: 'Request an estimate', href: '/estimate' }}
              />
            ) : (
              <ul className="divide-y divide-border">
                {recent.map((r, i) => (
                  <li key={r.id ?? i} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                      <Compass className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">
                        {r.service ?? 'Travel enquiry'}
                        {r.package ? <span className="text-ink-muted"> · {r.package}</span> : null}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-ink-muted">
                        {r.pax ? `${r.pax} traveller${r.pax > 1 ? 's' : ''}` : 'Enquiry'}
                        {r.travel_date ? ` · ${formatDate(r.travel_date)}` : ''}
                        {r.created_at ? ` · requested ${formatDate(r.created_at)}` : ''}
                      </p>
                    </div>
                    <StatusBadge status={r.status} />
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        {/* Quick actions */}
        <div className="space-y-3">
          <h2 className="px-1 font-display text-lg font-semibold text-ink">Quick actions</h2>
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="group flex items-center gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-600/30 hover:shadow-glow"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{action.label}</p>
                  <p className="truncate text-xs text-ink-muted">{action.description}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink-muted transition group-hover:text-brand-600" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
