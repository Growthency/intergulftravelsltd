'use client';

import { useEffect, useState } from 'react';
import { Bookmark } from 'lucide-react';
import { StatCard } from '@/components/dashboard/ui';
import { readSavedSlugs, SAVED_ARTICLES_EVENT } from '@/components/dashboard/saved-store';

/**
 * Saved-articles count, sourced from localStorage on the client so the figure
 * stays in sync with the Saved Articles page (which is client-only too).
 */
export function SavedCountStat() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const sync = () => setCount(readSavedSlugs().length);
    sync();
    window.addEventListener('storage', sync);
    window.addEventListener(SAVED_ARTICLES_EVENT, sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener(SAVED_ARTICLES_EVENT, sync);
    };
  }, []);

  return (
    <StatCard
      label="Saved articles"
      value={count ?? '—'}
      sub="Bookmarked from the blog"
      icon={Bookmark}
      tone="gold"
    />
  );
}
