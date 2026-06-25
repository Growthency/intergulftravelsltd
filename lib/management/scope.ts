import { createClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';

/**
 * Branch-scoped staff. These emails can only ever see and touch their own
 * branch's data; everyone else (the super admin) sees everything.
 */
const BRANCH_BY_EMAIL: Record<string, string> = {
  'mokbuloverseas@gmail.com': 'mokbul-hajj-overseas',
  'intergulfairtravels2016@gmail.com': 'inter-gulf-air-travels',
  'intergulfg47@gmail.com': 'inter-gulf-travels',
};

export type StaffScope = { isAdmin: boolean; branch: string | null; email: string | null };

/**
 * Resolve the current user's access scope. `branch === null` means "see
 * everything" (administrators / head office). Cached per request so the many
 * loaders that call it only hit auth once.
 */
export async function getStaffScope(): Promise<StaffScope> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { isAdmin: false, branch: null, email: null };

    const email = (user.email ?? '').toLowerCase();
    let isAdmin = isAdminEmail(email);
    if (!isAdmin) {
      const { data } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
      if (data?.role === 'admin') isAdmin = true;
    }
    const branch = isAdmin ? null : BRANCH_BY_EMAIL[email] ?? null;
    return { isAdmin, branch, email };
  } catch {
    return { isAdmin: false, branch: null, email: null };
  }
}

/** The branch a new record/voucher must be tagged with: forced for branch staff. */
export async function enforceBranch(requested?: string | null): Promise<string> {
  const scope = await getStaffScope();
  if (scope.branch) return scope.branch;
  return requested || 'general';
}
