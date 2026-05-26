'use client'

import { useState, useEffect, type FormEvent } from 'react'
import { Mail, GitBranch, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import FAQAccordion from '@/components/ui/FAQAccordion'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const SUBJECTS = [
  'Bug Report',
  'Feature Request',
  'Tool Not Working',
  'General Question',
  'Other',
]

const FAQ_ITEMS = [
  {
    question: 'How do I report a bug with one of the tools?',
    answer: 'Use the contact form above and select "Bug Report" as the subject. Describe what tool you were using, what happened, and what browser and device you are on. This helps us fix issues faster.',
  },
  {
    question: 'Can I suggest a new FPS testing tool?',
    answer: 'Yes. Select "Feature Request" from the subject dropdown and describe the tool you want. We review all suggestions and add the most requested tools to our roadmap.',
  },
  {
    question: 'Is FPS Test free to use?',
    answer: 'Yes, all tools on fpstest.pro are completely free. No signup, no download, no payment required ever.',
  },
  {
    question: 'Why is a tool not working on my device?',
    answer: 'Most issues are browser or device specific. Try Chrome or Edge first as they have the best support for the canvas and requestAnimationFrame APIs we use. Make sure your browser is up to date.',
  },
]

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '0.75rem',
  border: '1px solid var(--border-color)',
  backgroundColor: 'var(--bg-card)',
  color: 'var(--text-primary)',
  fontSize: '0.9375rem',
  outline: 'none',
  boxSizing: 'border-box' as const,
  transition: 'border-color 0.15s',
}

const labelStyle = {
  color: 'var(--text-secondary)',
  fontSize: '0.875rem',
  fontWeight: 600,
  display: 'block',
  marginBottom: '0.375rem',
}

