'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Calculator,
  Search,
  Mail,
  Phone,
  ChevronDown,
  Loader2,
  Users,
  CalendarDays,
} from 'lucide-react';
import { formatDate, whatsappLink } from '@/lib/utils';
import { Badge, EmptyState, StatusBadge } from '@/components/admin/ui';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/adminwebsite';

export type EstimateRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  package: string | null;
  travel_date: string | null;
  pax: number | null;
  message: string | null;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  created_at: string;
};

const STATUSES: EstimateRow['status'][] = ['new', 'contacted', 'quoted', 'closed'];

export function EstimatesTable({ rows }: { rows: EstimateRow[] }) {
  const router = useRouter();
  const locale = useLocale();
  const t = getDict(locale).estimatesTable;
  const TABS = [
    { key: 'all', label: t.tabAll },
    { key: 'new', label: t.tabNew },
    { key: 'contacted', label: t.tabContacted },
    { key: 'quoted', label: t.tabQuoted },
    { key: 'closed', label: t.tabClosed },
  ];
  const statusLabels: Record<EstimateRow['status'], string> = {
    new: t.optNew,
    contacted: t.optContacted,
    quoted: t.optQuoted,
    closed: t.optClosed,
  };
  const [tab, setTab] = useState('all');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length };
    STATUSES.forEach((s) => (c[s] = rows.filter((r) => r.status === s).length));
    return c;
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (tab !== 'all' && r.status !== tab) return false;
      if (q && !`${r.name} ${r.email} ${r.service}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rows, tab, query]);

  async function updateStatus(row: EstimateRow, status: EstimateRow['status']) {
    if (status === row.status) return;
    setBusyId(row.id);
    try {
      const res = await fetch(`/api/admin/estimates/${row.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? t.couldNotUpdate);
        return;
      }
      toast.success(t.statusUpdated);
      router.refresh();
    } catch {
      toast.error(t.networkError);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-4">
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

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Calculator className="h-6 w-6" />}
          title={rows.length === 0 ? t.emptyTitleNone : t.emptyTitleFiltered}
          description={rows.length === 0 ? t.emptyDescNone : t.emptyDescFiltered}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((row) => {
            const isOpen = expanded === row.id;
            return (
              <div
                key={row.id}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
              >
                <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
                  <button
                    onClick={() => setExpanded(isOpen ? null : row.id)}
                    className="flex min-w-0 flex-1 items-start gap-3 text-left"
                  >
                    <ChevronDown
                      className={`mt-1 h-4 w-4 shrink-0 text-ink-muted transition ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-ink">{row.name}</span>
                        <StatusBadge status={row.status} locale={locale} />
                      </div>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
                        <span className="font-medium text-ink">{row.service}</span>
                        {row.pax ? (
                          <span className="inline-flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {row.pax}
                          </span>
                        ) : null}
                        {row.travel_date ? (
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {row.travel_date}
                          </span>
                        ) : null}
                        <span>
                          {formatDate(row.created_at, { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </p>
                    </div>
                  </button>

                  <div className="flex shrink-0 items-center gap-2">
                    <a
                      href={`mailto:${row.email}`}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-border text-ink-muted transition hover:border-brand-600/40 hover:text-brand-700"
                      aria-label={t.ariaEmail}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                    <a
                      href={whatsappLink(row.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-9 w-9 place-items-center rounded-lg border border-border text-ink-muted transition hover:border-brand-600/40 hover:text-brand-700"
                      aria-label={t.ariaPhone}
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                    <div className="relative">
                      <select
                        value={row.status}
                        onChange={(e) => updateStatus(row, e.target.value as EstimateRow['status'])}
                        disabled={busyId === row.id}
                        className="h-9 rounded-lg border border-border bg-card pl-3 pr-8 text-sm font-semibold capitalize text-ink outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15 disabled:opacity-60"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s} className="capitalize">
                            {statusLabels[s]}
                          </option>
                        ))}
                      </select>
                      {busyId === row.id && (
                        <Loader2 className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-brand-600" />
                      )}
                    </div>
                  </div>
                </div>

                {isOpen && (
                  <div className="space-y-3 border-t border-border bg-muted/30 p-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Detail label={t.detailEmail}>
                        <a href={`mailto:${row.email}`} className="text-brand-700 hover:underline">
                          {row.email}
                        </a>
                      </Detail>
                      <Detail label={t.detailPhone}>{row.phone}</Detail>
                      <Detail label={t.detailService}>{row.service}</Detail>
                      <Detail label={t.detailPackage}>{row.package || '—'}</Detail>
                      <Detail label={t.detailPreferredTravel}>{row.travel_date || '—'}</Detail>
                      <Detail label={t.detailTravellers}>{row.pax ?? '—'}</Detail>
                    </div>
                    <div>
                      <Badge tone="gray">{t.notesBadge}</Badge>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink">
                        {row.message || t.noNotes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-0.5 text-sm text-ink">{children}</p>
    </div>
  );
}
