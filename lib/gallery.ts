import { unstable_cache } from 'next/cache';

export type GalleryImage = {
  id: string;
  title: string;
  url: string;
  category: string | null;
  sort_order: number | null;
};

const configured = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

/** Admin-curated gallery images (cookieless + cached → public pages stay static). */
const load = async (): Promise<GalleryImage[]> => {
  if (!configured()) return [];
  try {
    const { createAdminClient } = await import('@/lib/supabase/server');
    const db = createAdminClient();
    const { data } = await db
      .from('gallery_images')
      .select('id, title, url, category, sort_order')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    return (data ?? []) as GalleryImage[];
  } catch {
    return [];
  }
};

export const getGalleryImages = unstable_cache(load, ['gallery-images-v1'], {
  revalidate: 120,
  tags: ['gallery'],
});
