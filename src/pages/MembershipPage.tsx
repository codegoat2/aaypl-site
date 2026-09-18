import { useState, FormEvent } from 'react'
import { CheckCircle2, Users, Star, Globe, Heart, Award, ArrowRight, AlertCircle } from 'lucide-react'
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

const membershipCategories = [
  {
    icon: <Star size={20} />,
    title: 'Founding Members',
    description: 'Young Africans who join AAYPL during the founding period and fulfil the qualifying criteria established in the Constitution. Founding membership is a distinct honour recognising early commitment to the organization.',
    eligibility: 'Subject to founding period criteria',
    accent: 'border-gold-400',
    highlight: true,
  },
  {
    icon: <Users size={20} />,
    title: 'Ordinary Members',
    description: 'Young Africans who join the organization after its establishment and meet the applicable membership criteria set out in the AAYPL Constitution and membership regulations.',
    eligibility: 'Open to eligible young Africans',
    accent: 'border-navy-900',
    highlight: false,
  },
  {
    icon: <Globe size={20} />,
    title: 'Associate Members',
    description: 'Individuals who support AAYPL\'s mission and values but do not fully qualify for ordinary membership. Associate members participate in programmes and activities but with defined limitations.',
    eligibility: 'Supporters of AAYPL mission',
    accent: 'border-charcoal-300',
    highlight: false,
  },
  {
    icon: <Award size={20} />,
    title: 'Honorary Members',
    description: 'Distinguished individuals conferred honorary membership by AAYPL\'s governing bodies in recognition of exceptional contributions to the organization\'s mission or to African leadership.',
    eligibility: 'By conferral only',
    accent: 'border-gold-500',
    highlight: false,
  },
  {
    icon: <Heart size={20} />,
    title: 'Institutional / Partner Members',
    description: 'Organizations, institutions, and bodies admitted as institutional members in accordance with the AAYPL Constitution. These partners share the organization\'s mission and contribute to its continental work.',
    eligibility: 'Organizations aligned with AAYPL mission',
    accent: 'border-emerald-600',
    highlight: false,
  },
]

const areasOfInterest = [
  'Leadership Development',
  'Democracy & Governance',
  'Youth Empowerment',
  'Peace & Dialogue',
  'Policy & Research',
  'Pan-African Networking',
  'Women in Leadership',
  'Constitutional & Legal Affairs',
  'International Relations',
  'Economic Development',
  'Environmental Governance',
  'Digital & Technology',
]

const africaCountries = [
  'Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cabo Verde','Cameroon',
  'Central African Republic','Chad','Comoros','Democratic Republic of Congo','Republic of Congo',
  'Côte d\'Ivoire','Djibouti','Egypt','Equatorial Guinea','Eritrea','Eswatini','Ethiopia',
  'Gabon','Gambia','Ghana','Guinea','Guinea-Bissau','Kenya','Lesotho','Liberia','Libya',
  'Madagascar','Malawi','Mali','Mauritania','Mauritius','Morocco','Mozambique','Namibia',
  'Niger','Nigeria','Rwanda','São Tomé and Príncipe','Senegal','Seychelles','Sierra Leone',
  'Somalia','South Africa','South Sudan','Sudan','Tanzania','Togo','Tunisia','Uganda',
  'Zambia','Zimbabwe',
]

interface FormData {
  full_name: string
  email: string
  phone: string
  country: string
  city: string
  date_of_birth: string
  occupation: string
  organization: string
  leadership_role: string
  membership_category: string
  areas_of_interest: string[]
  statement_of_interest: string
  linkedin_url: string
  agreed_to_constitution: boolean
  consented_to_privacy: boolean
}

const initialFormData: FormData = {
  full_name: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  date_of_birth: '',
  occupation: '',
  organization: '',
  leadership_role: '',
  membership_category: '',
  areas_of_interest: [],
  statement_of_interest: '',
  linkedin_url: '',
  agreed_to_constitution: false,
  consented_to_privacy: false,
}

