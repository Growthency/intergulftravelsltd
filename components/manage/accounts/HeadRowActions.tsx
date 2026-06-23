'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Trash2, Pencil, X } from 'lucide-react';
import { confirmDialog } from '@/components/admin/confirm';
import { Field, inputClass } from '@/components/manage/ui';
import { Button } from '@/components/ui/Button';
import { BRANCHES } from '@/lib/management/branches';
import type { AccountHead, AccountType, AccountSubtype } from '@/lib/management/types';

const TYPES: AccountType[] = ['asset', 'liability', 'income', 'expense', 'equity'];
const SUBTYPES: AccountSubtype[] = [
  'cash', 'bank', 'customer', 'supplier', 'loan', 'expense', 'income', 'general', 'equity',
];

/** Edit (modal) or deactivate a non-system account head. */
export function HeadRowActions({ head }: { head: AccountHead }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [subtype, setSubtype] = useState<AccountSubtype>(head.subtype);

  async function remove() {
    if (
      !(await confirmDialog({
        message: `Remove "${head.name}"? Its ledger history is preserved, but it will no longer be selectable.`,
        confirmText: 'Delete',
        danger: true,
      }))
    ) {
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/accounts/heads?id=${encodeURIComponent(head.id)}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not remove the account.');
        return;
      }
      toast.success(`${head.name} removed.`);
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saving) return;
    const fd = new FormData(e.currentTarget);
    const payload = {
      id: head.id,
      name: String(fd.get('name') ?? '').trim(),
      code: String(fd.get('code') ?? '').trim(),
      type: String(fd.get('type') ?? head.type),
      subtype,
      branch: String(fd.get('branch') ?? head.branch),
      party_phone: String(fd.get('party_phone') ?? '').trim(),
      bank_name: subtype === 'bank' ? String(fd.get('bank_name') ?? '').trim() : '',
      account_no: subtype === 'bank' ? String(fd.get('account_no') ?? '').trim() : '',
    };
    if (!payload.name) {
      toast.error('Account name is required.');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/accounts/heads', {
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
      setOpen(false);
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="inline-flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-ink-muted transition hover:border-brand-600/40 hover:text-brand-700"
        aria-label={`Edit ${head.name}`}
      >
        <Pencil className="h-3.5 w-3.5" /> Edit
      </button>
      <button
        type="button"
        onClick={remove}
        disabled={busy}
        className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-ink-muted transition hover:border-red-300 hover:text-red-600 disabled:opacity-50"
        aria-label={`Remove ${head.name}`}
      >
        {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
        Remove
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-5 text-left shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-ink">Edit account head</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-ink-muted hover:bg-muted"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {head.is_system && (
              <p className="mb-4 rounded-xl bg-muted/60 px-3 py-2 text-xs text-ink-muted">
                System account — its type &amp; subtype are fixed, but you can rename it, change the code, branch or
                contact details.
              </p>
            )}

            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <Field label="Account name" required className="sm:col-span-2">
                <input name="name" defaultValue={head.name} className={inputClass} placeholder="e.g. City Bank — Current" />
              </Field>
              <Field label="Code">
                <input name="code" defaultValue={head.code ?? ''} className={inputClass} placeholder="Optional" />
              </Field>
              <Field label="Type" required>
                <select name="type" defaultValue={head.type} className={inputClass} disabled={head.is_system}>
                  {TYPES.map((t) => (
                    <option key={t} value={t} className="capitalize">{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="Subtype" required>
                <select
                  name="subtype"
                  value={subtype}
                  onChange={(e) => setSubtype(e.target.value as AccountSubtype)}
                  className={inputClass}
                  disabled={head.is_system}
                >
                  {SUBTYPES.map((s) => (
                    <option key={s} value={s} className="capitalize">{s}</option>
                  ))}
                </select>
              </Field>
              <Field label="Branch / concern">
                <select name="branch" defaultValue={head.branch} className={inputClass}>
                  <option value="general">General / Head office</option>
                  {BRANCHES.map((b) => (
                    <option key={b.value} value={b.value}>{b.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Contact phone">
                <input name="party_phone" defaultValue={head.party_phone ?? ''} className={inputClass} placeholder="01XXXXXXXXX" />
              </Field>
              {subtype === 'bank' && (
                <>
                  <Field label="Bank name">
                    <input name="bank_name" defaultValue={head.bank_name ?? ''} className={inputClass} />
                  </Field>
                  <Field label="Bank account no.">
                    <input name="account_no" defaultValue={head.account_no ?? ''} className={inputClass} />
                  </Field>
                </>
              )}

              <div className="mt-1 flex items-center gap-3 sm:col-span-2">
                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  Save changes
                </Button>
                <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={saving}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
