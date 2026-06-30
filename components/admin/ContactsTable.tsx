'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Inbox,
  Search,
  Mail,
  Phone,
  ChevronDown,
  Check,
  RotateCcw,
  Loader2,
} from 'lucide-react';
import { formatDate, whatsappLink } from '@/lib/utils';
import { Badge, EmptyState, StatusBadge } from '@/components/admin/ui';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/adminwebsite';

export type ContactRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string | null;
  message: string | null;
  handled: boolean;
  created_at: string;
};

export function ContactsTable({ rows }: { rows: ContactRow[] }) {
  const router = useRouter();
  const locale = useLocale();
  const t = getDict(locale).contactsTable;
  const TABS = [
    { key: 'all', label: t.tabAll },
    { key: 'pending', label: t.tabPending },
    { key: 'handled', label: t.tabHandled },
  ];
  const [tab, setTab] = useState('pending');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      all: rows.length,
      pending: rows.filter((r) => !r.handled).length,
      handled: rows.filter((r) => r.handled).length,
    }),
    [rows],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (tab === 'pending' && r.handled) return false;
      if (tab === 'handled' && !r.handled) return false;
      if (q && !`${r.name} ${r.email} ${r.subject ?? ''}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rows, tab, query]);

  async function toggleHandled(row: ContactRow) {
    setBusyId(row.id);
    try {
      const res = await fetch(`/api/admin/contacts/${row.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handled: !row.handled }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? t.couldNotUpdate);
        return;
      }
      toast.success(row.handled ? t.markedPending : t.markedHandled);
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
                {counts[t.key as keyof typeof counts]}
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
          icon={<Inbox className="h-6 w-6" />}
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
                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
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
                        <StatusBadge status={row.handled ? 'handled' : 'pending'} locale={locale} />
                      </div>
                      <p className="mt-0.5 truncate text-sm text-ink-muted">
                        {row.subject || t.generalEnquiry} ·{' '}
                        {formatDate(row.created_at, { day: 'numeric', month: 'short', year: 'numeric' })}
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
                    <button
                      onClick={() => toggleHandled(row)}
                      disabled={busyId === row.id}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition disabled:opacity-60 ${
                        row.handled
                          ? 'border border-border text-ink-muted hover:bg-muted'
                          : 'bg-brand-600 text-white hover:bg-brand-700'
                      }`}
                    >
                      {busyId === row.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : row.handled ? (
                        <RotateCcw className="h-4 w-4" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                      <span className="hidden sm:inline">
                        {row.handled ? t.reopen : t.markHandled}
                      </span>
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="space-y-3 border-t border-border bg-muted/30 p-4">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="inline-flex items-center gap-1.5 text-ink-muted">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${row.email}`} className="text-brand-700 hover:underline">
                          {row.email}
                        </a>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-ink-muted">
                        <Phone className="h-4 w-4" />
                        {row.phone}
                      </span>
                    </div>
                    <div>
                      <Badge tone="gray">{t.messageBadge}</Badge>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink">
                        {row.message || t.noMessage}
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
