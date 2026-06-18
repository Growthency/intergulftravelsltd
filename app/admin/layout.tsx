import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';
import { AdminShell } from '@/components/admin/AdminShell';
import { signOut } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: 'Admin',
    template: '%s · Admin · Inter Gulf Travels',
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not signed in → staff portal login.
  if (!user) redirect('/portal');

  // Resolve role: email allowlist OR profile role. Admins + accounting staff
  // (accountant / operator / staff) may use the management console; everyone
  // else goes to their own customer dashboard.
  let isAdmin = isAdminEmail(user.email);
  let role = 'user';
  let fullName: string | null = null;
  let avatarUrl: string | null = null;

  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, avatar_url, role')
      .eq('id', user.id)
      .maybeSingle();

    if (profile?.role) role = profile.role;
    if (role === 'admin') isAdmin = true;
    fullName = profile?.full_name ?? null;
    avatarUrl = profile?.avatar_url ?? null;
  } catch {
    // profiles unavailable — fall back to email allowlist result above
  }

  const STAFF = ['admin', 'accountant', 'operator', 'staff'];
  const isStaff = isAdmin || STAFF.includes(role);
  if (!isStaff) redirect('/dashboard');

  return (
    <AdminShell
      user={{ email: user.email ?? '', name: fullName, avatarUrl, role }}
      isAdmin={isAdmin}
      signOutAction={signOut}
    >
      {children}
    </AdminShell>
  );
}
