import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import { ArrowLeft, ArrowRight, CalendarDays, Clock, UserRound } from 'lucide-react';
import { getPost, getPosts, toneGradient, coverFor } from '@/lib/blog';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { BlogCard } from '@/components/blog/BlogCard';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { cn, formatDate } from '@/lib/utils';
import { siteConfig } from '@/lib/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleSchema, breadcrumbSchema } from '@/lib/seo';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    return { title: 'Article not found' };
  }
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url,
      siteName: siteConfig.name,
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [coverFor(post), '/og.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [coverFor(post)],
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const clean = DOMPurify.sanitize(post.content);
  const url = `/blog/${post.slug}`;

  // Related articles: same category, excluding the current post.
  const related = (await getPosts({ category: post.category }))
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article>
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: post.title, url },
          ]),
        ]}
      />
      {/* Tone-gradient article header */}
      <header
        className={cn(
          'relative isolate overflow-hidden bg-gradient-to-br pb-16 pt-14 text-white sm:pb-20 sm:pt-16',
          toneGradient(post.tone),
        )}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-white/15 blur-[120px]" />
          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-gold-300/20 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(30deg,#fff 1px,transparent 1px),linear-gradient(-30deg,#fff 1px,transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />
        </div>

        <Container size="narrow">
          <nav className="flex items-center gap-1.5 text-sm text-white/60">
            <Link href="/" className="hover:text-gold-200">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gold-200">
              Blog
            </Link>
            <span>/</span>
            <Link href={`/blog?category=${post.category}`} className="hover:text-gold-200">
              {post.categoryLabel}
            </Link>
          </nav>

          <div className="mt-7">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-wide text-white backdrop-blur">
              <Icon name={post.category === 'others' ? 'globe' : 'moon'} className="h-3.5 w-3.5" />
              {post.categoryLabel}
            </span>
            <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.9rem] balance">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{post.excerpt}</p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="h-4 w-4" /> {post.author}
                <span className="text-white/45">· {post.authorRole}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" /> {formatDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {post.readTime}
              </span>
            </div>
          </div>
        </Container>
      </header>

      {/* Body */}
      <Container size="narrow" className="relative -mt-8">
        <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-10">
          {/* Top share row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition hover:text-brand-800"
            >
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
            <ShareButtons url={url} title={post.title} />
          </div>

          {/* Rendered, sanitized HTML */}
          <div className="prose-igt mt-8" dangerouslySetInnerHTML={{ __html: clean }} />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-ink-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Bottom share row */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <div>
              <p className="font-display text-sm font-semibold text-ink">Found this helpful?</p>
              <p className="text-sm text-ink-muted">Share it with someone planning their journey.</p>
            </div>
            <ShareButtons url={url} title={post.title} />
          </div>
        </div>

        {/* Author / agency CTA */}
        <Reveal className="mt-10 overflow-hidden rounded-[2rem] bg-brand-gradient px-7 py-10 text-center shadow-emerald sm:px-12 sm:text-left">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-semibold leading-tight text-white">
                Ready to plan your Hajj, Umrah or holiday?
              </h2>
              <p className="mt-3 text-base text-white/80">
                Government-licensed since 2002. Get an honest, no-obligation estimate tailored to your dates and budget.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/estimate" variant="gold" size="lg">
                Get a free estimate <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/contact" variant="light" size="lg">
                Contact us
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="relative py-20 sm:py-24">
          <Container>
            <Reveal className="mb-10 flex flex-col gap-2 text-center">
              <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-700">
                Keep reading
              </span>
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl dark:text-white">
                Related articles
              </h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel, i) => (
                <Reveal key={rel.slug} delay={i * 0.08}>
                  <BlogCard post={rel} />
                </Reveal>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button href="/blog" variant="outline" size="md">
                Back to all articles <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
