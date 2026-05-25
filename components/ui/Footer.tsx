import Link from 'next/link'
import { TOOLS } from '@/lib/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
              <span
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
              >
                FT
              </span>
              <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>FPS Test</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Free browser-based FPS and gaming performance tests. No download, no signup.
            </p>
          </div>

          {/* Tools */}
          <div>
            <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.8125rem', marginBottom: '0.75rem' }}>Tools</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {TOOLS.map(tool => (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="text-xs no-underline transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {tool.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Site links */}
          <div>
            <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.8125rem', marginBottom: '0.75rem' }}>Site</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { href: '/blog', label: 'Blog' },
                { href: '/about', label: 'About' },
                { href: '/privacy', label: 'Privacy Policy' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs no-underline transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
            &copy; {year} FPS Test. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
