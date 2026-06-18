import { Filter } from 'lucide-react';
import { mgmtDb } from '@/lib/management/server';
import type { ActivityLog } from '@/lib/management/types';
import { branchLabel } from '@/lib/management/branches';
import { formatDate } from '@/lib/utils';
import { PageHeader, Card, EmptyState, TableWrap, thClass, tdClass, Badge, inputClass } from '@/components/manage/ui';
import { ExportBar } from '@/components/manage/ExportBar';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Activity Log' };

const ACTION_TONE: Record<string, 'emerald' | 'gold' | 'red' | 'blue' | 'slate'> = {
  create: 'emerald',
  update: 'blue',
  delete: 'red',
  login: 'slate',
  payment: 'gold',
};

function actionLabel(a: string) {
  return a.charAt(0).toUpperCase() + a.slice(1);
}

async function loadActivity(filters: {
  date?: string;
  user?: string;
  action?: string;
}): Promise<{ rows: ActivityLog[]; available: boolean }> {
  try {
    const db = mgmtDb();
    let q = db.from('activity_log').select('*').order('created_at', { ascending: false }).limit(500);

    if (filters.date) {
      q = q.gte('created_at', `${filters.date}T00:00:00`).lte('created_at', `${filters.date}T23:59:59`);
    }
    if (filters.user) q = q.ilike('user_email', `%${filters.user}%`);
    if (filters.action) q = q.eq('action', filters.action);

    const { data, error } = await q;
    if (error) return { rows: [], available: false };
    return { rows: (data ?? []) as ActivityLog[], available: true };
  } catch {
    return { rows: [], available: false };
  }
}

/** Distinct actions for the filter dropdown — best effort, never fatal. */
async function loadActions(): Promise<string[]> {
  try {
    const db = mgmtDb();
    const { data } = await db.from('activity_log').select('action').limit(1000);
    const set = new Set<string>();
    for (const r of data ?? []) if (r.action) set.add(r.action as string);
    return Array.from(set).sort();
  } catch {
    return [];
  }
}

export default async function ActivityPage({
  searchParams,
}: {
  searchParams: { date?: string; user?: string; action?: string };
}) {
  const filters = {
    date: searchParams.date || '',
    user: searchParams.user || '',
    action: searchParams.action || '',
  };
  const [{ rows }, actions] = await Promise.all([loadActivity(filters), loadActions()]);

  const exportHeaders = ['Time', 'User', 'Action', 'Entity', 'Branch', 'Detail'];
  const exportRows = rows.map((r) => [
    formatDate(r.created_at, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    r.user_email ?? '—',
    actionLabel(r.action),
    [r.entity, r.entity_id].filter(Boolean).join(' · ') || '—',
    r.branch ? branchLabel(r.branch) : '—',
    r.detail ? JSON.stringify(r.detail) : '',
  ]);

  return (
    <>
      <PageHeader
        title="Activity Log"
        subtitle="A chronological record of everything staff have changed across the system. Newest first."
        actions={
          rows.length > 0 ? (
            <ExportBar
              filename={`activity-log-${new Date().toISOString().slice(0, 10)}`}
              title="Activity Log"
              subtitle={`${rows.length} record${rows.length === 1 ? '' : 's'}`}
              headers={exportHeaders}
              rows={exportRows}
              orientation="l"
            />
          ) : undefined
        }
      />

      {/* Filters (GET form keeps this a server component) */}
      <Card className="mb-5">
        <form method="get" className="flex flex-wrap items-end gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-muted">Date</span>
            <input type="date" name="date" defaultValue={filters.date} className={`${inputClass} sm:w-48`} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-muted">User email</span>
            <input
              type="text"
              name="user"
              defaultValue={filters.user}
              placeholder="name@example.com"
              className={`${inputClass} sm:w-56`}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-muted">Action</span>
            <select name="action" defaultValue={filters.action} className={`${inputClass} sm:w-44`}>
              <option value="">All actions</option>
              {actions.map((a) => (
                <option key={a} value={a}>
                  {actionLabel(a)}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-emerald transition hover:bg-brand-700"
          >
            <Filter className="h-4 w-4" /> Apply
          </button>
          {(filters.date || filters.user || filters.action) && (
            <a
              href="/admin/activity"
              className="inline-flex items-center rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-ink-muted transition hover:text-brand-700"
            >
              Clear
            </a>
          )}
        </form>
      </Card>

      {rows.length === 0 ? (
        <EmptyState
          title={
            filters.date || filters.user || filters.action
              ? 'No activity matches your filters'
              : 'No activity recorded yet'
          }
          hint={
            filters.date || filters.user || filters.action
              ? 'Try a different date, user or action.'
              : 'Staff actions such as creating pilgrims, posting vouchers and changing roles will be logged here.'
          }
        />
      ) : (
        <TableWrap>
          <thead>
            <tr>
              <th className={thClass}>Time</th>
              <th className={thClass}>User</th>
              <th className={thClass}>Action</th>
              <th className={thClass}>Entity</th>
              <th className={thClass}>Branch</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td className={`${tdClass} whitespace-nowrap text-ink-muted`}>
                  {formatDate(r.created_at, {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td className={`${tdClass} font-medium`}>{r.user_email ?? '—'}</td>
                <td className={tdClass}>
                  <Badge tone={ACTION_TONE[r.action] ?? 'slate'}>{actionLabel(r.action)}</Badge>
                </td>
                <td className={tdClass}>
                  {r.entity ? (
                    <span className="text-ink">{r.entity.replace(/_/g, ' ')}</span>
                  ) : (
                    <span className="text-ink-muted">—</span>
                  )}
                </td>
                <td className={`${tdClass} text-ink-muted`}>{r.branch ? branchLabel(r.branch) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
    </>
  );
}
