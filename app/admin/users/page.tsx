import { createClient, createAdminClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';
import { PageHeader } from '@/components/admin/ui';
import { StaffTable, type StaffRow } from '@/components/manage/StaffTable';
import { CreateStaff } from '@/components/manage/CreateStaff';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Staff & Roles' };

async function loadStaff(): Promise<StaffRow[]> {
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

async function resolveViewer(): Promise<{ isAdmin: boolean; userId: string | null }> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { isAdmin: false, userId: null };
    if (isAdminEmail(user.email)) return { isAdmin: true, userId: user.id };
    const { data } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
    return { isAdmin: data?.role === 'admin', userId: user.id };
  } catch {
    return { isAdmin: false, userId: null };
  }
}

export default async function StaffPage() {
  const [rows, viewer] = await Promise.all([loadStaff(), resolveViewer()]);
  const { isAdmin, userId } = viewer;

  return (
    <>
      <PageHeader
        title="Staff & Roles"
        description="Manage who can access the management console. Assign roles — operator, accountant, staff or administrator — and create new staff logins."
      />

      {isAdmin && (
        <div className="mb-6">
          <CreateStaff />
        </div>
      )}

      <StaffTable rows={rows} canEdit={isAdmin} currentUserId={userId} />
    </>
  );
}
