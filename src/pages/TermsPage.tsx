import SEOHead from '../components/ui/SEOHead'
import PageHero from '../components/ui/PageHero'

const sections: { title: string; content: string; bullets?: string[] }[] = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing or using the AAYPL website at aaypl.site, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this website.',
  },
  {
    title: '2. About This Website',
    content: 'This website is operated by the All Africa Young Political Leaders Organization (AAYPL), a continental non-governmental, non-partisan organization. The website provides information about AAYPL, its mission, programmes, leadership, and membership, and facilitates applications and inquiries.',
  },
  {
    title: '3. Use of This Website',
    content: 'You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:',
    bullets: [
      'Use this website for any fraudulent or unlawful purpose',
      'Attempt to gain unauthorized access to any part of this website or its systems',
      'Transmit any malicious code, spam, or harmful content',
      'Misrepresent your identity or affiliation with any organization',
      'Use this website to make false or misleading statements about AAYPL',
    ],
  },
  {
    title: '4. Intellectual Property',
    content: 'All content on this website, including text, graphics, logos, and organizational materials, is the property of AAYPL or its content providers and is protected by applicable intellectual property law.\n\nYou may share links to AAYPL website pages. You may not reproduce, copy, or republish substantial portions of this website\'s content without prior written permission from AAYPL, except for fair dealing purposes such as personal use, research, or news reporting with proper attribution.',
  },
  {
    title: '5. Accuracy of Information',
    content: 'AAYPL makes reasonable efforts to ensure that information on this website is accurate and up to date. However, information on this website is provided for general informational purposes only and does not constitute legal, professional, or organizational advice. AAYPL reserves the right to update or remove any content at any time without notice.',
  },
  {
    title: '6. Membership Applications and Forms',
    content: 'Submission of a membership application, contact form, or partnership inquiry through this website does not create a binding commitment or contractual relationship between the user and AAYPL. Membership applications are subject to review and approval in accordance with the AAYPL Constitution.',
  },
  {
    title: '7. Links to External Websites',
    content: 'This website may contain links to external websites for convenience. AAYPL does not endorse or take responsibility for the content, accuracy, or practices of any external websites. Accessing external links is at your own risk.',
  },
  {
    title: '8. Non-Partisan Character',
    content: 'This website reflects the non-partisan, non-governmental character of AAYPL. Nothing on this website should be construed as endorsement of any political party, political candidate, government, or partisan position. AAYPL supports democratic participation across all political persuasions.',
  },
  {
    title: '9. Disclaimer of Warranties',
    content: 'This website is provided on an "as is" basis without any warranties of any kind, express or implied. AAYPL does not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.',
  },
  {
    title: '10. Limitation of Liability',
    content: 'To the maximum extent permitted by applicable law, AAYPL shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use this website.',
  },
  {
    title: '11. Governing Law',
    content: 'These Terms of Use shall be governed by and construed in accordance with applicable law. Any disputes arising in connection with these terms shall be subject to the jurisdiction of appropriate courts.',
  },
  {
    title: '12. Changes to Terms',
    content: 'AAYPL reserves the right to update these Terms of Use at any time. Continued use of the website after such changes constitutes your acceptance of the updated terms.',
  },
  {
    title: '13. Contact',
    content: 'If you have any questions about these Terms of Use, please contact us through the Contact page on this website.',
  },
]

export default function TermsPage() {
  return (
    <>
      <SEOHead
        title="Terms of Use – AAYPL"
        description="AAYPL's Terms of Use — the terms and conditions governing use of the AAYPL website."
        path="/terms"
      />
      <PageHero
        label="Legal"
        title="Terms of Use"
        subtitle="The terms and conditions that govern your use of the AAYPL website."
        breadcrumbs={[{ label: 'Terms of Use' }]}
      />
      <section className="section-padding bg-white" aria-labelledby="terms-content">
        <div className="container-narrow max-w-3xl mx-auto">
          <div className="mb-8 p-4 rounded-xl bg-cream-100 border border-cream-200">
            <p className="text-sm text-charcoal-600">
              <strong className="font-semibold">Last updated:</strong> 2026. By using the AAYPL website, you agree to these terms.
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
