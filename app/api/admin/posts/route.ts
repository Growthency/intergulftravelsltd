import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { requireAdmin } from '../_lib/guard';
import { postSchema, buildPostRow } from '../_lib/posts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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
      .insert({ ...row, created_at: new Date().toISOString() })
      .select('id, slug')
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { ok: false, error: 'A post with this slug already exists. Choose a different slug.' },
          { status: 409 },
        );
      }
      console.error('[admin/posts] insert failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not save the post.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data.id, slug: data.slug });
  } catch (err) {
    console.error('[admin/posts] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}
