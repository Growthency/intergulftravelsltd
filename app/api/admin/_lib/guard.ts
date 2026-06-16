import { createClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';

export type AdminUser = {
  id: string;
  email: string | null;
};

export type GuardResult =
  | { ok: true; user: AdminUser }
  | { ok: false; status: 401 | 403 };

/**
 * Shared admin authorisation check for every /api/admin route handler.
 *
 * A request is authorised only when there is a signed-in Supabase user AND that
 * user is either on the email allowlist (isAdminEmail) or carries
 * `role = 'admin'` on their profiles row. Returns a discriminated result so
 * callers can respond with the correct 401 / 403 status.
 */
export async function requireAdmin(): Promise<GuardResult> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false, status: 401 };

  if (isAdminEmail(user.email)) {
    return { ok: true, user: { id: user.id, email: user.email ?? null } };
  }

  // Fall back to the profile role flag for admins added outside the allowlist.
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (profile?.role === 'admin') {
      return { ok: true, user: { id: user.id, email: user.email ?? null } };
    }
  } catch {
    // profiles table may be unavailable during local design work — deny safely
  }

  return { ok: false, status: 403 };
}
