'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Bookmark, BookmarkX, ArrowUpRight, Clock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { BlogPost } from '@/lib/blog-types';
import { toneGradient } from '@/lib/blog-types';
import { formatDate, cn } from '@/lib/utils';
import { EmptyState } from '@/components/dashboard/ui';
import {
  readSavedSlugs,
  removeSaved,
  SAVED_ARTICLES_EVENT,
} from '@/components/dashboard/saved-store';

/**
 * Renders the member's saved blog articles. `posts` is the full published set
 * (passed from the server); we filter it down to the slugs the member has
 * bookmarked in localStorage.
 */
export function SavedArticles({ posts }: { posts: BlogPost[] }) {
  const [slugs, setSlugs] = useState<string[] | null>(null);

  useEffect(() => {
    const sync = () => setSlugs(readSavedSlugs());
    sync();
    window.addEventListener('storage', sync);
    window.addEventListener(SAVED_ARTICLES_EVENT, sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener(SAVED_ARTICLES_EVENT, sync);
    };
  }, []);

  const saved = useMemo(() => {
    if (!slugs) return [];
    const order = new Map(slugs.map((s, i) => [s, i]));
    return posts
      .filter((p) => order.has(p.slug))
      .sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));
  }, [posts, slugs]);

  function handleRemove(post: BlogPost) {
    removeSaved(post.slug);
    setSlugs(readSavedSlugs());
    toast.success(`Removed “${post.title}” from saved articles.`);
  }

  // Initial client render (before localStorage is read).
  if (slugs === null) {
    return (
      <div className="flex items-center justify-center rounded-3xl border border-border bg-card py-16 text-ink-muted">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading your saved articles…
      </div>
    );
  }

  if (saved.length === 0) {
    return (
      <EmptyState
        icon={Bookmark}
        title="No saved articles yet"
        description="Bookmark guides and stories from our blog and they'll be waiting for you here, on any device you sign in from."
        action={{ label: 'Explore the blog', href: '/blog' }}
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {saved.map((post) => (
        <article
          key={post.slug}
          className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
        >
          <Link href={`/blog/${post.slug}`} className="block">
            <div className={cn('relative h-36 bg-gradient-to-br', toneGradient(post.tone))}>
              <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_80%_-10%,rgba(255,255,255,0.25),transparent_55%)]" />
              <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[0.68rem] font-semibold text-brand-800">
                {post.categoryLabel}
              </span>
            </div>
          </Link>

          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-center gap-3 text-xs text-ink-muted">
              <span>{formatDate(post.publishedAt)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {post.readTime}
              </span>
            </div>
            <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink">
              <Link href={`/blog/${post.slug}`} className="transition group-hover:text-brand-700">
                {post.title}
              </Link>
            </h3>
            <p className="mt-2 line-clamp-2 flex-1 text-sm text-ink-muted">{post.excerpt}</p>

            <div className="mt-4 flex items-center justify-between">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition hover:text-brand-800"
              >
                Read article <ArrowUpRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => handleRemove(post)}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold text-ink-muted transition hover:bg-red-50 hover:text-red-600"
                aria-label={`Remove ${post.title} from saved articles`}
              >
                <BookmarkX className="h-4 w-4" /> Remove
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
