import Link from 'next/link';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ *
 *  Shared admin building blocks — page headers, cards, badges, empty
 *  states. Kept deliberately small and composable so every admin view
 *  reads consistently.
 * ------------------------------------------------------------------ */

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {title}
        </h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-ink-muted">{description}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('overflow-hidden rounded-3xl border border-border bg-card shadow-soft', className)}>
      {children}
    </div>
  );
}

type Tone = 'emerald' | 'gold' | 'gray' | 'amber' | 'rose' | 'sky';

const toneStyles: Record<Tone, string> = {
  emerald: 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-600/20',
  gold: 'bg-gold-50 text-gold-700 ring-1 ring-inset ring-gold-500/25',
  gray: 'bg-muted text-ink-muted ring-1 ring-inset ring-border',
  amber: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-500/25',
  rose: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-500/25',
  sky: 'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-500/25',
};

export function Badge({
  tone = 'gray',
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { tone: Tone; label: string }> = {
    published: { tone: 'emerald', label: 'Published' },
    draft: { tone: 'gray', label: 'Draft' },
    scheduled: { tone: 'sky', label: 'Scheduled' },
    new: { tone: 'gold', label: 'New' },
    contacted: { tone: 'sky', label: 'Contacted' },
    quoted: { tone: 'emerald', label: 'Quoted' },
    closed: { tone: 'gray', label: 'Closed' },
    handled: { tone: 'emerald', label: 'Handled' },
    pending: { tone: 'amber', label: 'Pending' },
  };
  const { tone, label } = map[status] ?? { tone: 'gray' as Tone, label: status };
  return <Badge tone={tone}>{label}</Badge>;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
      {icon && (
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
          {icon}
        </span>
      )}
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      {description && <p className="max-w-md text-sm text-ink-muted">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/** Compact admin button used for table row actions & toolbars. */
export function AdminButton({
  href,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className,
  children,
  ...props
}: {
  href?: string;
  variant?: 'primary' | 'gold' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
  type?: 'button' | 'submit';
  className?: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base =
    'inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition disabled:cursor-not-allowed disabled:opacity-60';
  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-emerald',
    gold: 'bg-gold-gradient text-brand-900 hover:-translate-y-0.5 shadow-gold',
    outline: 'border border-border text-ink-muted hover:border-brand-600/40 hover:text-brand-700',
    ghost: 'text-ink-muted hover:bg-muted hover:text-ink',
    danger: 'border border-rose-200 text-rose-600 hover:bg-rose-50',
  } as const;
  const sizes = {
    sm: 'h-9 px-3.5 text-sm',
    md: 'h-11 px-5 text-sm',
  } as const;

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

/** Reusable labelled field wrapper for admin forms. */
export function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-sm font-semibold text-ink">{label}</span>
        {hint && <span className="text-xs font-normal text-ink-muted">{hint}</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-rose-500">{error}</span>}
    </label>
  );
}

export const inputClass =
  'w-full rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-[0.95rem] text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-brand-600 focus:bg-card focus:ring-2 focus:ring-brand-600/15';
