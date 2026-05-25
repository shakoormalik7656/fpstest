import type { Metadata } from 'next'
import type { CSSProperties } from 'react'

export const metadata: Metadata = {
  title: 'Terms of Service — FPS Test',
  description: 'Terms of service for fpstest.pro. All tools are free for personal use. No warranties. Results are estimates for informational purposes.',
  alternates: { canonical: 'https://fpstest.pro/terms-of-service' },
  openGraph: {
    title: 'Terms of Service — FPS Test',
    description: 'Terms of service for fpstest.pro. All tools are free for personal use. No warranties. Results are estimates for informational purposes.',
    url: 'https://fpstest.pro/terms-of-service',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FPS Test - Free Online FPS Tester' }],
  },
}

const WRAP: CSSProperties  = { maxWidth: '720px', margin: '0 auto', padding: '3rem 1.25rem' }
const H1:   CSSProperties  = { color: 'var(--text-primary)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.5rem' }
const H2:   CSSProperties  = { color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 700, margin: '2rem 0 0.75rem' }
const P:    CSSProperties  = { color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.9375rem', margin: '0 0 1rem' }
const MUTED: CSSProperties = { color: 'var(--text-muted)', fontSize: '0.875rem', margin: '0 0 2rem' }

export default function TermsOfServicePage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div style={WRAP}>
        <h1 style={H1}>Terms of Service</h1>
        <p style={MUTED}>Last updated: May 2025</p>

        <h2 style={H2}>Use of Tools</h2>
        <p style={P}>
          All tools on fpstest.pro are free for personal use. You may use any tool on this site for non-commercial purposes without restriction. Commercial redistribution of our tools or content requires written permission.
        </p>

        <h2 style={H2}>No Warranties</h2>
        <p style={P}>
          All tools are provided as-is. Results are estimates for informational purposes only. We make no guarantees about the accuracy of measurements. Frame rate results reflect browser rendering performance and may not match in-game or hardware performance.
        </p>

        <h2 style={H2}>Intellectual Property</h2>
        <p style={P}>
          All site content, tool designs, and written material are owned by FPS Test. You may not reproduce or republish our content without permission. Linking to any page on fpstest.pro is always allowed.
        </p>

        <h2 style={H2}>Contact</h2>
        <p style={P}>
          For questions about these terms, contact us at <a href="/contact" style={{ color: 'var(--accent)' }}>fpstest.pro/contact</a>.
        </p>
      </div>
    </div>
  )
}
