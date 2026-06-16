import { createClient } from '@/lib/supabase/server';
import { SettingsForms } from '@/components/dashboard/SettingsForms';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let fullName = '';
  let phone = '';
  let avatarUrl: string | null = null;

  if (user) {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('full_name, phone, avatar_url')
        .eq('id', user.id)
        .maybeSingle();
      if (data) {
        fullName = data.full_name ?? '';
        phone = data.phone ?? '';
        avatarUrl = data.avatar_url ?? null;
      }
    } catch {
      // fall back to auth metadata below
    }

    if (!fullName) {
      fullName =
        (user.user_metadata?.full_name as string | undefined) ??
        (user.user_metadata?.name as string | undefined) ??
        '';
    }
    if (!avatarUrl) {
      avatarUrl = (user.user_metadata?.avatar_url as string | undefined) ?? null;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink">Account Settings</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Manage your personal details, profile photo and password.
        </p>
      </div>

      <SettingsForms
        email={user?.email ?? null}
        fullName={fullName}
        phone={phone}
        avatarUrl={avatarUrl}
      />
    </div>
  );
}
