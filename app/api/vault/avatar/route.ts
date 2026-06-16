import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import {
  toOptimizedWebp,
  toWebpFilename,
  ACCEPTED_UPLOAD_TYPES,
  MAX_UPLOAD_BYTES,
} from '@/lib/image';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MEDIA_BUCKET = 'media';

/**
 * Upload a member avatar. The image is always converted to an optimised WebP
 * (square, capped) and stored in the public `media` bucket under
 * `avatars/<user-id>/…`; the public URL is written to `profiles.avatar_url`.
 *
 * Lives under /api/vault/* because that is this feature's API namespace.
 */
export async function POST(request: Request) {
  let userId: string;
  let email: string | null;
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ ok: false, error: 'You must be signed in.' }, { status: 401 });
    }
    userId = user.id;
    email = user.email ?? null;
  } catch {
    return NextResponse.json({ ok: false, error: 'Authentication failed.' }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid upload.' }, { status: 400 });
  }

  const file = form.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ ok: false, error: 'Please choose an image.' }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { ok: false, error: `Image is too large. Maximum size is ${Math.round(MAX_UPLOAD_BYTES / (1024 * 1024))}MB.` },
      { status: 413 },
    );
  }
  if (!ACCEPTED_UPLOAD_TYPES.includes(file.type)) {
    return NextResponse.json(
      { ok: false, error: 'Unsupported image type. Use JPG, PNG or WebP.' },
      { status: 415 },
    );
  }

  let webpBuffer: Buffer;
  try {
    const input = Buffer.from(await file.arrayBuffer());
    const result = await toOptimizedWebp(input, { maxWidth: 512, quality: 86 });
    webpBuffer = result.buffer;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'We could not process that image. Please try another.' },
      { status: 422 },
    );
  }

  try {
    const admin = createAdminClient();

    const filename = toWebpFilename(file.name || 'avatar');
    const objectPath = `avatars/${userId}/${Date.now()}-${filename}`;

    const { error: uploadError } = await admin.storage
      .from(MEDIA_BUCKET)
      .upload(objectPath, webpBuffer, {
        contentType: 'image/webp',
        upsert: true,
        cacheControl: '3600',
      });

    if (uploadError) {
      console.error('[avatar] storage error:', uploadError.message);
      return NextResponse.json(
        { ok: false, error: 'Upload failed. Please try again.' },
        { status: 502 },
      );
    }

    const { data: pub } = admin.storage.from(MEDIA_BUCKET).getPublicUrl(objectPath);
    const avatarUrl = pub.publicUrl;

    const { error: updateError } = await admin
      .from('profiles')
      .upsert(
        { id: userId, email, avatar_url: avatarUrl },
        { onConflict: 'id' },
      );

    if (updateError) {
      console.error('[avatar] profile update error:', updateError.message);
      return NextResponse.json(
        { ok: false, error: 'Could not save your new photo. Please try again.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, avatar_url: avatarUrl });
  } catch (err) {
    console.error('[avatar] unexpected:', err);
    return NextResponse.json({ ok: false, error: 'Something went wrong.' }, { status: 500 });
  }
}
