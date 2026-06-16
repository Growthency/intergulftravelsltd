import type { Metadata } from 'next';
import {
  ArrowRight,
  MapPin,
  Clock,
  Mail,
  Phone,
  Sparkles,
  GraduationCap,
  HeartHandshake,
  TrendingUp,
  Users,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { AuroraBackdrop } from '@/components/effects/AuroraBackdrop';
import { contact } from '@/lib/site';

const careersEmail = 'intergulfg47@gmail.com';

export const metadata: Metadata = {
  title: 'Career Opportunity — Join the Inter Gulf Family',
  description:
    'Build a meaningful career with Inter Gulf Travels Ltd, a government-licensed Hajj & Umrah agency in Dhaka since 2002. Explore open positions in Hajj operations, visa processing, ticketing, customer care and digital marketing.',
  alternates: { canonical: '/about/career' },
};

const culture = [
  {
    icon: HeartHandshake,
    title: 'Purposeful work',
    body: 'Every booking you handle helps a family fulfil a once-in-a-lifetime dream. Few jobs carry this much meaning.',
  },
  {
    icon: GraduationCap,
    title: 'Learn from veterans',
    body: 'Work alongside colleagues with two decades of Hajj & Umrah expertise and grow into a true specialist.',
  },
  {
    icon: TrendingUp,
    title: 'Real growth',
    body: 'We promote from within. Strong performers move into senior operations, team-lead and management roles.',
  },
  {
    icon: Users,
    title: 'A family culture',
    body: 'A close-knit, respectful team in the heart of Dhaka where your contribution is seen, valued and supported.',
  },
];

type Position = {
  title: string;
  department: string;
  type: string;
  location: string;
  summary: string;
  responsibilities: string[];
};

const positions: Position[] = [
  {
    title: 'Hajj Operations Executive',
    department: 'Operations',
    type: 'Full-time',
    location: 'Dhaka (On-site)',
    summary:
      'Coordinate end-to-end Hajj group logistics — registration, flights, hotels and ground services — and ensure every pilgrim’s journey runs flawlessly.',
    responsibilities: [
      'Manage Hajj pre-registration, group allocations and government submissions',
      'Coordinate flights, hotel bookings and Maktab services with Saudi partners',
      'Prepare departure schedules, rooming lists and pilgrim documentation',
      'Liaise with on-ground teams in Makkah and Madinah during the Hajj season',
    ],
  },
  {
    title: 'Visa Processing Officer',
    department: 'Documentation',
    type: 'Full-time',
    location: 'Dhaka (On-site)',
    summary:
      'Take ownership of accurate, timely visa applications for Hajj, Umrah and tourist travel across Saudi Arabia, the UAE and beyond.',
    responsibilities: [
      'Prepare and submit Hajj, Umrah, UAE and Schengen visa applications',
      'Verify passports, photographs and supporting documents for completeness',
      'Track application status and keep clients updated at every stage',
      'Maintain meticulous records and ensure full regulatory compliance',
    ],
  },
  {
    title: 'Customer Care Representative',
    department: 'Customer Experience',
    type: 'Full-time',
    location: 'Dhaka (On-site)',
    summary:
      'Be the warm, reassuring first voice pilgrims hear — answering enquiries, guiding choices and turning interest into confident bookings.',
    responsibilities: [
      'Respond to phone, WhatsApp and walk-in enquiries with patience and care',
      'Explain packages, pricing and procedures clearly to prospective pilgrims',
      'Follow up on leads and support clients through the booking journey',
      'Gather feedback and help continuously improve our service quality',
    ],
  },
  {
    title: 'Ticketing Executive',
    department: 'Air Travel',
    type: 'Full-time',
    location: 'Dhaka (On-site)',
    summary:
      'Issue domestic and international air tickets across 40+ airlines, securing the best fares and routings for pilgrims and travellers.',
    responsibilities: [
      'Search, quote and issue air tickets via GDS and airline portals',
      'Find optimal fares and routings to Jeddah, Madinah, Dubai and beyond',
      'Handle reissues, refunds, date changes and group fare requests',
      'Reconcile bookings and coordinate with the accounts team',
    ],
  },
  {
    title: 'Digital Marketing Executive',
    department: 'Marketing',
    type: 'Full-time',
    location: 'Dhaka (On-site)',
    summary:
      'Grow our online presence and bring our story to more families through content, social media and thoughtful campaigns.',
    responsibilities: [
      'Plan and publish content across Facebook, Instagram and the website',
      'Run and optimise paid campaigns for Hajj & Umrah package seasons',
      'Create graphics, reels and copy that reflect our trusted, caring brand',
      'Track analytics and report on reach, engagement and lead generation',
    ],
  },
];

const applySteps = [
  'Email your CV and a short cover note telling us why you would like to join.',
  'Mention the position you are applying for in the subject line.',
  'Our team reviews every application and contacts shortlisted candidates.',
  'Selected applicants are invited to our Purana Paltan office for an interview.',
];

export default function CareerPage() {
  return (
    <>
      <PageHero
        eyebrow="Career Opportunity"
        title={
          <>
            Build a career with <span className="text-gradient-gold">meaning</span> behind every journey
          </>
        }
        lead="At Inter Gulf Travels, your work helps families fulfil the dream of a lifetime. Join a respected, government-licensed team that has served pilgrims with pride since 2002."
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Career Opportunity' }]}
      />

      {/* Culture / why work here */}
      <Section className="relative overflow-hidden">
        <AuroraBackdrop />
        <SectionHeading
          eyebrow="Why work here"
          title={
            <>
              More than a job — a chance to <span className="text-gradient">serve</span>
            </>
          }
          lead="We are a team that takes pride in honesty, care and craft. Here is what life at Inter Gulf Travels looks like."
        />
        <Container className="mt-14">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {culture.map((c) => (
              <Reveal key={c.title} className="h-full">
                <article className="group h-full rounded-3xl border border-border bg-card/70 p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-gold">
                  <span className="ring-gradient grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-gold-300">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-semibold text-ink dark:text-white">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.body}</p>
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Open positions */}
      <Section className="bg-sand-soft">
        <SectionHeading
          eyebrow="Open positions"
          title={
            <>
              Current <span className="text-gradient">openings</span>
            </>
          }
          lead="We are growing, and we are looking for dedicated people who share our commitment to pilgrims. All roles are based at our head office in Dhaka."
        />
        <Container className="mt-12">
          <RevealGroup className="space-y-5">
            {positions.map((p) => (
              <Reveal key={p.title}>
                <article className="rounded-3xl border border-border bg-card p-7 shadow-soft transition-colors duration-300 hover:border-gold-400/40 sm:p-8">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="lg:max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
                          <Briefcase className="h-3.5 w-3.5" /> {p.department}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-xl font-semibold text-ink dark:text-white">{p.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-brand-600" /> {p.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-brand-600" /> {p.type}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-ink-muted">{p.summary}</p>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {p.responsibilities.map((r) => (
                          <li key={r} className="flex items-start gap-2 text-sm text-ink dark:text-white/90">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="shrink-0">
                      <Button
                        href={`mailto:${careersEmail}?subject=${encodeURIComponent(`Application: ${p.title}`)}`}
                        external
                        variant="outline"
                      >
                        Apply Now <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* How to apply */}
      <Section className="relative overflow-hidden">
        <AuroraBackdrop />
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <Eyebrow>How to apply</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.12] text-ink dark:text-white sm:text-4xl balance">
                Four simple steps to join our team
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-muted">
                Don’t see your exact role listed? We still want to hear from talented, sincere people.
                Send us your CV and tell us how you can help us serve pilgrims better.
              </p>
              <ol className="mt-7 space-y-4">
                {applySteps.map((step, i) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-gradient font-display text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-ink dark:text-white/90">{step}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-gradient text-brand-900">
                  <Sparkles className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink dark:text-white">
                  Send your application
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Email your CV with the position in the subject line, and our team will be in touch.
                </p>
                <div className="mt-6 space-y-3">
                  <a
                    href={`mailto:${careersEmail}?subject=${encodeURIComponent('Career Application — Inter Gulf Travels')}`}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-sand-soft p-4 transition hover:border-brand-600 dark:bg-brand-900/20"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-gold-300">
                      <Mail className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wide text-ink-muted">Careers email</span>
                      <span className="block text-sm font-semibold text-ink dark:text-white">{careersEmail}</span>
                    </span>
                  </a>
                  <a
                    href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-sand-soft p-4 transition hover:border-brand-600 dark:bg-brand-900/20"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-gold-300">
                      <Phone className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wide text-ink-muted">Call us</span>
                      <span className="block text-sm font-semibold text-ink dark:text-white">{contact.phones[0]}</span>
                    </span>
                  </a>
                  <div className="flex items-center gap-3 rounded-2xl border border-border bg-sand-soft p-4 dark:bg-brand-900/20">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-gold-300">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wide text-ink-muted">Visit our office</span>
                      <span className="block text-sm font-semibold text-ink dark:text-white">
                        {contact.address.line1}, {contact.address.line2}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <Button href="/contact" className="w-full">
                    Contact Us <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
