import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { requireAdmin } from '../_lib/guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const baseSchema = z.object({
  label: z.string().trim().min(1, 'A label is required.').max(120),
  href: z.string().trim().min(1, 'A link is required.').max(300),
  parent_id: z.string().uuid().nullable().optional(),
  sort_order: z.coerce.number().int().min(0).max(9999).optional().default(0),
  location: z.string().trim().max(40).optional().default('header'),
});

export async function POST(request: Request) {
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

  const parsed = baseSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check the details.' },
      { status: 400 },
    );
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('menu_items')
      .insert({
        label: parsed.data.label,
        href: parsed.data.href,
        parent_id: parsed.data.parent_id ?? null,
        sort_order: parsed.data.sort_order ?? 0,
        location: parsed.data.location || 'header',
      })
      .select('id')
      .single();

    if (error) {
      console.error('[admin/menus] insert failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not add the menu item.' }, { status: 500 });
    }
    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    console.error('[admin/menus] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: guard.status });
  }

  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const id = typeof payload?.id === 'string' ? payload.id : '';
  if (!id) {
    return NextResponse.json({ ok: false, error: 'Missing menu item id.' }, { status: 400 });
  }

  const parsed = baseSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check the details.' },
      { status: 400 },
    );
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from('menu_items')
      .update({
        label: parsed.data.label,
        href: parsed.data.href,
        parent_id: parsed.data.parent_id ?? null,
        sort_order: parsed.data.sort_order ?? 0,
        location: parsed.data.location || 'header',
      })
      .eq('id', id);

    if (error) {
      console.error('[admin/menus] update failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not update the menu item.' }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/menus] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: guard.status });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ ok: false, error: 'Missing menu item id.' }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    // Detach any children so they are not orphaned by a missing parent.
    await supabase.from('menu_items').update({ parent_id: null }).eq('parent_id', id);
    const { error } = await supabase.from('menu_items').delete().eq('id', id);

    if (error) {
      console.error('[admin/menus] delete failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not delete the menu item.' }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/menus] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}
