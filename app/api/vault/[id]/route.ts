import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VAULT_BUCKET = 'vault';

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ ok: false, error: 'Missing document id.' }, { status: 400 });
  }

  // ---- Authenticate -------------------------------------------------------
  let userId: string;
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ ok: false, error: 'You must be signed in.' }, { status: 401 });
    }
    userId = user.id;
  } catch {
    return NextResponse.json({ ok: false, error: 'Authentication failed.' }, { status: 401 });
  }

  try {
    const admin = createAdminClient();

    // Verify the row exists AND belongs to the signed-in user.
    const { data: row, error: fetchError } = await admin
      .from('vault_items')
      .select('id, user_id, file_url')
      .eq('id', id)
      .maybeSingle();

    if (fetchError) {
      console.error('[vault/delete] fetch error:', fetchError.message);
      return NextResponse.json({ ok: false, error: 'Could not load the document.' }, { status: 500 });
    }
    if (!row) {
      return NextResponse.json({ ok: false, error: 'Document not found.' }, { status: 404 });
    }
    if (row.user_id !== userId) {
      return NextResponse.json({ ok: false, error: 'You do not have access to this document.' }, { status: 403 });
    }

    // Remove the storage object first (the path is stored in file_url). Tolerate
    // a missing object so a partial state can still be cleaned up.
    if (row.file_url) {
      const { error: removeError } = await admin.storage.from(VAULT_BUCKET).remove([row.file_url]);
      if (removeError) {
        console.error('[vault/delete] storage remove error:', removeError.message);
      }
    }

    const { error: deleteError } = await admin
      .from('vault_items')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (deleteError) {
      console.error('[vault/delete] delete error:', deleteError.message);
      return NextResponse.json({ ok: false, error: 'Could not delete the document.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[vault/delete] unexpected:', err);
    return NextResponse.json({ ok: false, error: 'Something went wrong.' }, { status: 500 });
  }
}
