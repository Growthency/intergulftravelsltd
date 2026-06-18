import { createClient } from '@/lib/supabase/server';
import type { AccountHead, Transaction } from '@/lib/management/types';

/**
 * Server-side read helpers for the accounting pages. Every query is wrapped so
 * that a missing table (migration not yet run) resolves to []/null and the
 * page can render a friendly empty state instead of crashing the build.
 */

export async function loadActiveHeads(): Promise<AccountHead[]> {
  try {
    const db = createClient();
    const { data, error } = await db
      .from('account_heads')
      .select('*')
      .eq('active', true)
      .order('type', { ascending: true })
      .order('name', { ascending: true });
    if (error) return [];
    return (data ?? []) as AccountHead[];
  } catch {
    return [];
  }
}

export async function loadHead(id: string): Promise<AccountHead | null> {
  try {
    const db = createClient();
    const { data } = await db.from('account_heads').select('*').eq('id', id).maybeSingle();
    return (data as AccountHead) ?? null;
  } catch {
    return null;
  }
}

export type TxFilters = {
  from?: string;
  to?: string;
  branch?: string;
  type?: string;
  accountId?: string;
  limit?: number;
};

export async function loadTransactions(filters: TxFilters = {}): Promise<Transaction[]> {
  try {
    const db = createClient();
    let q = db.from('transactions').select('*');

    if (filters.from) q = q.gte('date', filters.from);
    if (filters.to) q = q.lte('date', filters.to);
    if (filters.branch && filters.branch !== 'all') q = q.eq('branch', filters.branch);
    if (filters.type && filters.type !== 'all') q = q.eq('type', filters.type);
    if (filters.accountId) {
      q = q.or(`debit_account_id.eq.${filters.accountId},credit_account_id.eq.${filters.accountId}`);
    }

    q = q.order('date', { ascending: false }).order('created_at', { ascending: false });
    if (filters.limit) q = q.limit(filters.limit);

    const { data, error } = await q;
    if (error) return [];
    return (data ?? []) as Transaction[];
  } catch {
    return [];
  }
}

/** Build an id → head lookup for joining transaction account ids to names. */
export function headMap(heads: AccountHead[]): Map<string, AccountHead> {
  return new Map(heads.map((h) => [h.id, h]));
}

export function headName(map: Map<string, AccountHead>, id: string | null): string {
  if (!id) return '—';
  return map.get(id)?.name ?? '—';
}
