'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import { confirmDialog } from '@/components/admin/confirm';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/adminshell';
import { localizedPath } from '@/lib/i18n';

/** Edit (link) + Remove (DELETE) actions for a list row. */
export function RecordRowActions({
  editHref,
  deleteEndpoint,
  name,
  confirmMessage,
}: {
  editHref: string;
  deleteEndpoint: string;
  name: string;
  confirmMessage?: string;
}) {
  const router = useRouter();
  const locale = useLocale();
  const t = getDict(locale).rowActions;
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (
      !(await confirmDialog({
        message: confirmMessage ?? t.confirmDelete(name),
        confirmText: t.delete,
        danger: true,
      }))
    ) {
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(deleteEndpoint, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? t.couldNotDelete);
        return;
      }
      toast.success(t.deleted(name));
      router.refresh();
    } catch {
      toast.error(t.networkError);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="inline-flex items-center justify-end gap-1.5">
      <Link
        href={localizedPath(locale, editHref)}
        className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs font-semibold text-ink-muted transition hover:border-brand-600/40 hover:text-brand-700"
      >
        <Pencil className="h-3.5 w-3.5" /> {t.edit}
      </Link>
      <button
        type="button"
        onClick={remove}
        disabled={busy}
        className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs font-semibold text-ink-muted transition hover:border-red-300 hover:text-red-600 disabled:opacity-50"
        aria-label={`${t.deletePrefix} ${name}`}
      >
        {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />} {t.remove}
      </button>
    </div>
  );
}
