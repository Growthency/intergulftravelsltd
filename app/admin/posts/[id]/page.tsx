import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/server';
import { PostEditor, type PostFormData } from '@/components/admin/PostEditor';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Edit Post' };

export default async function EditPostPage({ params }: { params: { id: string } }) {
  let row: any = null;

  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', params.id)
      .maybeSingle();
    row = data;
  } catch (err) {
    console.error('[admin/posts/:id] load failed:', err);
  }

  if (!row) notFound();

  const initial: Partial<PostFormData> = {
    id: row.id,
    title: row.title ?? '',
    slug: row.slug ?? '',
    excerpt: row.excerpt ?? '',
    content: row.content ?? '',
    category: row.category === 'others' ? 'others' : 'hajj-umrah',
    tags: Array.isArray(row.tags) ? row.tags : [],
    author_name: row.author_name ?? 'Inter Gulf Travels',
    author_role: row.author_role ?? 'Editorial Team',
    read_time: row.read_time ?? '',
    tone: row.tone ?? 'emerald',
    featured_image: row.featured_image ?? null,
    status: row.status ?? 'draft',
    featured: Boolean(row.featured),
    meta_title: row.meta_title ?? '',
    meta_description: row.meta_description ?? '',
    published_at: row.published_at ?? null,
  };

  return <PostEditor initial={initial} />;
}
