import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';
import { requireStaff } from '@/lib/management/guard';
import { logActivity } from '@/lib/management/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const emptyToNull = (v: unknown) => (typeof v === 'string' && v.trim() === '' ? null : v);
const emptyToUndef = (v: unknown) => (typeof v === 'string' && v.trim() === '' ? undefined : v);

const patchSchema = z.object({
  role: z.enum(['user', 'admin', 'accountant', 'operator', 'staff']).optional(),
  full_name: z.string().trim().min(1, 'Name cannot be empty.').max(120).optional(),
  phone: z.preprocess(emptyToNull, z.string().trim().max(40).nullable().optional()),
  password: z.preprocess(
    emptyToUndef,
    z.string().min(8, 'Password must be at least 8 characters.').optional(),
  ),
});

function bad(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}
function fail(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 500 });
}

/** Staff management (role/name/phone/password edits, delete) is admin-only. */
async function requireAdminGuard() {
  const guard = await requireStaff();
  if (!guard.ok) {
    return {
      guard,
      res: NextResponse.json(
        { ok: false, error: guard.status === 401 ? 'Not signed in.' : 'Staff access required.' },
        { status: guard.status },
      ),
    };
  }
  if (!guard.isAdmin) {
    return { guard, res: NextResponse.json({ ok: false, error: 'Only an administrator can manage staff.' }, { status: 403 }) };
  }
  return { guard, res: null as null };
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { guard, res } = await requireAdminGuard();
  if (res) return res;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return bad('Invalid request body.');
  }
  const parsed = patchSchema.safeParse(payload);
  if (!parsed.success) return bad(parsed.error.issues[0]?.message ?? 'Please check the details.');
  const d = parsed.data;

  const db = createAdminClient();
  const { data: target } = await db.from('profiles').select('email, role').eq('id', params.id).maybeSingle();

  // Role-change safety: nobody can self-demote, and allowlisted emails are
  // permanent administrators.
  if (d.role !== undefined) {
    const supabaseAuth = createClient();
    const {
      data: { user },
    } = await supabaseAuth.auth.getUser();
    if (user && user.id === params.id && d.role !== 'admin') {
      return bad('You cannot remove your own admin access.');
    }
    if (target?.email && isAdminEmail(target.email) && d.role !== 'admin') {
      return bad('This account is a permanent administrator and cannot be demoted.');
    }
  }

  try {
    if (d.password) {
      const { error } = await db.auth.admin.updateUserById(params.id, { password: d.password });
      if (error) {
        console.error('[admin/staff/:id] password reset failed:', error.message);
        return fail('Could not update the password.');
      }
    }

    const profilePatch: Record<string, unknown> = {};
    if (d.role !== undefined) profilePatch.role = d.role;
    if (d.full_name !== undefined) profilePatch.full_name = d.full_name;
    if (d.phone !== undefined) profilePatch.phone = d.phone;
    if (Object.keys(profilePatch).length > 0) {
      const { error } = await db.from('profiles').update(profilePatch).eq('id', params.id);
      if (error) {
        console.error('[admin/staff/:id] update failed:', error.message);
        return fail('Could not update the account.');
      }
    }

    await logActivity({
      user_id: guard.ok ? guard.user.id : null,
      user_email: guard.ok ? guard.user.email : null,
      action: 'update',
      entity: 'staff',
      entity_id: params.id,
      detail: { ...profilePatch, password: d.password ? 'reset' : undefined },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/staff/:id] unexpected error:', err);
    return fail('Unexpected error.');
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const { guard, res } = await requireAdminGuard();
  if (res) return res;

  const supabaseAuth = createClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();
  if (user && user.id === params.id) return bad('You cannot delete your own account.');

  try {
    const db = createAdminClient();
    const { data: target } = await db
      .from('profiles')
      .select('email, full_name')
      .eq('id', params.id)
      .maybeSingle();

    if (target?.email && isAdminEmail(target.email)) {
      return bad('This account is a permanent administrator and cannot be deleted.');
    }

    // Removing the auth user cascades to their profile (FK on delete cascade).
    const { error } = await db.auth.admin.deleteUser(params.id);
    if (error) {
      console.error('[admin/staff/:id] delete failed:', error.message);
      return fail('Could not delete the account.');
    }

    await logActivity({
      user_id: guard.ok ? guard.user.id : null,
      user_email: guard.ok ? guard.user.email : null,
      action: 'delete',
      entity: 'staff',
      entity_id: params.id,
      detail: { email: target?.email, name: target?.full_name },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/staff/:id] delete error:', err);
    return fail('Unexpected error.');
  }
}
