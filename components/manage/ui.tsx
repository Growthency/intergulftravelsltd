import { cn } from '@/lib/utils';
import { money } from '@/lib/management/format';
import type { LucideIcon } from 'lucide-react';

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('rounded-2xl border border-border bg-card p-5 shadow-soft', className)}>{children}</div>
  );
}

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  accent = 'emerald',
}: {
  label: string;
  value: React.ReactNode;
  icon?: LucideIcon;
  hint?: string;
  accent?: 'emerald' | 'gold' | 'red' | 'slate';
}) {
  const ring = {
    emerald: 'bg-brand-50 text-brand-700',
    gold: 'bg-gold-50 text-gold-700',
    red: 'bg-red-50 text-red-600',
    slate: 'bg-muted text-ink-muted',
  }[accent];
  return (
    <Card className="flex items-center gap-4">
      {Icon && (
        <span className={cn('grid h-12 w-12 shrink-0 place-items-center rounded-xl', ring)}>
          <Icon className="h-6 w-6" />
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</p>
        <p className="mt-0.5 font-display text-xl font-semibold text-ink">{value}</p>
        {hint && <p className="text-xs text-ink-muted">{hint}</p>}
      </div>
    </Card>
  );
}

export function Money({ value, className }: { value: number | string | null | undefined; className?: string }) {
  const v = Number(value ?? 0);
  return <span className={cn('tabular-nums', v < 0 && 'text-red-600', className)}>{money(v)}</span>;
}

export function Badge({
  children,
  tone = 'slate',
}: {
  children: React.ReactNode;
  tone?: 'slate' | 'emerald' | 'gold' | 'red' | 'blue';
}) {
  const tones = {
    slate: 'bg-muted text-ink-muted',
    emerald: 'bg-brand-50 text-brand-700',
    gold: 'bg-gold-50 text-gold-700',
    red: 'bg-red-50 text-red-600',
    blue: 'bg-sky-50 text-sky-700',
  }[tone];
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', tones)}>
      {children}
    </span>
  );
}

export function EmptyState({ title, hint, action }: { title: string; hint?: string; action?: React.ReactNode }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
      <p className="font-display text-lg font-semibold text-ink">{title}</p>
      {hint && <p className="mt-1 max-w-md text-sm text-ink-muted">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/** Responsive table shell. Pass <thead>/<tbody> as children. */
export function TableWrap({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-x-auto rounded-2xl border border-border bg-card shadow-soft', className)}>
      <table className="w-full min-w-[640px] text-sm">{children}</table>
    </div>
  );
}

export const thClass =
  'border-b border-border bg-muted/60 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-muted';
export const tdClass = 'border-b border-border/70 px-4 py-3 text-ink';

export function Field({
  label,
  required,
  hint,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-1 block text-sm font-medium text-ink">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-muted">{hint}</span>}
    </label>
  );
}

export const inputClass =
  'w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20';
