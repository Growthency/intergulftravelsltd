import { createAdminClient } from '@/lib/supabase/server';
import { PageHeader } from '@/components/admin/ui';
import { VideosManager, type AdminVideo } from '@/components/admin/VideosManager';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Videos' };

async function loadVideos(): Promise<AdminVideo[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('videos')
      .select('id, title, youtube_url, youtube_id, description, sort_order, active')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[admin/videos] load failed:', error.message);
      return [];
    }
    return (data ?? []) as AdminVideo[];
  } catch (err) {
    console.error('[admin/videos] unexpected error:', err);
    return [];
  }
}

export default async function VideosPage() {
  const videos = await loadVideos();

  return (
    <>
      <PageHeader
        title="Videos"
        description="Manage the YouTube videos shown on the public Videos page. Paste any YouTube link — the thumbnail is detected automatically."
      />
      <VideosManager initial={videos} />
    </>
  );
}
