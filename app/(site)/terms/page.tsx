import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { siteConfig, contact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'The terms and conditions governing bookings, payments, cancellations, refunds, visa processing and travel services provided by Inter Gulf Travels Ltd, Dhaka, Bangladesh.',
  alternates: { canonical: '/terms' },
};

const lastUpdated = '1 January 2026';

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        lead="Please read these terms carefully. By booking any service with Inter Gulf Travels Ltd, you agree to be bound by them."
        crumbs={[{ label: 'Terms & Conditions' }]}
      />

      <Section className="bg-sand-soft">
        <Container size="narrow">
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-10">
            <p className="text-sm text-ink-muted">Last updated: {lastUpdated}</p>

            <div className="prose-igt mt-6">
              <p>
                These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of the services offered by{' '}
                <strong>{siteConfig.legalName}</strong> (&ldquo;Inter Gulf Travels&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo; or &ldquo;our&rdquo;), a government-licensed Hajj &amp; Umrah and travel agency
                established in 2002 and operating under {siteConfig.license}. They apply to all bookings,
                enquiries and services, whether made in person at our office, by telephone, by WhatsApp, by email
                or through our website.
              </p>

              <h2>1. Definitions</h2>
              <p>
                &ldquo;Client&rdquo;, &ldquo;you&rdquo; or &ldquo;traveller&rdquo; means any person who books,
                requests or uses our services. &ldquo;Services&rdquo; means Hajj and Umrah packages, visa
                processing, air ticketing, hotel booking, tour packages and any related arrangement. &ldquo;Third
                Party Supplier&rdquo; means airlines, hotels, transport providers, the relevant Hajj/Umrah
                authorities and any other independent provider whose services form part of your booking.
              </p>

              <h2>2. Bookings &amp; Confirmation</h2>
              <ul>
                <li>
                  A booking is confirmed only after we have received the required deposit or full payment and
                  issued you a written confirmation or invoice.
                </li>
                <li>
                  You are responsible for ensuring that all names, dates, passport details and contact
                  information you provide are complete and exactly match your passport. We are not liable for
                  losses arising from incorrect information supplied by you.
                </li>
                <li>
                  Prices, package inclusions and availability are subject to change until your booking is
                  confirmed. Quotations are valid only for the period stated on them.
                </li>
                <li>
                  Hajj and Umrah quotas, flight seats and hotel allotments are limited and allocated on a
                  first-confirmed basis. Early confirmation is strongly recommended.
                </li>
              </ul>

              <h2>3. Payments</h2>
              <ul>
                <li>
                  A deposit is required to secure most bookings, with the balance payable by the date stated on
                  your invoice. For Hajj and seasonal Umrah packages, payment deadlines are tied to government and
                  airline schedules and must be met to retain your place.
                </li>
                <li>
                  Full payment is required before the issuance of air tickets, visas or final travel documents,
                  unless otherwise agreed in writing.
                </li>
                <li>
                  Payments may be made by the methods we advise at the time of booking. You are responsible for
                  obtaining and retaining a receipt for every payment.
                </li>
                <li>
                  Government fees, airline taxes, fuel surcharges and currency-exchange fluctuations may affect
                  the final price. Where an increase is imposed by a Third Party Supplier or authority after
                  confirmation, the difference may be passed on to you.
                </li>
              </ul>

              <h2>4. Cancellation &amp; Refunds</h2>
              <p>
                Cancellations must be requested in writing. Refunds, where applicable, are calculated after
                deducting non-recoverable costs already incurred on your behalf and the charges levied by Third
                Party Suppliers. The following principles apply:
              </p>
              <ul>
                <li>
                  <strong>Visa fees, embassy fees and processing charges</strong> are non-refundable once an
                  application has been lodged.
                </li>
                <li>
                  <strong>Air tickets</strong> are subject to the fare rules of the issuing airline. Many fares
                  are partially or wholly non-refundable, and airline cancellation or re-issue penalties apply.
                </li>
                <li>
                  <strong>Hotel and ground arrangements</strong> are subject to the cancellation policy of each
                  property or supplier, which can be strict during the Hajj season and peak periods.
                </li>
                <li>
                  <strong>Hajj and Umrah packages</strong> are subject to the rules of the Ministry of Religious
                  Affairs, the Hajj Agencies Association of Bangladesh (HAAB) and the relevant Saudi authorities.
                  Government-mandated charges are non-refundable.
                </li>
                <li>
                  An administrative service fee may be retained on all cancelled bookings to cover the work
                  already performed.
                </li>
              </ul>
              <p>
                Approved refunds are paid to the person who made the original payment, by the same method where
                possible, within a reasonable time after the relevant suppliers have released the funds to us.
              </p>

              <h2>5. Changes &amp; Amendments</h2>
              <ul>
                <li>
                  Requests to change names, dates or itineraries after confirmation are subject to availability
                  and to the charges imposed by the relevant suppliers, plus an amendment fee.
                </li>
                <li>
                  We reserve the right to make reasonable changes to your itinerary, hotel or flight where
                  circumstances beyond our control require it. Where a change is significant, we will inform you
                  as soon as practicable and offer the closest available alternative.
                </li>
              </ul>

              <h2>6. Passports, Visas &amp; Travel Documents</h2>
              <ul>
                <li>
                  It is your responsibility to hold a passport valid for at least six months beyond your date of
                  travel, with sufficient blank pages, and to provide all documents we request on time.
                </li>
                <li>
                  While we process visa applications on your behalf with care and expertise, the grant or refusal
                  of any visa is the sole decision of the relevant embassy, consulate or immigration authority. A
                  visa refusal is not the fault of, and is beyond the control of, Inter Gulf Travels.
                </li>
                <li>
                  We are not liable for any loss arising from a visa delay or refusal, from incorrect or
                  incomplete documents supplied by you, or from your being refused boarding or entry by an
                  airline or immigration authority.
                </li>
                <li>
                  You are responsible for complying with all health requirements, including any vaccinations
                  (such as the meningitis vaccine required for Hajj and Umrah) and any rules issued by the Saudi
                  or Bangladeshi authorities.
                </li>
              </ul>

              <h2>7. Conduct During Travel</h2>
              <p>
                You agree to behave respectfully, to follow the lawful instructions of our guides and group
                leaders, to observe the laws and customs of the countries you visit, and to respect the sanctity
                of the holy sites. We may, without liability, decline to continue providing services to any
                person whose behaviour endangers others or seriously disrupts a group, and no refund will be due
                in such cases.
              </p>

              <h2>8. Force Majeure</h2>
              <p>
                Inter Gulf Travels shall not be liable for any failure or delay in performing its obligations
                where such failure or delay results from events beyond our reasonable control. These include, but
                are not limited to, acts of God, natural disasters, epidemics or pandemics, war, terrorism, civil
                unrest, strikes, government action, changes to Hajj or Umrah quotas or rules, airline schedule
                changes or cancellations, airspace or border closures, and adverse weather. In such
                circumstances, any refund is limited to amounts we are able to recover from the relevant
                suppliers.
              </p>

              <h2>9. Limitation of Liability</h2>
              <ul>
                <li>
                  Inter Gulf Travels acts as an agent that arranges and coordinates services provided by Third
                  Party Suppliers. We exercise reasonable care in selecting and arranging these services, but we
                  do not own or operate the airlines, hotels, transport or facilities concerned.
                </li>
                <li>
                  We are not liable for the acts, omissions, delays, defaults or negligence of any Third Party
                  Supplier, nor for loss, damage, injury, illness or death not caused by our own negligence.
                </li>
                <li>
                  We are not responsible for loss of or damage to personal belongings, money or documents. You
                  are strongly advised to arrange appropriate travel and medical insurance.
                </li>
                <li>
                  To the maximum extent permitted by law, our total liability in connection with any booking
                  shall not exceed the total amount paid by you to us for the affected service.
                </li>
              </ul>

              <h2>10. Insurance</h2>
              <p>
                Travel and medical insurance is not automatically included in our packages unless expressly
                stated. We strongly recommend that every traveller obtains adequate insurance covering medical
                expenses, repatriation, cancellation and personal belongings for the full duration of the trip.
              </p>

              <h2>11. Complaints</h2>
              <p>
                If a problem arises during your trip, please raise it immediately with your guide or group leader
                and contact our office so that we can try to resolve it on the spot. Any complaint that cannot be
                resolved at the time should be submitted to us in writing within 30 days of your return, so that
                we can investigate it fully.
              </p>

              <h2>12. Governing Law &amp; Jurisdiction</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the People&apos;s
                Republic of Bangladesh. Any dispute arising out of or in connection with these Terms or your
                booking shall be subject to the exclusive jurisdiction of the competent courts of Dhaka,
                Bangladesh.
              </p>

              <h2>13. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time to reflect changes in law, regulation or our
                practices. The version in force at the time of your booking applies to that booking. We encourage
                you to review this page periodically.
              </p>

              <h2>14. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at{' '}
                <a href={`mailto:${contact.emails[0]}`}>{contact.emails[0]}</a>, call{' '}
                <a href={`tel:${contact.phones[0].replace(/\s/g, '')}`}>{contact.phones[0]}</a>, or visit us at{' '}
                {contact.address.full}.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
