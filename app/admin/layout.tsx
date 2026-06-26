import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';
import { AdminShell } from '@/components/admin/AdminShell';
import { AuthShell } from '@/components/auth/AuthShell';
import { AuthForm } from '@/components/auth/AuthForm';
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

  // Not signed in → show the staff login right here at /admin (no separate URL).
  if (!user) {
    return (
      <AuthShell
        eyebrow="Admin Panel"
        title="Inter Gulf Travels — Admin"
        subtitle="Sign in with your authorised staff credentials to continue."
        variant="staff"
      >
        <AuthForm portal />
      </AuthShell>
    );
  }

  // Resolve role: email allowlist OR profile role. Admins + accounting staff
  // (accountant / operator / staff) may use the management console.
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
  // Signed in but without staff access → they have nowhere in the console; send
  // them to the public site.
  if (!isStaff) redirect('/');

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
