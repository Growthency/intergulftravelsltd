import { createClient, createAdminClient } from '@/lib/supabase/server';
import { VaultManager, type VaultItem } from '@/components/dashboard/VaultManager';

export const dynamic = 'force-dynamic';

const VAULT_BUCKET = 'vault';
const SIGNED_URL_TTL = 60 * 5; // 5 minutes

type VaultRow = {
  id: string;
  title: string;
  doc_type: string;
  file_url: string;
  file_type: string | null;
  notes: string | null;
  created_at: string | null;
};

type SignedUrlResult = { path: string | null; signedUrl: string | null; error: string | null };

export default async function VaultPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let items: VaultItem[] = [];

  if (user) {
    try {
      const admin = createAdminClient();

      const { data } = await admin
        .from('vault_items')
        .select('id, title, doc_type, file_url, file_type, notes, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      const rows = (data as VaultRow[]) ?? [];

      // Batch-mint short-lived signed URLs so the list is viewable immediately
      // without leaking the private storage paths.
      let signedMap = new Map<string, string>();
      if (rows.length) {
        const paths = rows.map((r) => r.file_url).filter(Boolean);
        try {
          const { data: signed } = await admin.storage
            .from(VAULT_BUCKET)
            .createSignedUrls(paths, SIGNED_URL_TTL);
          if (signed) {
            const entries = (signed as SignedUrlResult[])
              .filter((s) => Boolean(s.signedUrl) && Boolean(s.path))
              .map((s) => [s.path as string, s.signedUrl as string] as const);
            signedMap = new Map(entries);
          }
        } catch {
          signedMap = new Map();
        }
      }

      items = rows.map((r) => ({
        id: r.id,
        title: r.title,
        doc_type: r.doc_type,
        file_url: r.file_url,
        file_type: r.file_type,
        notes: r.notes,
        created_at: r.created_at,
        signedUrl: signedMap.get(r.file_url) ?? null,
      }));
    } catch {
      items = [];
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink">Document Vault</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Keep your passport, visa, air ticket and other travel documents in one secure place, ready
          for every step of your journey.
        </p>
      </div>

      <VaultManager initialItems={items} />
    </div>
  );
}
