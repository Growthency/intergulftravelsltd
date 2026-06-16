import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ *
 *  Shared, presentational building blocks for the member dashboard.
 * ------------------------------------------------------------------ */

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('rounded-3xl border border-border bg-card shadow-soft', className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-ink-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

const statTones = {
  emerald: 'bg-brand-50 text-brand-700',
  gold: 'bg-gold-100 text-gold-700',
  forest: 'bg-brand-900/[0.06] text-brand-900',
  sand: 'bg-sand text-ink',
} as const;

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  tone = 'emerald',
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: LucideIcon;
  tone?: keyof typeof statTones;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
          <p className="mt-1.5 font-display text-2xl font-semibold text-ink">{value}</p>
          {sub && <p className="mt-0.5 truncate text-xs text-ink-muted">{sub}</p>}
        </div>
        <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-2xl', statTones[tone])}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </Card>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-ink-muted">{description}</p>
      {action && (
        <Link
          href={action.href}
          className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-600 px-6 text-sm font-semibold text-white shadow-emerald transition hover:bg-brand-700"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

/* Status badge shared by bookings & overview. */
const statusStyles: Record<string, string> = {
  new: 'bg-brand-50 text-brand-700 ring-brand-600/15',
  'in-progress': 'bg-gold-100 text-gold-700 ring-gold-500/20',
  in_progress: 'bg-gold-100 text-gold-700 ring-gold-500/20',
  contacted: 'bg-gold-100 text-gold-700 ring-gold-500/20',
  confirmed: 'bg-emerald-100 text-emerald-700 ring-emerald-600/20',
  completed: 'bg-emerald-100 text-emerald-700 ring-emerald-600/20',
  cancelled: 'bg-red-50 text-red-600 ring-red-500/15',
  closed: 'bg-muted text-ink-muted ring-border',
};

export function StatusBadge({ status }: { status?: string | null }) {
  const key = (status ?? 'new').toLowerCase();
  const cls = statusStyles[key] ?? 'bg-muted text-ink-muted ring-border';
  const label = (status ?? 'New').replace(/[-_]/g, ' ');
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset',
        cls,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}
