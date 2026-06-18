import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { requireStaff } from '@/lib/management/guard';
import { logActivity } from '@/lib/management/server';
import { BRANCHES } from '@/lib/management/branches';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BRANCH_VALUES = BRANCHES.map((b) => b.value) as [string, ...string[]];
const emptyToNull = (v: unknown) => (typeof v === 'string' && v.trim() === '' ? null : v);

const packageSchema = z.object({
  name: z.string().trim().min(1, 'Package name is required.').max(160),
  price: z.coerce.number().min(0, 'Enter a valid price.').default(0),
  year: z.preprocess(emptyToNull, z.coerce.number().int().nullable().optional()),
  seats: z.preprocess(emptyToNull, z.coerce.number().int().min(0).nullable().optional()),
  branch: z.enum(BRANCH_VALUES).default('inter-gulf-travels'),
  description: z.preprocess(emptyToNull, z.string().trim().max(1000).nullable().optional()),
  active: z.boolean().default(true),
});

async function guardOrFail() {
  const guard = await requireStaff();
  if (!guard.ok) {
    return {
      guard: null,
      res: NextResponse.json(
        { ok: false, error: guard.status === 401 ? 'Not signed in.' : 'Staff access required.' },
        { status: guard.status },
      ),
    };
  }
  return { guard, res: null };
}

export async function POST(request: Request) {
  const { guard, res } = await guardOrFail();
  if (res) return res;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = packageSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check the package details.' },
      { status: 400 },
    );
  }
  const d = parsed.data;

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('mgmt_packages')
      .insert({
        type: 'umrah',
        name: d.name,
        price: d.price,
        year: d.year ?? null,
        seats: d.seats ?? null,
        branch: d.branch,
        description: d.description ?? null,
        active: d.active,
      })
      .select('id')
      .single();

    if (error || !data) {
      console.error('[admin/umrah/packages] insert failed:', error?.message);
      return NextResponse.json({ ok: false, error: 'Could not create the package.' }, { status: 500 });
    }

    await logActivity({
      user_id: guard!.user.id,
      user_email: guard!.user.email,
      action: 'umrah.package.create',
      entity: 'mgmt_packages',
      entity_id: data.id,
      detail: { name: d.name, price: d.price },
      branch: d.branch,
    });

    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    console.error('[admin/umrah/packages] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}

const patchSchema = packageSchema.partial().extend({
  id: z.string().uuid('A package id is required.'),
});

export async function PATCH(request: Request) {
  const { guard, res } = await guardOrFail();
  if (res) return res;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check the package details.' },
      { status: 400 },
    );
  }
  const { id, ...rest } = parsed.data;

  const update: Record<string, unknown> = {};
  for (const key of ['name', 'price', 'year', 'seats', 'branch', 'description', 'active'] as const) {
    if (rest[key] !== undefined) update[key] = rest[key] === undefined ? null : rest[key];
  }
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ ok: false, error: 'Nothing to update.' }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from('mgmt_packages')
      .update(update)
      .eq('id', id)
      .eq('type', 'umrah');

    if (error) {
      console.error('[admin/umrah/packages] update failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not update the package.' }, { status: 500 });
    }

    await logActivity({
      user_id: guard!.user.id,
      user_email: guard!.user.email,
      action: 'umrah.package.update',
      entity: 'mgmt_packages',
      entity_id: id,
      detail: update,
    });

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error('[admin/umrah/packages] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { guard, res } = await guardOrFail();
  if (res) return res;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ ok: false, error: 'A package id is required.' }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();

    // Refuse to delete a package that still has passengers assigned.
    const { count } = await supabase
      .from('umrah_passengers')
      .select('id', { count: 'exact', head: true })
      .eq('package_id', id);

    if ((count ?? 0) > 0) {
      return NextResponse.json(
        { ok: false, error: 'This package has passengers assigned. Reassign them before deleting.' },
        { status: 409 },
      );
    }

    const { error } = await supabase
      .from('mgmt_packages')
      .delete()
      .eq('id', id)
      .eq('type', 'umrah');

    if (error) {
      console.error('[admin/umrah/packages] delete failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not delete the package.' }, { status: 500 });
    }

    await logActivity({
      user_id: guard!.user.id,
      user_email: guard!.user.email,
      action: 'umrah.package.delete',
      entity: 'mgmt_packages',
      entity_id: id,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/umrah/packages] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}
