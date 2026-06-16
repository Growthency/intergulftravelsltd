import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { requireAdmin } from '../../_lib/guard';
import { postSchema, buildPostRow } from '../../_lib/posts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

  const parsed = postSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check the post details.' },
      { status: 400 },
    );
  }

  try {
    const supabase = createAdminClient();
    const row = buildPostRow(parsed.data);

    const { data, error } = await supabase
      .from('blog_posts')
      .update(row)
      .eq('id', params.id)
      .select('id, slug')
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { ok: false, error: 'A post with this slug already exists. Choose a different slug.' },
          { status: 409 },
        );
      }
      console.error('[admin/posts/:id] update failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not update the post.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data.id, slug: data.slug });
  } catch (err) {
    console.error('[admin/posts/:id] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const guard = await requireAdmin();
  if (!guard.ok) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: guard.status });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from('blog_posts').delete().eq('id', params.id);

    if (error) {
      console.error('[admin/posts/:id] delete failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not delete the post.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/posts/:id] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}
