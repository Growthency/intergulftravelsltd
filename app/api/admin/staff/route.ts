import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { requireStaff } from '@/lib/management/guard';
import { logActivity } from '@/lib/management/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  full_name: z.string().trim().min(2, 'Please enter the full name.'),
  email: z.string().trim().toLowerCase().email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  phone: z.string().trim().optional().nullable(),
  role: z.enum(['admin', 'accountant', 'operator', 'staff']),
});

export async function POST(request: Request) {
  const guard = await requireStaff();
  if (!guard.ok) {
    return NextResponse.json(
      { ok: false, error: guard.status === 401 ? 'Not signed in.' : 'Staff access required.' },
      { status: guard.status },
    );
  }
  // Creating staff and assigning roles is an administrator-only action.
  if (!guard.isAdmin) {
    return NextResponse.json(
      { ok: false, error: 'Only an administrator can create staff accounts.' },
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
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check the form.' },
      { status: 400 },
    );
  }
  const d = parsed.data;

  try {
    const db = createAdminClient();

    // 1) Create the auth user (already confirmed so they can sign in at once).
    const { data: created, error: authError } = await db.auth.admin.createUser({
      email: d.email,
      password: d.password,
      email_confirm: true,
      user_metadata: { full_name: d.full_name },
    });

    if (authError || !created?.user) {
      const msg = authError?.message ?? '';
      const friendly = /already|registered|exists/i.test(msg)
        ? 'A user with this email already exists.'
        : 'Could not create the staff account.';
      console.error('[admin/staff] auth create failed:', msg);
      return NextResponse.json({ ok: false, error: friendly }, { status: 400 });
    }

    const userId = created.user.id;

    // 2) Upsert the profile row with the chosen role.
    const { error: profileError } = await db.from('profiles').upsert(
      {
        id: userId,
        email: d.email,
        full_name: d.full_name,
        phone: d.phone?.trim() || null,
        role: d.role,
      },
      { onConflict: 'id' },
    );

    if (profileError) {
      // Roll back the orphaned auth user so the email can be reused.
      await db.auth.admin.deleteUser(userId).catch(() => {});
      console.error('[admin/staff] profile upsert failed:', profileError.message);
      return NextResponse.json(
        { ok: false, error: 'Account created but profile could not be saved. Please try again.' },
        { status: 500 },
      );
    }

    await logActivity({
      user_id: guard.user.id,
      user_email: guard.user.email,
      action: 'create',
      entity: 'staff',
      entity_id: userId,
      detail: { email: d.email, role: d.role, full_name: d.full_name },
    });

    return NextResponse.json({
      ok: true,
      staff: {
        id: userId,
        email: d.email,
        full_name: d.full_name,
        phone: d.phone?.trim() || null,
        role: d.role,
      },
    });
  } catch (err) {
    console.error('[admin/staff] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error. Please try again.' }, { status: 500 });
  }
}
