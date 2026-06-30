import { getPosts } from '@/lib/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';
import { getLocale } from '@/lib/i18n-server';
import { getDictionary } from '@/lib/dictionaries';
import { localizedPath } from '@/lib/i18n';

export async function BlogPreview() {
  const locale = getLocale();
  const t = getDictionary(locale).home.blogPreview;
  const posts = await getPosts({ limit: 3 });
  if (!posts.length) return null;

  return (
    <Section>
      <SectionHeading
        eyebrow={t.eyebrow}
        title={<>{t.titleA}<span className="text-gradient">{t.titleHighlight}</span></>}
        lead={t.lead}
      />
      <Container className="mt-12">
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href={localizedPath(locale, '/blog')} variant="outline" size="md">
            {t.readAll} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </Section>
  );
}
