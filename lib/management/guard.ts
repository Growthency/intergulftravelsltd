import { createClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';

export const STAFF_ROLES = ['admin', 'accountant', 'operator', 'staff'] as const;

export type StaffGuard =
  | { ok: true; status: 200; user: { id: string; email: string }; role: string; isAdmin: boolean }
  | { ok: false; status: 401 | 403; user: null; role: null; isAdmin: false };

/** Use at the top of every management API route / server action. */
export async function requireStaff(): Promise<StaffGuard> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false, status: 401, user: null, role: null, isAdmin: false };

  let role = 'user';
  try {
    const { data } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
    if (data?.role) role = data.role;
  } catch {
    // profiles table may not exist yet
  }

  const isAdmin = role === 'admin' || isAdminEmail(user.email);
  const isStaff = isAdmin || (STAFF_ROLES as readonly string[]).includes(role);

  if (!isStaff) return { ok: false, status: 403, user: null, role: null, isAdmin: false };

  return {
    ok: true,
    status: 200,
    user: { id: user.id, email: user.email ?? '' },
    role: isAdmin ? 'admin' : role,
    isAdmin,
  };
}
