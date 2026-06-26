'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';

/* ------------------------------------------------------------------ *
 *  Auth server actions — email + password only.
 *  Every action returns a plain, serializable shape on failure so the
 *  client form can render an inline error. Success paths redirect.
 * ------------------------------------------------------------------ */

export type AuthState = {
  ok: boolean;
  error?: string;
  /** Echoed back so the form can keep the field populated after an error. */
  email?: string;
};

const GENERIC_ERROR = 'Something went wrong. Please try again in a moment.';
const NOT_CONFIGURED =
  'Sign-in is not available yet. The authentication service has not been configured — please contact us directly.';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

function str(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Decide where a freshly authenticated user should land. Staff (admin allowlist
 * email or any management role) go to the admin console; anyone else goes to the
 * public site. The profile lookup fails gracefully if the table is absent.
 */
async function resolveLandingPath(
  supabase: ReturnType<typeof createClient>,
  email: string | null | undefined,
  userId: string | undefined,
): Promise<string> {
  if (isAdminEmail(email)) return '/admin';

  if (userId) {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .maybeSingle();
      const role = data?.role ?? '';
      if (['admin', 'accountant', 'operator', 'staff'].includes(role)) return '/admin';
    } catch {
      // table missing / not yet provisioned
    }
  }

  return '/';
}

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = str(formData, 'email').toLowerCase();
  const password = String(formData.get('password') ?? '');

  if (!emailPattern.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.', email };
  }
  if (!password) {
    return { ok: false, error: 'Please enter your password.', email };
  }
  if (!isConfigured()) {
    return { ok: false, error: NOT_CONFIGURED, email };
  }

  const supabase = createClient();

  let destination: string;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const message = /invalid login credentials/i.test(error.message)
        ? 'Incorrect email or password. Please try again.'
        : error.message || GENERIC_ERROR;
      return { ok: false, error: message, email };
    }

    destination = await resolveLandingPath(supabase, data.user?.email, data.user?.id);
  } catch (err) {
    console.error('[auth] signIn failed:', err);
    return { ok: false, error: GENERIC_ERROR, email };
  }

  // redirect() throws a control-flow signal — keep it outside the try/catch.
  redirect(destination);
}

export async function signOut() {
  if (isConfigured()) {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.error('[auth] signOut failed:', err);
    }
  }
  redirect('/');
}
