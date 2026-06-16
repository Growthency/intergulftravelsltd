import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { requireAdmin } from '../_lib/guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  key: z.string().trim().min(1).max(60),
  value: z.unknown(),
});

const ALLOWED_KEYS = ['contact', 'social', 'theme'];

export async function PATCH(request: Request) {
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
    return NextResponse.json({ ok: false, error: 'Invalid settings payload.' }, { status: 400 });
  }

  if (!ALLOWED_KEYS.includes(parsed.data.key)) {
    return NextResponse.json({ ok: false, error: 'Unknown settings key.' }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from('site_settings')
      .upsert(
        { key: parsed.data.key, value: parsed.data.value as any },
        { onConflict: 'key' },
      );

    if (error) {
      console.error('[admin/settings] upsert failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not save settings.' }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/settings] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}
