'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Search, Users as UsersIcon, Loader2, Lock, Pencil, Trash2, X } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { EmptyState } from '@/components/admin/ui';
import { Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import { confirmDialog } from '@/components/admin/confirm';

export type StaffRow = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  created_at: string | null;
  locked: boolean; // allowlisted admin — role can't be changed / can't be deleted
};

const ROLES = [
  { value: 'user', label: 'Customer' },
  { value: 'operator', label: 'Operator' },
  { value: 'accountant', label: 'Accountant' },
  { value: 'staff', label: 'Staff' },
  { value: 'admin', label: 'Administrator' },
] as const;

const ROLE_LABEL: Record<string, string> = Object.fromEntries(ROLES.map((r) => [r.value, r.label]));

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'staff', label: 'Staff & Admins' },
  { key: 'user', label: 'Customers' },
];

const STAFF_ROLES = ['admin', 'accountant', 'operator', 'staff'];

export function StaffTable({
  rows,
  canEdit,
  currentUserId,
}: {
  rows: StaffRow[];
  canEdit: boolean;
  currentUserId: string | null;
}) {
  const router = useRouter();
  const [tab, setTab] = useState('all');
  const [query, setQuery] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [editing, setEditing] = useState<StaffRow | null>(null);

  const counts = useMemo(
    () => ({
      all: rows.length,
      staff: rows.filter((r) => r.locked || STAFF_ROLES.includes(r.role)).length,
      user: rows.filter((r) => !r.locked && !STAFF_ROLES.includes(r.role)).length,
    }),
    [rows],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const isStaff = r.locked || STAFF_ROLES.includes(r.role);
      if (tab === 'staff' && !isStaff) return false;
      if (tab === 'user' && isStaff) return false;
      if (q && !`${r.full_name ?? ''} ${r.email}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rows, tab, query]);

  async function setRole(row: StaffRow, role: string) {
    if (role === row.role) return;
    setBusyId(row.id);
    try {
      const res = await fetch(`/api/admin/staff/${row.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not update the role.');
        return;
      }
      toast.success(`Role set to ${ROLE_LABEL[role] ?? role}.`);
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setBusyId(null);
    }
  }

  async function deleteRow(row: StaffRow) {
    if (
      !(await confirmDialog({
        message: `Delete ${row.full_name || row.email}? Their login is removed permanently and they can no longer sign in. This cannot be undone.`,
        confirmText: 'Delete account',
        danger: true,
      }))
    ) {
      return;
    }
    setBusyId(row.id);
    try {
      const res = await fetch(`/api/admin/staff/${row.id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not delete the account.');
        return;
      }
      toast.success('Account deleted.');
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setBusyId(null);
    }
  }

  function initials(row: StaffRow) {
    return (row.full_name || row.email)
      .split(/[\s@.]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join('');
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
            placeholder="Search by name or email…"
            className="w-full rounded-full border border-border bg-card py-2.5 pl-9 pr-4 text-sm text-ink outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<UsersIcon className="h-6 w-6" />}
          title={rows.length === 0 ? 'No accounts yet' : 'No accounts match your filters'}
          description={
            rows.length === 0
              ? 'Registered accounts and staff you create will appear here.'
              : 'Try a different tab or clear your search.'
          }
        />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-ink-muted">
                  <th className="px-5 py-3 font-semibold">Person</th>
                  <th className="px-5 py-3 font-semibold">Phone</th>
                  <th className="px-5 py-3 font-semibold">Joined</th>
                  <th className="px-5 py-3 font-semibold">Role</th>
                  {canEdit && <th className="px-5 py-3 text-right font-semibold">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((row) => (
                  <tr key={row.id} className="transition hover:bg-muted/30">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                          {initials(row) || 'U'}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-ink">{row.full_name || 'Unnamed'}</p>
                          <p className="truncate text-xs text-ink-muted">{row.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-ink-muted">{row.phone || '—'}</td>
                    <td className="px-5 py-3.5 text-ink-muted">
                      {row.created_at
                        ? formatDate(row.created_at, { day: 'numeric', month: 'short', year: 'numeric' })
                        : '—'}
                    </td>
                    <td className="px-5 py-3.5">
                      {row.locked ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
                          <Lock className="h-3.5 w-3.5" /> Permanent admin
                        </span>
                      ) : !canEdit ? (
                        <span className="text-sm font-medium text-ink">{ROLE_LABEL[row.role] ?? row.role}</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <select
                            value={row.role}
                            disabled={busyId === row.id}
                            onChange={(e) => setRole(row, e.target.value)}
                            className="rounded-xl border border-border bg-card px-3 py-1.5 text-sm text-ink outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15 disabled:opacity-60"
                          >
                            {ROLES.map((r) => (
                              <option key={r.value} value={r.value}>
                                {r.label}
                              </option>
                            ))}
                          </select>
                          {busyId === row.id && <Loader2 className="h-4 w-4 animate-spin text-brand-600" />}
                        </div>
                      )}
                    </td>
                    {canEdit && (
                      <td className="px-5 py-3.5 text-right">
                        {row.locked ? (
                          <span className="text-xs text-ink-muted">—</span>
                        ) : (
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditing(row)}
                              className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-ink-muted transition hover:border-brand-600/40 hover:text-brand-700"
                            >
                              <Pencil className="h-3.5 w-3.5" /> Edit
                            </button>
                            {row.id !== currentUserId && (
                              <button
                                type="button"
                                onClick={() => deleteRow(row)}
                                disabled={busyId === row.id}
                                className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-ink-muted transition hover:border-red-300 hover:text-red-600 disabled:opacity-50"
                                aria-label="Delete account"
                              >
                                {busyId === row.id ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Trash2 className="h-3.5 w-3.5" />
                                )}
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editing && (
        <StaffEditModal
          row={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

function StaffEditModal({
  row,
  onClose,
  onSaved,
}: {
  row: StaffRow;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saving) return;
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get('password') ?? '');
    const confirm = String(fd.get('confirm') ?? '');
    if (password && password !== confirm) {
      toast.error('The two passwords do not match.');
      return;
    }
    const payload: Record<string, unknown> = {
      full_name: String(fd.get('full_name') ?? '').trim(),
      phone: String(fd.get('phone') ?? '').trim(),
    };
    if (!payload.full_name) {
      toast.error('Name cannot be empty.');
      return;
    }
    if (password) payload.password = password;

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/staff/${row.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not update the account.');
        return;
      }
      toast.success('Account updated.');
      onSaved();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 text-left shadow-soft">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="font-display text-base font-semibold text-ink">Edit account</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full text-ink-muted hover:bg-muted"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mb-4 truncate text-xs text-ink-muted">{row.email}</p>

        <form onSubmit={onSubmit} className="grid gap-4">
          <Field label="Full name" required>
            <input name="full_name" defaultValue={row.full_name ?? ''} className={inputClass} />
          </Field>
          <Field label="Phone">
            <input name="phone" defaultValue={row.phone ?? ''} className={inputClass} placeholder="01XXXXXXXXX" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="New password" hint="Leave blank to keep current.">
              <input name="password" type="password" className={inputClass} placeholder="••••••••" autoComplete="new-password" />
            </Field>
            <Field label="Confirm password">
              <input name="confirm" type="password" className={inputClass} placeholder="••••••••" autoComplete="new-password" />
            </Field>
          </div>
          <p className="text-xs text-ink-muted">The email ({row.email}) is the sign-in identity and isn&apos;t changed here.</p>
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save changes
            </Button>
            <Button type="button" variant="ghost" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
