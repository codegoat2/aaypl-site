import { useState, FormEvent } from 'react'
import { ArrowRight, CheckCircle2, HeartHandshake, Globe, Users, BookOpen, Building, AlertCircle } from 'lucide-react'
import SEOHead from '../components/ui/SEOHead'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Toast from '../components/ui/Toast'
import { supabase } from '../lib/supabase'
import { useScrollAnimation } from '../lib/useScrollAnimation'

function AnimatedSection({ children, className = '', delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number
}) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const partnerTypes = [
  { icon: <Building size={20} />, title: 'Governments & Public Institutions', desc: 'Ministries, parliaments, public agencies, and government bodies that share AAYPL\'s commitment to youth leadership and democratic governance.' },
  { icon: <Users size={20} />, title: 'Civil Society Organizations', desc: 'NGOs, advocacy groups, foundations, and civic organizations working in democracy, governance, youth, and development.' },
  { icon: <Globe size={20} />, title: 'International & Regional Bodies', desc: 'Continental and international organizations including the African Union, regional economic communities, and the United Nations system.' },
  { icon: <BookOpen size={20} />, title: 'Universities & Research Institutions', desc: 'Academic and research institutions that contribute to AAYPL\'s policy, research, and leadership development agenda.' },
  { icon: <HeartHandshake size={20} />, title: 'Development Partners', desc: 'Development finance institutions, bilateral donors, and development foundations that support youth leadership and good governance.' },
  { icon: <Building size={20} />, title: 'Private Sector', desc: 'Businesses, corporations, and private sector institutions aligned with AAYPL\'s mission of African development and youth empowerment.' },
]

const partnershipTypes = [
  'Programme Partnership',
  'Research & Policy Partnership',
  'Event Sponsorship',
  'Training & Capacity Building',
  'Funding & Grant Support',
  'Media & Communications',
  'Institutional Membership',
  'Other',
]

const africaCountries = [
  'Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cabo Verde','Cameroon',
  'Central African Republic','Chad','Comoros','Democratic Republic of Congo','Republic of Congo',
  "Côte d'Ivoire",'Djibouti','Egypt','Equatorial Guinea','Eritrea','Eswatini','Ethiopia',
  'Gabon','Gambia','Ghana','Guinea','Guinea-Bissau','Kenya','Lesotho','Liberia','Libya',
  'Madagascar','Malawi','Mali','Mauritania','Mauritius','Morocco','Mozambique','Namibia',
  'Niger','Nigeria','Rwanda','São Tomé and Príncipe','Senegal','Seychelles','Sierra Leone',
  'Somalia','South Africa','South Sudan','Sudan','Tanzania','Togo','Tunisia','Uganda',
  'Zambia','Zimbabwe',
]

interface FormData {
  organization_name: string
  country: string
  contact_person: string
  email: string
  organization_type: string
  partnership_interest: string
  message: string
}

const initial: FormData = {
  organization_name: '', country: '', contact_person: '',
  email: '', organization_type: '', partnership_interest: '', message: '',
}

type Errors = Partial<Record<keyof FormData, string>>

