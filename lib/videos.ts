import { youtubeId, type Video } from '@/lib/youtube';

export type { Video } from '@/lib/youtube';
export { youtubeId, youtubeEmbed, youtubeThumb } from '@/lib/youtube';

/** Published videos (Supabase if configured, else empty). Server-only. */
export async function getVideos(): Promise<Video[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return [];
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = createClient();
    const { data } = await supabase
      .from('videos')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    return (data ?? []).map((v) => ({
      ...v,
      youtube_id: v.youtube_id || youtubeId(v.youtube_url),
    })) as Video[];
  } catch {
    return [];
  }
}
