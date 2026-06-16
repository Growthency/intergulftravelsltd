import { getPosts } from '@/lib/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ArrowRight } from 'lucide-react';

export async function BlogPreview() {
  const posts = await getPosts({ limit: 3 });
  if (!posts.length) return null;

  return (
    <Section>
      <SectionHeading
        eyebrow="From our journal"
        title={<>Guides, tips &amp; <span className="text-gradient">spiritual reflections</span></>}
        lead="Practical advice and inspiration to help you prepare for the journey of a lifetime."
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
          <Button href="/blog" variant="outline" size="md">
            Read all articles <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </Section>
  );
}
