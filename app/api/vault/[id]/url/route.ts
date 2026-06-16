import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VAULT_BUCKET = 'vault';
const SIGNED_URL_TTL = 60 * 5; // 5 minutes

/**
 * Mint a short-lived signed URL for one of the member's vault documents.
 * Used after a fresh client-side upload (and as a fallback) so we never expose
 * the private storage path or a long-lived link.
 */
export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ ok: false, error: 'Missing document id.' }, { status: 400 });
  }

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

    const { data: row, error } = await admin
      .from('vault_items')
      .select('id, user_id, file_url')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ ok: false, error: 'Could not load the document.' }, { status: 500 });
    }
    if (!row) {
      return NextResponse.json({ ok: false, error: 'Document not found.' }, { status: 404 });
    }
    if (row.user_id !== userId) {
      return NextResponse.json({ ok: false, error: 'You do not have access to this document.' }, { status: 403 });
    }

    const { data: signed, error: signError } = await admin.storage
      .from(VAULT_BUCKET)
      .createSignedUrl(row.file_url, SIGNED_URL_TTL);

    if (signError || !signed?.signedUrl) {
      return NextResponse.json({ ok: false, error: 'Could not generate a secure link.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, url: signed.signedUrl });
  } catch (err) {
    console.error('[vault/url] unexpected:', err);
    return NextResponse.json({ ok: false, error: 'Something went wrong.' }, { status: 500 });
  }
}
