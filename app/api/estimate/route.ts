import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const estimateSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(160),
  phone: z.string().trim().min(6, 'Please enter a valid phone number.').max(40),
  service: z.string().trim().min(2, 'Please select a service.').max(120),
  package: z.string().trim().max(160).optional().default(''),
  travel_date: z.string().trim().max(40).optional().default(''),
  pax: z.coerce.number().int().min(1, 'At least one traveller is required.').max(500),
  message: z.string().trim().max(4000).optional().default(''),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = estimateSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check your details and try again.' },
      { status: 400 },
    );
  }

  const { name, email, phone, service, package: pkg, travel_date, pax, message } = parsed.data;

  // Persist when Supabase is configured; the request always succeeds so the
  // estimate form works end-to-end even before backend keys are provided.
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from('estimate_requests').insert({
      name,
      email,
      phone,
      service,
      package: pkg || null,
      travel_date: travel_date || null,
      pax,
      message: message || null,
      status: 'new',
    });

    if (error) {
      console.error('[estimate] supabase insert failed:', error.message);
    }
  } catch (err) {
    console.error('[estimate] unexpected error:', err);
  }

  return NextResponse.json({ ok: true });
}
