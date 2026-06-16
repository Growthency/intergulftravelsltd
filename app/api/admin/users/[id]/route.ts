import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';
import { requireAdmin } from '../../_lib/guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({ role: z.enum(['user', 'admin']) });

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: guard.status });
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

  // Guard against an admin demoting themselves and losing access.
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
    const supabase = createAdminClient();

    // Allowlisted emails are always admins — don't let the toggle pretend otherwise.
    const { data: target } = await supabase
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

    const { error } = await supabase
      .from('profiles')
      .update({ role: parsed.data.role })
      .eq('id', params.id);

    if (error) {
      console.error('[admin/users/:id] update failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not update the role.' }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/users/:id] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}
