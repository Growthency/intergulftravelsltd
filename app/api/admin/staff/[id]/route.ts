import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';
import { requireStaff } from '@/lib/management/guard';
import { logActivity } from '@/lib/management/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  role: z.enum(['user', 'admin', 'accountant', 'operator', 'staff']),
});

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const guard = await requireStaff();
  if (!guard.ok) {
    return NextResponse.json(
      { ok: false, error: guard.status === 401 ? 'Not signed in.' : 'Staff access required.' },
      { status: guard.status },
    );
  }
  // Changing roles is administrator-only.
  if (!guard.isAdmin) {
    return NextResponse.json(
      { ok: false, error: 'Only an administrator can change roles.' },
      { status: 403 },
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
    return NextResponse.json({ ok: false, error: 'Invalid role value.' }, { status: 400 });
  }

  // An admin must not lock themselves out by self-demoting.
  const supabaseAuth = createClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();
  if (user && user.id === params.id && parsed.data.role !== 'admin') {
    return NextResponse.json(
      { ok: false, error: 'You cannot remove your own admin access.' },
      { status: 400 },
    );
  }

  try {
    const db = createAdminClient();

    // Allowlisted emails are permanent admins — refuse to demote them.
    const { data: target } = await db
      .from('profiles')
      .select('email')
      .eq('id', params.id)
      .maybeSingle();

    if (target?.email && isAdminEmail(target.email) && parsed.data.role !== 'admin') {
      return NextResponse.json(
        { ok: false, error: 'This account is a permanent administrator and cannot be demoted.' },
        { status: 400 },
      );
    }

    const { error } = await db.from('profiles').update({ role: parsed.data.role }).eq('id', params.id);
    if (error) {
      console.error('[admin/staff/:id] update failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not update the role.' }, { status: 500 });
    }

    await logActivity({
      user_id: guard.user.id,
      user_email: guard.user.email,
      action: 'update',
      entity: 'staff',
      entity_id: params.id,
      detail: { role: parsed.data.role },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/staff/:id] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}