const infoIconWrap = {
  width: '2.25rem',
  height: '2.25rem',
  borderRadius: '0.5rem',
  backgroundColor: 'rgba(0, 200, 100, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

function InfoCard({
  icon,
  label,
  children,
  note,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
  note: string
}) {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '0.75rem',
        padding: '1rem 1.25rem',
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
      }}
    >
      <div style={infoIconWrap}>{icon}</div>
      <div>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            margin: '0 0 0.125rem',
          }}
        >
          {label}
        </p>
        {children}
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', margin: '0.125rem 0 0' }}>
          {note}
        </p>
      </div>
    </div>
  )
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState('submitting')
    setErrorMsg('')

    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim()
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()
    const subject = (form.elements.namedItem('subject') as HTMLSelectElement).value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim()

    if (!name || !email || !subject || !message) {
      setFormState('error')
      setErrorMsg('Please fill in all fields.')
      return
    }
    if (!email.includes('@') || !email.includes('.')) {
      setFormState('error')
      setErrorMsg('Please enter a valid email address.')
      return
    }
    if (message.length < 20) {
      setFormState('error')
      setErrorMsg('Message must be at least 20 characters.')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to send')
      setFormState('success')
    } catch {
      setFormState('error')
      setErrorMsg('Something went wrong. Please try again or email us directly at contact@fpstest.pro')
    }
  }

  if (formState === 'success') {
    return (
      <div
        style={{
          backgroundColor: 'var(--bg-primary)',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 1.25rem',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <CheckCircle
            size={52}
            style={{ color: 'var(--accent)', margin: '0 auto 1.25rem', display: 'block' }}
          />
          <h2
            style={{
              color: 'var(--text-primary)',
              fontSize: '1.75rem',
              fontWeight: 800,
              margin: '0 0 0.75rem',
            }}
          >
            Message Sent!
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, margin: '0 0 2rem' }}>
            Thanks for reaching out. We usually reply within 24 hours.
          </p>
          <button
            onClick={() => {
              setFormState('idle')
              setErrorMsg('')
            }}
            style={{
              padding: '0.75rem 1.75rem',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: 'var(--accent)',
              color: '#000000',
              fontWeight: 700,
              fontSize: '0.9375rem',
            }}
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      <style>{`@keyframes contact-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.25rem 5rem' }}>
        <h1
          style={{
            color: 'var(--text-primary)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            margin: '0 0 0.75rem',
          }}
        >
          Contact Us
        </h1>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            lineHeight: 1.7,
            margin: '0 0 3rem',
            maxWidth: '520px',
          }}
        >
          Have a question about one of our tools? Found a bug? We read every message and try to
          respond within 24 hours.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '3fr 2fr',
            gap: isMobile ? '3rem' : '4rem',
            alignItems: 'start',
          }}
        >
          {/* LEFT: Form */}
          <div>
            {formState === 'error' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.625rem',
                  backgroundColor: 'rgba(255, 77, 77, 0.08)',
                  border: '1px solid rgba(255, 77, 77, 0.3)',
                  borderRadius: '0.75rem',
                  padding: '0.875rem 1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <AlertCircle size={16} style={{ color: '#ff4d4d', flexShrink: 0, marginTop: '0.1rem' }} />
                <p style={{ color: '#ff4d4d', fontSize: '0.875rem', margin: 0 }}>{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label htmlFor="name" style={labelStyle}>Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  disabled={formState === 'submitting'}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-color)' }}
                />
              </div>

              <div>
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  disabled={formState === 'submitting'}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-color)' }}
                />
              </div>

              <div>
                <label htmlFor="subject" style={labelStyle}>Subject</label>
                <select
                  id="subject"
                  name="subject"
                  required
                  defaultValue=""
                  disabled={formState === 'submitting'}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-color)' }}
                >
                  <option value="" disabled>Select a subject...</option>
                  {SUBJECTS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" style={labelStyle}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Describe your issue or question in detail..."
                  disabled={formState === 'submitting'}
                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-color)' }}
                />
              </div>

              <button
                type="submit"
                disabled={formState === 'submitting'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0.875rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: formState === 'submitting' ? 'not-allowed' : 'pointer',
                  backgroundColor: 'var(--accent)',
                  color: '#000000',
                  fontWeight: 700,
                  fontSize: '1rem',
                  opacity: formState === 'submitting' ? 0.7 : 1,
                  transition: 'opacity 0.15s',
                }}
              >
                {formState === 'submitting' ? (
                  <>
                    <Loader2
                      size={18}
                      style={{ animation: 'contact-spin 1s linear infinite' }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: Info + FAQ */}
          <div>
            <h2
              style={{
                color: 'var(--text-primary)',
                fontSize: '1.25rem',
                fontWeight: 700,
                margin: '0 0 0.75rem',
              }}
            >
              Get in Touch
            </h2>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                margin: '0 0 1.5rem',
              }}
            >
              Have a question about one of our tools? Found a bug? Want to suggest a new gaming
              test? We read every message and try to respond within 24 hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
              <InfoCard
                icon={<Mail size={16} style={{ color: 'var(--accent)' }} />}
                label="Email"
                note="For direct contact and bug reports"
              >
                <a
                  href="mailto:contact@toolsbracker.com"
                  style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', display: 'block' }}
                >
                  contact@toolsbracker.com
                </a>
              </InfoCard>

              <InfoCard
                icon={<GitBranch size={16} style={{ color: 'var(--accent)' }} />}
                label="GitHub"
                note="For feature requests and bug tracking"
              >
                <a
                  href="https://github.com/shakoormalik7656/fpstest/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', display: 'block' }}
                >
                  Open an Issue
                </a>
              </InfoCard>

              <InfoCard
                icon={<Clock size={16} style={{ color: 'var(--accent)' }} />}
                label="Response Time"
                note="We read every message"
              >
                <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>
                  Within 24 hours
                </p>
              </InfoCard>
            </div>

            <h2
              style={{
                color: 'var(--text-primary)',
                fontSize: '1.25rem',
                fontWeight: 700,
                margin: '0 0 1rem',
              }}
            >
              Frequently Asked Questions
            </h2>
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </div>
    </div>
  )
}
