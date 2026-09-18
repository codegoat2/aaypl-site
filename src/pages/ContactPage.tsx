import { useState, FormEvent } from 'react'
import { Mail, MapPin, Globe, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import SEOHead from '../components/ui/SEOHead'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Toast from '../components/ui/Toast'
import { supabase } from '../lib/supabase'
import { useScrollAnimation } from '../lib/useScrollAnimation'

function AnimatedSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

interface FormData {
  name: string; email: string; country: string; subject: string; message: string
}
const initial: FormData = { name: '', email: '', country: '', subject: '', message: '' }
type Errors = Partial<Record<keyof FormData, string>>

function validate(d: FormData): Errors {
  const e: Errors = {}
  if (!d.name.trim() || d.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!d.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = 'Please enter a valid email address.'
  if (!d.subject.trim() || d.subject.trim().length < 3) e.subject = 'Please enter a subject.'
  if (!d.message.trim() || d.message.trim().length < 20) e.message = 'Please provide a message of at least 20 characters.'
  return e
}
function sanitize(v: string) { return v.replace(/[<>]/g, '').trim() }

const africaCountries = ['Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cabo Verde','Cameroon','Central African Republic','Chad','Comoros','Democratic Republic of Congo','Republic of Congo',"Côte d'Ivoire",'Djibouti','Egypt','Equatorial Guinea','Eritrea','Eswatini','Ethiopia','Gabon','Gambia','Ghana','Guinea','Guinea-Bissau','Kenya','Lesotho','Liberia','Libya','Madagascar','Malawi','Mali','Mauritania','Mauritius','Morocco','Mozambique','Namibia','Niger','Nigeria','Rwanda','São Tomé and Príncipe','Senegal','Seychelles','Sierra Leone','Somalia','South Africa','South Sudan','Sudan','Tanzania','Togo','Tunisia','Uganda','Zambia','Zimbabwe']

export default function ContactPage() {
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
      const { error } = await supabase.from('contact_messages').insert({
        name: sanitize(formData.name),
        email: sanitize(formData.email.toLowerCase()),
        country: formData.country || null,
        subject: sanitize(formData.subject),
        message: sanitize(formData.message),
      })
      if (error) throw error
      setSubmitted(true)
    } catch {
      setToast({ type: 'error', message: 'Unable to send message at this time. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SEOHead
        title="Contact AAYPL – Get in Touch"
        description="Contact the All Africa Young Political Leaders Organization secretariat for inquiries, partnerships, media requests, and general correspondence."
        path="/contact"
      />

      {toast && (
        <div className="fixed top-24 right-4 z-50 w-full max-w-sm">
          <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
        </div>
      )}

      <PageHero
        label="Contact"
        title="Get In Touch"
        subtitle="Have a question, partnership inquiry, or media request? The AAYPL secretariat is here to help."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <AnimatedSection>
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-navy-900 text-xl mb-2">All Africa Young Political Leaders Organization</h2>
                  <p className="text-gold-600 text-xs font-bold uppercase tracking-widest italic mb-4">"Unity, Leadership, Integrity and Service"</p>
                </div>
                {[
                  { icon: <Mail size={18} />, label: 'Email', value: 'To be provided', sub: 'Official correspondence' },
                  { icon: <MapPin size={18} />, label: 'Headquarters', value: 'To be provided', sub: 'Registered address' },
                  { icon: <Globe size={18} />, label: 'Website', value: 'aaypl.site', sub: 'Official website' },
                ].map(({ icon, label, value, sub }) => (
                  <div key={label} className="flex items-start gap-4 p-4 rounded-xl bg-cream-100 border border-cream-200">
                    <div className="w-9 h-9 rounded-lg bg-navy-900 flex items-center justify-center text-white flex-shrink-0">{icon}</div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-0.5">{label}</p>
                      <p className="text-navy-900 font-semibold text-sm">{value}</p>
                      <p className="text-charcoal-400 text-xs">{sub}</p>
                    </div>
                  </div>
                ))}
                <div className="p-4 rounded-xl bg-gold-500/8 border border-gold-200">
                  <p className="text-xs font-bold text-gold-700 uppercase tracking-wider mb-1">Media Inquiries</p>
                  <p className="text-charcoal-600 text-xs leading-relaxed">For media, press, and interview requests, please use the contact form and select "Media Inquiry" as the subject.</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection delay={100} className="lg:col-span-2">
              {submitted ? (
                <div className="card p-10 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
                    <CheckCircle2 size={30} className="text-emerald-600" />
                  </div>
                  <h3 className="font-heading font-bold text-navy-900 text-2xl mb-3">Message Sent</h3>
                  <p className="text-charcoal-500 text-sm leading-relaxed max-w-sm">
                    Thank you for contacting AAYPL. Your message has been received and a member of our team will be in touch with you in due course.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors">
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="card p-8">
                  <div className="mb-6 p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-2">
                    <AlertCircle size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-800">Do not submit sensitive personal information through this form. For membership applications, please use the <a href="/membership" className="underline font-semibold">Membership page</a>.</p>
                  </div>
                  <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="c_name" className="form-label">Full Name <span className="text-red-500">*</span></label>
                        <input id="c_name" name="name" type="text" autoComplete="name" className={`form-input ${errors.name ? 'border-red-400' : ''}`} placeholder="Your full name" value={formData.name} onChange={handleChange} aria-required="true" aria-invalid={!!errors.name} />
                        {errors.name && <p className="mt-1.5 text-xs text-red-600" role="alert">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="c_email" className="form-label">Email <span className="text-red-500">*</span></label>
                        <input id="c_email" name="email" type="email" autoComplete="email" className={`form-input ${errors.email ? 'border-red-400' : ''}`} placeholder="your@email.com" value={formData.email} onChange={handleChange} aria-required="true" aria-invalid={!!errors.email} />
                        {errors.email && <p className="mt-1.5 text-xs text-red-600" role="alert">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="c_country" className="form-label">Country <span className="text-charcoal-400 font-normal text-xs">(optional)</span></label>
                        <select id="c_country" name="country" className="form-input" value={formData.country} onChange={handleChange}>
                          <option value="">Select country (optional)</option>
                          {africaCountries.map(c => <option key={c} value={c}>{c}</option>)}
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="c_subject" className="form-label">Subject <span className="text-red-500">*</span></label>
                        <input id="c_subject" name="subject" type="text" className={`form-input ${errors.subject ? 'border-red-400' : ''}`} placeholder="What is your message about?" value={formData.subject} onChange={handleChange} aria-required="true" aria-invalid={!!errors.subject} />
                        {errors.subject && <p className="mt-1.5 text-xs text-red-600" role="alert">{errors.subject}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="c_message" className="form-label">Message <span className="text-red-500">*</span></label>
                        <textarea id="c_message" name="message" rows={6} className={`form-input resize-none ${errors.message ? 'border-red-400' : ''}`} placeholder="Your message..." value={formData.message} onChange={handleChange} aria-required="true" aria-invalid={!!errors.message} />
                        {errors.message && <p className="mt-1.5 text-xs text-red-600" role="alert">{errors.message}</p>}
                      </div>
                    </div>
                    <div className="mt-6">
                      <button type="submit" disabled={submitting} className="btn-primary w-full py-4">
                        {submitting ? (
                          <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Sending...</>
                        ) : <>Send Message <ArrowRight size={16} /></>}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
