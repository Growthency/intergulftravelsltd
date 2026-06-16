import { createAdminClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';
import { PageHeader } from '@/components/admin/ui';
import { UsersTable, type ProfileRow } from '@/components/admin/UsersTable';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Users' };

async function loadUsers(): Promise<ProfileRow[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, full_name, phone, role, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[admin/users] load failed:', error.message);
      return [];
    }
    return (data ?? []).map((p: any) => ({
      id: p.id,
      email: p.email ?? '',
      full_name: p.full_name ?? null,
      phone: p.phone ?? null,
      role: p.role ?? 'user',
      created_at: p.created_at ?? null,
      locked: isAdminEmail(p.email),
    }));
  } catch (err) {
    console.error('[admin/users] unexpected error:', err);
    return [];
  }
}

export default async function UsersPage() {
  const rows = await loadUsers();

  return (
    <>
      <PageHeader
        title="Users"
        description="Everyone registered with Inter Gulf Travels. Grant or revoke administrator access here."
      />
      <UsersTable rows={rows} />
    </>
  );
}
