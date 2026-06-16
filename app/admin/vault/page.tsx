import {
  ShieldCheck,
  FileText,
  Download,
  User as UserIcon,
  FolderLock,
} from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { PageHeader, Panel, Badge, EmptyState } from '@/components/admin/ui';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Document Vault' };

type VaultItem = {
  id: string;
  user_id: string | null;
  title: string;
  doc_type: string | null;
  file_url: string | null;
  file_type: string | null;
  notes: string | null;
  created_at: string;
};

type Owner = { email: string; name: string | null };

async function loadVault() {
  let items: VaultItem[] = [];
  const owners = new Map<string, Owner>();

  try {
    const supabase = createAdminClient();

    const { data: vaultRows, error } = await supabase
      .from('vault_items')
      .select('id, user_id, title, doc_type, file_url, file_type, notes, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[admin/vault] load failed:', error.message);
    } else {
      items = (vaultRows ?? []) as VaultItem[];
    }

    const userIds = Array.from(new Set(items.map((i) => i.user_id).filter(Boolean))) as string[];
    if (userIds.length) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .in('id', userIds);
      (profiles ?? []).forEach((p: any) => {
        owners.set(p.id, { email: p.email ?? 'Unknown user', name: p.full_name ?? null });
      });
    }
  } catch (err) {
    console.error('[admin/vault] unexpected error:', err);
  }

  // Group documents by owner for a tidy, per-user listing.
  const groups = new Map<string, { owner: Owner; items: VaultItem[] }>();
  items.forEach((item) => {
    const key = item.user_id ?? 'unassigned';
    const owner =
      (item.user_id && owners.get(item.user_id)) || { email: 'Unassigned', name: null };
    if (!groups.has(key)) groups.set(key, { owner, items: [] });
    groups.get(key)!.items.push(item);
  });

  return { total: items.length, groups: Array.from(groups.values()) };
}

export default async function VaultPage() {
  const { total, groups } = await loadVault();

  return (
    <>
      <PageHeader
        title="Document Vault"
        description="A read-only view of documents pilgrims have stored in their personal vault, grouped by owner."
      />

      {total === 0 ? (
        <EmptyState
          icon={<FolderLock className="h-6 w-6" />}
          title="No documents in the vault"
          description="Documents that users upload to their personal vault — passports, visas, vaccination records — will be listed here for reference."
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-ink-muted">
            <ShieldCheck className="h-4 w-4 text-brand-600" />
            <span>
              {total} document{total === 1 ? '' : 's'} across {groups.length} user
              {groups.length === 1 ? '' : 's'}
            </span>
          </div>

          {groups.map((group) => (
            <Panel key={group.owner.email}>
              <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-600">
                  <UserIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">
                    {group.owner.name || group.owner.email}
                  </p>
                  {group.owner.name && (
                    <p className="truncate text-xs text-ink-muted">{group.owner.email}</p>
                  )}
                </div>
                <Badge tone="gray" className="ml-auto">
                  {group.items.length} doc{group.items.length === 1 ? '' : 's'}
                </Badge>
              </div>

              <ul className="divide-y divide-border">
                {group.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3 px-5 py-3.5"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted text-ink-muted">
                        <FileText className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink">{item.title}</p>
                        <p className="truncate text-xs text-ink-muted">
                          {item.doc_type || 'Document'}
                          {item.notes ? ` · ${item.notes}` : ''} ·{' '}
                          {formatDate(item.created_at, { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {item.file_type && <Badge tone="emerald">{item.file_type}</Badge>}
                      {item.file_url && (
                        <a
                          href={item.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-ink-muted transition hover:border-brand-600/40 hover:text-brand-700"
                        >
                          <Download className="h-3.5 w-3.5" /> Open
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      )}
    </>
  );
}
