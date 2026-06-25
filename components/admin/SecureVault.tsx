'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Lock,
  Plus,
  Search,
  Pencil,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  User,
  KeyRound,
  Globe,
  Loader2,
  X,
} from 'lucide-react';
import { Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import { confirmDialog } from '@/components/admin/confirm';

export type VaultCredential = {
  id: string;
  name: string;
  url: string | null;
  username: string | null;
  password: string;
  icon_url: string | null;
  notes: string | null;
};

function hostOf(url?: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
  } catch {
    return null;
  }
}
function faviconOf(cred: VaultCredential): string | null {
  if (cred.icon_url) return cred.icon_url;
  const h = hostOf(cred.url);
  return h ? `https://www.google.com/s2/favicons?domain=${h}&sz=64` : null;
}
function visitUrl(url?: string | null): string | null {
  if (!url) return null;
  return url.startsWith('http') ? url : `https://${url}`;
}

async function copy(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied.`);
  } catch {
    toast.error('Could not copy.');
  }
}

export function SecureVault({ initial }: { initial: VaultCredential[] }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<VaultCredential | null>(null);
  const [adding, setAdding] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return initial;
    return initial.filter((c) =>
      [c.name, c.username, c.url, c.notes].some((v) => v?.toLowerCase().includes(q)),
    );
  }, [initial, query]);

  return (
    <>
      {/* Header */}
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 font-display text-2xl font-bold text-ink">
            Vault <Lock className="h-5 w-5 text-gold-500" />
          </h1>
          <p className="mt-1 text-sm text-ink-muted">Encrypted credential store (AES-256-GCM at rest).</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search credentials…"
              className="w-56 rounded-full border border-border bg-card py-2.5 pl-9 pr-4 text-sm text-ink outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15"
            />
          </div>
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-700 to-gold-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:opacity-95"
          >
            <Plus className="h-4 w-4" /> Add New
          </button>
        </div>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card/60 py-20 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Lock className="h-6 w-6" />
          </span>
          <p className="mt-3 font-semibold text-ink">
            {query ? 'No matching credentials' : 'No credentials yet'}
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            {query ? 'Try a different search.' : 'Add your first credential to keep it safely encrypted.'}
          </p>
          {!query && (
            <button
              type="button"
              onClick={() => setAdding(true)}
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-700 to-gold-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:opacity-95"
            >
              <Plus className="h-4 w-4" /> Add New
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((cred) => (
            <CredentialCard
              key={cred.id}
              cred={cred}
              onEdit={() => setEditing(cred)}
              onDeleted={() => router.refresh()}
            />
          ))}
        </div>
      )}

      {(adding || editing) && (
        <CredentialModal
          credential={editing}
          onClose={() => {
            setAdding(false);
            setEditing(null);
          }}
          onSaved={() => {
            setAdding(false);
            setEditing(null);
            router.refresh();
          }}
        />
      )}
    </>
  );
}

function CredentialCard({
  cred,
  onEdit,
  onDeleted,
}: {
  cred: VaultCredential;
  onEdit: () => void;
  onDeleted: () => void;
}) {
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const favicon = faviconOf(cred);
  const visit = visitUrl(cred.url);

  async function remove() {
    if (
      !(await confirmDialog({
        message: `Delete the credential “${cred.name}”? This cannot be undone.`,
        confirmText: 'Delete',
        danger: true,
      }))
    ) {
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/secure-vault?id=${encodeURIComponent(cred.id)}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not delete.');
        return;
      }
      toast.success('Credential deleted.');
      onDeleted();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="h-1 bg-gradient-to-r from-brand-600 via-brand-500 to-gold-400" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-white">
              {favicon ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={favicon} alt="" className="h-7 w-7 object-contain" />
              ) : (
                <Globe className="h-5 w-5 text-ink-muted" />
              )}
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold text-ink">{cred.name}</p>
              {visit ? (
                <a
                  href={visit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-gold-600 hover:text-gold-700"
                >
                  Visit <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <span className="text-xs text-ink-muted">No URL</span>
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={onEdit}
              className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-muted hover:text-brand-700"
              aria-label="Edit"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={remove}
              disabled={busy}
              className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-muted hover:text-red-600 disabled:opacity-50"
              aria-label="Delete"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Username */}
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2.5">
          <User className="h-4 w-4 shrink-0 text-ink-muted" />
          <span className="min-w-0 flex-1 truncate text-sm text-ink">{cred.username || '—'}</span>
          {cred.username && (
            <button
              type="button"
              onClick={() => copy(cred.username ?? '', 'Username')}
              className="grid h-7 w-7 place-items-center rounded-md text-ink-muted transition hover:bg-card hover:text-brand-700"
              aria-label="Copy username"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Password */}
        <div className="mt-2 flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2.5">
          <KeyRound className="h-4 w-4 shrink-0 text-ink-muted" />
          <span className="min-w-0 flex-1 truncate font-mono text-sm text-ink">
            {cred.password ? (show ? cred.password : '•'.repeat(Math.min(12, cred.password.length || 12))) : '—'}
          </span>
          {cred.password && (
            <>
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="grid h-7 w-7 place-items-center rounded-md text-ink-muted transition hover:bg-card hover:text-brand-700"
                aria-label={show ? 'Hide password' : 'Show password'}
              >
                {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => copy(cred.password, 'Password')}
                className="grid h-7 w-7 place-items-center rounded-md text-ink-muted transition hover:bg-card hover:text-brand-700"
                aria-label="Copy password"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>

        {cred.notes && <p className="mt-3 line-clamp-2 text-xs text-ink-muted">{cred.notes}</p>}
      </div>
    </div>
  );
}

function CredentialModal({
  credential,
  onClose,
  onSaved,
}: {
  credential: VaultCredential | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = Boolean(credential);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saving) return;
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = {
      name: String(fd.get('name') ?? '').trim(),
      url: String(fd.get('url') ?? '').trim(),
      username: String(fd.get('username') ?? '').trim(),
      password: String(fd.get('password') ?? ''),
      icon_url: String(fd.get('icon_url') ?? '').trim(),
      notes: String(fd.get('notes') ?? '').trim(),
    };
    if (!payload.name) {
      toast.error('A name is required.');
      return;
    }
    if (isEdit && credential) payload.id = credential.id;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/secure-vault', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not save the credential.');
        return;
      }
      toast.success(isEdit ? 'Credential updated.' : 'Credential saved.');
      onSaved();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
            <Lock className="h-4 w-4 text-gold-500" /> {isEdit ? 'Edit credential' : 'Add credential'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full text-ink-muted hover:bg-muted"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" required className="sm:col-span-2">
            <input name="name" defaultValue={credential?.name ?? ''} className={inputClass} placeholder="e.g. Github" />
          </Field>
          <Field label="Website URL" className="sm:col-span-2">
            <input name="url" defaultValue={credential?.url ?? ''} className={inputClass} placeholder="https://github.com" />
          </Field>
          <Field label="Username / Email">
            <input name="username" defaultValue={credential?.username ?? ''} className={inputClass} placeholder="you@example.com" autoComplete="off" />
          </Field>
          <Field label="Password" hint={isEdit ? 'Leave blank to keep the current one.' : undefined}>
            <input name="password" defaultValue={credential?.password ?? ''} className={inputClass} placeholder="••••••••" autoComplete="off" />
          </Field>
          <Field label="Icon URL" hint="Optional — defaults to the site favicon." className="sm:col-span-2">
            <input name="icon_url" defaultValue={credential?.icon_url ?? ''} className={inputClass} placeholder="https://…/logo.png" />
          </Field>
          <Field label="Notes" className="sm:col-span-2">
            <textarea name="notes" rows={2} defaultValue={credential?.notes ?? ''} className={inputClass} placeholder="Optional notes" />
          </Field>

          <div className="mt-1 flex items-center gap-3 sm:col-span-2">
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {isEdit ? 'Save changes' : 'Save credential'}
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
