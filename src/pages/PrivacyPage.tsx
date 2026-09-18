import SEOHead from '../components/ui/SEOHead'
import PageHero from '../components/ui/PageHero'

const sections = [
  {
    title: '1. Who We Are',
    content: `The All Africa Young Political Leaders Organization (AAYPL) is a continental non-governmental, non-partisan organization. Our website is located at aaypl.site. When this Privacy Policy refers to "AAYPL", "we", "us", or "our", it refers to the All Africa Young Political Leaders Organization.`,
  },
  {
    title: '2. Information We Collect',
    content: `We collect information you provide directly to us, including when you submit a membership application, send us a message through our contact form, or submit a partnership inquiry.\n\nWe do not automatically collect personal data beyond standard server logs that may be retained by our hosting provider. We do not use tracking cookies or behavioral advertising tools.`,
    bullets: [
      'Membership applications — name, email, phone, country, occupation, and statement of interest',
      'Contact messages — name, email, country, subject, and message',
      'Partnership inquiries — organization name, contact details, and message',
    ],
  },
  {
    title: '3. How We Use Your Information',
    content: `We use the information you provide solely for the following purposes. We do not use your personal data for commercial marketing, profiling, or automated decision-making.`,
    bullets: [
      'Processing and reviewing membership applications in accordance with the AAYPL Constitution',
      'Responding to contact and partnership inquiries',
      'Communicating with you about your application or inquiry',
      'Maintaining organizational records in accordance with our governance obligations',
    ],
  },
  {
    title: '4. Legal Basis for Processing',
    content: `We process personal data on the following lawful bases:`,
    bullets: [
      'Your explicit consent, where required (e.g., the consent checkbox on our membership application form)',
      'Legitimate interests, where we need to process data to respond to your inquiry or manage our organizational affairs',
      'Compliance with legal obligations where applicable',
    ],
  },
  {
    title: '5. Data Sharing',
    content: `We do not sell, rent, or trade your personal data to third parties. We may share your data with our database infrastructure provider (Supabase) for data storage, and with AAYPL's authorized leadership and staff who need access to process your application or inquiry. All data processors engaged by AAYPL are required to handle personal data in accordance with applicable data protection law.`,
  },
  {
    title: '6. Data Retention',
    content: `We retain personal data only for as long as necessary for the purposes for which it was collected. Membership applications are retained for the duration of any membership and for a reasonable period thereafter. Contact messages are retained for a period sufficient to respond to and close your inquiry. You may request deletion of your data at any time (see Section 8).`,
  },
  {
    title: '7. Data Security',
    content: `We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Our data is stored using Supabase, which implements industry-standard security controls. However, no data transmission or storage system is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: '8. Your Rights',
    content: `You have the following rights regarding your personal data. To exercise any of these rights, please contact us through our contact page.`,
    bullets: [
      'Right of access: to request a copy of the personal data we hold about you',
      'Right to rectification: to request correction of inaccurate data',
      'Right to erasure: to request deletion of your personal data',
      'Right to restrict processing: to request that we limit how we use your data',
      'Right to withdraw consent: where processing is based on consent, to withdraw it at any time',
      'Right to lodge a complaint: with an applicable data protection authority',
    ],
  },
  {
    title: "9. Children's Privacy",
    content: `Our website and services are not directed at children under the age of 16. We do not knowingly collect personal data from children under 16. If you believe we have inadvertently collected data from a child, please contact us immediately.`,
  },
  {
    title: '10. Links to Other Websites',
    content: `Our website may contain links to external websites. This Privacy Policy does not apply to those websites. We encourage you to review the privacy policies of any external sites you visit.`,
  },
  {
    title: '11. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify users of material changes by updating the effective date at the top of this page. Continued use of our website after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '12. Contact Us',
    content: `If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us through the Contact page on this website.`,
  },
]

export default function PrivacyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy – AAYPL"
        description="AAYPL's Privacy Policy — how we collect, use, and protect your personal information."
        path="/privacy"
      />
      <PageHero
        label="Legal"
        title="Privacy Policy"
        subtitle="How AAYPL collects, uses, and protects your personal information."
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />
      <section className="section-padding bg-white" aria-labelledby="privacy-content">
        <div className="container-narrow max-w-3xl mx-auto">
          <div className="mb-8 p-4 rounded-xl bg-cream-100 border border-cream-200">
            <p className="text-sm text-charcoal-600">
              <strong className="font-semibold">Last updated:</strong> 2026. This policy applies to information collected through the AAYPL website at aaypl.site.
            </p>
          </div>
          <div className="space-y-10">
            {sections.map(({ title, content, bullets }) => (
              <div key={title}>
                <h2 className="font-heading font-bold text-navy-900 text-xl mb-4">{title}</h2>
                <div className="text-charcoal-600 text-sm leading-relaxed space-y-3">
                  {content.split('\n\n').filter(Boolean).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                  {bullets && bullets.length > 0 && (
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      {bullets.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
