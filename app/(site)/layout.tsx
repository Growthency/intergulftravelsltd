import SmoothScroll from '@/components/providers/SmoothScroll';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/effects/ScrollProgress';
import { ScrollToTop } from '@/components/effects/ScrollToTop';
import { WhatsAppFloat } from '@/components/effects/WhatsAppFloat';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
      <ScrollToTop />
      <WhatsAppFloat />
    </SmoothScroll>
  );
}
