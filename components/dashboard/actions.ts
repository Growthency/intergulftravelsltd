'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/**
 * Sign the current user out and send them back to the marketing site.
 * Defined locally for the dashboard so we don't depend on a shared auth
 * actions module that may not exist yet.
 */
export async function signOut() {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch {
    // Even if Supabase is unreachable we still bounce the user out of the
    // protected area — the session cookie is cleared on the next guard check.
  }
  redirect('/login');
}

export type ProfileActionState = {
  ok: boolean;
  message: string;
};

/**
 * Update the signed-in member's name & phone. Upserts the profile row so it
 * works even before the row has been created by a DB trigger.
 */
export async function updateProfile(
  _prev: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const fullName = String(formData.get('full_name') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();

  if (fullName.length < 2) {
    return { ok: false, message: 'Please enter your full name.' };
  }
  if (fullName.length > 120) {
    return { ok: false, message: 'That name is too long.' };
  }
  if (phone && phone.length > 40) {
    return { ok: false, message: 'That phone number is too long.' };
  }

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { ok: false, message: 'Your session has expired. Please sign in again.' };
    }

    const { error } = await supabase
      .from('profiles')
      .upsert(
        {
          id: user.id,
          email: user.email ?? null,
          full_name: fullName,
          phone: phone || null,
        },
        { onConflict: 'id' },
      );

    if (error) {
      console.error('[settings] profile update failed:', error.message);
      return { ok: false, message: 'We could not save your changes. Please try again.' };
    }

    revalidatePath('/dashboard', 'layout');
    return { ok: true, message: 'Your profile has been updated.' };
  } catch (err) {
    console.error('[settings] profile update error:', err);
    return { ok: false, message: 'Something went wrong. Please try again.' };
  }
}
