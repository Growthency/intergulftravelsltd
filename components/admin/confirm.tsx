'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
};

type Pending = ConfirmOptions & { resolve: (value: boolean) => void };

let emit: ((p: Pending | null) => void) | null = null;

/**
 * Promise-based confirm — drop-in replacement for window.confirm() with a
 * branded modal instead of the browser's default pop-up.
 *   if (await confirmDialog({ message: '…', danger: true })) { … }
 */
export function confirmDialog(options: ConfirmOptions | string): Promise<boolean> {
  const opts = typeof options === 'string' ? { message: options } : options;
  return new Promise<boolean>((resolve) => {
    if (!emit) {
      // Host not mounted (shouldn't happen inside the admin shell) — fail safe.
      resolve(false);
      return;
    }
    emit({ ...opts, resolve });
  });
}

/** Mounted once (in the admin shell). Renders the active confirm modal. */
export function ConfirmHost() {
  const [pending, setPending] = useState<Pending | null>(null);

  useEffect(() => {
    emit = setPending;
    return () => {
      emit = null;
    };
  }, []);

  useEffect(() => {
    if (!pending) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(false);
      if (e.key === 'Enter') close(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending]);

  function close(value: boolean) {
    pending?.resolve(value);
    setPending(null);
  }

  if (!pending) return null;

  return (
    <div className="fixed inset-0 z-[200] grid place-items-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-ink/55 backdrop-blur-sm" onClick={() => close(false)} />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-glow">
        <div className="flex items-start gap-3.5">
          <span
            className={cn(
              'grid h-10 w-10 shrink-0 place-items-center rounded-full',
              pending.danger ? 'bg-red-50 text-red-600' : 'bg-brand-50 text-brand-700',
            )}
          >
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-lg font-semibold text-ink">
              {pending.title ?? (pending.danger ? 'Please confirm' : 'Confirm')}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{pending.message}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={() => close(false)}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-ink-muted transition hover:bg-muted"
          >
            {pending.cancelText ?? 'Cancel'}
          </button>
          <button
            type="button"
            autoFocus
            onClick={() => close(true)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-semibold text-white transition',
              pending.danger ? 'bg-red-600 hover:bg-red-700' : 'bg-brand-600 hover:bg-brand-700',
            )}
          >
            {pending.confirmText ?? 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
