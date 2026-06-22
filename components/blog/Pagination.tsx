import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Build a compact page list with ellipses, e.g. 1 … 4 [5] 6 … 12 */
function pageList(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set<number>([1, 2, total - 1, total, current - 1, current, current + 1]);
  const sorted = [...set].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | '…')[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) out.push('…');
    out.push(p);
    prev = p;
  }
  return out;
}

export function Pagination({
  currentPage,
  totalPages,
  hrefFor,
}: {
  currentPage: number;
  totalPages: number;
  hrefFor: (page: number) => string;
}) {
  if (totalPages <= 1) return null;
  const base =
    'grid h-10 min-w-10 place-items-center rounded-xl border px-3 text-sm font-semibold transition';

  return (
    <nav className="mt-14 flex flex-wrap items-center justify-center gap-1.5" aria-label="Blog pagination">
      {currentPage > 1 ? (
        <Link href={hrefFor(currentPage - 1)} className={cn(base, 'border-border bg-card text-ink-muted hover:border-brand-600/40 hover:text-brand-700')} aria-label="Previous page">
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span className={cn(base, 'cursor-not-allowed border-border/60 text-ink-muted/40')}>
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {pageList(currentPage, totalPages).map((p, i) =>
        p === '…' ? (
          <span key={`e${i}`} className="px-1.5 text-ink-muted">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={hrefFor(p)}
            aria-current={p === currentPage ? 'page' : undefined}
            className={cn(
              base,
              p === currentPage
                ? 'border-transparent bg-brand-600 text-white shadow-emerald'
                : 'border-border bg-card text-ink-muted hover:border-brand-600/40 hover:text-brand-700',
            )}
          >
            {p}
          </Link>
        ),
      )}

      {currentPage < totalPages ? (
        <Link href={hrefFor(currentPage + 1)} className={cn(base, 'border-border bg-card text-ink-muted hover:border-brand-600/40 hover:text-brand-700')} aria-label="Next page">
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className={cn(base, 'cursor-not-allowed border-border/60 text-ink-muted/40')}>
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
