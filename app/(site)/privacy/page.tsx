import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { siteConfig, contact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Inter Gulf Travels Ltd collects, uses, shares and protects your personal information when you book Hajj, Umrah, visa, air ticket, hotel and tour services.',
  alternates: { canonical: '/privacy' },
};

const lastUpdated = '1 January 2026';

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead="Your trust matters to us. This policy explains what information we collect, why we collect it, and how we keep it safe."
        crumbs={[{ label: 'Privacy Policy' }]}
      />

      <Section className="bg-sand-soft">
        <Container size="narrow">
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-10">
            <p className="text-sm text-ink-muted">Last updated: {lastUpdated}</p>

            <div className="prose-igt mt-6">
              <p>
                <strong>{siteConfig.legalName}</strong> (&ldquo;Inter Gulf Travels&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy
                Policy describes how we collect, use, disclose and safeguard the personal information you provide
                when you contact us, request an estimate, or book any of our Hajj, Umrah, visa, air ticket, hotel
                or tour services.
              </p>

              <h2>1. Information We Collect</h2>
              <p>To provide our services, we may collect the following information:</p>
              <ul>
                <li>
                  <strong>Identity &amp; contact details</strong> — your full name (as on your passport), date of
                  birth, gender, nationality, national ID (NID), photographs, postal address, email address and
                  phone numbers.
                </li>
                <li>
                  <strong>Travel documents</strong> — passport details and copies, visa information, vaccination
                  certificates and other documents required to arrange your travel.
                </li>
                <li>
                  <strong>Booking details</strong> — your chosen services, travel dates, party members, room and
                  meal preferences, and any special assistance needs (for example wheelchair support).
                </li>
                <li>
                  <strong>Payment information</strong> — records of payments made to us. We do not store full card
                  numbers; card payments, where offered, are handled by the relevant payment provider.
                </li>
                <li>
                  <strong>Enquiry information</strong> — the details you submit through our contact and estimate
                  forms, or share with us by phone, WhatsApp or email.
                </li>
                <li>
                  <strong>Technical information</strong> — basic, non-identifying data such as browser type and
                  pages visited, collected through cookies and similar technologies when you use our website.
                </li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <ul>
                <li>To process and manage your bookings, visas, tickets and accommodation.</li>
                <li>To submit visa and pilgrimage applications to the relevant authorities on your behalf.</li>
                <li>To communicate with you about your enquiry, booking, travel arrangements and any changes.</li>
                <li>To provide on-ground support and assistance during your journey.</li>
                <li>To meet our legal, regulatory and tax obligations.</li>
                <li>
                  To send you service updates and, where you have agreed, information about packages and offers.
                  You can opt out of marketing messages at any time.
                </li>
              </ul>

              <h2>3. How We Share Your Information</h2>
              <p>
                We share your information only to the extent necessary to deliver the services you have requested,
                and only with parties who are required to keep it confidential. These may include:
              </p>
              <ul>
                <li>
                  <strong>Airlines</strong> — to issue tickets and meet airline and security requirements.
                </li>
                <li>
                  <strong>Hotels and transport providers</strong> — to confirm your accommodation and transfers.
                </li>
                <li>
                  <strong>Saudi and other government authorities</strong> — including the Ministry of Hajj and
                  Umrah, the e-Hajj / Nusuk systems, embassies and consulates, to obtain visas and complete
                  pilgrimage formalities.
                </li>
                <li>
                  <strong>Bangladeshi authorities</strong> — including the Ministry of Religious Affairs and Hajj
                  management systems, as required for Hajj and Umrah processing.
                </li>
                <li>
                  <strong>Our trusted service partners</strong> — such as visa-processing agents and ground
                  handlers who assist us in delivering your booking.
                </li>
              </ul>
              <p>
                We do <strong>not</strong> sell your personal information. We may disclose information where
                required to do so by law or by a competent authority.
              </p>

              <h2>4. International Transfers</h2>
              <p>
                Because travel is international by nature, your information may be transferred to and processed in
                countries outside Bangladesh — including Saudi Arabia and the destinations you are travelling to —
                so that airlines, hotels and authorities there can provide the services you have booked. We take
                reasonable steps to ensure your information is handled securely throughout.
              </p>

              <h2>5. Data Security</h2>
              <p>
                We apply appropriate organisational and technical measures to protect your information against
                loss, misuse and unauthorised access. Access to personal data within our office is limited to
                staff who need it to perform their duties. While we work hard to safeguard your information, no
                method of transmission or storage is completely secure, and we cannot guarantee absolute security.
              </p>

              <h2>6. Data Retention</h2>
              <p>
                We keep your information only for as long as necessary to fulfil the purposes set out in this
                policy and to comply with our legal, accounting and regulatory obligations. When information is no
                longer required, we take reasonable steps to delete or anonymise it securely.
              </p>

              <h2>7. Cookies</h2>
              <p>
                Our website uses cookies and similar technologies to help the site function correctly and to
                understand how visitors use it, so we can improve their experience. You can control or disable
                cookies through your browser settings; however, some parts of the site may not function as
                intended if cookies are disabled.
              </p>

              <h2>8. Your Rights</h2>
              <p>You may, subject to applicable law, ask us to:</p>
              <ul>
                <li>access the personal information we hold about you;</li>
                <li>correct information that is inaccurate or incomplete;</li>
                <li>delete information that we no longer have a lawful reason to keep; and</li>
                <li>stop sending you marketing communications.</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the details below. We may need to verify
                your identity before acting on your request.
              </p>

              <h2>9. Children&apos;s Privacy</h2>
              <p>
                We provide family travel services and may process the details of minors as part of a family
                booking, but only with the consent and under the supervision of a parent or guardian. We do not
                knowingly collect information directly from children.
              </p>

              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with
                a revised &ldquo;last updated&rdquo; date. We encourage you to review it periodically.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your information, please
                contact us at <a href={`mailto:${contact.emails[0]}`}>{contact.emails[0]}</a>, call{' '}
                <a href={`tel:${contact.phones[0].replace(/\s/g, '')}`}>{contact.phones[0]}</a>, or write to us at{' '}
                {contact.address.full}.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
