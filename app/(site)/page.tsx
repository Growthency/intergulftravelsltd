import { JsonLd } from '@/components/seo/JsonLd';
import { organizationSchema, websiteSchema, localBusinessSchema } from '@/lib/seo';
import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { Services } from '@/components/home/Services';
import { WhyUs } from '@/components/home/WhyUs';
import { Packages } from '@/components/home/Packages';
import { Process } from '@/components/home/Process';
import { Testimonials } from '@/components/home/Testimonials';
import { Moments } from '@/components/home/Moments';
import { Affiliations } from '@/components/home/Affiliations';
import { BlogPreview } from '@/components/home/BlogPreview';
import { CTA } from '@/components/home/CTA';

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema(), localBusinessSchema()]} />
      <Hero />
      <TrustBar />
      <Services />
      <WhyUs />
      <Packages />
      <Process />
      <Testimonials />
      <Moments />
      <Affiliations />
      <BlogPreview />
      <CTA />
    </>
  );
}
