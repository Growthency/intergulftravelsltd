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
  /** Set by signUp when email confirmation is required (no active session yet). */
  checkEmail?: boolean;
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
 * Decide where a freshly authenticated user should land. Admins (by allowlist
 * email or by a `profiles.role === 'admin'` row) go to the admin area; everyone
 * else to their dashboard. The profile lookup fails gracefully if the table is
 * absent or RLS blocks it — the email allowlist still governs access.
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
      if (data?.role === 'admin') return '/admin';
    } catch {
      // table missing / not yet provisioned — fall through to the dashboard
    }
  }

  return '/dashboard';
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

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const fullName = str(formData, 'full_name');
  const email = str(formData, 'email').toLowerCase();
  const phone = str(formData, 'phone');
  const password = String(formData.get('password') ?? '');

  if (fullName.length < 2) {
    return { ok: false, error: 'Please enter your full name.', email };
  }
  if (!emailPattern.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.', email };
  }
  if (phone.length < 6) {
    return { ok: false, error: 'Please enter a valid phone number.', email };
  }
  if (password.length < 8) {
    return { ok: false, error: 'Your password must be at least 8 characters.', email };
  }
  if (!isConfigured()) {
    return { ok: false, error: NOT_CONFIGURED, email };
  }

  const supabase = createClient();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://intergulftravelsltd.com';

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone },
        emailRedirectTo: `${origin.replace(/\/$/, '')}/auth/callback`,
      },
    });

    if (error) {
      const message = /already registered|already exists/i.test(error.message)
        ? 'An account with this email already exists. Please sign in instead.'
        : error.message || GENERIC_ERROR;
      return { ok: false, error: message, email };
    }

    // When email confirmation is enabled, Supabase returns a user but no active
    // session — ask the pilgrim to confirm their address before continuing.
    if (!data.session) {
      return { ok: true, checkEmail: true, email };
    }
  } catch (err) {
    console.error('[auth] signUp failed:', err);
    return { ok: false, error: GENERIC_ERROR, email };
  }

  redirect('/dashboard');
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