function validate(d: FormData): Errors {
  const e: Errors = {}
  if (!d.organization_name.trim()) e.organization_name = 'Organization name is required.'
  if (!d.country) e.country = 'Country is required.'
  if (!d.contact_person.trim()) e.contact_person = 'Contact person name is required.'
  if (!d.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = 'A valid email address is required.'
  if (!d.organization_type) e.organization_type = 'Please select your organization type.'
  if (!d.partnership_interest) e.partnership_interest = 'Please select a partnership interest.'
  if (!d.message.trim() || d.message.trim().length < 30) e.message = 'Please provide a message of at least 30 characters.'
  return e
}

function sanitize(v: string) { return v.replace(/[<>]/g, '').trim() }

export default function PartnershipsPage() {
  const [formData, setFormData] = useState<FormData>(initial)
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(p => ({ ...p, [name]: value }))
    if (errors[name as keyof FormData]) setErrors(p => ({ ...p, [name]: undefined }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const v = validate(formData)
    if (Object.keys(v).length > 0) { setErrors(v); return }
    setSubmitting(true)
    try {
      const { error } = await supabase.from('partnership_inquiries').insert({
        organization_name: sanitize(formData.organization_name),
        country: sanitize(formData.country),
        contact_person: sanitize(formData.contact_person),
        email: sanitize(formData.email.toLowerCase()),
        organization_type: formData.organization_type,
        partnership_interest: formData.partnership_interest,
        message: sanitize(formData.message),
      })
      if (error) throw error
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setToast({ type: 'error', message: 'Unable to submit at this time. Please try again or contact us directly.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <>
        <SEOHead title="Partnerships – AAYPL" description="Partner with AAYPL." path="/partnerships" />
        <PageHero label="Partnerships" title="Inquiry Received" breadcrumbs={[{ label: 'Partnerships' }]} />
        <section className="section-padding bg-white">
          <div className="container-narrow text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={36} className="text-emerald-600" />
            </div>
            <h2 className="font-heading font-bold text-navy-900 text-3xl mb-4">Thank You for Reaching Out</h2>
            <p className="text-charcoal-600 text-base leading-relaxed mb-8">
              Your partnership inquiry has been received. A member of the AAYPL team will review your submission and be in touch with you in due course.
            </p>
            <a href="/" className="btn-primary-navy px-8 py-3.5">Return to Homepage</a>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEOHead
        title="Partner With AAYPL – Partnerships & Cooperation"
        description="Partner with the All Africa Young Political Leaders Organization. AAYPL welcomes partnerships with governments, civil society, universities, international organizations, and private sector partners."
        path="/partnerships"
      />

      {toast && (
        <div className="fixed top-24 right-4 z-50 w-full max-w-sm">
          <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
        </div>
      )}

      <PageHero
        label="Partnerships"
        title="Partner With AAYPL"
        subtitle="We believe in the power of collaboration to amplify impact. AAYPL welcomes partnerships that advance youth leadership and Africa's sustainable development."
        breadcrumbs={[{ label: 'Partnerships' }]}
      />

      {/* Why partner */}
      <section className="section-padding bg-white" aria-labelledby="why-partner">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <SectionHeading
                label="Collaboration"
                title="Why Partner With AAYPL"
                subtitle="AAYPL's continental reach, credibility, and focus on youth leadership make it an ideal partner for organizations committed to Africa's development."
              />
              <div className="mt-8 space-y-4">
                {[
                  { title: 'Continental Reach', desc: 'Access to young leaders across all 54 African states through a single, credible platform.' },
                  { title: 'Mission Alignment', desc: 'Partners committed to democracy, governance, youth, and development will find natural alignment with AAYPL.' },
                  { title: 'Non-Partisan Independence', desc: 'AAYPL\'s non-partisan character ensures partnerships are built on substance, not political affiliation.' },
                  { title: 'Programme Impact', desc: 'Partnerships support concrete programmes that directly develop young African leaders.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-navy-900">{title}: </span>
                      <span className="text-sm text-charcoal-500">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={120}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {partnerTypes.map(({ icon, title, desc }, idx) => (
                  <div key={title} className="card p-5 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="w-9 h-9 rounded-xl bg-navy-900/8 flex items-center justify-center text-navy-900 mb-3">{icon}</div>
                    <h3 className="font-heading font-bold text-navy-900 text-sm mb-1">{title}</h3>
                    <p className="text-charcoal-400 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Partnership framework */}
      <section className="section-padding bg-navy-950" aria-labelledby="partnership-framework">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              label="Framework"
              title="Our Partnership Approach"
              subtitle="All AAYPL partnerships are governed by the organization's constitutional principles and must be consistent with its non-partisan character."
              variant="light"
              align="center"
            />
          </AnimatedSection>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '01', title: 'Inquiry', desc: 'Submit a partnership inquiry through this page.' },
              { step: '02', title: 'Review', desc: 'AAYPL reviews the inquiry for mission alignment and constitutional compliance.' },
              { step: '03', title: 'Dialogue', desc: 'A conversation with the AAYPL team to explore the partnership scope.' },
              { step: '04', title: 'Agreement', desc: 'A formal Memorandum of Understanding or partnership agreement is executed.' },
            ].map(({ step, title, desc }, i) => (
              <AnimatedSection key={step} delay={i * 80}>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/8">
                  <span className="text-3xl font-black text-gold-500/40 font-heading">{step}</span>
                  <h3 className="font-heading font-bold text-white text-sm mt-2 mb-1.5">{title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding bg-cream-100" aria-labelledby="partnership-form">
        <div className="container-narrow">
          <AnimatedSection>
            <SectionHeading
              label="Get in Touch"
              title="Start a Partnership Conversation"
              subtitle="Complete the form below and the AAYPL team will be in touch to explore how we can work together."
              align="center"
            />
          </AnimatedSection>

          <AnimatedSection>
            <div className="mt-8 p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
              <AlertCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-800 leading-relaxed">
                All partnership inquiries are subject to review by AAYPL's leadership in accordance with Article 20 of the Constitution. Submission of this form does not constitute a binding commitment by either party.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <form onSubmit={handleSubmit} noValidate className="mt-8 card p-8 lg:p-10" aria-label="Partnership inquiry form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Org name */}
                <div className="md:col-span-2">
                  <label htmlFor="organization_name" className="form-label">Organization Name <span className="text-red-500">*</span></label>
                  <input id="organization_name" name="organization_name" type="text" className={`form-input ${errors.organization_name ? 'border-red-400' : ''}`} placeholder="Your organization's full name" value={formData.organization_name} onChange={handleChange} aria-required="true" aria-invalid={!!errors.organization_name} />
                  {errors.organization_name && <p className="mt-1.5 text-xs text-red-600" role="alert">{errors.organization_name}</p>}
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="p_country" className="form-label">Country <span className="text-red-500">*</span></label>
                  <select id="p_country" name="country" className={`form-input ${errors.country ? 'border-red-400' : ''}`} value={formData.country} onChange={handleChange} aria-required="true">
                    <option value="">Select country</option>
                    {africaCountries.map(c => <option key={c} value={c}>{c}</option>)}
                    <option value="Other">Other</option>
                  </select>
                  {errors.country && <p className="mt-1.5 text-xs text-red-600" role="alert">{errors.country}</p>}
                </div>

                {/* Contact person */}
                <div>
                  <label htmlFor="contact_person" className="form-label">Contact Person <span className="text-red-500">*</span></label>
                  <input id="contact_person" name="contact_person" type="text" className={`form-input ${errors.contact_person ? 'border-red-400' : ''}`} placeholder="Full name of contact" value={formData.contact_person} onChange={handleChange} aria-required="true" />
                  {errors.contact_person && <p className="mt-1.5 text-xs text-red-600" role="alert">{errors.contact_person}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="p_email" className="form-label">Email Address <span className="text-red-500">*</span></label>
                  <input id="p_email" name="email" type="email" className={`form-input ${errors.email ? 'border-red-400' : ''}`} placeholder="contact@organization.org" value={formData.email} onChange={handleChange} aria-required="true" />
                  {errors.email && <p className="mt-1.5 text-xs text-red-600" role="alert">{errors.email}</p>}
                </div>

                {/* Org type */}
                <div>
                  <label htmlFor="organization_type" className="form-label">Organization Type <span className="text-red-500">*</span></label>
                  <select id="organization_type" name="organization_type" className={`form-input ${errors.organization_type ? 'border-red-400' : ''}`} value={formData.organization_type} onChange={handleChange} aria-required="true">
                    <option value="">Select type</option>
                    {['Government / Public Institution','Civil Society Organization','Youth Organization','University / Research Institution','International / Regional Organization','Private Sector','Development Partner / Foundation','Media Organization','Other'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.organization_type && <p className="mt-1.5 text-xs text-red-600" role="alert">{errors.organization_type}</p>}
                </div>

                {/* Partnership interest */}
                <div>
                  <label htmlFor="partnership_interest" className="form-label">Partnership Interest <span className="text-red-500">*</span></label>
                  <select id="partnership_interest" name="partnership_interest" className={`form-input ${errors.partnership_interest ? 'border-red-400' : ''}`} value={formData.partnership_interest} onChange={handleChange} aria-required="true">
                    <option value="">Select interest</option>
                    {partnershipTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.partnership_interest && <p className="mt-1.5 text-xs text-red-600" role="alert">{errors.partnership_interest}</p>}
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label htmlFor="p_message" className="form-label">Message <span className="text-red-500">*</span></label>
                  <textarea id="p_message" name="message" rows={5} className={`form-input resize-none ${errors.message ? 'border-red-400' : ''}`} placeholder="Describe the partnership you have in mind — your organization's work, what you hope to achieve through the partnership, and any other relevant details." value={formData.message} onChange={handleChange} aria-required="true" />
                  {errors.message && <p className="mt-1.5 text-xs text-red-600" role="alert">{errors.message}</p>}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto px-10 py-4">
                  {submitting ? (
                    <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Submitting...</>
                  ) : <>Start a Partnership Conversation <ArrowRight size={16} /></>}
                </button>
                <p className="text-xs text-charcoal-400">All inquiries are reviewed by AAYPL's leadership.</p>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* No fake logos notice */}
      <section className="section-padding-sm bg-white" aria-label="Partner logos">
        <div className="container-wide text-center">
          <p className="text-charcoal-400 text-sm italic">
            AAYPL partner logos and institutional affiliations will be displayed here upon formal establishment of partnerships. We do not display unconfirmed or fabricated partner logos.
          </p>
        </div>
      </section>
    </>
  )
}
