'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { BlogCard } from '@/components/blog/BlogCard';
import { Reveal } from '@/components/ui/Reveal';
import type { BlogPost } from '@/lib/blog-types';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/blog';

/**
 * Client-side search over an already-filtered list of posts. The server
 * decides which category to pass in; this component only narrows the visible
 * grid by a free-text query across title, excerpt and tags.
 */
export function BlogSearch({ posts }: { posts: BlogPost[] }) {
  const t = getDict(useLocale()).search;
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((post) => {
      const haystack = [post.title, post.excerpt, post.categoryLabel, ...post.tags]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query]);

  return (
    <div>
      <div className="mx-auto mb-10 max-w-md">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.placeholder}
            aria-label={t.ariaLabel}
            className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-11 text-sm text-ink shadow-soft outline-none transition focus:border-brand-600/50 focus:shadow-emerald"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={t.clearLabel}
              className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-ink-muted transition hover:bg-muted hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <Reveal key={post.slug} delay={Math.min(i, 5) * 0.06}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-md rounded-3xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-700">
            <Search className="h-5 w-5" />
          </div>
          <p className="font-display text-lg font-semibold text-ink">{t.noneTitle}</p>
          <p className="mt-2 text-sm text-ink-muted">
            {t.noneBody(query)}
          </p>
        </div>
      )}
    </div>
  );
}
