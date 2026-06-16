import { createAdminClient } from '@/lib/supabase/server';
import { PageHeader } from '@/components/admin/ui';
import { GalleryManager, type GalleryImage } from '@/components/admin/GalleryManager';

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

  return (
    <>
      <PageHeader
        title="Gallery"
        description="Curate the public photo gallery. Every image is stored as optimized WebP."
      />
      <GalleryManager images={images} />
    </>
  );
}
