import { getPosts } from '@/lib/blog';
import { SavedArticles } from '@/components/dashboard/SavedArticles';

export const dynamic = 'force-dynamic';

export default async function SavedArticlesPage() {
  // Pass the full published set as initial data; the client filters it down to
  // the member's bookmarked slugs (stored in localStorage).
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink">Saved Articles</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Guides, reflections and travel tips you've bookmarked for later. Your saved list is kept on
          this device so you can return to it any time.
        </p>
      </div>

      <SavedArticles posts={posts} />
    </div>
  );
}
