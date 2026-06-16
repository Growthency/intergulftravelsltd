import type { Metadata } from 'next';
import { ArrowRight, Users2, Quote } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { AuroraBackdrop } from '@/components/effects/AuroraBackdrop';
import { TeamCard, type TeamMember } from '@/components/about/TeamCard';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Management Team — The People Behind the Journey',
  description:
    'Meet the leadership of Inter Gulf Travels Ltd — the experienced team guiding Bangladeshi pilgrims on Hajj & Umrah with honesty and care since 2002.',
  alternates: { canonical: '/about/team' },
};

const team: TeamMember[] = [
  {
    name: 'Alhaj Md. Nurul Islam',
    role: 'Chairman',
    bio: 'Founder of Inter Gulf Travels in 2002, he set the agency’s guiding principle — to serve every pilgrim with the honesty and care of family.',
    gradient: 'from-brand-600 to-brand-900',
    email: 'intergulf71@gmail.com',
  },
  {
    name: 'Md. Rafiqul Islam',
    role: 'Managing Director',
    bio: 'Leads the company’s strategy and growth, ensuring two decades of trust translate into ever-better service for every journey.',
    gradient: 'from-gold-500 to-gold-700',
    email: 'intergulfg47@gmail.com',
  },
  {
    name: 'Md. Shahjahan Kabir',
    role: 'Director — Hajj & Umrah Operations',
    bio: 'Oversees the full Hajj & Umrah programme, from government registration to on-ground coordination in Makkah and Madinah.',
    gradient: 'from-brand-500 to-brand-800',
  },
  {
    name: 'Mahbubur Rahman',
    role: 'General Manager',
    bio: 'Runs day-to-day operations across departments, keeping every booking, departure and pilgrim experience running smoothly.',
    gradient: 'from-brand-700 to-gold-600',
  },
  {
    name: 'Tanvir Ahmed',
    role: 'Head of Visa & Ticketing',
    bio: 'Leads visa processing and IATA-accredited ticketing, securing timely visas and the best fares across 40+ airlines.',
    gradient: 'from-brand-600 to-brand-800',
  },
  {
    name: 'Sumaiya Akter',
    role: 'Customer Care Manager',
    bio: 'Heads the customer experience team — the warm, reassuring voice that guides pilgrims from first enquiry to safe return.',
    gradient: 'from-gold-500 to-brand-700',
  },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Management Team"
        title={
          <>
            The people behind your <span className="text-gradient-gold">sacred journey</span>
          </>
        }
        lead="Behind every smooth pilgrimage is a dedicated team. Meet the experienced leaders who have made Inter Gulf Travels a name families trust."
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Management Team' }]}
      />

      {/* Intro */}
      <Section className="relative overflow-hidden !pb-10">
        <AuroraBackdrop />
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-base leading-relaxed text-ink-muted sm:text-lg balance">
              From the day we opened our doors in 2002, our greatest asset has been our people. Each
              member of our leadership brings years of dedicated experience in Hajj &amp; Umrah service —
              and a shared belief that a pilgrimage is a trust to be honoured, never just a transaction.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Team grid */}
      <Section className="!pt-6">
        <Container>
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Leadership ethos */}
      <Section className="bg-sand-soft">
        <Container size="narrow">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 text-center shadow-soft sm:p-12">
            <Quote className="mx-auto h-10 w-10 text-gold-400/50" />
            <p className="mt-5 font-display text-xl leading-relaxed text-ink dark:text-white sm:text-2xl balance">
              “We don’t measure ourselves by the number of pilgrims we serve, but by the number who
              return to us — and send their families too.”
            </p>
            <p className="mt-5 text-sm font-semibold text-brand-700 dark:text-brand-300">
              The leadership of {siteConfig.shortName}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Join us */}
      <Section className="relative overflow-hidden !py-16">
        <AuroraBackdrop />
        <Container>
          <Reveal className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-card p-8 text-center shadow-soft sm:flex-row sm:justify-between sm:p-10 sm:text-left">
            <div className="flex items-start gap-5">
              <span className="hidden shrink-0 ring-gradient sm:grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-gold-300">
                <Users2 className="h-7 w-7" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink dark:text-white">
                  Want to join our team?
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
                  We are always looking for sincere, dedicated people who share our commitment to serving
                  pilgrims. Explore our current openings and become part of the Inter Gulf family.
                </p>
              </div>
            </div>
            <Button href="/about/career" className="shrink-0">
              View Careers <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
