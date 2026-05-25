import type { Metadata } from 'next'
import type { CSSProperties } from 'react'

export const metadata: Metadata = {
  title: 'Contact — FPS Test',
  description: 'Contact the FPS Test team. Send feedback, report bugs, or ask questions about our free browser-based gaming performance tools.',
  alternates: { canonical: 'https://fpstest.pro/contact' },
  openGraph: {
    title: 'Contact — FPS Test',
    description: 'Contact the FPS Test team. Send feedback, report bugs, or ask questions about our free browser-based gaming performance tools.',
    url: 'https://fpstest.pro/contact',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FPS Test - Free Online FPS Tester' }],
  },
}

const WRAP: CSSProperties = { maxWidth: '720px', margin: '0 auto', padding: '3rem 1.25rem' }
const H1:   CSSProperties = { color: 'var(--text-primary)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 1.5rem' }
const P:    CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.9375rem', margin: '0 0 1rem' }

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div style={WRAP}>
        <h1 style={H1}>Contact</h1>
        <p style={P}>
          For questions or feedback, email us or open an issue on GitHub.
        </p>
        <p style={P}>
          <a
            href="https://github.com/shakoor-malik/fpstest"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)', fontWeight: 600 }}
          >
            github.com/shakoor-malik/fpstest
          </a>
        </p>
      </div>
    </div>
  )
}
