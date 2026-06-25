import { createClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';
import { PageHeader } from '@/components/manage/ui';
import { AccountSettings } from '@/components/admin/AccountSettings';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'My Account' };

export default async function AccountPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let fullName = '';
  let avatarUrl: string | null = null;
  let isAdmin = isAdminEmail(user?.email);
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, avatar_url, role')
      .eq('id', user.id)
      .maybeSingle();
    fullName = data?.full_name ?? '';
    avatarUrl = data?.avatar_url ?? null;
    if (data?.role === 'admin') isAdmin = true;
  }

  return (
    <>
      <PageHeader title="My Account" subtitle="Update your name, photo, sign-in email and password." />
      <AccountSettings
        initial={{ email: user?.email ?? '', full_name: fullName, avatar_url: avatarUrl }}
        canEditEmail={isAdmin}
      />
    </>
  );
}
