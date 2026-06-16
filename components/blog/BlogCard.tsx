import Link from 'next/link';
import { ArrowUpRight, CalendarDays, Clock } from 'lucide-react';
import { type BlogPost, toneGradient } from '@/lib/blog-types';
import { Icon } from '@/components/ui/Icon';
import { formatDate, cn } from '@/lib/utils';

export function BlogCard({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald',
        className,
      )}
    >
      <div className={cn('relative aspect-[16/10] overflow-hidden bg-gradient-to-br', toneGradient(post.tone))}>
        {/* vector cover — no raster image, stays WebP-rule clean unless an admin uploads one */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.35) 0, transparent 45%)',
          }}
        />
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-brand-800">
          {post.categoryLabel}
        </div>
        <div className="absolute inset-0 grid place-items-center text-white/85 transition-transform duration-500 group-hover:scale-110">
          <Icon name={post.category === 'others' ? 'globe' : 'moon'} className="h-16 w-16" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-4 text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {formatDate(post.publishedAt)}</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-brand-700 dark:text-white">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
          Read article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
