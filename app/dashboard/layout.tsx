import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import type { DashboardProfile, DashboardUser } from '@/components/dashboard/nav';

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch the profile — gracefully degrade to a minimal record if the row
  // doesn't exist yet or Supabase is unreachable.
  let profile: DashboardProfile | null = null;
  try {
    const { data } = await supabase
      .from('profiles')
      .select('id, email, full_name, phone, avatar_url, role, created_at')
      .eq('id', user.id)
      .maybeSingle();
    if (data) profile = data as DashboardProfile;
  } catch {
    profile = null;
  }

  if (!profile) {
    profile = {
      id: user.id,
      email: user.email ?? null,
      full_name:
        (user.user_metadata?.full_name as string | undefined) ??
        (user.user_metadata?.name as string | undefined) ??
        null,
      phone: (user.user_metadata?.phone as string | undefined) ?? null,
      avatar_url: (user.user_metadata?.avatar_url as string | undefined) ?? null,
      role: null,
      created_at: user.created_at ?? null,
    };
  }

  const isAdmin = profile.role === 'admin' || isAdminEmail(user.email);

  const safeUser: DashboardUser = {
    id: user.id,
    email: user.email ?? null,
    createdAt: user.created_at ?? null,
  };

  return (
    <DashboardShell user={safeUser} profile={profile} isAdmin={isAdmin}>
      {children}
    </DashboardShell>
  );
}
