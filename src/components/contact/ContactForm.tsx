import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { CinematicButton } from '@/components/ui/CinematicButton'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)

  const validate = (data: FormState): FormErrors => {
    const errs: FormErrors = {}
    if (!data.name.trim()) errs.name = 'Please provide your name.'
    if (!data.email.trim()) {
      errs.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errs.email = 'Please provide a valid email address.'
    }
    if (!data.subject.trim()) errs.subject = 'Please enter a subject.'
    if (!data.message.trim()) {
      errs.message = 'Please include a message.'
    } else if (data.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.'
    }
    return errs
  }

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validate(formData))
  }

  const handleChange = (field: keyof FormState, value: string) => {
    const nextData = { ...formData, [field]: value }
    setFormData(nextData)
    if (touched[field]) {
      setErrors(validate(nextData))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setHasAttemptedSubmit(true)
    const errs = validate(formData)
    setErrors(errs)

    if (Object.keys(errs).length === 0) {
      // Per instructions: Do NOT fake backend submission.
      // Transparently construct a mailto link so the user's email client opens with the verified fields!
      const subjectEncoded = encodeURIComponent(`[Portfolio Contact] ${formData.subject}`)
      const bodyEncoded = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )
      const mailtoUrl = `mailto:${profile.contact.email}?subject=${subjectEncoded}&body=${bodyEncoded}`
      window.location.href = mailtoUrl
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-md relative">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
        <div>
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider block">
            TRANSMISSION TERMINAL
          </span>
          <span className="font-mono text-[0.625rem] text-slate-500">
            DIRECT EMAIL RELAY (TRANSPARENT CLIENT DISPATCH)
          </span>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400" title="Relay Ready" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="contact-name" className="block font-mono text-xs text-slate-300 mb-1.5 font-medium">
            YOUR NAME <span className="text-cyan-400">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            placeholder="e.g. Alex Mercer"
            className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-black/50 text-slate-100 placeholder:text-slate-600 font-body text-sm focus:outline-none focus:border-cyan-400 transition-colors"
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1 font-mono text-xs text-rose-400">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="contact-email" className="block font-mono text-xs text-slate-300 mb-1.5 font-medium">
            YOUR EMAIL <span className="text-cyan-400">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            placeholder="alex@example.com"
            className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-black/50 text-slate-100 placeholder:text-slate-600 font-body text-sm focus:outline-none focus:border-cyan-400 transition-colors"
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1 font-mono text-xs text-rose-400">
              {errors.email}
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="contact-subject" className="block font-mono text-xs text-slate-300 mb-1.5 font-medium">
            SUBJECT <span className="text-cyan-400">*</span>
          </label>
          <input
            id="contact-subject"
            type="text"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            onBlur={() => handleBlur('subject')}
            aria-required="true"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
            placeholder="Software Collaboration / Technical Discussion"
            className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-black/50 text-slate-100 placeholder:text-slate-600 font-body text-sm focus:outline-none focus:border-cyan-400 transition-colors"
          />
          {errors.subject && (
            <p id="contact-subject-error" className="mt-1 font-mono text-xs text-rose-400">
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="contact-message" className="block font-mono text-xs text-slate-300 mb-1.5 font-medium">
            MESSAGE <span className="text-cyan-400">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={4}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            placeholder="Describe your inquiry, project scope, or opportunity..."
            className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-black/50 text-slate-100 placeholder:text-slate-600 font-body text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-y"
          />
          {errors.message && (
            <p id="contact-message-error" className="mt-1 font-mono text-xs text-rose-400">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <CinematicButton
            variant="primary"
            size="md"
            className="w-full sm:w-auto"
            ariaLabel="Send validated message via mailto"
          >
            PREPARE & SEND MESSAGE &rarr;
          </CinematicButton>

          <a
            href={`mailto:${profile.contact.email}`}
            className="font-mono text-xs text-slate-400 hover:text-cyan-300 transition-colors text-center sm:text-right"
          >
            or email me directly: <span className="text-cyan-400">{profile.contact.email}</span>
          </a>
        </div>

        {/* Architecture Notice (Per requirement: Transparent, no fake backend claims) */}
        <p className="font-mono text-[0.625rem] text-slate-500 pt-3 border-t border-white/5 text-center sm:text-left">
          * Transparent Client Dispatch: Validates your input and drafts directly into your default email client with all headers pre-filled.
        </p>
      </form>
    </div>
  )
}
