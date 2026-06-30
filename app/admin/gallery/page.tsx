import { createAdminClient } from '@/lib/supabase/server';
import { PageHeader } from '@/components/admin/ui';
import { GalleryManager, type GalleryImage } from '@/components/admin/GalleryManager';
import { getLocale } from '@/lib/i18n-server';
import { getDict } from '@/lib/dictionaries/areas/adminwebsite';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Gallery' };

async function loadGallery(): Promise<GalleryImage[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('gallery_images')
      .select('id, title, url, category, sort_order')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[admin/gallery] load failed:', error.message);
      return [];
    }
    return (data ?? []) as GalleryImage[];
  } catch (err) {
    console.error('[admin/gallery] unexpected error:', err);
    return [];
  }
}

export default async function GalleryPage() {
  const images = await loadGallery();
  const t = getDict(getLocale());

  return (
    <>
      <PageHeader title={t.gallery.title} description={t.gallery.description} />
      <GalleryManager images={images} />
    </>
  );
}
