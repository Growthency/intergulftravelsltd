/* ------------------------------------------------------------------ *
 *  Operational package costing. The management package `description`
 *  column doubles as a small JSON document holding an itemised cost
 *  breakdown (khana / hotel / air fare …) plus an optional note. Legacy
 *  plain-text descriptions are treated as the note, so nothing breaks.
 * ------------------------------------------------------------------ */

export type CostItem = { label: string; amount: number };
export type PackageMeta = { note: string; costs: CostItem[] };

export function parsePackageMeta(description: string | null | undefined): PackageMeta {
  if (!description) return { note: '', costs: [] };
  const raw = description.trim();
  if (raw.startsWith('{')) {
    try {
      const o = JSON.parse(raw) as Record<string, unknown>;
      if (o && typeof o === 'object' && ('costs' in o || 'note' in o)) {
        const costs = Array.isArray(o.costs)
          ? o.costs
              .filter((c): c is Record<string, unknown> => !!c && typeof c === 'object')
              .map((c) => ({ label: String(c.label ?? '').trim(), amount: Number(c.amount) || 0 }))
              .filter((c) => c.label || c.amount)
          : [];
        return { note: typeof o.note === 'string' ? o.note : '', costs };
      }
    } catch {
      /* fall through to treating it as plain text */
    }
  }
  return { note: description, costs: [] };
}

/** Serialize back to the description column (empty string when nothing set). */
export function serializePackageMeta(meta: PackageMeta): string {
  const costs = meta.costs
    .map((c) => ({ label: c.label.trim(), amount: Number(c.amount) || 0 }))
    .filter((c) => c.label || c.amount);
  const note = meta.note.trim();
  if (!costs.length && !note) return '';
  return JSON.stringify({ note, costs });
}

export function totalCost(costs: CostItem[]): number {
  return costs.reduce((s, c) => s + (Number(c.amount) || 0), 0);
}
