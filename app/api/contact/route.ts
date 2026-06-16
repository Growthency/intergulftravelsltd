import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(160),
  phone: z.string().trim().min(6, 'Please enter a valid phone number.').max(40),
  subject: z.string().trim().min(2, 'Please choose a subject.').max(160),
  message: z.string().trim().min(10, 'Please tell us a little more (min. 10 characters).').max(4000),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check your details and try again.' },
      { status: 400 },
    );
  }

  const { name, email, phone, subject, message } = parsed.data;

  // Persist to Supabase when configured. We never fail the request because of a
  // missing/placeholder backend — the enquiry is still acknowledged so the form
  // is fully usable during local design work.
  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from('contact_requests')
      .insert({ name, email, phone, subject, message, handled: false });

    if (error) {
      console.error('[contact] supabase insert failed:', error.message);
    }
  } catch (err) {
    console.error('[contact] unexpected error:', err);
  }

  return NextResponse.json({ ok: true });
}
