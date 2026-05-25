import Link from 'next/link'
import type { CSSProperties } from 'react'

const PILL: CSSProperties = {
  padding: '0.5rem 1rem',
  border: '1px solid var(--border-color)',
  borderRadius: '0.375rem',
  color: 'var(--text-secondary)',
  fontSize: '0.875rem',
  textDecoration: 'none',
}

export default function NotFound() {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-primary)',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.25rem',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          color: 'var(--accent)',
          fontWeight: 700,
          fontSize: '0.875rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: '0 0 1rem',
        }}
      >
        404
      </p>
      <h1
        style={{
          color: 'var(--text-primary)',
          fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          margin: '0 0 1rem',
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          maxWidth: '420px',
          lineHeight: 1.7,
          margin: '0 0 2rem',
        }}
      >
        This page does not exist or was moved.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0.8rem 2rem',
          backgroundColor: 'var(--accent)',
          color: 'var(--bg-primary)',
          borderRadius: '0.5rem',
          fontWeight: 700,
          fontSize: '0.9375rem',
          textDecoration: 'none',
          marginBottom: '2.5rem',
        }}
      >
        Go to Homepage
      </Link>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
        {[
          { href: '/tools/fps-test', name: 'FPS Test' },
          { href: '/tools/ufo-test', name: 'UFO Motion Test' },
          { href: '/tools/hz-detector', name: 'Monitor Hz Detector' },
        ].map(({ href, name }) => (
          <Link key={href} href={href} style={PILL}>
            {name}
          </Link>
        ))}
      </div>
    </div>
  )
}
