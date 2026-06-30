import { Plus } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/server';
import { PageHeader, AdminButton } from '@/components/admin/ui';
import { PostsTable, type PostRow } from '@/components/admin/PostsTable';
import { getLocale } from '@/lib/i18n-server';
import { localizedPath } from '@/lib/i18n';
import { getDict } from '@/lib/dictionaries/areas/adminwebsite';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Blog Posts' };

async function loadPosts(): Promise<PostRow[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, category, status, featured, published_at, updated_at, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[admin/posts] load failed:', error.message);
      return [];
    }
    return (data ?? []) as PostRow[];
  } catch (err) {
    console.error('[admin/posts] unexpected error:', err);
    return [];
  }
}

export default async function PostsPage() {
  const posts = await loadPosts();
  const locale = getLocale();
  const t = getDict(locale);

  return (
    <>
      <PageHeader title={t.posts.title} description={t.posts.description}>
        <AdminButton href={localizedPath(locale, '/admin/posts/new')} variant="primary">
          <Plus className="h-4 w-4" /> {t.posts.newPost}
        </AdminButton>
      </PageHeader>

      <PostsTable posts={posts} />
    </>
  );
}