type FormErrors = Partial<Record<keyof FormData, string>>

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.full_name.trim() || data.full_name.trim().length < 3) {
    errors.full_name = 'Please enter your full name (at least 3 characters).'
  }
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!data.country) {
    errors.country = 'Please select your country.'
  }
  if (!data.membership_category) {
    errors.membership_category = 'Please select a membership category.'
  }
  if (!data.statement_of_interest.trim() || data.statement_of_interest.trim().length < 50) {
    errors.statement_of_interest = 'Please provide a statement of at least 50 characters.'
  }
  if (!data.agreed_to_constitution) {
    errors.agreed_to_constitution = 'You must agree to the AAYPL Constitution to proceed.'
  }
  if (!data.consented_to_privacy) {
    errors.consented_to_privacy = 'You must consent to the privacy notice to proceed.'
  }
  return errors
}

function sanitize(value: string): string {
  return value.replace(/[<>]/g, '').trim()
}

export default function MembershipPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleInterestToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      areas_of_interest: prev.areas_of_interest.includes(area)
        ? prev.areas_of_interest.filter(a => a !== area)
        : [...prev.areas_of_interest, area],
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstError = document.querySelector('[aria-invalid="true"]')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from('membership_applications')
        .insert({
          full_name: sanitize(formData.full_name),
          email: sanitize(formData.email.toLowerCase()),
          phone: formData.phone ? sanitize(formData.phone) : null,
          country: sanitize(formData.country),
          city: formData.city ? sanitize(formData.city) : null,
          date_of_birth: formData.date_of_birth || null,
          occupation: formData.occupation ? sanitize(formData.occupation) : null,
          organization: formData.organization ? sanitize(formData.organization) : null,
          leadership_role: formData.leadership_role ? sanitize(formData.leadership_role) : null,
          membership_category: formData.membership_category,
          areas_of_interest: formData.areas_of_interest,
          statement_of_interest: sanitize(formData.statement_of_interest),
          linkedin_url: formData.linkedin_url ? sanitize(formData.linkedin_url) : null,
          agreed_to_constitution: formData.agreed_to_constitution,
          consented_to_privacy: formData.consented_to_privacy,
        })
      if (error) throw error
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Membership application error:', err)
      setToast({
        type: 'error',
        message: 'There was a problem submitting your application. Please try again or contact us directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <>
        <SEOHead title="Membership Application – AAYPL" description="Apply to join AAYPL." path="/membership" />
        <PageHero label="Membership" title="Application Received" breadcrumbs={[{ label: 'Membership' }]} />
        <section className="section-padding bg-white">
          <div className="container-narrow">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={36} className="text-emerald-600" aria-hidden="true" />
              </div>
              <h2 className="font-heading font-bold text-navy-900 text-3xl mb-4">
                Thank You for Your Application
              </h2>
              <p className="text-charcoal-600 text-base leading-relaxed mb-6">
                Thank you for your interest in AAYPL. Your application has been received and will be reviewed according to the organization's membership procedures as set out in the AAYPL Constitution.
              </p>
              <div className="bg-cream-100 rounded-2xl p-6 text-left mb-8 border border-cream-200">
                <h3 className="font-heading font-bold text-navy-900 text-sm mb-3">What Happens Next</h3>
                <ul className="space-y-2">
                  {[
                    'Your application will be reviewed by the AAYPL Membership Committee.',
                    'You may be contacted for additional information if required.',
                    'You will be notified of the outcome of your application.',
                    'Approved applicants will receive membership onboarding information.',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-gold-600 text-[10px] font-bold">{i + 1}</span>
                      </div>
                      <span className="text-charcoal-600 text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-charcoal-400 italic">
                  Note: Submission of this application does not automatically confer membership. Membership is subject to approval in accordance with the AAYPL Constitution.
                </p>
              </div>
              <a href="/" className="btn-primary-navy px-8 py-3.5">
                Return to Homepage
              </a>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEOHead
        title="Become a Member – AAYPL"
        description="Join AAYPL — become part of Africa's next generation of leaders. Apply for membership in the All Africa Young Political Leaders Organization."
        path="/membership"
      />

      {toast && (
        <div className="fixed top-24 right-4 z-50 w-full max-w-sm">
          <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
        </div>
      )}

      <PageHero
        label="Join AAYPL"
        title="Become Part of Africa's Next Generation of Leadership"
        subtitle="AAYPL welcomes young Africans who are committed to ethical leadership, democratic governance, and the sustainable development of Africa."
        breadcrumbs={[{ label: 'Membership' }]}
      />

      {/* Membership categories */}
      <section className="section-padding bg-white" aria-labelledby="categories-heading">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              label="Membership Categories"
              title="Who Can Join"
              subtitle="AAYPL membership is open to young Africans and supportive organizations committed to our constitution, mission, and values."
              align="center"
            />
          </AnimatedSection>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {membershipCategories.map(({ icon, title, description, eligibility, accent, highlight }, idx) => (
              <AnimatedSection key={title} delay={idx * 60}>
                <div className={`card p-6 h-full border-t-4 ${accent} hover:-translate-y-0.5 transition-all duration-300 ${highlight ? 'ring-1 ring-gold-300 ring-offset-2' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-navy-900/8 flex items-center justify-center text-navy-900 mb-4">
                    {icon}
                  </div>
                  <h3 className="font-heading font-bold text-navy-900 text-sm mb-2">{title}</h3>
                  <p className="text-charcoal-500 text-xs leading-relaxed mb-3">{description}</p>
                  <p className="text-[10px] font-bold text-gold-600 uppercase tracking-wider">{eligibility}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-cream-100" aria-labelledby="benefits-heading">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <SectionHeading
                label="Member Benefits"
                title="Why Join AAYPL"
              />
              <div className="mt-8 space-y-4">
                {[
                  { title: 'Continental Leadership Network', desc: 'Connect with young leaders across all 54 African states.' },
                  { title: 'Leadership Training & Development', desc: 'Access structured training, workshops, mentorship, and development programmes.' },
                  { title: 'Dialogue & Exchange', desc: 'Participate in continental summits, forums, and peer-learning exchanges.' },
                  { title: 'Policy & Research Access', desc: 'Access AAYPL research publications and contribute to policy discussions.' },
                  { title: 'Democratic Participation', desc: 'Vote and be eligible for leadership positions in accordance with the Constitution.' },
                  { title: 'Recognition & Visibility', desc: 'Gain recognition as part of Africa\'s foremost youth leadership platform.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-gold-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <span className="text-sm font-semibold text-navy-900">{title}: </span>
                      <span className="text-sm text-charcoal-500">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={120}>
              <div className="card p-8 bg-navy-900 text-white">
                <h3 className="font-heading font-bold text-white text-xl mb-4">Member Obligations</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  AAYPL membership carries responsibilities. Members are expected to:
                </p>
                <ul className="space-y-3">
                  {[
                    'Uphold the AAYPL Constitution and all organizational rules.',
                    'Observe the AAYPL Code of Conduct and ethical standards.',
                    'Pay applicable membership fees and dues.',
                    'Participate constructively in organizational activities.',
                    'Maintain the non-partisan character of AAYPL.',
                    'Respect the dignity and diversity of fellow members.',
                    'Not bring the organization into disrepute.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                      <span className="text-gold-400 font-bold flex-shrink-0">{i + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="section-padding bg-white" aria-labelledby="form-heading">
        <div className="container-narrow">
          <AnimatedSection>
            <SectionHeading
              label="Membership Application"
              title="Apply Now"
              subtitle="Complete this form to submit your membership application. All fields marked with * are required."
              align="center"
            />
          </AnimatedSection>

          {/* Privacy notice */}
          <AnimatedSection>
            <div className="mt-8 p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
              <AlertCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <p className="text-xs text-blue-800 leading-relaxed">
                <strong>Privacy Notice:</strong> The information you provide in this form will be used solely for the purpose of processing your AAYPL membership application. Your data will be handled in accordance with AAYPL's Privacy Policy. We will not share your personal information with third parties without your consent, except where required by law.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-10 card p-8 lg:p-10"
              aria-label="AAYPL Membership Application Form"
            >
              {/* Personal Information */}
              <fieldset className="mb-10">
                <legend className="font-heading font-bold text-navy-900 text-lg mb-6 pb-3 border-b border-charcoal-100 w-full">
                  Personal Information
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="md:col-span-2">
                    <label htmlFor="full_name" className="form-label">
                      Full Name <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      autoComplete="name"
                      className={`form-input ${errors.full_name ? 'border-red-400 focus:ring-red-400' : ''}`}
                      placeholder="Your full legal name"
                      value={formData.full_name}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.full_name}
                      aria-describedby={errors.full_name ? 'full_name-error' : undefined}
                    />
                    {errors.full_name && (
                      <p id="full_name-error" className="mt-1.5 text-xs text-red-600" role="alert">{errors.full_name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email Address <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={`form-input ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-red-600" role="alert">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className="form-input"
                      placeholder="+234 xxx xxx xxxx"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label htmlFor="country" className="form-label">
                      Country <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      className={`form-input ${errors.country ? 'border-red-400 focus:ring-red-400' : ''}`}
                      value={formData.country}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.country}
                      aria-describedby={errors.country ? 'country-error' : undefined}
                    >
                      <option value="">Select your country</option>
                      {africaCountries.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                      <option value="Other">Other (Non-African country of residence)</option>
                    </select>
                    {errors.country && (
                      <p id="country-error" className="mt-1.5 text-xs text-red-600" role="alert">{errors.country}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="city" className="form-label">City / State</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      className="form-input"
                      placeholder="Your city or state"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
                    <input
                      id="date_of_birth"
                      name="date_of_birth"
                      type="date"
                      className="form-input"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Professional Information */}
              <fieldset className="mb-10">
                <legend className="font-heading font-bold text-navy-900 text-lg mb-6 pb-3 border-b border-charcoal-100 w-full">
                  Professional Background
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="occupation" className="form-label">Occupation / Profession</label>
                    <input
                      id="occupation"
                      name="occupation"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Lawyer, Activist, Civil Servant"
                      value={formData.occupation}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="organization" className="form-label">Organization / Institution</label>
                    <input
                      id="organization"
                      name="organization"
                      type="text"
                      className="form-input"
                      placeholder="Current employer or institution"
                      value={formData.organization}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="leadership_role" className="form-label">
                      Political / Public Leadership Role <span className="text-charcoal-400 font-normal text-xs">(optional)</span>
                    </label>
                    <input
                      id="leadership_role"
                      name="leadership_role"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Member of Parliament, Party Youth Leader, Councillor"
                      value={formData.leadership_role}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Membership details */}
              <fieldset className="mb-10">
                <legend className="font-heading font-bold text-navy-900 text-lg mb-6 pb-3 border-b border-charcoal-100 w-full">
                  Membership Details
                </legend>
                <div className="space-y-6">
                  {/* Category */}
                  <div>
                    <label htmlFor="membership_category" className="form-label">
                      Membership Category <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <select
                      id="membership_category"
                      name="membership_category"
                      className={`form-input ${errors.membership_category ? 'border-red-400 focus:ring-red-400' : ''}`}
                      value={formData.membership_category}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.membership_category}
                      aria-describedby={errors.membership_category ? 'category-error' : undefined}
                    >
                      <option value="">Select category</option>
                      <option value="Founding Member">Founding Member</option>
                      <option value="Ordinary Member">Ordinary Member</option>
                      <option value="Associate Member">Associate Member</option>
                      <option value="Institutional / Partner Member">Institutional / Partner Member</option>
                    </select>
                    {errors.membership_category && (
                      <p id="category-error" className="mt-1.5 text-xs text-red-600" role="alert">{errors.membership_category}</p>
                    )}
                  </div>

                  {/* Areas of Interest */}
                  <div>
                    <span className="form-label block mb-2">Areas of Interest</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="group" aria-label="Select your areas of interest">
                      {areasOfInterest.map((area) => (
                        <label
                          key={area}
                          className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all duration-150 text-xs font-medium ${
                            formData.areas_of_interest.includes(area)
                              ? 'bg-navy-900 border-navy-900 text-white'
                              : 'border-charcoal-200 text-charcoal-600 hover:border-navy-900/40 hover:bg-cream-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={formData.areas_of_interest.includes(area)}
                            onChange={() => handleInterestToggle(area)}
                            aria-label={area}
                          />
                          <span className={`w-3 h-3 rounded border flex-shrink-0 flex items-center justify-center ${
                            formData.areas_of_interest.includes(area) ? 'bg-gold-500 border-gold-500' : 'border-charcoal-300'
                          }`} aria-hidden="true">
                            {formData.areas_of_interest.includes(area) && (
                              <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            )}
                          </span>
                          {area}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Statement */}
                  <div>
                    <label htmlFor="statement_of_interest" className="form-label">
                      Statement of Interest <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <textarea
                      id="statement_of_interest"
                      name="statement_of_interest"
                      rows={5}
                      className={`form-input resize-none ${errors.statement_of_interest ? 'border-red-400 focus:ring-red-400' : ''}`}
                      placeholder="In 100–300 words, tell us why you want to join AAYPL, your leadership experience, and what you hope to contribute to the organization and to Africa."
                      value={formData.statement_of_interest}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.statement_of_interest}
                      aria-describedby={errors.statement_of_interest ? 'statement-error' : 'statement-hint'}
                    />
                    <p id="statement-hint" className="mt-1.5 text-xs text-charcoal-400">
                      {formData.statement_of_interest.length} characters (minimum 50 required)
                    </p>
                    {errors.statement_of_interest && (
                      <p id="statement-error" className="mt-1 text-xs text-red-600" role="alert">{errors.statement_of_interest}</p>
                    )}
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label htmlFor="linkedin_url" className="form-label">
                      LinkedIn / Website <span className="text-charcoal-400 font-normal text-xs">(optional)</span>
                    </label>
                    <input
                      id="linkedin_url"
                      name="linkedin_url"
                      type="url"
                      className="form-input"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedin_url}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Agreements */}
              <fieldset className="mb-8">
                <legend className="font-heading font-bold text-navy-900 text-lg mb-6 pb-3 border-b border-charcoal-100 w-full">
                  Declarations & Consent
                </legend>
                <div className="space-y-5">
                  {/* Constitution agreement */}
                  <div>
                    <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors duration-150 ${
                      errors.agreed_to_constitution ? 'border-red-300 bg-red-50' : 'border-charcoal-200 hover:bg-cream-100'
                    }`}>
                      <input
                        type="checkbox"
                        name="agreed_to_constitution"
                        className="mt-0.5 w-4 h-4 accent-navy-900 flex-shrink-0"
                        checked={formData.agreed_to_constitution}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!errors.agreed_to_constitution}
                        aria-describedby={errors.agreed_to_constitution ? 'constitution-error' : undefined}
                      />
                      <span className="text-sm text-charcoal-700 leading-relaxed">
                        I have read or agree to read the{' '}
                        <a href="/constitution" target="_blank" className="text-navy-900 font-semibold underline hover:text-gold-600">
                          AAYPL Constitution
                        </a>{' '}
                        and I agree to be bound by its provisions if my membership application is approved. <span className="text-red-500" aria-label="required">*</span>
                      </span>
                    </label>
                    {errors.agreed_to_constitution && (
                      <p id="constitution-error" className="mt-1.5 text-xs text-red-600" role="alert">{errors.agreed_to_constitution}</p>
                    )}
                  </div>

                  {/* Privacy consent */}
                  <div>
                    <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors duration-150 ${
                      errors.consented_to_privacy ? 'border-red-300 bg-red-50' : 'border-charcoal-200 hover:bg-cream-100'
                    }`}>
                      <input
                        type="checkbox"
                        name="consented_to_privacy"
                        className="mt-0.5 w-4 h-4 accent-navy-900 flex-shrink-0"
                        checked={formData.consented_to_privacy}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!errors.consented_to_privacy}
                        aria-describedby={errors.consented_to_privacy ? 'privacy-error' : undefined}
                      />
                      <span className="text-sm text-charcoal-700 leading-relaxed">
                        I consent to AAYPL processing my personal data for the purpose of my membership application in accordance with the{' '}
                        <a href="/privacy" target="_blank" className="text-navy-900 font-semibold underline hover:text-gold-600">
                          Privacy Policy
                        </a>. <span className="text-red-500" aria-label="required">*</span>
                      </span>
                    </label>
                    {errors.consented_to_privacy && (
                      <p id="privacy-error" className="mt-1.5 text-xs text-red-600" role="alert">{errors.consented_to_privacy}</p>
                    )}
                  </div>
                </div>
              </fieldset>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto px-10 py-4 text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight size={16} aria-hidden="true" />
                    </>
                  )}
                </button>
                <p className="text-xs text-charcoal-400 text-center sm:text-left">
                  Application is subject to review. Submission does not guarantee membership.
                </p>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
