import type { Metadata } from 'next'
import type { CSSProperties } from 'react'

export const metadata: Metadata = {
  title: 'Privacy Policy — FPS Test',
  description:
    'Privacy policy for fpstest.pro. We do not collect personal data, require signup, or use tracking cookies.',
  alternates: { canonical: 'https://fpstest.pro/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy — FPS Test',
    description: 'Privacy policy for fpstest.pro. We do not collect personal data, require signup, or use tracking cookies.',
    url: 'https://fpstest.pro/privacy-policy',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FPS Test - Free Online FPS Tester' }],
  },
}

const WRAP: CSSProperties = { maxWidth: '720px', margin: '0 auto', padding: '3rem 1.25rem' }
const H1:   CSSProperties = { color: 'var(--text-primary)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.5rem' }
const H2:   CSSProperties = { color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 700, margin: '2rem 0 0.75rem' }
const P:    CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.9375rem', margin: '0 0 1rem' }
const MUTED: CSSProperties = { color: 'var(--text-muted)', fontSize: '0.875rem', margin: '0 0 2rem' }

export default function PrivacyPolicyPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div style={WRAP}>
        <h1 style={H1}>Privacy Policy</h1>
        <p style={MUTED}>Last updated: May 2025</p>

        <h2 style={H2}>What Data We Collect</h2>
        <p style={P}>
          We do not collect personal data. There is no signup, no user accounts, and no registration required to use fpstest.pro. All tools run entirely in your browser and no results are sent to our servers.
        </p>

        <h2 style={H2}>Cookies</h2>
        <p style={P}>
          We use no tracking cookies. The only browser storage we use is localStorage to remember your theme preference (dark or light mode). This data stays on your device and is never transmitted anywhere.
        </p>

        <h2 style={H2}>Third Party Services</h2>
        <p style={P}>
          We do not currently run ads. If this changes in the future, this policy will be updated and users will be notified via an updated date above.
        </p>

        <h2 style={H2}>Contact</h2>
        <p style={P}>
          For privacy questions, contact us at <a href="/contact" style={{ color: 'var(--accent)' }}>fpstest.pro/contact</a>.
        </p>
      </div>
    </div>
  )
}
