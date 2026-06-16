import { createAdminClient } from '@/lib/supabase/server';
import { PageHeader } from '@/components/admin/ui';
import { MediaLibrary, type MediaItem } from '@/components/admin/MediaLibrary';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Media Library' };

const BUCKET = 'media';
const FOLDERS = ['media', 'blog', 'gallery', 'settings'];

async function loadMedia(): Promise<MediaItem[]> {
  try {
    const supabase = createAdminClient();
    const items: MediaItem[] = [];

    // List each known upload folder and merge the results.
    const results = await Promise.all(
      FOLDERS.map((folder) =>
        supabase.storage.from(BUCKET).list(folder, {
          limit: 200,
          sortBy: { column: 'created_at', order: 'desc' },
        }),
      ),
    );

    results.forEach((res, idx) => {
      const folder = FOLDERS[idx];
      if (res.error || !res.data) return;
      res.data.forEach((file: any) => {
        if (!file.name || file.id === null) return; // skip nested folder placeholders
        const path = `${folder}/${file.name}`;
        const {
          data: { publicUrl },
        } = supabase.storage.from(BUCKET).getPublicUrl(path);
        items.push({
          name: path,
          url: publicUrl,
          size: file.metadata?.size ?? null,
          createdAt: file.created_at ?? null,
        });
      });
    });

    items.sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));
    return items;
  } catch (err) {
    console.error('[admin/media] load failed:', err);
    return [];
  }
}

export default async function MediaPage() {
  const items = await loadMedia();

  return (
    <>
      <PageHeader
        title="Media Library"
        description="Every uploaded asset, stored as optimized WebP in the public media bucket."
      />
      <MediaLibrary items={items} />
    </>
  );
}
