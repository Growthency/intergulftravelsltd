import { Plus } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/server';
import { PageHeader, AdminButton } from '@/components/admin/ui';
import { PostsTable, type PostRow } from '@/components/admin/PostsTable';

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

  return (
    <>
      <PageHeader
        title="Blog Posts"
        description="Write, schedule and manage the articles published across the website."
      >
        <AdminButton href="/admin/posts/new" variant="primary">
          <Plus className="h-4 w-4" /> New post
        </AdminButton>
      </PageHeader>

      <PostsTable posts={posts} />
    </>
  );
}
