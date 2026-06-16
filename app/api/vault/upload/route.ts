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

const VAULT_BUCKET = 'vault';

const DOC_TYPES = [
  'Passport',
  'Visa',
  'Air Ticket',
  'Vaccine Certificate',
  'Hotel Voucher',
  'Other',
] as const;

// Non-image document types we accept as-is (stored unconverted).
const ACCEPTED_DOC_TYPES = [
  'application/pdf',
];

const ALL_ACCEPTED = [...ACCEPTED_UPLOAD_TYPES, ...ACCEPTED_DOC_TYPES];

function safeSlug(value: string, fallback: string) {
  const slug = value
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/(^-|-$)/g, '');
  return slug || fallback;
}

function extensionFor(type: string, name: string) {
  if (type === 'application/pdf') return 'pdf';
  const fromName = name.match(/\.([a-z0-9]+)$/i)?.[1];
  return (fromName || 'bin').toLowerCase();
}

export async function POST(request: Request) {
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

  // ---- Parse form ---------------------------------------------------------
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid upload.' }, { status: 400 });
  }

  const file = form.get('file');
  const title = String(form.get('title') ?? '').trim();
  const docType = String(form.get('doc_type') ?? '').trim();
  const notes = String(form.get('notes') ?? '').trim();

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ ok: false, error: 'Please choose a file to upload.' }, { status: 400 });
  }
  if (!title || title.length < 2) {
    return NextResponse.json({ ok: false, error: 'Please give this document a title.' }, { status: 400 });
  }
  if (title.length > 160) {
    return NextResponse.json({ ok: false, error: 'Title is too long.' }, { status: 400 });
  }
  if (!(DOC_TYPES as readonly string[]).includes(docType)) {
    return NextResponse.json({ ok: false, error: 'Please select a valid document type.' }, { status: 400 });
  }
  if (notes.length > 1000) {
    return NextResponse.json({ ok: false, error: 'Notes are too long.' }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { ok: false, error: `File is too large. Maximum size is ${Math.round(MAX_UPLOAD_BYTES / (1024 * 1024))}MB.` },
      { status: 413 },
    );
  }
  if (!ALL_ACCEPTED.includes(file.type)) {
    return NextResponse.json(
      { ok: false, error: 'Unsupported file type. Upload a PDF or an image (JPG, PNG, WebP).' },
      { status: 415 },
    );
  }

  // ---- Prepare bytes (convert images to WebP, keep PDFs as-is) -------------
  let uploadBuffer: Buffer;
  let storedType: string;
  let storedExt: string;

  try {
    const inputBuffer = Buffer.from(await file.arrayBuffer());

    if (ACCEPTED_UPLOAD_TYPES.includes(file.type)) {
      const webp = await toOptimizedWebp(inputBuffer, { maxWidth: 2400, quality: 82 });
      uploadBuffer = webp.buffer;
      storedType = 'image/webp';
      storedExt = 'webp';
    } else {
      uploadBuffer = inputBuffer;
      storedType = file.type;
      storedExt = extensionFor(file.type, file.name);
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: 'We could not process that file. Please try a different file.' },
      { status: 422 },
    );
  }

  // ---- Upload + persist (service role; storage is RLS-private) ------------
  try {
    const admin = createAdminClient();

    const baseName =
      storedExt === 'webp'
        ? toWebpFilename(title || file.name).replace(/\.webp$/, '')
        : safeSlug(title || file.name, 'document');
    const objectPath = `${userId}/${Date.now()}-${baseName}.${storedExt}`;

    const { error: uploadError } = await admin.storage
      .from(VAULT_BUCKET)
      .upload(objectPath, uploadBuffer, {
        contentType: storedType,
        upsert: false,
        cacheControl: '3600',
      });

    if (uploadError) {
      console.error('[vault/upload] storage error:', uploadError.message);
      return NextResponse.json(
        { ok: false, error: 'Upload failed. Please try again in a moment.' },
        { status: 502 },
      );
    }

    const { data: inserted, error: insertError } = await admin
      .from('vault_items')
      .insert({
        user_id: userId,
        title,
        doc_type: docType,
        file_url: objectPath, // store the storage path; signed URLs are minted on read
        file_type: storedType,
        notes: notes || null,
      })
      .select('id, title, doc_type, file_url, file_type, notes, created_at')
      .single();

    if (insertError) {
      // Roll back the orphaned storage object so we don't leak files.
      await admin.storage.from(VAULT_BUCKET).remove([objectPath]).catch(() => {});
      console.error('[vault/upload] insert error:', insertError.message);
      return NextResponse.json(
        { ok: false, error: 'Could not save the document record. Please try again.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, item: inserted });
  } catch (err) {
    console.error('[vault/upload] unexpected:', err);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
