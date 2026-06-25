import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { requireStaff } from '@/lib/management/guard';
import { logActivity } from '@/lib/management/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  full_name: z.string().trim().max(120).optional(),
  avatar_url: z.preprocess(
    (v) => (typeof v === 'string' && v.trim() === '' ? null : v),
    z.string().trim().url().max(600).nullable().optional(),
  ),
  email: z.string().trim().toLowerCase().email('Enter a valid email address.').optional(),
  password: z.preprocess(
    (v) => (typeof v === 'string' && v.trim() === '' ? undefined : v),
    z.string().min(8, 'Password must be at least 8 characters.').optional(),
  ),
});

/** Self-service: any signed-in staff member edits their OWN account here. */
export async function PATCH(request: Request) {
  const guard = await requireStaff();
  if (!guard.ok) {
    return NextResponse.json(
      { ok: false, error: guard.status === 401 ? 'Not signed in.' : 'Staff access required.' },
      { status: guard.status },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check the form.' },
      { status: 400 },
    );
  }
  const d = parsed.data;
  const userId = guard.user.id;
  const admin = createAdminClient();

  // Email / password — applied through the admin API so no confirmation email
  // round-trip is needed for the account holder. Only administrators may change
  // their email; branch staff keep theirs so their branch scoping stays intact.
  const authPatch: { email?: string; password?: string } = {};
  if (d.email && d.email !== guard.user.email && guard.isAdmin) authPatch.email = d.email;
  if (d.password) authPatch.password = d.password;
  if (Object.keys(authPatch).length > 0) {
    const { error } = await admin.auth.admin.updateUserById(userId, authPatch);
    if (error) {
      const friendly = /already|registered|exists/i.test(error.message)
        ? 'That email is already in use by another account.'
        : 'Could not update your sign-in details.';
      console.error('[admin/account] auth update failed:', error.message);
      return NextResponse.json({ ok: false, error: friendly }, { status: 400 });
    }
  }

  // Profile fields. Keep an admin as an admin even if they change their email
  // away from the allowlist, so they never lock themselves out.
  const profilePatch: Record<string, unknown> = {};
  if (d.full_name !== undefined) profilePatch.full_name = d.full_name || null;
  if (d.avatar_url !== undefined) profilePatch.avatar_url = d.avatar_url ?? null;
  if (authPatch.email) profilePatch.email = authPatch.email;
  if (guard.isAdmin) profilePatch.role = 'admin';
  if (Object.keys(profilePatch).length > 0) {
    const { error } = await admin.from('profiles').update(profilePatch).eq('id', userId);
    if (error) {
      console.error('[admin/account] profile update failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not save your profile.' }, { status: 500 });
    }
  }

  await logActivity({
    user_id: userId,
    user_email: authPatch.email || guard.user.email,
    action: 'update',
    entity: 'account',
    entity_id: userId,
    detail: { changed: Object.keys({ ...authPatch, ...profilePatch }) },
  });

  return NextResponse.json({ ok: true, emailChanged: !!authPatch.email });
}
