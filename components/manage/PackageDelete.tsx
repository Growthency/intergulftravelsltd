'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Trash2 } from 'lucide-react';
import { confirmDialog } from '@/components/admin/confirm';

/** Remove a package. The API refuses if pilgrims/passengers are still assigned. */
export function PackageDelete({ id, name, endpoint }: { id: string; name: string; endpoint: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (
      !(await confirmDialog({
        message: `Delete the package “${name}”? This cannot be undone.`,
        confirmText: 'Delete',
        danger: true,
      }))
    ) {
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not delete the package.');
        return;
      }
      toast.success('Package deleted.');
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={remove}
      disabled={busy}
      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink-muted transition hover:border-red-300 hover:text-red-600 disabled:opacity-50"
    >
      {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />} Remove
    </button>
  );
}
