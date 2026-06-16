import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { Services } from '@/components/home/Services';
import { WhyUs } from '@/components/home/WhyUs';
import { Packages } from '@/components/home/Packages';
import { Process } from '@/components/home/Process';
import { Testimonials } from '@/components/home/Testimonials';
import { BlogPreview } from '@/components/home/BlogPreview';
import { CTA } from '@/components/home/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <WhyUs />
      <Packages />
      <Process />
      <Testimonials />
      <BlogPreview />
      <CTA />
    </>
  );
}
