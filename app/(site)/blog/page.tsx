import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CalendarDays, Clock, Mail } from 'lucide-react';
import { getPosts, toneGradient } from '@/lib/blog';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { cn, formatDate } from '@/lib/utils';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog — Hajj, Umrah & Travel Journal',
  description:
    'Guides, checklists and travel tips from Inter Gulf Travels Ltd — a government-licensed Hajj & Umrah agency in Dhaka. Practical advice to help you prepare for the journey of a lifetime.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: `Our Journal · ${siteConfig.name}`,
    description:
      'Hajj & Umrah guides, Saudi visa help and family travel inspiration from Bangladesh’s trusted pilgrimage specialists.',
    url: '/blog',
    type: 'website',
  },
};

const tabs = [
  { label: 'All Articles', value: 'all' },
  { label: 'Hajj & Umrah', value: 'hajj-umrah' },
  { label: 'Travel & Tips', value: 'others' },
] as const;

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const category = searchParams?.category ?? 'all';
  const activeCategory = tabs.some((t) => t.value === category) ? category : 'all';

  const posts = await getPosts({ category: activeCategory });

  // The featured post only headlines the unfiltered "All" view.
  const featured = activeCategory === 'all' ? posts.find((p) => p.featured) : undefined;
  const gridPosts = featured ? posts.filter((p) => p.slug !== featured.slug) : posts;

  return (
    <>
      <PageHero
        eyebrow="Our Journal"
        title={
          <>
            Guides, reflections &amp; <span className="text-gradient-gold">travel wisdom</span>
          </>
        }
        lead="Practical advice for pilgrims and travellers — from Hajj preparation and Umrah guides to Saudi visas and family holidays you can book from Dhaka."
        crumbs={[{ label: 'Blog' }]}
      />

      {/* Featured article */}
      {featured && (
        <section className="relative pt-16 sm:pt-20">
          <Container>
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft transition-all duration-300 hover:shadow-emerald lg:grid-cols-2"
              >
                <div className={cn('relative min-h-[16rem] overflow-hidden bg-gradient-to-br lg:min-h-full', toneGradient(featured.tone))}>
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.35) 0, transparent 45%)',
                    }}
                  />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-gold-gradient px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-wide text-brand-900 shadow-gold">
                    Featured
                  </div>
                  <div className="absolute inset-0 grid place-items-center text-white/85 transition-transform duration-500 group-hover:scale-110">
                    <Icon name={featured.category === 'others' ? 'globe' : 'moon'} className="h-24 w-24" />
                  </div>
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-brand-800">
                    {featured.categoryLabel}
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink transition-colors group-hover:text-brand-700 sm:text-3xl dark:text-white">
                    {featured.title}
                  </h2>
                  <p className="mt-4 line-clamp-3 text-base leading-relaxed text-ink-muted">{featured.excerpt}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-ink-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" /> {formatDate(featured.publishedAt)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {featured.readTime}
                    </span>
                    <span>By {featured.author}</span>
                  </div>
                  <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Read the full article
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Category tabs + searchable grid */}
      <section className="relative py-16 sm:py-20">
        <Container>
          <Reveal className="mb-10 flex flex-wrap items-center justify-center gap-2.5">
            {tabs.map((tab) => {
              const isActive = activeCategory === tab.value;
              const href = tab.value === 'all' ? '/blog' : `/blog?category=${tab.value}`;
              return (
                <Link
                  key={tab.value}
                  href={href}
                  scroll={false}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300',
                    isActive
                      ? 'border-transparent bg-brand-600 text-white shadow-emerald'
                      : 'border-border bg-card text-ink-muted hover:border-brand-600/40 hover:text-brand-700',
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}
          </Reveal>

          {gridPosts.length > 0 ? (
            <BlogSearch posts={gridPosts} />
          ) : (
            <p className="py-16 text-center text-ink-muted">No articles in this category yet — please check back soon.</p>
          )}
        </Container>
      </section>

      {/* Newsletter / consultation CTA strip */}
      <section className="relative pb-24">
        <Container>
          <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-7 py-12 shadow-emerald sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-gold-300/20 blur-3xl" />
            </div>
            <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-200">
                  <Mail className="h-3.5 w-3.5" /> Plan your journey
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  Have a question about Hajj, Umrah or travel?
                </h2>
                <p className="mt-3 text-base text-white/80">
                  Our advisors answer honestly, with no obligation. Reach out and we’ll help you plan the right journey for your dates and budget.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" variant="gold" size="lg">
                  Talk to an advisor <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/estimate" variant="light" size="lg">
                  Get a free estimate
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
