import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { requireAdmin } from '../_lib/guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const baseSchema = z.object({
  label: z.string().trim().min(1, 'A label is required.').max(120),
  href: z.string().trim().min(1, 'A link is required.').max(300),
  column_key: z.string().trim().min(1, 'A column is required.').max(60),
  sort_order: z.coerce.number().int().min(0).max(9999).optional().default(0),
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
      .from('footer_links')
      .insert({
        label: parsed.data.label,
        href: parsed.data.href,
        column_key: parsed.data.column_key,
        sort_order: parsed.data.sort_order ?? 0,
      })
      .select('id')
      .single();

    if (error) {
      console.error('[admin/footer] insert failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not add the link.' }, { status: 500 });
    }
    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    console.error('[admin/footer] unexpected error:', err);
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
    return NextResponse.json({ ok: false, error: 'Missing link id.' }, { status: 400 });
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
      .from('footer_links')
      .update({
        label: parsed.data.label,
        href: parsed.data.href,
        column_key: parsed.data.column_key,
        sort_order: parsed.data.sort_order ?? 0,
      })
      .eq('id', id);

    if (error) {
      console.error('[admin/footer] update failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not update the link.' }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/footer] unexpected error:', err);
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
    return NextResponse.json({ ok: false, error: 'Missing link id.' }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from('footer_links').delete().eq('id', id);
    if (error) {
      console.error('[admin/footer] delete failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not delete the link.' }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/footer] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}
