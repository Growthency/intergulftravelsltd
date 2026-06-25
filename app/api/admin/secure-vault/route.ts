import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { requireStaff } from '@/lib/management/guard';
import { logActivity } from '@/lib/management/server';
import { encryptSecret, decryptSecret } from '@/lib/vault-crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function requireAdmin() {
  const guard = await requireStaff();
  if (!guard.ok) {
    return { guard, res: NextResponse.json({ ok: false, error: 'Not signed in.' }, { status: guard.status }) };
  }
  if (!guard.isAdmin) {
    return {
      guard,
      res: NextResponse.json({ ok: false, error: 'Only an administrator can open the Secure Vault.' }, { status: 403 }),
    };
  }
  return { guard, res: null as null };
}

const emptyToNull = (v: unknown) => (typeof v === 'string' && v.trim() === '' ? null : v);

const createSchema = z.object({
  name: z.string().trim().min(1, 'A name is required.').max(160),
  url: z.preprocess(emptyToNull, z.string().trim().max(400).nullable().optional()),
  username: z.preprocess(emptyToNull, z.string().trim().max(200).nullable().optional()),
  password: z.string().max(2000).optional().default(''),
  icon_url: z.preprocess(emptyToNull, z.string().trim().url().max(600).nullable().optional()),
  notes: z.preprocess(emptyToNull, z.string().trim().max(2000).nullable().optional()),
});

export async function GET() {
  const { res } = await requireAdmin();
  if (res) return res;

  try {
    const db = createAdminClient();
    const { data, error } = await db
      .from('vault_credentials')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('[secure-vault] list failed:', error.message);
      return NextResponse.json({ ok: true, items: [] });
    }
    const items = (data ?? []).map((r: Record<string, unknown>) => ({
      id: r.id,
      name: r.name,
      url: r.url,
      username: r.username,
      password: decryptSecret(r.password_enc as string),
      icon_url: r.icon_url,
      notes: r.notes,
      created_at: r.created_at,
    }));
    return NextResponse.json({ ok: true, items });
  } catch (err) {
    console.error('[secure-vault] unexpected error:', err);
    return NextResponse.json({ ok: true, items: [] });
  }
}

export async function POST(request: Request) {
  const { guard, res } = await requireAdmin();
  if (res) return res;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }
  const parsed = createSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? 'Check the form.' }, { status: 400 });
  }
  const d = parsed.data;

  try {
    const db = createAdminClient();
    const { data, error } = await db
      .from('vault_credentials')
      .insert({
        name: d.name,
        url: d.url ?? null,
        username: d.username ?? null,
        password_enc: encryptSecret(d.password ?? ''),
        icon_url: d.icon_url ?? null,
        notes: d.notes ?? null,
        created_by: guard.ok ? guard.user.id : null,
      })
      .select('id')
      .single();
    if (error) {
      console.error('[secure-vault] insert failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not save the credential.' }, { status: 500 });
    }
    await logActivity({
      user_id: guard.ok ? guard.user.id : null,
      user_email: guard.ok ? guard.user.email : null,
      action: 'create',
      entity: 'vault_credential',
      entity_id: data.id,
      detail: { name: d.name },
    });
    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    console.error('[secure-vault] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}

const updateSchema = createSchema.partial().extend({ id: z.string().uuid() });

export async function PATCH(request: Request) {
  const { guard, res } = await requireAdmin();
  if (res) return res;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }
  const parsed = updateSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? 'Check the form.' }, { status: 400 });
  }
  const { id, password, ...rest } = parsed.data;

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (rest.name !== undefined) patch.name = rest.name;
  if (rest.url !== undefined) patch.url = rest.url ?? null;
  if (rest.username !== undefined) patch.username = rest.username ?? null;
  if (rest.icon_url !== undefined) patch.icon_url = rest.icon_url ?? null;
  if (rest.notes !== undefined) patch.notes = rest.notes ?? null;
  // Only re-encrypt when a non-empty password was supplied.
  if (typeof password === 'string' && password.length > 0) patch.password_enc = encryptSecret(password);

  try {
    const db = createAdminClient();
    const { error } = await db.from('vault_credentials').update(patch).eq('id', id);
    if (error) {
      console.error('[secure-vault] update failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not update the credential.' }, { status: 500 });
    }
    await logActivity({
      user_id: guard.ok ? guard.user.id : null,
      user_email: guard.ok ? guard.user.email : null,
      action: 'update',
      entity: 'vault_credential',
      entity_id: id,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[secure-vault] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { guard, res } = await requireAdmin();
  if (res) return res;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ ok: false, error: 'Missing credential id.' }, { status: 400 });

  try {
    const db = createAdminClient();
    const { error } = await db.from('vault_credentials').delete().eq('id', id);
    if (error) {
      console.error('[secure-vault] delete failed:', error.message);
      return NextResponse.json({ ok: false, error: 'Could not delete the credential.' }, { status: 500 });
    }
    await logActivity({
      user_id: guard.ok ? guard.user.id : null,
      user_email: guard.ok ? guard.user.email : null,
      action: 'delete',
      entity: 'vault_credential',
      entity_id: id,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[secure-vault] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}
