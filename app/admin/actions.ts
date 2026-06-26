'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/**
 * Sign the current admin out and return them to the /admin login.
 * Used by the AdminShell topbar sign-out control.
 */
export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/admin');
}
