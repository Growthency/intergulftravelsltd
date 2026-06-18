import { NextResponse } from 'next/server';
import { z } from 'zod';
import { mgmtDb, logActivity } from '@/lib/management/server';
import { requireStaff } from '@/lib/management/guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const baseSchema = z.object({
  name: z.string().trim().min(1, 'Package name is required.'),
  year: z.coerce.number().int().min(2000).max(2100).optional().nullable(),
  price: z.coerce.number().min(0).default(0),
  seats: z.coerce.number().int().min(0).optional().nullable(),
  branch: z.string().trim().min(1).default('general'),
  description: z.string().trim().optional().nullable(),
  active: z.coerce.boolean().default(true),
});

const clean = (v: unknown) => {
  const s = typeof v === 'string' ? v.trim() : v;
  return s === '' || s === undefined ? null : s;
};

async function readGuard() {
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
  return { guard, res: null as null };
}

export async function POST(request: Request) {
  const { guard, res } = await readGuard();
  if (res) return res;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = baseSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check the form.' },
      { status: 400 },
    );
  }
  const d = parsed.data;

  try {
    const db = mgmtDb();
    const { data, error } = await db
      .from('mgmt_packages')
      .insert({
        type: 'hajj',
        name: d.name,
        year: d.year ?? null,
        price: d.price,
        seats: d.seats ?? null,
        branch: d.branch,
        description: clean(d.description),
        active: d.active,
      })
      .select('id')
      .single();

    if (error || !data) {
      console.error('[admin/hajj/packages] insert failed:', error?.message);
      return NextResponse.json({ ok: false, error: 'Could not save the package.' }, { status: 500 });
    }

    await logActivity({
      user_id: guard.ok ? guard.user.id : null,
      user_email: guard.ok ? guard.user.email : null,
      action: 'create',
      entity: 'hajj_package',
      entity_id: data.id,
      detail: { name: d.name, price: d.price },
      branch: d.branch,
    });
    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    console.error('[admin/hajj/packages] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error. Please try again.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { guard, res } = await readGuard();
  if (res) return res;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const editSchema = baseSchema.extend({ id: z.string().uuid('Missing package id.') });
  const parsed = editSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check the form.' },
      { status: 400 },
    );
  }
  const d = parsed.data;

  try {
    const db = mgmtDb();
    const { error } = await db
      .from('mgmt_packages')
      .update({
        name: d.name,
        year: d.year ?? null,
        price: d.price,
        seats: d.seats ?? null,
        branch: d.branch,
        description: clean(d.description),
        active: d.active,
      })
      .eq('id', d.id)
      .eq('type', 'hajj');

    if (error) {
      console.error('[admin/hajj/packages] update failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not update the package.' }, { status: 500 });
    }

    await logActivity({
      user_id: guard.ok ? guard.user.id : null,
      user_email: guard.ok ? guard.user.email : null,
      action: 'edit',
      entity: 'hajj_package',
      entity_id: d.id,
      branch: d.branch,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/hajj/packages] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error. Please try again.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { guard, res } = await readGuard();
  if (res) return res;

  let id: string | null = null;
  try {
    const body = await request.json();
    id = typeof body?.id === 'string' ? body.id : null;
  } catch {
    id = new URL(request.url).searchParams.get('id');
  }
  if (!id) {
    return NextResponse.json({ ok: false, error: 'Missing package id.' }, { status: 400 });
  }

  try {
    const db = mgmtDb();

    // Refuse to delete a package that still has pilgrims assigned.
    const { count } = await db
      .from('hajj_pilgrims')
      .select('id', { count: 'exact', head: true })
      .eq('package_id', id);
    if ((count ?? 0) > 0) {
      return NextResponse.json(
        { ok: false, error: 'This package has pilgrims assigned. Deactivate it instead.' },
        { status: 409 },
      );
    }

    const { error } = await db.from('mgmt_packages').delete().eq('id', id).eq('type', 'hajj');
    if (error) {
      console.error('[admin/hajj/packages] delete failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not delete the package.' }, { status: 500 });
    }

    await logActivity({
      user_id: guard.ok ? guard.user.id : null,
      user_email: guard.ok ? guard.user.email : null,
      action: 'delete',
      entity: 'hajj_package',
      entity_id: id,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/hajj/packages] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error. Please try again.' }, { status: 500 });
  }
}
