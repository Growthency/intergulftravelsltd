import type { BlogPost } from '@/lib/blog-types';
import { seedPosts } from '@/lib/blog-seed';

export type { BlogPost } from '@/lib/blog-types';
export { toneGradient } from '@/lib/blog-types';

const supabaseConfigured = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

/** Map a DB row to our BlogPost shape (gracefully handles missing columns). */
function mapRow(row: any): BlogPost {
  const category = (row.category === 'others' ? 'others' : 'hajj-umrah') as BlogPost['category'];
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? '',
    content: row.content ?? '',
    category,
    categoryLabel: category === 'others' ? 'Travel & Tips' : 'Hajj & Umrah',
    tags: row.tags ?? [],
    author: row.author_name ?? 'Inter Gulf Travels',
    authorRole: row.author_role ?? 'Editorial Team',
    publishedAt: row.published_at ?? row.created_at ?? new Date().toISOString(),
    readTime: row.read_time ?? '5 min read',
    tone: (row.tone as BlogPost['tone']) ?? 'emerald',
    cover: row.featured_image ?? null,
    featured: row.featured ?? false,
  };
}

/** Fetch published posts (Supabase if configured, else the bundled seed). */
export async function getPosts(opts?: { category?: string; limit?: number }): Promise<BlogPost[]> {
  let posts = seedPosts;

  if (supabaseConfigured()) {
    try {
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = createClient();
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      if (data && data.length) posts = data.map(mapRow);
    } catch {
      // fall back to seed
    }
  }

  if (opts?.category && opts.category !== 'all') {
    posts = posts.filter((p) => p.category === opts.category);
  }
  if (opts?.limit) posts = posts.slice(0, opts.limit);
  return posts;
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const fromSeed = seedPosts.find((p) => p.slug === slug) ?? null;

  if (supabaseConfigured()) {
    try {
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = createClient();
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();
      if (data) return mapRow(data);
    } catch {
      // fall back
    }
  }
  return fromSeed;
}
