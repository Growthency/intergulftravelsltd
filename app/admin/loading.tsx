/**
 * Instant skeleton shown while an admin page's data loads, so navigation never
 * looks frozen. Rendered inside the persistent AdminShell (sidebar + topbar).
 */
export default function AdminLoading() {
  return (
    <div className="animate-pulse">
      {/* Page header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="space-y-2">
          <div className="h-7 w-56 rounded-lg bg-muted" />
          <div className="h-4 w-72 rounded bg-muted/70" />
        </div>
        <div className="h-10 w-32 rounded-full bg-muted" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
            <div className="h-4 w-24 rounded bg-muted/70" />
            <div className="mt-4 h-8 w-32 rounded-lg bg-muted" />
          </div>
        ))}
      </div>

      {/* Table block */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        <div className="border-b border-border px-5 py-4">
          <div className="h-5 w-40 rounded bg-muted" />
        </div>
        <div className="divide-y divide-border/70">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="h-4 w-1/3 rounded bg-muted/70" />
              <div className="h-4 w-24 rounded bg-muted/70" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
