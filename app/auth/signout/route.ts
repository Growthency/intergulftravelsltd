import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

/**
 * Form-based sign-out. A plain <form method="post" action="/auth/signout">
 * button anywhere in the app posts here; we clear the Supabase session and
 * send the visitor home. (The `signOut()` server action does the same for
 * action-based callers.)
 */
export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key) {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.error('[auth/signout] failed:', err);
    }
  }

  return NextResponse.redirect(new URL('/', request.url), { status: 303 });
}
