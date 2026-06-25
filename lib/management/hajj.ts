import { mgmtDb } from '@/lib/management/server';
import { getStaffScope } from '@/lib/management/scope';
import { naturalBalance, type AccountHead, type HajjPilgrim, type MgmtPackage } from '@/lib/management/types';

/** Load every account head once and return a Map keyed by id (for due lookups). */
export async function loadHeadMap(): Promise<Map<string, AccountHead>> {
  const map = new Map<string, AccountHead>();
  try {
    const scope = await getStaffScope();
    let q = mgmtDb().from('account_heads').select('*');
    if (scope.branch) q = q.eq('branch', scope.branch);
    const { data } = await q;
    for (const h of (data ?? []) as AccountHead[]) map.set(h.id, h);
  } catch {
    // table absent — empty map, due defaults to 0 everywhere
  }
  return map;
}

/** Due = naturalBalance of the pilgrim's customer head (positive = still owed). */
export function dueForHead(headId: string | null, heads: Map<string, AccountHead>): number {
  if (!headId) return 0;
  const head = heads.get(headId);
  return head ? naturalBalance(head) : 0;
}

/** Active bank accounts (subtype 'bank') for the payment form select. */
export async function loadBankAccounts(): Promise<{ id: string; name: string }[]> {
  try {
    const scope = await getStaffScope();
    let q = mgmtDb().from('account_heads').select('id, name').eq('subtype', 'bank').eq('active', true);
    if (scope.branch) q = q.eq('branch', scope.branch);
    const { data } = await q.order('name');
    return (data ?? []) as { id: string; name: string }[];
  } catch {
    return [];
  }
}

/** Hajj packages — full rows or a slim option set. */
export async function loadHajjPackages(): Promise<MgmtPackage[]> {
  try {
    const scope = await getStaffScope();
    let q = mgmtDb().from('mgmt_packages').select('*').eq('type', 'hajj');
    if (scope.branch) q = q.eq('branch', scope.branch);
    const { data } = await q.order('year', { ascending: false }).order('name');
    return (data ?? []) as MgmtPackage[];
  } catch {
    return [];
  }
}

export type PilgrimRow = HajjPilgrim;
