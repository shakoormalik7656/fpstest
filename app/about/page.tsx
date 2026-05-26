import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About FPS Test — Free Browser Gaming Performance Tools',
  description:
    'FPS Test offers free browser-based gaming performance tools. No download, no signup. Six tools including FPS meter, UFO test and reaction test.',
  alternates: { canonical: 'https://fpstest.pro/about' },
  openGraph: {
    title: 'About FPS Test — Free Browser Gaming Performance Tools',
    description: 'FPS Test offers free browser-based gaming performance tools. No download, no signup. Six tools including FPS meter, UFO test and reaction test.',
    url: 'https://fpstest.pro/about',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FPS Test - Free Online FPS Tester' }],
  },
}

const TOOLS = [
  { name: 'FPS Meter',              href: '/tools/fps-test',         desc: 'Measure your real browser frame rate with live stats.' },
  { name: 'UFO Motion Test',        href: '/tools/ufo-test',         desc: 'See how much smoother high FPS looks at 30, 60, 120, and 144 FPS side by side.' },
  { name: 'Frame Rate Comparison',  href: '/tools/frame-comparison', desc: 'Compare any two frame rates side by side in real time.' },
  { name: 'FPS Reaction Test',      href: '/tools/fps-reaction-test',desc: 'Test your gaming reaction time in milliseconds.' },
  { name: 'Monitor Hz Detector',    href: '/tools/hz-detector',      desc: 'Check your actual screen refresh rate instantly.' },
  { name: 'Input Lag Test',         href: '/tools/input-lag-test',   desc: 'Measure your browser response latency in milliseconds.' },
]

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FPS Test',
  url: 'https://fpstest.pro',
  logo: 'https://fpstest.pro/favicon-512x512.png',
  description: 'Free browser-based gaming performance tools. No download, no signup.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'contact@toolsbracker.com',
    url: 'https://fpstest.pro/contact',
  },
}

const WRAP: CSSProperties  = { maxWidth: '720px', margin: '0 auto', padding: '3rem 1.25rem' }
const H1:   CSSProperties  = { color: 'var(--text-primary)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 2rem' }
const H2:   CSSProperties  = { color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 700, margin: '2rem 0 0.75rem' }
const P:    CSSProperties  = { color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.9375rem', margin: '0 0 1rem' }

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div style={WRAP}>
        <h1 style={H1}>About FPS Test</h1>

        <h2 style={H2}>What Is FPS Test?</h2>
        <p style={P}>
          FPS Test is a free collection of six browser-based gaming performance tools. No download, no signup, no ads. Every tool runs directly in your browser so you can check your frame rate, reaction time, monitor refresh rate, and input lag in seconds.
        </p>

        <h2 style={H2}>Our Tools</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
          {TOOLS.map(tool => (
            <div
              key={tool.href}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.625rem',
                padding: '1rem 1.25rem',
              }}
            >
              <Link href={tool.href} style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}>
                {tool.name}
              </Link>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.25rem 0 0' }}>{tool.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={H2}>Why We Built This</h2>
        <p style={P}>
          Gamers needed a fast, free way to check their FPS and monitor performance without downloading software. Most FPS counters require installing apps or hooking into games. We built tools that work instantly in any browser so anyone can test their setup in seconds.
        </p>

        <h2 style={H2}>Contact Us</h2>
        <p style={P}>
          Reach out at <Link href="/contact" style={{ color: 'var(--accent)' }}>fpstest.pro/contact</Link> for questions, feedback, or suggestions.
        </p>
      </div>
    </div>
    </>
  )
}
